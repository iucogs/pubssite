import requests
import rython
import logging
import json

from pyramid.response import Response
from pyramid.view import (notfound_view_config, view_config, forbidden_view_config,)
from pyramid.security import (remember, forget,)
#from .security import USERS
from pyramid.httpexceptions import HTTPNotFound, HTTPFound, HTTPBadRequest
from sqlalchemy.sql import exists
from sqlalchemy.exc import DBAPIError
from sqlalchemy import (update, insert, and_)
from .models import *
from .citation_format import *
from sqlalchemy.sql import select
from gdata.contentforshopping.data import Permission

# Dev note: flushes at the beginning of get views are for consistency between
# developer versions.

# parser setup
ctx = rython.RubyContext(requires=["rubygems", "anystyle/parser"])
ctx("Encoding.default_internal = 'UTF-8'")
ctx("Encoding.default_external = 'UTF-8'")
parser = ctx("Anystyle.parser")

log = logging.getLogger(__name__)

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
        payload = {'cassvc': 'IU', 
                   'casticket': ticket, 
                   'casurl': request.application_url}
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
    raw = str(request.body)
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
        return citation_exists.first().json
    

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
    
    #Session.commit()

    return citation.json 

# this one updates a citation and the authors associated with it.
# INPUT: request object containing a JSON encoded citation in the JSON body of
# the request
# OUTPUT: the citation's updated JSON
#TODO: add permission user
#TODO: change new_citation to updated_citation or something. Y'know. For
#clarity.
@view_config(route_name='citation_id', request_method='PUT', renderer='pubs_json')
def citation_update(request):

    new_citation = request.json_body

    current_citation = Session.query(Citation).get(new_citation['citation_id'])
    id = int(request.matchdict.get('id', -1))
    if new_citation['citation_id'] != id:
        raise HTTPBadRequest('id in URL does not match citation_id in JSON body')

    del new_citation['citation_id']

    new_cit_authors = new_citation['authors'] 
    new_cit_editors = new_citation['editors'] 
    new_cit_translators = new_citation['translators'] 
    # following try/catch clean up the citation dict for update, making the
    # incoming dict isomorphic to the table mapping.
    # TODO: Fix this to also have authors, editors, and translators all follow
    # the same cleanup procedure for each role.
    try:
        del new_citation['authors']
    except KeyError:
        pass
    
    try:
        del new_citation['editors']
    except KeyError:
        pass
    
    try:
        del new_citation['translators']
    except KeyError:
        pass

    try:
        del new_citation['auth_string']
    except KeyError:
        pass
    
    # update citation fields like title, year, etc.
    for key in new_citation.keys():
        if getattr(current_citation, key) == new_citation[key]:
            del new_citation[key]
    Session.execute(update(Citation).where(Citation.citation_id == id).values(new_citation))
    
    # list of tuples of the citation's current authors
    process_authors(current_citation, new_cit_authors)
    process_editors(current_citation, new_cit_editors)
    process_translators(current_citation, new_cit_translators)

    Session.flush()
    Session.commit()
    Session.expire(current_citation)
    updated_cit = Session.query(Citation).get(id)
    return updated_cit.json

def process_authors(current_citation, new_cit_authors):
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

def process_editors(current_citation, new_cit_editors):
    current_editors = [auth for auth in current_citation.editors]
    # iterate over the new editors to see if we're updating or adding a new
    # author
    # Worth noting: we use the lastname/firstname filter because occasionally the author won't have
    # an author_id if said author is new.
    for author in new_cit_editors:
        author_exists = Session.query(Author).filter(and_(Author.lastname.like(author['lastname']), Author.firstname.like(author['firstname'])))                
        if author_exists.all():
            if author.get('author_id', None) in [current_author.author_id for current_author in current_editors]:
                pass
            else:
                current_citation.editors.append(author_exists.first())
                              
        else:
            new_author = Author(author['firstname'], author['lastname'])
            Session.add(new_author)
            Session.commit() 
            new_author = Session.query(Author).filter(and_(Author.lastname.like(new_author.lastname), Author.firstname.like(new_author.firstname))).first()          
            current_citation.editors.append(new_author)
    
    # Removes editors no longer part of the citation
    for current_author in current_editors:
        if current_author.author_id not in [author.get('author_id', []) for author in new_cit_editors]:
            current_citation.editors.remove(current_author)

