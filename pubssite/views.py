import requests
import rython
import logging
import json
from pprint import pprint

from pyramid.response import Response
from pyramid.view import (notfound_view_config, view_config, forbidden_view_config,)
from pyramid.security import (remember, forget,)
#from .security import USERS
from pyramid.httpexceptions import HTTPNotFound, HTTPFound
from sqlalchemy.sql import exists
from sqlalchemy.exc import DBAPIError
from sqlalchemy import update
from .models import *


# parser setup
ctx = rython.RubyContext(requires=["rubygems", "anystyle/parser"])
parser = ctx("Anystyle.parser")

log = logging.getLogger(__name__)

## SITE VIEWS ##

@notfound_view_config(append_slash=True)
def notfound(request):
    return HTTPNotFound('404: and I stiiiiill haven\'t found what I\'m looking for...')

@view_config(route_name='home', renderer='templates/index.mako')
def home(request):
    log.debug('home')
    log.debug(pprint(vars(request)))
    log.debug('end home')
    log.debug(request.authenticated_userid)
    log.debug(request.unauthenticated_userid)
    #if logged_in is False:
    #return HTTPFound(request.route_path('login'))
    return {'ok': 'ok'}


# TODO: ret auth user obj
@view_config(route_name='login', renderer='templates/login.mako')
def login(request):
    if 'casticket' in request.GET:
        ticket = request.GET['casticket']
            
        payload = {'cassvc': 'IU', 'casticket': ticket}
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
            log.debug('login success.')
            log.debug(pubs_username)
            log.debug('remember')
            log.debug(remember(request, pubs_username))
            log.debug('rldl')
            headers = remember(request, pubs_username)
            log.debug(headers)
            return HTTPFound(request.route_path('home'), headers=headers)

    else:
        return {'ok': 'log in now!'}

def logout(request):
    headers = forget(request)
    loc = request.route_url('home')
    return HTTPFound(location=loc, headers=headers)

## CITATION API VIEWS ##

#TODO: add permission user
@view_config(route_name='citation_update', request_method='PUT', renderer='pubs_json')
def citation_update(request):
    log.debug('triggered')
    new_citation = request.json_body
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

    Session.execute(update(Citation).where(Citation.citation_id == new_citation['citation_id']).values(new_citation))
    
    for author in new_cit_authors:
        Session.execute(update(Author).where(Author.author_id == author['author_id']).values(author))
    
    Session.commit()
    updated_cit = Session.query(Citation).get(new_citation['citation_id'])
    
    return updated_cit.json

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

@view_config(route_name='citation_by_id', renderer='pubs_json')
def citation_by_id(request):
    id = str(request.matchdict.get('id', -1))
    citations = []

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

@view_config(route_name='citations_by_owner', renderer='pubs_json')
def citations_by_owner(request):
    owner = str(request.matchdict.get('owner', -1))
    citations = Session.query(Citation).filter(Citation.owner == owner).all()
    
    Session.commit()
    if not citations:
        return HTTPNotFound()
    return [citation.json for citation in citations]

@view_config(route_name='citations_by_collection', renderer='pubs_json')
def citations_by_collection(request):
    id = int(request.matchdict.get('id', -1))
    collection = Session.query(Collection).get(id)
    Session.commit() 
    if not collection:
        return HTTPNotFound()
    return [citation.json for citation in collection.citations]

## COLLECTION API VIEWS ##

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

@view_config(route_name='collection_by_id', renderer='pubs_json')
def collection_by_id(request):
    id = int(request.matchdict.get('id', -1))
    collection = Session.query(Collection).get(id)
    Session.commit()
    if not collection:
        return HTTPNotFound()
    return collection.json

@view_config(route_name='collections_by_owner', renderer='pubs_json')
def collections_by_owner(request):
    owner = str(request.matchdict.get('owner', -1))
    collections = Session.query(Collection).filter(Collection.owner == owner).all()
    Session.commit()
    if not collections:
        return HTTPNotFound()
    return [collection.json for collection in collections]

