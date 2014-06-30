from pyramid.response import Response
from pyramid.view import view_config
from pyramid.httpexceptions import HTTPNotFound, HTTPFound

from sqlalchemy.exc import DBAPIError

from .models import *

## SITE VIEWS ##

@view_config(route_name='home', renderer='templates/index.mako')
def home(request):
    return {'ok': 'ok'}

## CITATION API VIEWS ##

#uc
@view_config(route_name='citation_delete', request_method='DELETE')
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

@view_config(route_name='collection_delete', request_method='DELETE')
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

