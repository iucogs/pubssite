var currentData = {};
var globalConstants = {};
var templates = {};


/**
TODO: Done Write a validation which doesnt let the user submit without a first name and last name
**/

function populateEditPane(citation_id) {
  setValidationSettings();

  $.getJSON('/citation/' + citation_id, function (data) {
    currentData = data;
    // Setting global constants
    globalConstants.citation_id = data.citation_id;
    globalConstants.entryTime = data.entryTime;
    globalConstants.bibtex_key = data.bibtex_key;
    globalConstants.crossref = data.crossref;
    globalConstants.isPreview = true

    // Displaying the dynamic template
    render(data, "#dataTemplate", "#wholeTemplateContainer");

    // Displaying the APA formatted template

    $.getScript("/static/js/apa_templates.js", function () {
      templates = apa_templates; 
      var temp_citation = $.extend({}, data);
      temp_citation.authors = render_apa_authors(temp_citation.authors);
      $("#preview-rawtext").html(Mustache.render(templates[data.pubtype], temp_citation));
    
    addClickActions(citation_id);
   });

    // Setting the publicationType
    var pubType = data.pubtype.toLowerCase();
    $("#pubtype option[value="+pubType+"]").attr("selected", true);

    renderDynamicTemplate(data, pubType);

    // Setting the month
    var publicationMonth = data.month.toLowerCase();
    if(data.month.toLowerCase() == "") {
      $('#month option[value="----"]').attr('selected',true);
    } else {
      $('#month option[value='+publicationMonth+']').attr('selected',true);
    }

  });
}
/**
Table Methods start
**/
function addClickActions(citation_id) {
  /**
  - Add a row to the table
  **/
  $('#add').click(function (){
    var tableRow = `
    <tr class="contributors">
    <td>
    <label class="checkbox-label">
    <div class="radio">
    <input type="radio" name="optradio" class="table-radio">
    </div>
    </label>
    </td>
    <td>
    <div class="form-group">
    <select class="form-control input-sm contributor-select">
    <option value="author">Author</option>
    <option value="editor">Editor</option>
    <option value="translator">Translator</option>
    </select>
    </div>
    </td>
    <td>
    <div class="form-group">
    <input class="form-control input-sm name" type="text" name ="ContributorName">
    </div>
    </td>
    </tr>
    `
    $('#contributors-table > tbody:last').append(tableRow);  
  });
  
  /**
  - Functionality of the delete arrow button
  - Checks whether the number of authors are greater than one and removes the author
  - Else, renders an error message to the modal using a template
  **/
  $("#delete").click(function () {
    var noOfAuthors =  getNoOfAuthors();
    if(noOfAuthors > 1) {
      $(".selected").remove();
      updatePreview();
    } else {
      render({message: "Minimum one author is required"}, "#simpleErrorModalTemplate", "#errorModalContainer");
      $("#errorModalContainer").modal();
    }
  });
  
  
  /**
  - Functionality of the up arrow button, which moves a table row upwards
  - TODO: Update preview 
  **/
  $("#up").click(function () {
    $(".selected").prev().before($(".selected"));
    updatePreview();
  });
  
  /**
  - Functionality of the down button, which moves a table row downwards
  - TODO: Update preview
  **/
  $("#down").click(function () {
    $(".selected").next().after($(".selected"));
    updatePreview();
  });
  
  /**
  - Adds the selected class to the selected element on the table
  - which will be used in the deletion and addition of table rows
  **/
  $("#contributors-table tr").click(function(event) {
    if($(event.target).is('[type="radio"]')){
     $(this).addClass("selected").siblings().removeClass("selected");
   }
  });
  
  /**
  - When the contributor type changes in the dropdown
  **/
  $(".contributor-select").change(function () {
    updatePreview();
  });
  
  /**
  - Gets the publication type and renders the appropriate template
  **/
  $("#pubstype").change(function () {
    var pubType = this.value.toLowerCase();
    renderDynamicTemplate(currentData,pubType);
    updatePreview();
  });
  
  /**Table method ends**/
  
  
  /**
  - Functionality whenever the data is changed on the form, the preview is updated
  **/
  $(document).on("keyup", "input", function (e) {
    updatePreview();
  });
  
  /**
  - Functionality of the ignore button on the modal, which calls the method to post data on server
  **/
  $("#ignore-message").click(function () {
    putDataToServer();
  });
  
  /**
  - Validates the whole page
  - If the page is valid, submits the data to the server
  **/
  $("#save").click(function (event) {
    if($("#wholeTemplateContainer").valid()) {
      putDataToServer(citation_id);
    } else {
      console.log("Invalid data");  
    }
  });
  
  $("#raw-text").click(function () {
    globalConstants.isPreview = false;
    updatePreview();
  });
  
  $("#update-preview").click(function () {
    globalConstants.isPreview = true;
    updatePreview();
  }); 
}

