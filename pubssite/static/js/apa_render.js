
function render_apa_authors(authors_array) {
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
        
        formatted_author_array.push(temp_auth);
    });
    console.log(formatted_author_array);
}