def process_translators(current_citation, new_cit_translators):
    current_translators = [auth for auth in current_citation.translators]
    # iterate over the new translators to see if we're updating or adding a new
    # author
    # Worth noting: we use the lastname/firstname filter because occasionally the author won't have
    # an author_id if said author is new.
    for author in new_cit_translators:
        author_exists = Session.query(Author).filter(and_(Author.lastname.like(author['lastname']), Author.firstname.like(author['firstname'])))                
        if author_exists.all():
            if author.get('author_id', None) in [current_author.author_id for current_author in current_translators]:
                pass
            else:
                current_citation.translators.append(author_exists.first())
                              
        else:
            new_author = Author(author['firstname'], author['lastname'])
            Session.add(new_author)
            Session.commit() 
            new_author = Session.query(Author).filter(and_(Author.lastname.like(new_author.lastname), Author.firstname.like(new_author.firstname))).first()          
            current_citation.translators.append(new_author)
    
    # Removes translators no longer part of the citation
    for current_author in current_translators:
        if current_author.author_id not in [author.get('author_id', []) for author in new_cit_translators]:
            current_citation.translators.remove(current_author)

# deletes a citation
# INPUT: A request object containing the citation id of the citation to be
# deleted
# OUTPUT: A response indicating the success of the operation
# TODO: match user with citation owner so that only owners can delete
# citations to prevent total academic anarchy
@view_config(route_name='citation_delete', request_method='DELETE',renderer='pubs_json', permission='user')
def delete_citation(request):
    
    id = int(request.matchdict.get('id', -1))
    citation = Session.query(Citation).get(id)
    if citation:
        Session.delete(citation)
        Session.commit()
        return 'Citation deleted'
    else:
        return HTTPNotFound('citation not found')

# returns a single citation object or a list of citation objects
# as determined by function args
# INPUT: A request object containing a single citation ID or a list of IDs 
# delimited by commas
# OUPUT: the JSON of the corresponding ID(s)
@view_config(route_name='citation_id', renderer='pubs_json')
def citation_by_id(request):
    
    id = str(request.matchdict.get('id', -1))
    
    citations = []
    
    # here we check for multiple citation_ids, separated by commas
    # if it's one citation, break by returning it. otherwise, the else.
    if "," not in id:
        citation = Session.query(Citation).get(id)
        if not citation:
            return HTTPNotFound("Citation not found!")
        else:
            return citation.json
    else:        
        ids = id.split(",")
        for citation_id in ids:
            citation = Session.query(Citation).get(id)
            if not citation:
                return HTTPNotFound("Citation " + citation_id + " not found!")
            else:
                citations.append(citation.json) 
        return citations

# takes a string, the owner, and returns all citations associated with this
# owner.
# INPUT: a string representing the owner of a citation
# OUTPUT: A JSON array containing the JSON of all citations associated with the
# owner
@view_config(route_name='citations_by_owner', renderer='pubs_json')
def citations_by_owner(request):
    owner = str(request.matchdict.get('owner', -1))
    citations = Session.query(Citation).filter(Citation.owner == owner).all()
    
    Session.commit()
    if not citations:
        return HTTPNotFound()
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


# returns an authors 10 most recent citations, listed by year
# INPUT: request object containing a username
# OUTPUT: a JSON array of the author's 10 most recent citations sorted by year
# descending
"""
@view_config(route_name='author_most_recent', renderer='pubs_json')
def author_most_recent(request):
    return {"helo":"ok"}
    owner = str(request.matchdict.get('owner', -1))
    citations = Session.query(Citation).filter(Citation.owner == owner).order_by(Citation.year.desc()).limit(10)
    if not citations:
        return HTTPNotFound()
    return [citation.json for citation in citations]
"""
## COLLECTION API VIEWS ##

# this seems to delete a collection. very dangerous.
# INPUT: request object containing the ID of the collection to be deleted
# OUTPUT: A message relaying the success of the operation
# TODO: make sure the user can only delete their own collections
@view_config(route_name='collection_delete', request_method='DELETE', renderer='pubs_json', permission='user')
def delete_collection(request):
    id = int(request.matchdict.get('id', -1))
    #id = request.json_body.get("collection_id")
    collection = Session.query(Collection).get(id)
    
    print collection
    if collection:
        Session.delete(collection)
        Session.commit()
        return 'collection deleted'
    else:
        return HTTPNotFound('collection not found')

