function paste_init() {
  $.each(current_collections, function(index, collection){
    $('#addCollectionsList').append("<option value=" + collection.collection_id + ">" +
                                    collection.collection_name + "</option>");
  });
  paste_open_onclick();
  paste_submit_onclick();
}

// substring STUPIDITY!!!!!!!!!!!!!
function paste_open_onclick() {
  $('#pasteButton').on('click', function() {
    var collection = $("#collections-list li.active a").attr('href').replace('#', '');
    $("#addCollectionsList").val(collection);
  });
}

// TODO: Let's refactor this hacky count garbage into a nice future/promise
// thing.
function paste_submit_onclick() {
  $('#pasteSubmit').on('click', function() {
    var citations_raw = $(this).siblings('#pasteArea').val();
    var citations = citations_raw.split('\n');
    var collection = $("#addCollectionsList").val();     
    citations = $.grep(citations, function (c) {return c != ''; });
    var count = citations.length;
    console.log(citations); 

    $.each(citations, function (index, val) { 
      val = val.trim();
      $.post('http://nupubs.cogs.indiana.edu/citation/parse', val)
      .done(function(parsed_citation) {
        parsed_citation = $.parseJSON(parsed_citation);
        if (parsed_citation.citation_id) { 
          $.put('http://nupubs.cogs.indiana.edu/collection/' + collection + "/" + parsed_citation.citation_id)
          .done (function(collection_citations) {
            collection_citations = $.parseJSON(collection_citations);
            current_citations[collection] = collection_citations;
            if (!--count) render_citations();
          });
        }
        $("#pasteArea").val('');
      });
    });
    $('#pastePane').modal('toggle');

    alert("Your citations have been added to " + $("#addCollectionsList").find(":selected").text() + "."); 
  });
}

