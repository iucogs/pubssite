<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Indiana University Publications Tracker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Indiana University's Publications Tracker">
  <meta name="author" content="Patrick Craig, COGS Codeman">

  <!-- Bootstrap -->
  <link href="/static/css/bootstrap.css" rel="stylesheet" >
  <link href="/static/css/bootstrap-modal.css" rel="stylesheet" >


   <!-- HTML5 shim, support pour le internet ancien -->
   <!-- [if lt IE 9]>
     <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
   <![endif]-->

  <style type="text/css">
    body {
      padding-top: 60px;
      padding-bottom: 40px;
    }
    .sidebar-nav {
     padding: 9px 0;
    }
    td.citation-actions {
      white-space: nowrap;
      text-align: right; 
      vertical-align: middle;
    }
  </style>
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script src="/static/js/mustache.js"></script>
  <script src="/static/js/bootstrap.min.js"></script>
  <script src="/static/js/bootstrap-modalmanager.js"></script>
  <script src="/static/js/bootstrap-modal.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  <script src="/static/js/apa_templates.js"></script>
  <script src="/static/js/mla_templates.js"></script>
  <script src='/static/js/citations.js'></script>

 

</head>

<body>
  <!-- navbar begin -->
  <div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
      <div class="container">
        <ul class="nav"> 
          <li><a class="brand" href="#">Publications</a></li>
          <li><a href="#" class="pull-left"><i class="icon-home"></i></a></li>
        </ul>
        <form class="navbar-search pull-left">
          <input type="text" class="search-query" placeholder="Search Publications!">
        </form>
        
        <ul class="nav pull-right">
          <li><a class="dropdown-toggle" data-toggle="dropdown" href="#">Signed in as [placeholder] <b class="caret"></b></a>
              <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                <li><a href="#">My Account</a></li>
                <li><a href="#">Sign out</a></li>
              </ul>
          </li>    
        </ul>    
      </div>  
    </div>
  </div>
  <!-- navbar end -->
  <div class="container">
    <div class="main-view">
      <div class="hero-unit" style="text-align:center;">
        <h1>Welcome to Pubs!</h1>
        <br />
        <p>This is the Indiana University Cognitive Science Program's citations tracker. Please sign in below.</p>
        <br />
        <p><a href="https://cas.iu.edu/cas/login?cassvc=IU&casurl=http://nupubs.cogs.indiana.edu/login" class="btn btn-primary btn-large">Sign in here</a></p> 
      </div>
    </div>  
  </div>

</body>
</html>
