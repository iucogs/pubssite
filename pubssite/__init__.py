from pyramid.config import Configurator
from sqlalchemy import engine_from_config

from .models import DBSession

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    engine = engine_from_config(settings, 'sqlalchemy.')
    DBSession.configure(bind=engine)
    config = Configurator(settings=settings)
   
    config.add_renderer('.mustache', 'pubssite.renderers.pystache_renderer_factory')
    config.add_renderer('pubs_json', 'pubssite.renderers.PubsJSONRenderer')
    config.add_static_view('static', 'static', cache_max_age=3600)
    
    # TODO: change login to / after auth setup
    config.add_route('home', '/')
    config.add_route('login', '/login')

    # Citation routes
    config.add_route('citation_by_id', '/citation/{id:[0-9]+(,[0-9]+)*}')
    config.add_route('citations_by_owner', '/citation/owner/{owner:.*}')
    config.add_route('citations_by_collection', '/collection/citations/{id:\d+}')
    config.add_route('citation_delete', '/citation/delete/{id:\d+}')
    # TODO: Let's try to find a regex to make sure we're getting JSON objects
    # sent to these next two
    config.add_route('citation_update', '/citation/')
    #config.add_route('citation_add', '/citation/')

    # Collection routes
    config.add_route('collection_by_id', 'collection/{id:\d+}')
    config.add_route('collections_by_owner', '/collection/owner/{owner:.*}')
    config.add_route('collection_delete', '/collection/delete/{id:\d+}')

    config.scan()
    return config.make_wsgi_app()

