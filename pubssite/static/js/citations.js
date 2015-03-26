var current_citations = {};
var current_collections = [];
// the templates are filled by the page_init function below and don't need to be
// tampered with
var templates = {};
var user = $.cookie("user");
var current_format = "apa";
var sort_order = "auth_string";
var proxies = [];

//TODO: Add support for Jr., II, etc
function render_mla_authors(authors_array) {
    // this first block takes the authors and puts them into standard MLA formatted strings.
    temp_auth_array = [];
    $.each(authors_array, function (index, author) {
        temp_auth = "";
        temp_auth = author.lastname + ", ";
        
        // checks for middle initial
        if (author.firstname.split(" ") > 1) 
            temp_auth += author.firstname.split(" ")[0] + " " + author.firstname.split(" ")[1].substring(0, 1) + ".";
        else
            temp_auth += author.firstname;
        
        temp_auth_array.push(temp_auth);
    });
    
    // this block renders the authors in correct MLA format and returns them.
    auth_string = "";
    
    if (temp_auth_array.length == 1) {
      return temp_auth_array[0];
    }
    $.each(temp_auth_array, function(index, author) {
       if (index == temp_auth_array.length-1)
           auth_string += "and " + author;
       else
           auth_string += author + ", ";
    });    
    return auth_string;
}

// only here temporarily
function render_apa_authors(authors_array) {
    
    // This block handles rendering authors names and returns 
    formatted_author_array = [];
    $.each(authors_array, function (index, author) {
        initials_array = [];
        temp_auth = "";
        
        if (author.firstname.split(" ").length > 1) 
            initials_array = author.firstname.split(" ");
        else 
            initials_array.push(author.firstname);
        
        if (index > 0) temp_auth += " ";
        
        temp_auth += author.lastname + ", ";
        
        $.each(initials_array, function (index, firstname) {
            temp_auth += firstname.substring(0, 1) + ". ";    
        });
        
        //remove trailing space
        temp_auth = temp_auth.slice(0, -1);
        
        formatted_author_array.push(temp_auth);
    });
    
    
    // This block handles the actual APA-defined layout for a given number of
    // authors.
    num_authors = formatted_author_array.length;

    if (num_authors > 3) {
      return formatted_author_array[0] + ", et al.";
    } else if (num_authors == 3) {
      return formatted_author_array[0] + ", " + formatted_author_array[1] + " & " + formatted_author_array[2];
    } else if (num_authors == 2) {
      return formatted_author_array[0] + ", " + formatted_author_array[1];
    } else {
      return formatted_author_array[0];
    }
}

function get_proxies() {
  // get proxies and set up the select list
  $.getJSON("http://nupubs.cogs.indiana.edu/proxies/" + user, function(data) {
    proxies = data;
  }).done(function(data) {
    proxies = data;
   // $("#proxy-list").val(user); 
    $.each(proxies, function(index, proxy) { 
      $("#proxy-list").append("<option value="+proxy.username+">" + proxy.fullname + "</option>");  
    });
    $("#proxy-list").on("change.switch_user", function() {
      populate_collections($(this).val(), true);
    });
    var current_user = $.grep(data, function (u) { return u.username === user });
    $('#proxy-list').val(current_user.fullname);

  });
}


// This function draws the collections/citations tables and populates the global
// variables current_citations, current_collections and templates. It is very
// important. Do try to return it in one piece, 007.
function page_init() { 
  // grab templates and stores them in global object templates. follow the path in the get
  // for the file containing the templates if they need to be changed.
  $.getScript("/static/js/apa_templates.js", function () {
    templates["apa"] = apa_templates; 
  });
  $.getScript("/static/js/mla_templates.js", function () { 
    templates["mla"] = mla_templates;
  });
  populate_collections(user, false);
  $('#collections-list').tab();
  get_proxies();
}

// this populates the collections tabs at the top of the page

// TODO: Ruth - sort citations by year, author, etc.  
function populate_collections(user, redraw) {
  
  $.getJSON("http://nupubs.cogs.indiana.edu/collection/owner/" + user, function(collections) {
   })
   .done(function(collections) {
    var collections_html = [];
    $.each(collections, function (index, collection) {
      current_collections.push(collection);
      if (index == 0) 
        collections_html.push('<li>' + "<a href='#" + collection.collection_id + "' data-toggle=\"tab\">" + collection.collection_name + ' <i class="icon-remove"></i></a></li><li class="dropdown"> <a href="#" class="dropdown-toggle" data-toggle="dropdown">Select another collection <b class="caret"></b></a><ul id="collections-select" class="dropdown-menu">');
      else
        collections_html.push('<li class><a href="#' + collection.collection_id + '" data-toggle="tab">' + collection.collection_name + ' <i class="icon-remove" style="display: none;"></i></a></li>');
    });
    collections_html.push('</ul></li>');
    if (redraw === false) $("#collections-content").append("<ul id=\"collections-list\" class=\"nav nav-tabs\" data-tabs=\"tabs\">" + collections_html.join("") +'</ul><div class="tab-content" id="citations-content"></div>' );
    else $("#collections-list").html(collections_html.join("")); 
    
    
    $("#collections-list li").first().addClass('active'); 
    $('#collections-list').tab();
  
    // add loading listeners
    $("#collections-list .dropdown ul li a").each(function (index) {
      var id = $(this).attr("href").substr(1, "href".length); 
      $(this).on("click.load_citations", function () {     
        get_collection_citations(id);
        $(this).off("click.load_citations");
      });
    }); 
    
    // preselect my representative pubs and draw its' citations
    var rep_pubs = $.grep(current_collections, function(e) {return e.collection_name.trim().toLowerCase() === "my representative publications" && e.owner === user});
    if (rep_pubs[0]) get_collection_citations(rep_pubs[0].collection_id);
    else get_collection_citations(current_collections[0]);
  
    // listeners for moving collections between dropdown and open tabs
    remove_collection_tab_onclick();
    add_collection_tab_onclick();
 
  });      
}

