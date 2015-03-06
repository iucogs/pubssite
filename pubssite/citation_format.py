from .models import *
from sqlalchemy.sql import exists
from sqlalchemy.exc import DBAPIError
from sqlalchemy import (update, insert, and_,)

import logging
log = logging.getLogger(__name__)

# INPUT: a dictionary representing the citation
# OUTPUT: the dictionary formatted such that it matches our database labels
# TODO: tune parser so we can get rid of this
def citation_format(citation, raw):
    citation['raw'] = raw
    
    try:
        citation['pubtype'] = citation.pop('type')
    except:
        citation['pubtype'] = None
    
    try:
        citation['year'] = citation.pop('date')
    except:
        citation['year'] = None


    if citation['pubtype'] == 'incollection':
        citation['pubtype'] = 'inbook'

    return citation
     

# INPUT: a string representing the authors of a citation delimited by the word
# 'and'
# OUTPUT: a list of author objects
def author_parse(authors):
    return_list = []
    unparsed_auth_list = authors.split('and')
    for author in unparsed_auth_list:
        split_author = author.split(',')
        lastname, firstname = split_author[0].strip(' '), split_author[1][1:]
        author_exists = Session.query(Author).filter(and_(Author.lastname.like(lastname), Author.firstname.like(firstname)))
       
        if author_exists.first():
            return_list.append(author_exists.first())
        else: 
            new_author = Author(firstname, lastname)
            Session.add(new_author)
            Session.commit()
            return_list.append(author_exists.first())    
   
    return return_list 

    

