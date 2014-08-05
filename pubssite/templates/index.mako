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
    <script>

    $(document).ready(function () {
      $.getScript("/static/js/citations.js", function () {
        page_init();
      });
    });
    $('#collections-list').tab();
  
    $(document).on('ajaxStop', function () { 
      render_citations();
      //$("#citations-table").sortable({ items: "tr" });
      $("table.citation").sortable({items: "tr"});
    
    });
  </script>
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
  
  <div class="container" id="collections-content">
 
   <div class="main-view"> <!-- TODO: fix tab-content class -->
      <div class="tab-pane active" id="tab-all">


        <!-- COLLECTION HEADER -->
        <h2>My Citations 

        <div class="btn-toolbar pull-right">
          <div class="btn-group">
          <div class="btn-group dropdown">
            <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"><i class="icon-share-alt"></i></a>
            <ul class="dropdown-menu">
              <li><a href="#">Link</a></li>
            </ul>
          </div>
          <div class="btn-group dropdown">
            <a class="btn dropdown-toggle" data-toggle="dropdown" href="#"><i class="icon-download-alt"></i></a>
            <ul class="dropdown-menu">
              <li><a href="#">BibTeX</a></li>
              <li><a href="#">EndNote</a></li>
              <li><a href="#">APA Plaintext</a></li>
              <li><a href="#">MLA Plaintext</a></li>
            </ul>
          </div>
          <a href="#editPane" role="button" class="btn" data-toggle="modal"><i class="icon-pencil"></i></a>
          <a class="btn"><i class="icon-remove"></i></a>
        </div>
        </h2>
 
   </div>
    
        <!-- CITATIONS -->
<!---
        <div class="dropdown" align="left">
          Display format:     
          <a class="dropdown-toggle" id="dLabel" role="button" data-toggle="dropdown" data-target="#">APA <i class="icon-caret-alt"></i> </a> 
            <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
              <li>APA <b class="icon-ok"></b></li>
              <li>MLA</li>
              <li>EndNote</li>
              <li>Bibtex</li>
            </ul>
        </div>
  --->

        <div align="left">
          Display format:
          <select id="format-control" onchange="render_citations(this.value)">
            <option value="apa">APA</option>
            <option value="mla">MLA</option>
            <option value="bibtex">Bibtex</option>
            <option value="endnote">Endnote</option>
          </select>
        </div>

        </div>
    </div> <!-- tab-content -->
  </div>


  <!-- Modal edit pane --> 
  <div id="editPane" class="modal container hide fade" tabindex="-1" role="dialog" aria-labelledby="editPane" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button>
      <h4>Editing [citation no. placeholder]</h4>
    </div>
    <div class="modal-body">
      <div class="row-fluid">
        
        <div class="span6">
          <p>Author Names (Lastname, Firstname)</p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <button class="btn" align="center">Add more authors <i class="icon-plus"></i></button><br />
          Title: <input type="text" class="field span12">
          Year: <input type="text" class="field span12">
        </div>
        <div class="span6">
          <p>Raw text: <br />
          <textarea class="field span12" rows="3"></textarea><br /> 
          Preview: [placeholder preview]</p>
          <p>Abstract:
          <textarea class="field span12" rows="3"></textarea>
           
          Keywords:
          <textarea class="field span12" rows="3"></textarea>
          </p>
          <p>doi:
          <input class="field span12" type="text"><br />
          URL:
          <input class="field span12" type="text">
          Note:
          <input class="field span12" type="text">
          </p>
        </div>           
       
        
        <div class="row-fluid">
          <div class="span3">
            Publication type:
              <a class="dropdown-toggle" id="dLabel" role="button" data-toggle="dropdown" data-target="#">Article <i class="icon-caret"></i> </a> 
              <ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">
                <li>&nbsp;Article <b class="icon-ok"></b></li>
                <li>&nbsp;Book </li>
                <li>&nbsp;Edited Book</li>
                <li>&nbsp;Conference </li>
                <li>&nbsp;In Book</li>
                <li>&nbsp;In Proceedings</li>
                <li>&nbsp;Proceedings</li>
              </ul><br />
              <form class="form-inline">
                <div class="control-group">
                  <label class="control-label" for="journal">Journal: </label>
                  <div class="controls"><input type="text" id="journal"></div>
                </div>
                
                <div class="control-group">
                  <label class="control-label" for="volume">Volume: </label>
                  <div class="controls"><input type="text" id="volume"></div>
                </div>
                
                <div class="control-group">
                  <label class="control-label" for="number">Number: </label>
                  <div class="controls"><input type="text" id="number"></div>
                </div>      
              </form>
          </div>
          <div class="span3">
            <br /> 
            <form class="form-inline">  
                <div class="control-group">
                  <label class="control-label" for="pages">Pages: </label>
                  <div class="controls"><input type="text" id="pages"></div>
                </div>
                
                <div class="control-group">
                  <label class="control-label" for="month">Month: </label>
                  <div class="controls"><input type="text" id="month"></div>
                </div> 
            </form>
          </div>
        </div>

      </div> 

    </div>
    <div class="modal-footer">
      <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
      <button class="btn btn-primary">Save changes</button>
    </div>
  </div>


   
    <script src="/static/js/citations.js"></script>

  </body>

</html>