# returns a collection object given by the input id
# INPUT: request object containing the ID of the collection to be retrieved 
# OUTPUT: the collection object
# TODO: allow support for retrieving multiple collection objects at once
@view_config(route_name='collection_by_id', renderer='pubs_json')
def collection_by_id(request):
    id = int(request.matchdict.get('id', -1))
    collection = Session.query(Collection).get(id)
    Session.commit()
    if not collection:
        return HTTPNotFound()
    print collection.json
    return collection.json

# returns a list of collection objects association with an owner
# INPUT: request object containing the owner's name
# OUTPUT: a JSON array of the JSON objects representing the owner's collections
@view_config(route_name='collections_by_owner', renderer='pubs_json')
def collections_by_owner(request):
    owner = str(request.matchdict.get('owner', -1))
    collections = Session.query(Collection).filter(Collection.owner == owner).all()
    print len(collections)
    Session.commit()
    if not collections:
        return HTTPNotFound()
    return [collection.json for collection in collections]

##autocomplete function . Filters using lastname
#returns only username , firstname and lastname. dictfilt filters the keys of dictionary
@view_config(route_name='get_user_by_name', request_method='GET', renderer='pubs_json')
def get_user_by_name(request):
    dictfilt = lambda x, y: dict([ (i,x[i]) for i in x if i in set(y) ])
    user =request.matchdict.get('user', -1)
    res = Session.query(User).filter(User.lastname.ilike('%%%s%%' %(user.lower())))
    Session.commit()
    if not res:
        return {}
    else: 
        return [dictfilt(x.json, ("username", "firstname", "lastname")) for x in res]


#Merge function for two citations
#takes two citations by id and merges 
@view_config(route_name='merge_publications',request_method=('GET','PUT', 'DELETE'), renderer='pubs_json')
def merge_publications(request):
    #merge_ids are merged into pivot_id
    pivot_id = int(request.matchdict.get('id', -1))
    merge_ids = map(int, str(request.matchdict.get('merge_ids', -1)).split(","))
    
    #update member_of_collection table. get the collections to which pivot_id belong to.
    piv_coll_query = Session.execute(select([member_of_collection.columns.collection_id]).where(member_of_collection.columns.citation_id==pivot_id))
    pivot_collections=[]
    for row in piv_coll_query:
        pivot_collections.append(row)
    
    res = Session.query(Citation).get(pivot_id)
    #iterate over the merge_ids separated by comma in query string
    for item in merge_ids:
        list=[]
        #get the collections to which the merge_id belong to
        item_coll_query = Session.execute(select([member_of_collection.columns.collection_id]).where(member_of_collection.columns.citation_id==item))
        merge_collections=[]
        for row in item_coll_query:
            merge_collections.append(row)
        #subtract merge_collections and pivot_collections
        merge_collections= [int(x[0]) for x in merge_collections if x not in pivot_collections]
        #get the merge json 
        myjson=Session.query(Citation).get(item).json
        
        print "step one done"
        #update the citation before deleting it.
        myjson_keys = myjson.keys()
        for key in myjson_keys:
            myjson[key]= res.json.get(key)
        list.append(myjson)
        
        
        #add the merge collections to pivot collections
        if not merge_collections:
            for x in merge_collections:
                Session.execute(member_of_collection.insert().values(collection_id=x, citation_id=pivot_id))
        print "step two done"
        #update the similar_to table
        Session.execute(update(similar_to).where(similar_to.columns.citation_id1==item).values(citation_id1=pivot_id))
        Session.execute(update(similar_to).where(similar_to.columns.citation_id2==item).values(citation_id2=pivot_id))
        print "step three done"
        #add the citation to deleted citations table
        
        Session.execute(deleted_citations.insert().values(pubtype = myjson['pubtype'], abstract = myjson['abstract'],keywords = myjson['keywords'],
                                                                                    doi = myjson['doi'],url = myjson['url'], address= myjson['address'], booktitle= myjson['booktitle'],
                                                                                    chapter= myjson['chapter'], crossref= myjson['crossref'], edition= myjson['edition'], editor= myjson['editor'],
                                                                                    translator= myjson['translator'], howpublished= myjson['howpublished'], institution= myjson['institution'], journal= myjson['journal'],
                                                                                    bibtex_key= myjson['bibtex_key'], month= myjson['month'], note= myjson['note'], number= myjson['number'],organization= myjson['organization'],
                                                                                    pages= myjson['pages'],publisher= myjson['publisher'],location= myjson['location'],school= myjson['school'],series= myjson['series'],
                                                                                    title= myjson['title'],type= myjson['type'],volume= myjson['volume'],year= myjson['year'],raw= myjson['raw'],verified= myjson['verified'],
                                                                                    last_modified= myjson['last_modified'],entryTime= myjson['entryTime'], citation_id=item, reason= "merged"))
        
        print "step four done"
        #delete the citation
        citation = Session.query(Citation).get(item)
        if item:
            Session.delete(citation)
        print "done"
        Session.commit()
    if not myjson:
        return HTTPNotFound()
    return "successfully merged"

