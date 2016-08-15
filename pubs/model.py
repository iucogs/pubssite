from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, Table
from sqlalchemy.orm import sessionmaker, relationship, scoped_session
from sqlalchemy.ext.declarative import declarative_base
import pubs.config

# Create the database engine from config file
url = pubs.config.get('sqlalchemy', 'url')
engine = create_engine(url, echo=False, pool_recycle=3600,
                       isolation_level="READ UNCOMMITTED")

# configure the declarative syntax base
Base = declarative_base()
Base.metadata.bind = engine

# configure the default Session
Session = scoped_session(sessionmaker(bind=engine))

# Author-related tables
author_of = Table('author_of', Base.metadata,
    Column('author_id', Integer, ForeignKey('authors.author_id')),
    Column('citation_id', Integer, ForeignKey('citations.citation_id')),
    Column('position_num', Integer))
editor_of = Table('editor_of', Base.metadata,
    Column('author_id', Integer, ForeignKey('authors.author_id')),
    Column('citation_id', Integer, ForeignKey('citations.citation_id')),
    Column('position_num', Integer))
translator_of = Table('translator_of', Base.metadata,
    Column('author_id', Integer, ForeignKey('authors.author_id')),
    Column('citation_id', Integer, ForeignKey('citations.citation_id')),
    Column('position_num', Integer))

class Author(Base):
    __tablename__ = 'authors'

    author_id = Column(Integer, primary_key=True)
    firstname = Column(String)
    lastname = Column(String)
    verified = Column(Boolean)
    gender = Column(String)

    def __init__(self, firstname, lastname, verified=False, gender=''):
        self.firstname = firstname
        self.lastname = lastname
        self.verified = verified
        self.gender = gender

    def __repr__(self):
        return u"<Author %d: %s %s>" %\
            (self.author_id, self.firstname, self.lastname)
    
    def __str__(self):
        return unicode(self).encode('utf-8')
    
    def __unicode__(self):
        return u"%s %s".format(self.firstname, self.lastname)

    # TODO: Refactor
    def toString(self):
        return self.lastname + ", " + self.firstname + ", "

    @property
    def json(self):
        return {'author_id' : self.author_id,
            'firstname' : self.firstname,
            'lastname' : self.lastname}



# Citation-related tables
#TODO: Change keys after schema is fixed
similar_to = Table('similar_to', Base.metadata,
    Column('id', Integer, primary_key=True),
    Column('citation_id1', Integer, ForeignKey('citations.citation_id')),
    Column('citation_id2', Integer, ForeignKey('citations.citation_id')),
    Column('lastname_ratio', Float),
    Column('year_ratio', Float),
    Column('title_ratio', Float))

class Citation(Base):
    __tablename__ = 'citations'
    __table_args__ = {'autoload' : True}

    # TODO: Fix bug so that owners are actually referenced by user_id
    #user_id = Column(Integer, ForeignKey('users.user_id'))
    citation_id = Column(Integer, primary_key=True, autoincrement=True)

    authors = relationship("Author", secondary=author_of, backref='citations') 
    translators = relationship("Author", secondary=translator_of,
        backref='translations')
    editors = relationship("Author", secondary=editor_of,
        backref='edited_volumes')

    possible_matches = relationship("Citation", secondary=similar_to,
        primaryjoin=citation_id==similar_to.c.citation_id1,
        secondaryjoin=citation_id==similar_to.c.citation_id2
        )

    def __init__(self, citation_dict=None):
        self.__dict__.update(citation_dict)


    def __repr__(self):
        return u"<Citation %d: %s (%s)>".format(
            self.citation_id, self.title, self.year)

    @property
    def json(self):
        attrs =\
            ['pubtype', 'abstract', 'keywords', 'doi', 'url', 'address',
             'booktitle', 'chapter', 'crossref', 'edition', 'howpublished',
             'institution', 'journal', 'bibtex_key', 'month', 'note', 'number',
             'organization', 'pages', 'publisher', 'location', 'school',
             'series', 'title', 'type', 'volume', 'year', 'raw', 'verified',
             'last_modified', 'entryTime', 'citation_id']
        struct = { 'authors' : [a.json for a in self.authors],
            'editors' : [e.json for e in self.editors],
            'translators' : [t.json for t in self.translators]}
        for attr in attrs:
            struct[attr] = getattr(self, attr, None)
        
        struct["auth_string"] = " ".join([a.toString() for a in self.authors]) 
        return struct



