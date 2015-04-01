import requests
import rython
import logging
import json
import redis

from pyramid.response import Response
from pyramid.view import (notfound_view_config, view_config, forbidden_view_config,)
from pyramid.security import (remember, forget,)
#from .security import USERS
from pyramid.httpexceptions import HTTPNotFound, HTTPFound, HTTPInternalServerError
from sqlalchemy.sql import exists
from sqlalchemy.exc import DBAPIError
from sqlalchemy import (update, insert, and_,)
from .models import *
from .citation_format import *

# Dev note: flushes at the beginning of get views are for consistency between
# developer versions.

# parser setup
ctx = rython.RubyContext(requires=["rubygems", "anystyle/parser"])
ctx("Encoding.default_internal = 'UTF-8'")
ctx("Encoding.default_external = 'UTF-8'")
parser = ctx("Anystyle.parser")

log = logging.getLogger(__name__)

cit_cache = redis.StrictRedis(host='localhost', port=6379, db=0)
coll_cache = redis.StrictRedis(host='localhost', port=6379, db=1)


## SITE VIEWS ##

# for stuff that probably doesn't exist. cushions the blow by returning some U2
# lyrics.
@notfound_view_config(append_slash=True)
def notfound(request):
    return HTTPNotFound('404: and I stiiiiill haven\'t found what I\'m looking for...')

# if you were wondering where the beef is, it's here.
# this returns the site.
@view_config(route_name='home', renderer='templates/index.mako')
def home(request):
    if not request.authenticated_userid:
        return HTTPFound(request.route_path('login'))
    request.response.set_cookie('user', request.authenticated_userid)    
    return {'user': request.authenticated_userid}

# authenticates a user. or probably will at some point in the future, we hope.
# INPUT: a request object containing the CAS ticket
# OUTPUT: authenticated user credential object including permission
# TODO: ret auth user obj
# TODO: matching cas url
@view_config(route_name='login', renderer='templates/login.mako')
def login(request):
    if 'casticket' in request.params:
        ticket = request.params['casticket']
        payload = {'cassvc': 'IU', 'casticket': ticket, 'casurl':'http://nupubs.cogs.indiana.edu'}
        user = str(requests.get("https://cas.iu.edu/cas/validate", params=payload).text)
        if "no" in user:
            return {'no way pal': 'get lost ok?'}
        else: 
            user = user.replace("\r", "").split('\n')[1]

        pubs_user = Session.query(User).filter(User.username == user).first() 
        pubs_username = pubs_user.username

        if pubs_username is None:
            return {'no way pal': 'get lost ok?'}

        else:
            headers = remember(request, pubs_username)
            return HTTPFound(request.route_path('home'), headers=headers)

    else:
        return {'ok': 'log in now!'}

# INPUT: a request object with user credentials
# OUTPUT: returns user to the homepage with cleared user credentials
def logout(request):
    headers = forget(request)
    loc = request.route_url('home')
    return HTTPFound(location=loc, headers=headers)

## CITATION API VIEWS ##

@view_config(route_name='citation_add', request_method='POST', renderer='pubs_json')
def citation_add(request):
    log.debug(request.body)
    raw = request.body
    citation = parser.parse(raw)[0]
    
    try:
        auth_string = citation.pop('author')
        authors = author_parse(auth_string)
    except:
        authors = [] 

    formatted_citation = citation_format(citation, raw)
    citation = Citation(formatted_citation)
    
    
    citation_exists = Session.query(Citation).filter(Citation.raw.like(citation.raw))
    if citation_exists.first() is not None:
        return {"citation_exists": True} 
    

    # abstract and keywords are text columns and cannot have default values.
    # not my fault, I didn't write mySQL.
    if citation.abstract is None:
        citation.abstract = ''
    else:
        pass

    if citation.keywords is None:
        citation.keywords = ''

    for author in authors:
        citation.authors.append(author)
    
    try:
        Session.add(citation)
        Session.commit()
        return citation.json 
    except:
        Session.rollback()
        HTTPInternalServorError("There was an error parsing your citation: " + raw)
    
