activate_this = '/var/pubs/pubssite/pubsenv/bin/activate_this.py'
execfile(activate_this, dict(__file__=activate_this))

# Avoid ``[Errno 13] Permission denied: '/var/www/.python-eggs'`` messages
#import os
#os.environ['PYTHON_EGG_CACHE'] = '/var/pubs/pubssite/dist'

# Load the Pylons application
from pyramid.paster import get_app, setup_logging
ini_path = '/var/pubs/pubssite/development.ini'
setup_logging(ini_path)
application = get_app(ini_path, 'main')
