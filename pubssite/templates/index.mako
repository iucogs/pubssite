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
  <div class="container" id="collections-content">
 
   
   <!-- <ul class="nav nav-tabs">
      <li class="active"><a href="#tab-all" data-toggle="tab"><i class="icon-home"></i> My Citations</a></li>
      <li><a href="#tab-unverified" data-toggle="tab">My Unreviewed Citations</a></li>
      <li><a href="#tab3" data-toggle="tab">JCDL 2013</a></li>
      <li><a href="#tab4" data-toggle="tab"><em><i class="icon-user"></i> SEP</em> : Artificial Intelligence</a></li>
      <li><a href="#tab-new" data-toggle="tab"><i class="icon-plus"></i></a></li>
    </ul>

    -->
    <div class=""> <!-- TODO: fix tab-content class -->
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
  
       


        <table id="citations-table" class="table table-hover table-condensed table-striped">
<!--          <tbody>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
                Vigo, R. &amp; Allen, C. F. (2009). How to Reason Without Words: Inference as Categorization. Cognitive Processing, 10(1), 77-88. Retrieved from: http://www.springerlink.com/content/n542807222025413/. doi: 10.1007/s10339-008-0220-4
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
Wallach, W. &amp; Allen, C. (2009). Moral Machines: Teaching Robots Right from Wrong. Oxford: Oxford University Press. Retrieved from: http://www.oup.com/us/catalog/general/subject/Philosophy/EthicsMoralPhilosophy/AppliedEthics/?view=usa&ci=9780199737970. 
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
Allen, C. &amp; Bekoff, M. (1997). Species of mind. Cambridge, MA: MIT Press.
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
Allen, C. (2006). Transitive inference in animals: Reasoning or conditioned associations? In S. Hurley &amp; M. Nudds (Eds.) Rational Animals?. 175-185. Oxford: Oxford University Press.
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
Allen, C. (2004). Is Anyone a Cognitive Ethologist? Biology &amp; Philosophy, 19(4), 589-607. doi: 10.1007/sBIPH-004-0527-1
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
Allen, C. F. (2004). Animal Pain. Noûs, 38(4), 617-643. doi: 10.1111/j.0029-4624.2004.00486.x
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
Bekoff, M., Allen, C. &amp; Burghardt, G. (Eds.) (2002). The Cognitive Animal. Cambridge, MA: MIT Press.
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
Allen, C., Varner, G. &amp; Zinser, J. (2000). Prolegomena to any future artificial moral agent. Journal of Experimental and Theoretical Artificial Intelligence, 12, 251-261. doi: 10.1080/09528130050111428
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
Allen, C., Bekoff, M. &amp; Lauder, G. (Eds.) (1998). Nature's Purposes: analyses of function and design in biology. Cambridge, MA: MIT Press.
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
Cummins, D. &amp; Allen, C. (Eds.) (1998). The Evolution of Mind. New York: Oxford University Press.
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
            <tr>
              <td class="citation-actions"><input type="checkbox" /></td>
              <td>
Theiner, G., Allen, C. &amp; Goldstone, R. L. (2010). Recognizing group cognition. Cognitive Systems Research, 11, 378-395. doi: 10.1016/j.cogsys.2010.07.002
              </td>
              <td class="citation-actions"><i class="icon-share-alt"></i>
                  <i class="icon-download-alt"></i>
                  <i class="icon-pencil"></i>
                  <i class="icon-remove"></i></td>
            </tr>
          </tbody> --->

        </table>      
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


   
  <script src="http://code.jquery.com/jquery-latest.min.js"></script>
  <script src="/static/js/bootstrap.min.js"></script>
  <script src="/static/js/bootstrap-modalmanager.js"></script>
  <script src="/static/js/bootstrap-modal.js"></script>
  <script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
  <script src="/static/js/citations.js"></script>
  <script>

    $(document).ready(function () {
      $.getScript("/static/js/citations.js", function () {
        populate_collections();

        $('#collections-list a:first').tab('show')

        });
      });

    

    $("#citations-table").sortable({ items: "tr" });
    
  /*  var pubs = pubs | {};
    pubs.citation_url = function(id) {
      return 'http://pubs2.cogs.indiana.edu/citation?IDs=' + id;
      }

    var printRow = function(data, elt) {
    }
    $.getJSON('http://pubs2.cogs.indiana.edu/collection?IDs=444', function(data) {
        $.each(data.citation_ids, function(i, id) {
           $.getJSON(pubs.citation_url(id), printRow);
          });
      });
    */

  </script>
</body>

</html>

