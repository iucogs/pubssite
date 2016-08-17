from pyramid.authentication import AuthTktAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
#from .security import groupfinder
from pyramid.config import Configurator

from sqlalchemy import engine_from_config
from pyramid.request import Request
from pyramid.request import Response
from .models import DBSession
from pyramid.events import NewRequest



def add_cors_headers_response_callback(event):
    def cors_headers(request, response):
        response.headers.update({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,GET,DELETE,PUT,OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Max-Age': '1728000',
        })
    event.request.add_response_callback(cors_headers)

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.', pool_recycle=3600)
    DBSession.configure(bind=engine)

    authn_policy = AuthTktAuthenticationPolicy('iu_cas')
    authz_policy = ACLAuthorizationPolicy()
    config = Configurator(settings=settings)
    config.include('pyramid_mako')

    config.set_authentication_policy(authn_policy)
    config.set_authorization_policy(authz_policy)
    config.add_subscriber(add_cors_headers_response_callback, NewRequest)

    config.add_renderer('pubs_json', 'pubssite.renderers.PubsJSONRenderer')
    config.add_static_view('static', 'static', cache_max_age=3600)
    
    # TODO: change login to / after auth setup
    config.add_route('home', '/')
    config.add_route('login', '/login')

    # Citation routes
    config.add_route('representative_publications', '/citation/rep_pubs/{owner:.*}')
    config.add_route('citation_id', '/citation/{id:[0-9]+(,[0-9]+)*}')
    config.add_route('citations_by_owner', '/citation/owner/{owner:.*}')
    config.add_route('citations_by_collection', '/collection/citations/{id:\d+}')
    config.add_route('citation_delete', '/citation/delete/{id:\d+}')
    config.add_route('citation_update', '/citation/edit/{id:\d+}')
    config.add_route('citation_add', '/citation/parse')
    #    config.add_route('citation_add', '/citation/')

        
    # Collection routes
    config.add_route('add_citation_to_collection', '/collection/add/existing')
    config.add_route('add_new_collection', '/collection/add/new')
    config.add_route('collection_by_id', '/collection/{id:\d+}')
    config.add_route('collections_by_owner', '/collection/owner/{owner:.*}')
    config.add_route('collection_delete', '/collection/delete/{id:\d+}')
    config.add_route('collection_rename', '/collection/rename')
    config.add_route('remove_citation_from_collection', '/collection/delete/{coll_id:[0-9]+}/{cit_id:[0-9]+}')
    
    #autocomplete and search routes
    config.add_route('get_user_by_name', '/users/names/{user:.*}')
    config.add_route('search_by_cit_id', '/search/citid/{id:[0-9]+(,[0-9]+)*}')
    config.add_route('search_by_author_name', '/search/authorname/{name:.*}')
    #merge and similar_to routes
    config.add_route('merge_publications', 'citation/{id:[0-9]+(,[0-9]+)*}/merge/{merge_ids:[0-9]+(,[0-9]+)*}')
    config.add_route('show_similar_to', '/citation/similarto/{id:\d+}')

    

    # User routes
    config.add_route('user_proxies', '/proxies/{user:.*}')


    config.scan()
    return config.make_wsgi_app()

    
