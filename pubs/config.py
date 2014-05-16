'''
Imports configuration files for use with the Pubs db model
'''
from ConfigParser import ConfigParser, NoOptionError, NoSectionError
import logging
import os
import os.path

config_paths = [os.path.abspath("pubs.ini"), 
                os.path.abspath("/var/pubs/pubssite/pubs.ini")]

config_path = None
for path in config_paths:
    if os.path.exists(path):
        config_path = path
        break

logging.debug("Using config path: %s" % config_path)

config = ConfigParser()

# Configuration file does not exist, raise Exception
if config_path is None:
    # TODO: Resolve conundrum of path resolution in build of doc system
    # raise IOError("Missing inpho.ini configuration file.")
    pass
else:
    config.read(config_path)


def get_data_path(var, section=None):
    """
    Gets the data path for the given variable, checking for an override in
    section. Creates path if it does not exist.
    """
    # set default path
    path = os.path.join(config.get('general', 'data_path'), var)
    
    # check for override in given section
    if section:
        try:
            path = config.get(section, var + '_path')
        except (NoOptionError, NoSectionError):
            # override not found, go ahead and use default
            pass

    # Create path, if it doesn't exist
    if not os.path.exists(path):
        os.makedirs(path)

    return path

# make inpho.config.get point to the raw ConfigParser
get = config.get
