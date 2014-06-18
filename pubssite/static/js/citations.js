var current_citations = {};
var current_collections = [];
var templates = {};
var current_format = "apa";

function page_init() { 
  // grab templates
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


function get_citations(collections) { 
  $.each(collections, function (index, collection) {
    $.getJSON("http://nupubs.cogs.indiana.edu/collection/citations/" + collection.collection_id, function(data) {
      current_citations[collection.collection_id] = data; 
    });
  });
}

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
