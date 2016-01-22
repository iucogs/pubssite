pubssite README
==================

## API documentation

**Note: This version is in development and this README is intended as a
reference for project contributors**

#### Citation functions

* [Add/parse a citation](#citation_parse)
* [Retrieve one or more citations by their IDs](#citation_by_id)
* [Retrieve citations by their owner](#citation_by_owner)
* [Retrieve citations by their collection](#citation_by_collection)

#### Collection functions
   
* [Retrieve a collection by its ID](#collection_by_id)
* [Retrieve collections by their owner](#collection_by_owner)

<a name="citation_parse"></a>
**Parse a citation**   
URL: `http://nupubs.cogs.indiana.edu/citation/parse`   
Method: `POST`   
Input: A plaintext string in the body of the request   
Output: A JSON object representing the newly created citation   
Notes: Our project currently is using the excellent   
[Anystyle](http://anystyle.io) parser. We're still training it and working to
improve its accuracy.
   
<!--- <a name="citation_update"></a>
**Update a citation**   
URL: `http://nupubs.cogs.indiana.edu/citation/`   
Method: `PUT`   
Input: An updated JSON encoded citation in the JSON body of the request
Output: JSON reflecting the changes made by the update   
   -->
<a name="citation_by_id"></a>
**Retrieve one or more citations by their IDs**   
URL: `http://nupubs.cogs.indiana.edu/citation/[IDs]   
Method: `GET`   
Input: A citation ID or a list of citation IDs delimited by commas. e.g.   
   
`http://nupubs.cogs.indiana.edu/citation/456`   
`http://nupubs.cogs.indiana.edu/citation/456,452,4204`   
   
Output: A single JSON-encoded citation or a list of JSON-encoded citations   
   
<a name="citation_by_owner"></a>
**Retrieve a list of citations belonging to a given user**   
URL: `http://nupubs.cogs.indiana.edu/citation/owner/[owner]`   
Method: `GET`   
Input: String representing a nupubs user. e.g.   
   
`http://nupubs.cogs.indiana.edu/citation/owner/pjcraig`   
   
Output: A list containing JSON-encoded citations belonging to the nupubs user   
   
<a name="citation_by_collection"></a>   
**Retrieve a list of citations belonging to a given collection**   
URL: `http://nupubs.cogs.indiana.edu/collection/citations/[collection ID]`   
Method: `GET`   
Input: A collection's ID. e.g.   
   
`http://nupubs.cogs.indiana.edu/collection/citations/345`   
   
Output: A JSON-encoded representation of the collection   
   
<a name="collection_by_id"></a>
**Retrieve a collection by its collection id**   
URL: `http://nupubs.cogs.indiana.edu/collection/[collection ID]`   
Method: `GET`   
Input: A collection's ID. e.g.   
   
`http://nupubs.cogs.indiana.edu/collection/345`   
   
Output: A JSON-encoded representation of the collection   
   
<a name="collection_by_owner></a>
**Retrieve a list of collections belonging to a given user**   
URL: `http://nupubs.cogs.indiana.edu/collection/owner/[owner]`   
Method: `GET`   
Input: A nupubs user. e.g.
   
`http://nupubs.cogs.indiana.edu/collection/owner/pjcraig`   
   
Output: A list of JSON-encoded collections   


Getting Started
---------------

- cd <directory containing this file>

- $venv/bin/pip install --editable .

- gem install --user-install anystyle-parser

- $venv/bin/populate_pubssite development.ini

- $venv/bin/pserve development.ini