# this one updates a citation and the authors associated with it.
# INPUT: request object containing a JSON encoded citation in the JSON body of
# the request
# OUTPUT: the citation's updated JSON
#TODO: add permission user
#TODO: change new_citation to updated_citation or something. Y'know. For
#clarity.
@view_config(route_name='citation_update', request_method='PUT', renderer='pubs_json')
def citation_update(request):
    new_citation = request.json_body
    current_citation = Session.query(Citation).get(new_citation['citation_id'])
    new_cit_authors = new_citation['authors'] 
    # following try/catch clean up the citation dict for update, making the
    # incoming dict isomorphic to the table mapping.
    try:
        del new_citation['authors']
    except KeyError:
        pass

    try:
        del new_citation['auth_string']
    except KeyError:
        pass
    
    # update citation fields like title, year, etc.
    Session.execute(update(Citation).where(Citation.citation_id == new_citation['citation_id']).values(new_citation))
    
    # list of tuples of the citation's current authors
    current_authors = [auth for auth in current_citation.authors]
    
    # iterate over the new authors to see if we're updating or adding a new
    # author
    # Worth noting: we use the lastname/firstname filter because occasionally the author won't have
    # an author_id if said author is new.
    for author in new_cit_authors:
        author_exists = Session.query(Author).filter(and_(Author.lastname.like(author['lastname']), Author.firstname.like(author['firstname'])))                
        if author_exists.all():
            if author.get('author_id', None) in [current_author.author_id for current_author in current_authors]:
                pass
            else:
                current_citation.authors.append(author_exists.first())
                              
        else:
            new_author = Author(author['firstname'], author['lastname'])
            Session.add(new_author)
            Session.commit() 
            new_author = Session.query(Author).filter(and_(Author.lastname.like(new_author.lastname), Author.firstname.like(new_author.firstname))).first()          
            current_citation.authors.append(new_author)
    
    # Removes authors no longer part of the citation
    for current_author in current_authors:
        if current_author.author_id not in [author.get('author_id', []) for author in new_cit_authors]:
            current_citation.authors.remove(current_author)
    
    Session.commit()
    updated_cit = Session.query(Citation).get(new_citation['citation_id'])
    return updated_cit.json

# deletes a citation
# INPUT: A request object containing the citation id of the citation to be
# deleted
# OUTPUT: A response indicating the success of the operation
# TODO: match user with citation owner so that only owners can delete
# citations to prevent total academic anarchy
@view_config(route_name='citation_delete', request_method='DELETE',
             permission='user')
def delete_citation(request):
    id = int(request.matchdict.get('id', -1))
    citation = Session.query(Citation).get(id)
    if citation:
        Session.delete(citation)
        Session.commit()
        return HTTPFound('Citation deleted')
    else:
        return HTTPNotFound('citation not found')

# returns a single citation object or a list of citation objects
# as determined by function args
# INPUT: A request object containing a single citation ID or a list of IDs 
# delimited by commas
# OUPUT: the JSON of the corresponding ID(s)
# TODO: don't throw up if citation not found in list
@view_config(route_name='citation_by_id', renderer='pubs_json')
def citation_by_id(request):
    id = str(request.matchdict.get('id', -1))
    citations = []
    
    # here we check for multiple citation_ids, separated by commas
    # if it's one citation, break by returning it. otherwise, the else.
    if "," not in id:
        if cit_cache.exists(id):
            cit_cache.expire(id, 3600)
            return cit_cache.hgetall(id)
        else:    
            citation = Session.query(Citation).get(id)
            if not citation:
                return HTTPNotFound("Citation not found!")
            else:
                cit_cache.hmset(id, citation.json)
                cit_cache.expire(id, 3600)
                return citation.json
    else:        
        ids = id.split(",")
        for citation_id in ids:
            if cit_cache.exists(citation_id):
                cit_cache.expire(citation_id, 3600)
                citations.append(cit_cache.hgetall(citation_id))
            else:
                citation = Session.query(Citation).get(citation_id)
                if not citation:
                    return HTTPNotFound("Citation " + citation_id + " not found!")
                else:
                    cit_cache.hmset(citation_id, citation.json)
                    cit_cache.expire(citation_id, 3600)
                    citations.append(citation.json) 
        return citations

