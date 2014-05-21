var current_citations = {};

function page_init() { 
  $.getJSON("http://nupubs.cogs.indiana.edu/collection/owner/pjcraig", function(data) {
  populate_collections(data);
  populate_citations_table(data);
  $('#collections-list').tab(); 
  });
}

function populate_collections(collections) {
  var collections_html = [];
  console.log("yeah");
  $.each(collections, function (i, item) {
    collections_html.push("<li>" + "<a href='#" + item.collection_id + "' data-toggle=\"tab\">" + item.collection_name + "</a></li>");
    //id ='" + item.collection_id +"'
    });
  $("#collections-content").append("<ul id=\"collections-list\" class=\"nav nav-tabs\" data-tabs=\"tabs\">" + collections_html.join("") +'</ul><div class="tab-content" id="citations-content"></div>' );
  $("#collections-list li").first().addClass('active'); 
  $('#collections-list').tab();
}


// TODO: This is n2. parse the coll ids into a hash for citation lookup-- should
// take it back down to n. also maybe use detach so the citations are cached.
function populate_citations_table(collections) { 
  $.each(collections, function (index, collection) {
    var citations = [];
    $.getJSON("http://nupubs.cogs.indiana.edu/collection/citations/" + collection.collection_id, function(data) {
      $.each(data, function(index, citation) {
        citations.push('<tr id=' + citation.citation_id + '><td class="citation-actions"><input type="checkbox"></td>' +
                       '<td>' + citation.title + '</td>' +
                       '<td class="citation actions"><i class="icon-share-alt"></i>' +
                       '<i class="icon-download-alt"></i><i class="icon-pencil"></i><i class="icon-remove"></i></td></tr>');
      });
    table = '<div class="tab-pane" id="' + collection.collection_id + '"><table class="table table-hover table-condensed table-striped"><tbody>' + 
             citations.join("") + "</tbody></table></div>";
    current_citations[collection.collection_id] = data;
    $('.tab-content').append(table);
    });
  }); 
}