@view_config(route_name='search_by_cit_id', request_method='GET', renderer='pubs_json')
def search_by_cit_id(request):
    #dictfilt = lambda x, y: dict([ (i,x[i]) for i in x if i in set(y) ])
    item =request.matchdict.get('id', -1)
    res = Session.query(Citation).get(item)
    Session.commit()
    if not res:
        return {}
    else: 
        return res.json

@view_config(route_name='search_by_author_name', request_method='GET', renderer='pubs_json')
def search_by_author_name(request):
    #dictfilt = lambda x, y: dict([ (i,x[i]) for i in x if i in set(y) ])
    item =request.matchdict.get('name', -1)
    
    res = Session.query(Author).filter(Author.lastname.ilike('%%%s%%' %(item.lower())))
    fres= Session.query(Author).filter(Author.firstname.ilike('%%%s%%' %(item.lower())))
    auth_list=[]
    for x in res:
        auth_list.append(x.json.get('author_id'))
    for x in fres:
        auth_list.append(x.json.get('author_id'))
    cit_list=[]
    for item in auth_list:
        cit_list= Session.query(author_of).filter(author_of.columns.author_id == item)
        print cit_list
    Session.commit()
    if not res:
        return {}
    else: 
        return cit_list
#returns false if there are no similar citations
#returns list of similar citations otherwise.
@view_config(route_name='show_similar_to',request_method='GET', renderer='pubs_json')
def show_similar_to(request):
    citation_id= int(request.matchdict.get('id', -1))
    similar_citations=[]
    res= Session.execute(select([similar_to.columns.citation_id2]).where(similar_to.columns.citation_id1 == citation_id))
    for row in res:
        similar_citations.append(row)   
    res= Session.execute(select([similar_to.columns.citation_id1]).where(similar_to.columns.citation_id2 == citation_id))
    for row in res:
        similar_citations.append(row)
    similar_citations= [int(x[0]) for x in similar_citations]
    if not similar_citations:
        return False
    return similar_citations

@view_config(route_name='add_citation_to_collection',request_method='PUT', renderer='pubs_json')
def add_citation_to_collection(request):
    myjson = request.json_body
    coll_id = int(myjson.get("coll_id"))
    cit_ids = myjson.get("cit_ids")
    
    for x in cit_ids:
        Session.execute(member_of_collection.insert().values(collection_id=coll_id, citation_id=x))
    Session.commit()
    return "Success"

@view_config(route_name='add_new_collection',request_method='POST', renderer='pubs_json')
def add_new_collection(request):
    myjson = request.json_body
    collection_name = str(myjson.get("collection_name"))
    user_id = int(myjson.get("user_id"))
    submitter = myjson.get("submitter")
    owner = myjson.get("owner")
    cit_ids= myjson.get("cit_ids")
    
    Session.execute(insert(Collection).values(collection_name=collection_name, user_id=user_id,submitter=submitter, owner=owner))
    coll_id = Session.query(Collection).filter(Collection.collection_name.in_([collection_name]))
    for row in coll_id:
        coll_id= int(row.collection_id)
    for x in cit_ids:
        Session.execute(member_of_collection.insert().values(collection_id=coll_id, citation_id=x))
    Session.commit()
    return "Success"

@view_config(route_name='collection_rename',request_method='POST', renderer='pubs_json')
def collection_rename(request):
    myjson = request.json_body
    collection_name = str(myjson.get("collection_name"))
    coll_id = int(myjson.get("collection_id"))
    if coll_id:
        Session.execute(update(Collection).where(Collection.collection_id==coll_id).values(collection_name=collection_name))
        Session.commit()
        return "success"
    else: 
        return HTTPNotFound("Collection id does not exist")

@view_config(route_name = 'merge_collections', request_method='POST', renderer='pubs_json')
def merge_collections(request):
    return "hi"