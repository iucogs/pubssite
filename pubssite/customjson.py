#!/var/pubs/pubssite/pubsenv/bin/python
# -*- coding: utf-8 -*-

"""
Custom JSON Encoder to encode any arbitrary generator, iterator, closure or
functor. This is really frustrating to have to include everywhere because this
should just be the default behavior of the library.
"""

from json import JSONEncoder
from decimal import Decimal
class ExtJsonEncoder(JSONEncoder):
    '''
    Extends ``simplejson.JSONEncoder`` by allowing it to encode any
    arbitrary generator, iterator, closure or functor.
    '''
    def default(self, c):
        # Handles generators and iterators
        if hasattr(c, '__iter__'):
            return [i for i in c]

        # Handles closures and functors
        if hasattr(c, '__call__'):
            return c()

        # Handles precise decimals with loss of precision to float.
        # Hack, but it works
        if isinstance(c, Decimal):
            return float(c)

        return JSONEncoder.default(self, c)

def dumps(*args): 
    '''
    Shortcut for ``ExtJsonEncoder.encode()``
    '''
    return ExtJsonEncoder(sort_keys=False, ensure_ascii=False, 
            skipkeys=True, encoding='utf-8').encode(*args)
