render_test = function() {
  $(document.body).append('<div id =\"user\">hello here is some citation <br /></div>');
  
  var person = {
    "title" : "Herr Doktor Professor", 
    "firstname": "Don",
    "lastname": "Johnson"
   };
  

  console.log(person);
  var template = '<h1>Greetings, {{title}} {{firstname}} {{lastname}}</h1>';
  console.log(template);
  var user = Mustache.render(template, person);
  console.log(user);
  $('#user').append(user);
  $(document.body).append(Mustache.render("{{title}} {{lastname}}", {title: "Doctor", lastname: "Craig"})); 

  };