# Collection-related tables
member_of_collection = Table('member_of_collection', Base.metadata,
    Column('collection_id', Integer, ForeignKey('collections.collection_id')),
    Column('citation_id', Integer, ForeignKey('citations.citation_id'))
    )

section_of = Table('section_of', Base.metadata,
                   Column('citation_id', Integer, ForeignKey('citations.citation_id')),
                   Column('section_title', String),
                   Column('collection_id', Integer, ForeignKey('collections.collection_id')))

represent_pubs_of = Table('represent_pubs_of', Base.metadata,
                          Column('user_id', Integer, primary_key= True), 
                          Column('citation_id', Integer, ForeignKey('citations.citation_id'), primary_key= True))

class Collection(Base):
    __tablename__ = 'collections'
    __table_args__ = {'autoload' : True}
   
    collection_id = Column(Integer, primary_key=True)
    collection_name = Column(String)
    owner = Column(Integer)
    
    # TODO: Fix bug so that owners are actually referenced by user_id
    # user_id = Column(Integer, ForeignKey('users.id'))

    citations = relationship("Citation", secondary=member_of_collection,
        backref='collections')

    @property
    def json(self):
        attrs = ['owner', 'collection_id', 'collection_name']
        struct = {}
        for attr in attrs:
            struct[attr] = getattr(self, attr, None)
        return struct

    def __repr__(self):
        return u"<Collection %d: %s (%s)>".format(
            self.collection_id, self.collection_name, self.owner)



# User-related tables
# TODO: Add relations to Citations and Collections.

proxy_of = Table('proxy_of', Base.metadata,
    Column('authorid', Integer, ForeignKey('users.id'), primary_key=True),
    Column('proxyid', Integer, ForeignKey('users.id'), primary_key=True)
    )

deleted_citations= Table('deleted_citations', Base.metadata, 
                        Column('id', Integer, primary_key=True, autoincrement=True),
                        Column('author0ln', String),Column('author0fn', String),
                        Column('author1ln', String),Column('author1fn', String),
                        Column('author2ln', String),Column('author2fn', String),
                        Column('author3ln', String),Column('author3fn', String),
                        Column('author4ln', String),Column('author4fn', String),
                        Column('author5ln', String),Column('author5fn', String),
                        Column('citation_id', Integer),Column('user_id', Integer),
                        Column('pubtype', String),Column('cit_key', String),
                        Column('abstract', String),Column('keywords', String),
                        Column('doi', String),Column('url', String),
                        Column('address', String),Column('annote', String),
                        Column('author', String),Column('booktitle', String),
                        Column('chapter', String),Column('crossref', String),
                        Column('edition', String),Column('editor', String),
                        Column('translator', String),Column('howpublished', String),
                        Column('institution', String),Column('journal', String),
                        Column('bibtex_key', String),Column('month', String),
                        Column('note', String),Column('number', String),
                        Column('organization', String),Column('pages', String),
                        Column('publisher', String),Column('location', String),
                        Column('school', String),Column('series', String),
                        Column('title', String),Column('type', String),
                        Column('volume', String),Column('year', String),
                        Column('raw', String),Column('verified', Integer),
                        Column('format', String),Column('filename', String),
                        Column('submitter', String),Column('owner', String),
                        Column('entryTime', Float),Column('last_modified', Float),
                        Column('date_retrieved', String),Column('collections', String),
                        Column('similar_to', String),Column('reason', String),
                        Column('deleted_timestamp', Float))
class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String)
    lastname = Column(String)
    firstname = Column(String)
    admin = Column(Boolean)
    cogs = Column(Boolean)
    proxies = relationship("User", 
                           secondary=proxy_of,
                           primaryjoin=id==proxy_of.c.proxyid,
                           secondaryjoin=id==proxy_of.c.authorid)

    @property
    def json(self):
        attrs = ['id', 'username', 'lastname', 'firstname', 'admin', 'cogs']
        struct = {"proxies": [{"username": proxy.username, "fullname": proxy.firstname + " " + proxy.lastname} for proxy in self.proxies]}
        for attr in attrs:
            struct[attr] = getattr(self, attr, None)
        return struct

    def __repr__(self):
        return u"<User %d: %s>".format(self.id, self.username)

#TODO: Figure out what this line does
Session.close()
