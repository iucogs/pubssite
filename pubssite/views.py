from pyramid.response import Response
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPFound

from sqlalchemy.exc import DBAPIError

from .models import *

@view_config(route_name='citation_by_id', renderer='pubs_json')
def citation_by_id(request):
    id = int(request.matchdict.get('id', -1))
    citation = Session.query(Citation).get(id)
    
    if not citation:
        return HTTPNotFound()
    return {'citation': citation.json}

@view_config(route_name='citations_by_owner', renderer='pubs_json')
def citations_by_owner(request):
    owner = str(request.matchdict.get('owner', -1))
    citations = Session.query(Citation).filter(Citation.owner == owner).all()

    if not citations:
        return HTTPNotFound()
    return {'citations': [citation.json for citation in citations]}

@view_config(route_name='citations_by_collection', renderer='pubs_json')
def citations_by_collection(request):
    id = int(request.matchdict.get('id', -1))
    collection = Session.query(Collection).get(id)

    if not collection:
        return HTTPNotFound()
    return {'citations': [citation.json for citation in collection.citations]}

@view_config(route_name='collection_by_id', renderer='pubs_json')
def collection_by_id(request):
    id = int(request.matchdict.get('id', -1))
    collection = Session.query(Collection).get(id)

    if not collection:
        return HTTPNotFound()
    return {'collection': collection.json}

@view_config(route_name='collections_by_owner', renderer='pubs_json')
def collections_by_owner(request):
    owner = str(request.matchdict.get('owner', -1))
    collections = Session.query(Collection).filter(Collection.owner == owner).all()

    if not collections:
        return HTTPNotFound()
    return {'collections', collections}