/**
TODO: Ask Jaimie, what happens when we have just firstName/lastName of the author, should we render?
TODO: Add functionality for the raw text button
- Check if an author is empty, if not then render the apa template on the preview panel
**/
function updatePreview () {
  if (globalConstants.isPreview) {
    var currentObject = generateOutput();
    if (! currentObject.authorEmpty) {
      var tempCurrentObject = $.extend({}, currentObject);
      tempCurrentObject.authors = render_apa_authors(tempCurrentObject.authors);
      if (tempCurrentObject.editor) { tempCurrentObject.editor = render_apa_authors(tempCurrentObject.editor) }
      if (tempCurrentObject.translator) { tempCurrentObject.translator = render_apa_authors(tempCurrentObject.translator)}
      //console.log(tempCurrentObject)
      if(templates[currentObject.pubtype] === undefined) {
        $("#preview-rawtext").html(Mustache.render(templates["unknown"], tempCurrentObject));
      } else {
        
        $("#preview-rawtext").html(Mustache.render(templates[currentObject.pubtype], tempCurrentObject));
      }
    }
  } else {
    $("#preview-rawtext").text(currentData.raw)
  }
}

/**
TODO: Write AJAX call which sends the data to the server
**/
function putDataToServer(citation_id) {
  var data = generateOutput(); 
  delete data.authorEmpty;
  $.ajax({
    type: 'PUT',
    dataType: 'json',
    url: "/citation/" + citation_id,
    headers: {"X-HTTP-Method-Override": "PUT"},
    data: JSON.stringify(data),
    success: function (result, status, xhr){
      console.log(result)
    },
    error: function (result, status, xhr) {
      console.log(result)
    }
  })
}

jQuery.validator.addMethod("checkContributor", function (value) {
    if (value == "") return false;
    if(value.indexOf(',') > -1) {
      return true
    } else {
      return false
    }
}, "Contributor name should be in the format of LastName, FirstName")

/**
- Set the validation settings for the whole form
**/
function setValidationSettings () {
  var submitted = false;
  $("#wholeTemplateContainer").validate({
    rules:{
      ContributorName: "checkContributor",
      ContributorName: "required"
    },
    showErrors: function (errorMap, errorList) {
      if (submitted) {    
        var errorMessages = [];
        $.each(errorMap, function (field, message) {
          errorMessages.push({field:field, message:message});
        });
        render({errorMessages}, "#errorModalTemplate", "#errorModalContainer");
        $("#errorModalContainer").modal();
        submitted = false;
      }
      this.defaultShowErrors();
    },
    invalidHandler: function(form, validator) {
      submitted = true;
    },
    errorPlacement: function (error, element) {
      return true;
    },
    highlight: function (element) {
      $(element).addClass('error');
    },
    success: function (element) {
      $(element).removeClass('error');
    },
  });
}

function createContributors (fullName) {
  var firstName = ""; var lastName = ""; var authorEmpty=false;
  if (fullName.indexOf(',') > -1) {
    [lastName, firstName] = fullName.split(",");
    if (lastName) {
      lastName = lastName.trim()
    } else {
      lastName = ""
      authorEmpty = true;
    }
    if (firstName) {
      firstName = firstName.trim()
    } else {
      firstName = ""
      authorEmpty = true;
    }
  }
  else {
    lastName = fullName
    lastName.trim()
    authorEmpty = true;
  }
  
  return {
    "lastName" : lastName,
    "firstName" : firstName,
    "authorEmpty" : authorEmpty
  }
}

/**
TODO: - Done: Add the translators and editors
TODO: - Refactor the author case
TODO: - Check about authors and editors 
**/

