import json
from decimal import Decimal
class ExtJsonEncoder(json.JSONEncoder):
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

        return simplejson.JSONEncoder.default(self, c)

def json(*args): 
    '''
    Shortcut for ``ExtJsonEncoder.encode()``
    '''
    return ExtJsonEncoder(sort_keys=False, ensure_ascii=False, 
            skipkeys=True).encode(*args)