# takes a string, the owner, and returns all citations associated with this
# owner.
# INPUT: a string representing the owner of a citation
# OUTPUT: A JSON array containing the JSON of all citations associated with the
# owner
# TODO: add ability to recall from cache- look at refactoring query
@view_config(route_name='citations_by_owner', renderer='pubs_json')
def citations_by_owner(request):
    owner = str(request.matchdict.get('owner', -1))
    citations = Session.query(Citation).filter(Citation.owner == owner).all()
    
    Session.commit()
    if not citations:
        return HTTPNotFound()
    for citation in citations:
        if cit_cache.exists(citation.citation_id):
            cit_cache.expire(citation.citation_id, 3600)
        else:
            cit_cache.hmset(citation.citation_id, citation.json)
            cit_cache.expire(citation.citation_id, 3600)

    return [citation.json for citation in citations]

# retuns a json object containing the citations in a collection given by the id
# INPUT: A request object containing a collection ID
# OUTPUT: a JSON array of citation JSON objects
@view_config(route_name='citations_by_collection', renderer='pubs_json')
def citations_by_collection(request):
    id = int(request.matchdict.get('id', -1))
    collection = Session.query(Collection).get(id)
    Session.commit() 
    if not collection:
        return HTTPNotFound()
    return [citation.json for citation in collection.citations]

# returns an author's representative citations
# INPUT: request object containing a username
# OUTPUT: a JSON array of the author's represenative publications
@view_config(route_name='representative_publications', renderer='pubs_json')
def representative_publications(request):
    owner = str(request.matchdict.get('owner', -1))
    rep_pubs = Session.query(Collection).filter(and_(Collection.owner == owner), (Collection.collection_name == "My Representative Publications")).first()
    
    if not rep_pubs:
        return {owner: 'This user doesn\t have a My Representative Publications collection.'}
    return [citation.json for citation in rep_pubs.citations]

## COLLECTION API VIEWS ##

# this seems to delete a collection. very dangerous.
# INPUT: request object containing the ID of the collection to be deleted
# OUTPUT: A message relaying the success of the operation
# TODO: make sure the user can only delete their own collections
@view_config(route_name='collection_delete', request_method='DELETE',
             permission='user')
def delete_collection(request):
    id = int(request.matchdict.get('id', -1))
    collection = Session.query(Collection).get(id)
    if collection:
        Session.delete(collection)
        Session.commit()
        return HTTPFound('collection deleted')
    else:
        return HTTPNotFound('collection not found')

# returns a collection object given by the input id
# INPUT: request object containing the ID of the collection to be retrieved 
# OUTPUT: the collection object
# TODO: allow support for retrieving multiple collection objects at once
@view_config(route_name='collection_by_id', renderer='pubs_json')
def collection_by_id(request):
    id = int(request.matchdict.get('id', -1))

    if coll_cache.exists(id):
        coll_cache.expire(id, 3600)
        return coll_cache.hgetall(id)
    else:
        collection = Session.query(Collection).get(id)
        Session.commit()
        if not collection:
            return HTTPNotFound()
        
        coll_cache.hmset(id, collection.json)
        coll_cache.expire(id, 3600)       
        return collection.json

# returns a list of collection objects association with an owner
# INPUT: request object containing the owner's name
# OUTPUT: a JSON array of the JSON objects representing the owner's collections
@view_config(route_name='collections_by_owner', renderer='pubs_json')
def collections_by_owner(request):
    owner = str(request.matchdict.get('owner', -1))
    collections = Session.query(Collection).filter(Collection.owner == owner).all()
    Session.commit()
    if not collections:
        return HTTPNotFound()
    return [collection.json for collection in collections]

## USER API VIEWS ## 

@view_config(route_name='user_proxies', renderer='pubs_json')
def user_proxies(request):
    user = str(request.matchdict.get('user', -1))
    user = Session.query(User).filter(User.username == user).first()
    if not user:
        return HTTPNotFound("user not found!")
    else:
        return user.json['proxies']
