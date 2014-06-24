var current_citations = {};
var current_collections = [];
var templates = {};
var current_format = "apa";

// only here temporarily
function render_apa_authors(authors_array) {
    
    // This block handles rendering authors names and returns 
    auth_string = "";
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

  // grab citations and collections
  $.getJSON("http://nupubs.cogs.indiana.edu/collection/owner/pjcraig", function(data) {
    populate_collections(data);
    get_citations(data); 
  });
  $('#collections-list').tab(); 
}

// this populates the collections tabs at the top of the page
// TODO: dropdown w/ all users' collections

function populate_collections(collections) {
  var collections_html = [];
    $.each(collections, function (i, item) {
    collections_html.push("<li>" + "<a href='#" + item.collection_id + "' data-toggle=\"tab\">" + item.collection_name + "</a></li>");
    current_collections.push(item);
  });
  $("#collections-content").append("<ul id=\"collections-list\" class=\"nav nav-tabs\" data-tabs=\"tabs\">" + collections_html.join("") +'</ul><div class="tab-content" id="citations-content"></div>' );
  $("#collections-list li").first().addClass('active'); 
  $('#collections-list').tab();
}

// populates current_citations for rendering by render_citations below
function get_citations(collections) { 
  $.each(collections, function (index, collection) {
    $.getJSON("http://nupubs.cogs.indiana.edu/collection/citations/" + collection.collection_id, function(data) {
      current_citations[collection.collection_id] = data; 
    });
  });
}

// this draws the citations table along with the option buttons on the side.
// Very dangerous to edit. You go first.
function render_citations(format) {
  var template = templates[current_format];
  var current_citation_list;

  $.each(current_citations, function(collection, citation_list) {
    current_citation_list = citation_list;
    citations = [];
    $.each(current_citation_list, function (index, citation) { 
      citation.authors = render_apa_authors(citation.authors); 
      citations.push('<tr id=' + citation.citation_id + '><td class="citation-actions"><input type="checkbox"></td>' +
                     '<td>' + Mustache.render(template[citation.pubtype], citation) + '</td>' +
                     '<td class="citation actions"><i class="icon-share-alt"></i>' +
                     '<i class="icon-download-alt"></i><i class="icon-pencil"></i><i class="icon-remove"></i></td></tr>');
    });
  table = '<div class="tab-pane" id="' + collection + '"><table class="table table-hover table-condensed table-striped"><tbody>' + 
           citations.join("") + "</tbody></table></div>";
  $('.tab-content').append(table);
  citations = [];
  });
}