function generateOutput () {
  var authors = []; var editors = []; var translators = [];
  var authString; var editors; var translators;
  var authorEmpty = false; 
  $("#contributors-table tr.contributors").each(function () {
        var contributorType = $(this).find("select.contributor-select").val();
        var fullName = $(this).find("input.name").val();
        if (fullName != "") {
          contriObject = createContributors(fullName);
          authorEmpty = contriObject.authorEmpty;
          switch(contributorType) {
            case "editor" :
            var editor = {
              lastname: contriObject.lastName,
              author_id: "",
              firstname: contriObject.firstName
            };
            editors.push(editor);
            break;

            case "translator" :
            var translator = {
              lastname: contriObject.lastName,
              author_id: "",
              firstname: contriObject.firstName
            };
            translators.push(translator);
            break;

            case "author" :
            var author = {
              lastname: contriObject.lastName,
              author_id: "",
              firstname: contriObject.firstName
            };
            authString = authString + fullName + ", ";
            authors.push(author);
            break;
          }
        }
        });

      /*
      verified: What about this
      */
      var outputJSON = {
        "volume": $("#volume").val() || "",
        "series": $("#series").val() || "",
        "abstract": $("#abstract").val() || "",
        "authors": authors,
        "number": $("#number").val() || "",
        "month": $("#month").val() || "",
        "edition": $("#edition").val() || "",
        "year": $("#year").val() || "",
        "keywords": $("#keywords").val() || "",
        "verified": 1, // Have to check this
        "title": $("#title").val() || "",
        "booktitle": $("#booktitle").val() || "",
        "citation_id": globalConstants.citation_id,
        "institution": $("#institution").val() || "",
        "note": $("#note").val() || "",
        "editor": editors,
        "howpublished": $("#howpublished").val() || "",
        "type": $("#pubtype").val() || "",
        "location": $("#city").val(),
        "auth_string": authString,// have to set it
        "journal": $("#journal").val() || "",
        "entryTime": globalConstants.entryTime,
        "translator": translators || "",
        "last_modified": Date.now(),
        "address": "",
        "pages": $("#pages").val() || "",
        "crossref": globalConstants.crossref,
        "chapter": $("#chapter").val() || "",
        "publisher": $("#publisher").val() || "",
        "school": $("#school").val() || "",
        "doi": $("#doi").val() || "",
        "raw": $("#preview-rawtext").text() || "",
        "url": $("#url").val() || "",
        "bibtex_key": globalConstants.bibtex_key,
        "pubtype": $("#pubtype").val() || "",
        "organization": $("#organization").val() || "",
        "authorEmpty": authorEmpty
      };
      return outputJSON;
    }

function getNoOfAuthors () {
  return $("#contributors-table tbody tr").length;
};

