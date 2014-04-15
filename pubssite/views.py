from pyramid.response import Response
from pyramid.view import view_config

from sqlalchemy.exc import DBAPIError

from .models import *

@view_config(route_name='citation_by_id', renderer='pubs_json')
def citation_by_id(request):
   # response.content_type = 'application/json'
    id = int(request.matchdict.get('id', -1))
    citation = Session.query(Citation).get(id)
    
    if not citation:
        return HTTPNotFound()
    return {'citation': citation.json}

@view_config(route_name='citations_by_owner', renderer='pubs_json')
def citations_by_owner(request):
   # response.content_type = 'application/json'
    owner = str(request.matchdict.get('owner', -1))
    citations = Session.query(Citation).filter(Citation.owner == owner)

    if not citations:
        return HTTPNotFound()
    return {'citations': [citation.json for citation in citations]}
