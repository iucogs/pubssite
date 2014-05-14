$(document).ready(function () {
  $.getScript("/static/js/citations.js", function () {
    alert("Loaded citations.js ... GO!!!!!");
    populate_collections();    
    
    }); 
  });

/*
$.getScript("/static/mustache_test.js", function() { 
  alert("Loaded mustache test"); });

$.getScript("/static/citation_test.js", function() { 
  alert("Loaded citation test"); });
*/