function add_collection_tab_onclick() {
//	alert('add onclick listener to element in dropdown list');
  $('#collections-select li a').click(function () { // formally in collection select list  // when click on a element
	  alert('doing onclick to move from dropdown to open tab');
    $(this).find(".icon-remove").show(); //
    var select_list = $('#collections-select').parent();
    $(this).parent().insertBefore(select_list);
    $(this).off('click'); 
 //   remove_collection_tab_onclick();
  });
}


function remove_collection_tab_onclick() {  // open tabs
  alert('add onclick listener to x in tab');
  $('#collections-list li a i.icon-remove').click(function () {   
	  alert('doing onclick to close tab -- and move to dropdown $(this): ' + $(this));
    var tab = $(this).parent().parent();
    tab.off('click'); 
    tab.removeClass("active");
    $(this).hide();
    $(this).parent().parent().prependTo("#collections-select");
  });
}


// populates current_citations for rendering by render_citations below
function get_citations(collections) { 
  $.each(collections, function (index, collection) {
    $.getJSON("http://nupubs.cogs.indiana.edu/collection/citations/" + collection.collection_id, function(data) {
      current_citations[collection.collection_id] = data; 
    });
  });
}

function get_collection_citations(collection_id) {
  $.getJSON("http://nupubs.cogs.indiana.edu/collection/citations/" + collection_id, function (data) {
    current_citations[collection_id] = data;
  })
  .done(function () { 
    render_citations(current_format);
  });
}


// TODO: refactor this into a function that renders one collection at at time
// and appends to the citations-content table instead of emptying it each time.

// this draws the citations table along with the option buttons on the side.
// Very dangerous to edit. You go first.
function render_citations(format) {
  // since render_citations can be called without an argument, we use this to
  // initially render the citations APA style
  if (format) {
    current_format = format;
  } else { 
    current_format = 'apa';
  }
  $("#citations-content").empty();
  var template = templates[current_format];
  var current_citation_list;

  $.each(current_citations, function(collection, citation_list) {
    if (citation_list) {
      current_citation_list = citation_list;
      citations = [];
      $.each(current_citation_list, function (index, citation) { 
        // copies the citation into a new object so we can preserve the original's
        // author array
        var temp_cit = $.extend({}, citation);
    
        if (current_format == 'apa' || format == '') {
          temp_cit.authors = render_apa_authors(temp_cit.authors);
        } else if (current_format == 'mla') { 
          temp_cit.authors = render_mla_authors(temp_cit.authors);
        }
  
      citations.push('<tr id=' + temp_cit.citation_id + '><td class="citation-actions"><input type="checkbox"></td>' +
                     '<td>' + Mustache.render(template[citation.pubtype], temp_cit) + '</td>' +
                     '<td class="citation actions"><i class="icon-share-alt"></i>' +
			          		 '<a href="#editPane" role="button" data-toggle="modal" onclick="populateEditPane(' + temp_cit.citation_id + ');"><i class="icon-pencil"></i></a>' +
                     '<i class="icon-download-alt"> </i><i class="icon-remove"></i></td></tr>');
      });
            
      table = '<div class="tab-pane" id="' + collection + '"><table class="table table-hover table-condensed table-striped citation"><tbody>' + 
               citations.join("") + "</tbody></table></div>";
      $('.tab-content').append(table);
      citations = [];
    } else { 
      table = '<div class="tab-pane" id="' + collection + '"><table class="table table-hover table-condensed table-striped"><tbody>' + 
               "This collection has no citations." + "</tbody></table></div>";
      $('.tab-content').append(table);
    }
  });
  // set the current tab's associated citations as active
  var id = $("#collections-list li.active").find("a").attr("href").substr(1, "href".length); 
  $(".tab-pane#" + id).addClass("active");
}

// need to sort and rethink citation and collection data structures before preceding.
function populateEditPane(citation_id) {
	alert(JSON.stringify(current_citations[629]));
}

function updateSortOrder(new_sort_order) {
	sort_order = new_sort_order;
	current_citations[629].sort(dynamicSort(new_sort_order));
	render_citations(new_sort_order);
}

function updateCurrentFormat(new_current_format) {
	current_format = new_current_format;
	render_citations(new_current_format);
}

function dynamicSort(property) {
   return function(a, b) {
       return (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
   }
}
