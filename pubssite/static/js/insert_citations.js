$('#pasteSubmit').on('click', function() {
  var poc = '';
  var citations_raw = $(this).siblings('#pasteArea').val();
  var citations = citations_raw.split('\n');
  console.log(citations);
 
  $.each(citations, function (index, val) { 
    if (val != '') {
      val = val.trim();
      $.post('http://nupubs.cogs.indiana.edu/citation/parse', val)
      .done(function(data) {
        console.log("Parsed: " + data);
      });
    }
  });
});


