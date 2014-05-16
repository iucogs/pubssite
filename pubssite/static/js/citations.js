populate_collections = function() {

  $.getJSON("http://nupubs.cogs.indiana.edu/collection/owner/pjcraig", function(data) {
  var collections = [];
  $.each(data, function (i, item) {
    collections.push("<li id ='" + item.collection_id +"'>" + "<a href='#" + item.collection_id + "' data-toggle=\"tab\">" + item.collection_name + "</a></li>");
    });
  console.log(data);
  console.log(collections); 
  $("#collections-content").append("<ul id=\"collections-list\" class=\"nav nav-tabs\" data-toggle=\"tab\">" + collections.join("") +"</ul>");
  $("#collections-list").first().addClass('active');
  populate_citations_table(data); 
  }); 

};


// TODO: This is n2. parse the coll ids into a hash for citation lookup-- should
// take it back down to n. also maybe use detach so the citations are cached.
populate_citations_table = function (collections) {
  var citations = [];
  var tables = [];
  console.log(collections); 
  $.each(collections, function (index, collection) {
   $.getJSON("http://nupubs.cogs.indiana.edu/collection/citations/" + collection.collection_id, function(data) {
     $.each(data, function(index, citation) {
    citations.push('<tr id=' + citation.citation_id + '><td class="citation-actions"><input time="checkbox"></td>' +
                   '<td>' + citation.title + '</td></tr>');
    });
    var table = '<div class="tab-pane" id=#' + collection.collection_id + '><table><tbody>' + 
                citations.join("") + "</tbody></table></div>";
    tables.push(table);
    //console.log("Table: " + table);
    $('#citations-content').append(table);
     });
    });
    $('#collections-content').append('<div class="tab-content">' + tables.join("") + '</div>');
  };