function renderDynamicTemplate (data, pubType) {

  switch(pubType) {
    case "article": 
    console.log("Article")
    render(data, "#articleTemplate", "#dynamicTemplateContainer");
    render(data, "#journalTemplate", "#journalContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#volumeTemplate", "#volumeContainer");
    render(data, "#numberTemplate", "#numberContainer");
    render(data, "#pagesTemplate", "#pagesContainer");
    render(data, "#noteTemplate", "#noteContainer");
    break;

    case "book":
    console.log("Book")
    render(data, "#bookTemplate", "#dynamicTemplateContainer");
    render(data, "#bookTitleTemplate", "#bookTitleContainer");
    render(data, "#publisherTemplate", "#publisherContainer");
    render(data, "#chapterTemplate", "#chapterContainer");
    render(data, "#cityTemplate", "#cityContainer");
    render(data, "#volumeTemplate", "#volumeContainer");
    render(data, "#seriesTemplate", "#seriesContainer");
    render(data, "#editionTemplate", "#editionContainer");
    render(data, "#pagesTemplate", "#pagesContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#noteTemplate", "#noteContainer");
    break;

    case "techreport": 
    console.log("Tech Report")
    render(data, "#techreportTemplate", "#dynamicTemplateContainer");
    render(data, "#institutionTemplate", "#institutionContainer");
    render(data, "#numberTemplate", "#numberContainer");
    render(data, "#cityTemplate", "#cityContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#noteTemplate", "#noteContainer");
    break;

    case "misc":
    console.log("Misc")
    render(data, "#miscTemplate", "#dynamicTemplateContainer");
    render(data, "#howPublishedTemplate", "#howPublishedContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#noteTemplate", "#noteContainer");
    break;

    case "proceedings": 
    console.log("proceedings")
    render(data, "#proceedingsTemplate", "#dynamicTemplateContainer");
    render(data, "#publisherTemplate", "#publisherContainer");
    render(data, "#cityTemplate", "#cityContainer");
    render(data, "#organizationTemplate", "#organizationContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#noteTemplate", "#noteContainer");
    break;

    case "unpublished":
    console.log("unpublished")
    render(data, "#unpublishedTemplate", "#dynamicTemplateContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#noteTemplate", "#noteContainer");
    break;

    case "phdthesis":
    case "mastersthesis":
    console.log("thesis")
    render(data, "#thesisTemplate", "#dynamicTemplateContainer");
    render(data, "#schoolTemplate", "#schoolContainer");
    render(data, "#cityTemplate", "#cityContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#noteTemplate", "#noteContainer");
    break;

    case "web_published":
    console.log("web_published")
    render(data, "#webpublishedTemplate", "#dynamicTemplateContainer");
    render(data, "#dateRetrievedTemplate", "#dateRetrievedContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#noteTemplate", "#noteContainer"); 
    break;

    case "incollection":
    case "inproceedings":
    case "conference":
    console.log("Incollection || inproceedings || conference")
    render(data, "#incollectionTemplate", "#dynamicTemplateContainer");
    render(data, "#bookTitleTemplate", "#bookTitleContainer");
    render(data, "#cityTemplate", "#cityContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#organizationTemplate", "#organizationContainer");
    render(data, "#publisherTemplate", "#publisherContainer");  
    render(data, "#pagesTemplate", "#pagesContainer");
    render(data, "#noteTemplate", "#noteContainer");            
    break;

    case "manual":
    console.log("manualTemplate")
    render(data, "#manualTemplate", "#dynamicTemplateContainer");
    render(data, "#organizationTemplate", "#organizationContainer");
    render(data, "#cityTemplate", "#cityContainer");
    render(data, "#editionTemplate", "#editionContainer");
    render(data, "#noteTemplate", "#noteContainer");  
    break;

    case "edited_book":
    console.log("Edited Book");
    render(data, "#editedBookTemplate", "#dynamicTemplateContainer");
    render(data, "#publisherTemplate", "#publisherContainer"); 
    render(data, "#cityTemplate", "#cityContainer");
    render(data, "#volumeTemplate", "#volumeContainer");
    render(data, "#seriesTemplate", "#seriesContainer");
    render(data, "#editionTemplate", "#editionContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#noteTemplate", "#noteContainer");
    break;

    case "inbook":
    console.log("In book");
    render(data, "#inBookTemplate", "#dynamicTemplateContainer");
    render(data, "#bookTitleTemplate", "#bookTitleContainer");
    render(data, "#publisherTemplate", "#publisherContainer");
    render(data, "#chapterTemplate", "#chapterContainer");
    render(data, "#cityTemplate", "#cityContainer");
    render(data, "#volumeTemplate", "#volumeContainer");
    render(data, "#seriesTemplate", "#seriesContainer");
    render(data, "#editionTemplate", "#editionContainer");
    render(data, "#pagesTemplate", "#pagesContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#noteTemplate", "#noteContainer");
    break;

    case "translated_book":
    console.log("translatedbook");
    render(data, "#translatedBookTemplate", "#dynamicTemplateContainer");
    render(data, "#publisherTemplate", "#publisherContainer");
    render(data, "#cityTemplate", "#cityContainer");
    render(data, "#seriesTemplate", "#seriesContainer");
    render(data, "#editionTemplate", "#editionContainer");
    render(data, "#volumeTemplate", "#volumeContainer");
    render(data, "#monthTemplate", "#monthContainer");
    render(data, "#noteTemplate", "#noteContainer");
    break;
  }
}

function render (data, template, container) {
  var templateContent = $(template).html();
  var result = Mustache.render(templateContent, data);
  $(container).html(result);
};

