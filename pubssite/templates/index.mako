<%namespace file="collections_add.mako" import="*" />
<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" content="Pubs Citations Tracking System">
  <title>Indiana University Publications Tracker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Indiana University's Publications Tracker">
  <meta name="author" content="Patrick Craig, COGS Codeman">

  <!-- Bootstrap -->
   <!-- HTML5 shim, support pour le internet ancien -->
   <!-- [if lt IE 9]>
     <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
   <![endif]-->

  <!-- jQuery -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
  <script type="text/javascript" src='/static/js/jquery.cookie.js'></script>  
  <script src="/static/js/jquery.validate.js"></script>
  <script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>

  <!-- Bootstrap -->
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<!--  <script type="text/javascript" src="/static/js/bootstrap-modalmanager.js"></script> -->
<!--  <script type="text/javascript" src="/static/js/bootstrap-modal.js"></script>-->

  <!-- Mustache -->
  <script src="/static/js/mustache.js"></script>

  <!-- Pubs -->
  <script type="text/javascript" src='/static/js/edit.js'></script>
  <script type="text/javascript" src="/static/js/citations.js"></script>
  <script type="text/javascript" src='/static/js/insert_citations.js'></script>
  <script type="text/javascript" src='/static/js/collections.js'></script>



  <!-- Stylesheets -->
  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
  <!--<link rel="stylesheet" href="/static/css/reset.css">-->
	<link rel="stylesheet" href="/static/css/style.css">

  <style type="text/css">
    body {
      padding-left: 12.5%;
      padding-right: 12.5%;
      padding-top: 60px;
      padding-bottom: 40px;
    }
    .sidebar-nav {
     padding: 12.5%;
    }
    td.citation-actions {
      white-space: nowrap;
      text-align: right; 
      vertical-align: middle;
    }
    #navbar {
      padding-left: 12.5%;
      padding-right: 12.5%;
    }

  </style>


</head>

<body>
    <script>

    $(document).ready(function () {
      $.getScript("/static/js/citations.js", function () {
        page_init();
      });
    });
    $('#collections-list').tab();
  
    $(document).one('ajaxStop', function () { 
      render_citations();
      paste_init();
    });
  </script>
<!-- navbar begin --> 
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <ul class="nav navbar-nav">
        <li><a class="navbar-brand" href="#">Publications</a></li>
        <li><a href="#" class="glyphicon glyphicon-home"></a></li>
      </ul>
    </div>

    <form class="navbar-form navbar-left" role="search">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Search Publications">
      </div>
    </form>

    <form class="navbar-form navbar-right">
      <div class="form-group">
        <span>Show Publications of</span>
        <select class="form-control">
          <option>Colin Allen</option>
          <option>Peter Todd</option>
          <option>Ruth Eberle</option>
          <option>Jaimie Murdock</option>
          <option>James Townsend</option>
        </select>
      </div>
      <a class="btn btn-default" href="#">Sign out</a>
    </form>
  </div>
</nav>
  <!-- navbar end -->

<div class="container-fluid" id="collections-content">
  <h2>My Citations</h2>
  <div class="row">
  <div class="col-md-4">
    <div class="form-inline form-group">
      <label for="sel1">Display Format</label>
      <select class="form-control" id="sel1">
        <option value="apa">APA</option>
        <option value="mla">MLA</option>
        <option value="bibtex">Bibtex</option>
        <option value="endnote">Endnote</option>
      </select>
    </div>
  </div>
  <div class="col-md-offset-4 col-md-4">
    <div class="btn-group" role="group">
      <div class="btn-group dropdown">
        <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"><i class="glyphicon glyphicon-share-alt"></i></a>
        <ul class="dropdown-menu">
          <li><a href="#">Link</a></li>
        </ul>
      </div>
      <div class="btn-group dropdown">
        <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"><i class="glyphicon glyphicon-download-alt"></i></a>
        <ul class="dropdown-menu">
          <li><a href="#">BibTeX</a></li>
          <li><a href="#">EndNote</a></li>
          <li><a href="#">APA Plaintext</a></li>
          <li><a href="#">MLA Plaintext</a></li>
        </ul>
      </div>
      <a href="#editPane" role="button" class="btn" data-toggle="modal"><i class="glyphicon glyphicon-pencil"></i></a>
      <a class="btn"><i class="glyphicon glyphicon-remove"></i></a>
    </div>
    <a href="#pastePane" id="pasteButton" role="button" class="btn dropdown" data-toggle="modal">Add citations</a>
  </div>
  </div>
</div>

<div class="col-md-4">
    ${add_to_collection_control()}
</div>
  
<!-- Modal edit pane --> 
  <div id="pastePane" class="modal" tabindex="-1" role="dialog" aria-labelledby="pastePane" aria-hidden="true">
    <div id="pasteHeader" class="modal-header">
      <p>&nbsp;<button type="button" class="close pull-right" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button></p>
      <div class="pull-right"><p>Add citations to: <select id="addCollectionsList"></select></p></div>
      <h4><p>Paste citations into the field below</p></h4>
    </div>
    <div class="modal-body">
      <textarea id="pasteArea" class="input-block-level" rows="20" autofocus>Paste your citations here.</textarea><br />
      <button id="pasteSubmit" class="btn">Submit</button>
    </div>
  </div>

  <div id="editPane" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="editPane" aria-hidden="true">
    <div class ="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">
        <%include file="edit.mako" />
        </div>
      </div>
    </div>
  </div> 

  ${collection_modals()}

  ${collection_templates()}
  </body>

</html>

