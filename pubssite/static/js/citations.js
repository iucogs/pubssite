populate_collections = function() {

  $.getJSON("http://nupubs.cogs.indiana.edu/collection/owner/pjcraig", function(data) {
  var collections = [];
  $.each(data, function (i, item) {
    collections.push("<li id ='" + item.collection_id +"'>" + "<a href='#" + item.collection_id + "' data-toggle=\"tab\">" + item.collection_name + "</a></li>");
    });
  console.log(data);
  console.log(collections); 
  $("#collections-content").append("<ul id=\"collections-list\" class=\"nav nav-tabs\" data-tabs=\"tabs\">" + collections.join("") +"</ul>");
  populate_citations_table(data); 
  }); 

};


// TODO: This is n2. parse the coll ids into a hash for citation lookup-- should
// take it back down to n. also maybe use detach so the citations are cached.
populate_citations_table = function (collections) {
  var citations = [];
  console.log(collections); 
  $.each(collections, function (index, collection) {
   $.getJSON("http://nupubs.cogs.indiana.edu/collection/citations/" + collection.collection_id, function(data) {
    alert("loading the citations...");
    citations.push("<div class=\"tab-pane\">< id=\"#" + collection.collection_id + "\">" +
    
                   "<tr id='" + item.citation_id + "'><td class = \"citation-actions\"><input type=\"checkbox\" /></td>" + 
                   "<td>" + item.title + "</td>" + 
                   "<td class=\"citation actions\"> <i class=\"icon-share-alt\"></i> <i class=\"icon-download-alt\"></i> <i class=\"icon-pencil\"></i> <i class=\"icon-remove\"></i></td></tr></div>");

    console.log(collections); 
    $(document).append("<div class=\"tab-content\">" + citations.join("") + "</div>")

    
    });

  
   
    
    
    });
  };
