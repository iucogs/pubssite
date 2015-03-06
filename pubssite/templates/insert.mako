<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8">
  <title>Indiana University Publications Tracker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Indiana University's Publications Tracker">
  <meta name="author" content="Patrick Craig, COGS Codeman">


  <style type="text/css">
    body {
      padding-top: 60px;
      padding-bottom: 40px;
    }
    .sidebar-nav {
     padding: 9px 0;
    }
  </style>
  
  <!-- Bootstrap -->
  <link href="css/bootstrap.css" rel="stylesheet" >

   <!-- HTML5 shim, support pour le internet ancien -->
   <!-- [if lt IE 9]>
     <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
   <![endif]-->

</head>

<body>

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


  <div class="container">
    <h3>Adding to [collection name]</h3> 
    <textarea class="input-block-level" rows="20" autofocus>Paste your citations here.</textarea><br />
    <button id="pasteSubmit" class="btn">Submit</button>
  </div>


  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script src="/static/js/bootstrap.min.js"></script>


</body>

</html>

