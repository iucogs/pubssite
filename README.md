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
   
<a name="collection_by_owner"></a>
**Retrieve a list of collections belonging to a given user**   
URL: `http://nupubs.cogs.indiana.edu/collection/owner/[owner]`   
Method: `GET`   
Input: A nupubs user. e.g.
   
`http://nupubs.cogs.indiana.edu/collection/owner/pjcraig`   
   
Output: A list of JSON-encoded collections   


## Installing Pubssite

### Installing MySQL Database
1.  Download and install [MySQL Community Server 5.5](https://dev.mysql.com/downloads/mysql/5.5.html):
    - **Debian/Ubuntu:** `sudo apt-get install mysql-server-5.5 libmysqlclient-dev` 
2.  Download a database mirror (contact [Jaimie](mailto:jammurdo@indiana.edu)).
3.  Import the database using the MySQL 5.5 Command Line Client (run `mysql` at a terminal or use the desktop shortcut):
    - `CREATE DATABASE pubs; USE pubs; source pubs.backup.sql`

### Installing `pubssite` Python Code
1.  Install the [Anaconda Python 2.7 Distribution](http://continuum.io/downloads).
2.  Open a terminal and run `git clone git@github.com:iucogs/pubssite.git`
3.  In the terminal run `cd pubssite` to access the folder.
4.  `python setup.py develop` will install the package and all dependencies.

### Configuring the `pubs.ini` File
1.  Open the repository folder.
2.  Copy `pubs.ini.template` to `pubs.ini`
3.  Edit the `pubs.ini` template file:
    -  Change the directive `url = ...` to `url = mysql://user:password@localhost:3306/pubs?charset=utf8&use_unicode=1`.
        -  **Note:** Replace `user` and `password` with your mysql username (*i.e.*, `root`) and password.

### Installing Ruby and `anystyle` parser:
1.  Install Ruby:
    -  **Windows:** [RubyInstaller](http://rubyinstaller.org/downloads/)
    -  **Ubuntu/Debian:** `sudo apt-get install ruby-dev`
2.  Install anystyle from terminal: `gem install --user-install anystyle-parser`

## Launching the API
From the repository directory, run `pserve development.ini`.


Getting Started
---------------

- cd <directory containing this file>

- $venv/bin/pip install --editable .

- gem install --user-install anystyle-parser

- $venv/bin/populate_pubssite development.ini

- $venv/bin/pserve development.ini

