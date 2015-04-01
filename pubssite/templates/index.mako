<!DOCTYPE html>
<html>

<head>
  <meta charset="utf-8" content="Pubs Citations Tracking System">
  <title>Indiana University Publications Tracker</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Indiana University's Publications Tracker">
  <meta name="author" content="Patrick Craig, COGS Codeman">

  <!-- Bootstrap -->
  <link href="/static/css/bootstrap.min.css" rel="stylesheet" type="text/css" >
  <link href="/static/css/bootstrap-modal.css" rel="stylesheet" type="text/css">


   <!-- HTML5 shim, support pour le internet ancien -->
   <!-- [if lt IE 9]>
     <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
   <![endif]-->

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

  </style>
  <script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script type="text/javascript" src='/static/js/jquery.cookie.js'></script>  
  <script type="text/javascript" src="/static/js/mustache.js"></script>
  <script type="text/javascript" src="/static/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="/static/js/bootstrap-modalmanager.js"></script>
  <script type="text/javascript" src="/static/js/bootstrap-modal.js"></script>
  <script type="text/javascript" src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  <script type="text/javascript" src="/static/js/apa_templates.js"></script>
  <script type="text/javascript" src="/static/js/mla_templates.js"></script>
  <script type="text/javascript" src='/static/js/citations.js'></script>
  <script type="text/javascript" src='/static/js/edit_citations.js'></script>


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
         <li>Show collections belonging to: <select id="proxy-list"></select></li>
<!---
          <li><a class="dropdown-toggle" data-toggle="dropdown" href="#">Show collections belonging to: <b class="caret"></b></a>
              <ul id="proxy-list" class="dropdown-menu" role="menu" aria-labelledby="dLabel">
              </ul>
          </li> --> 
		  <li><a href="#">Sign out</a></li>
        </ul>    
      </div>  
    </div>
  </div>
  <!-- navbar end -->
  
  <div class="container-fluid" id="collections-content">
 
   <div class="main-view"> <!-- TODO: fix tab-content class -->
      <div class="tab-pane active" id="tab-all">


        <!-- COLLECTION HEADER -->
        <h2>My Citations</h2> 

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
          <a href="#pastePane" role="button" class="btn" data-toggle="modal">Paste citations</a>
          <a class="btn"><i class="icon-remove"></i></a>
        </div>
        </h2>
 
   </div>
    
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
  <div id="pastePane" class="modal container hide fade" tabindex="-1" role="dialog" aria-labelledby="pastePane" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button>
      <h4>Paste citations into the field below</h4>
    </div>
    <div class="modal-body">
      <textarea id="pasteArea" class="input-block-level" rows="20" autofocus>Paste your citations here.</textarea><br />
      <button id="pasteSubmit" class="btn">Submit</button>
    </div>
  </div>
  <div id="editPane" class="modal container hide fade" tabindex="-1" role="dialog" aria-labelledby="editPane" aria-hidden="true">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="icon-remove"></i></button>
      <h4>Editing [citation no. placeholder]</h4>
    </div>
    <div class="modal-body">
    <div class="row-fluid">
      
	    <div class="span6">  <!-- Authors, Title, Year --> 
          <p>Author Names (Lastname, Firstname)</p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <p><input type="text" class="span12"></p>
          <button class="btn" align="center">Add more authors <i class="icon-plus"></i></button><br />
          Title: <input type="text" id="title" class="field span12">
          Year: <input type="text" id="year" class="field span12">
        </div>  <!-- Authors, Title, Year --> 
		
        <div class="span6">  <!-- Raw...Note --> 
          <p>Raw text: <br />
          <textarea id="raw" class="field span12" rows="3"></textarea><br /> 
          Preview: [placeholder preview]</p>
          <p>Abstract:
          <textarea id="abstract" class="field span12" rows="3"></textarea>
           
          Keywords:
          <textarea id="keywords" class="field span12" rows="3"></textarea>
          </p>
          <p>doi:
          <input id="doi" class="field span12" type="text"><br />
          URL:
          <input id="url" class="field span12" type="text">
          Note:
          <input id="note" class="field span12" type="text">
          </p>
        </div>     <!-- Raw...Note -->        
       
            </div> <!-- row-fluid -->  
			
			<div class="row-fluid">   <!-- row-fluid -->    
		  <div class="span6" style="background-color:yellow">  <!-- Pubtype --> 
            Publication Type:
			<select id="pubtype" onchange="alert(4)" class="form-control">
            <option value="auth_string">Article</option>
            <option value="year">Book</option>
            <option value="year_desc">Edited Book</option>
            </select>
		  </div> <!-- Pubtype --> 
		  </div>  <!-- row-fluid -->  
		  
		  <div class="row-fluid">  <!-- row-fluid -->  
		  <div class="span3">  <!-- Journal, Vol, Num --> 
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
          </div> <!-- Journal, Vol, Num --> 
		  
		  
          <div class="span3">  <!-- Pages, Month --> 
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
          </div>  <!-- Pages, Month --> 
		  
      </div> <!-- row-fluid --> 

    </div>
    <div class="modal-footer">
      <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
      <button class="btn btn-primary">Save changes</button>
    </div>

  </div> 
    


   
    <script src="/static/js/citations.js"></script>
    <script src="/static/js/insert_citations.js"></script>
  </body>

</html>

