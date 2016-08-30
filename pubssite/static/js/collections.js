/*
Jaimie - Line 63, 65
*/

// Retrieving the array of collections belonging to pjcraig
/*Replace it with the session username*/
var userName = "pjcraig";
var currentModal = null;

/*Dummy function to check whether the citations are added into the collection or no*/
/* function getCitationsInCollection(collectionId){
  $.getJSON("https://inpho.cogs.indiana.edu/pubs/collection/citations/" + collectionId, function(data){
    data.forEach(function(citationObject){
      console.log(citationObject.citation_id);
    });
    console.log("------------------");
  })
} */

/*Mustache Render html*/
function render(data, template, container) {
  var templateContent = $(template).html();
  var result = Mustache.render(templateContent, data);
  $(container).html(result);
}

/*Mustache Render Append*/
function renderAppend3(data, template, container) {
  var templateContent = $(template).html();
  var result = Mustache.render(templateContent, data);
  console.log(result);
  $(container).append(result);
}

$(document).ready(function(){
  loadCollections(userName);
});

;/*
1. Add button click event handler
2. If the selected collection is a new collection, then prompts for name and 'POST' the new collection
3. If the selected collection is an existing one, then 'PUTS' into the existing collection
*/
$(document).on("click", "#addToCollection", function(){
  var selectedCollection = $("#listCollections").val();
  if(selectedCollection == "new"){
    render({},"#newCollectionNameTemplate","#newCollectionModal .modal-body");
  }else{
    var citationIds = [40232, 40233, 40234];
    putToExistingCollection(userName, citationIds, selectedCollection);
  }
});

/*Save new Collection button click on the modal*/
$(document).on("click", "#saveNewCollection", function(){
  var newCollectionName = $("#newName").val();
  postNewCollection(newCollectionName);
});

/*Change the modal type dynamically*/
$("select").on("change", function(){
  var selectedValue = $(this).val();
  getCitationsInCollection(selectedValue);
  if(selectedValue == "new"){
    $("#addToCollection").attr("data-target", "#newCollectionModal");
  }else{
    $("#addToCollection").attr("data-target", "#collectionConfirmModal");
  }
})

/*
The PUT Ajax request function
*/
function putToExistingCollection(userName, citationIds, selectedCollection){
  console.log("Calling the API to put into collection " + selectedCollection);
  /*Hard coded values start*/
  var submitter = "pjcraig";
  var owner = "pjcraig";
  var user_id = 0;
  /*Hard coded values ends*/

  var dataObject = {"user_id" : user_id,
                    "submitter" : submitter,
                    "owner" : owner,
                    "cit_ids" : citationIds ,
                    "coll_id" : selectedCollection
                   }; 

  $.ajax({
    crossDomain : true,
    method: 'PUT',
    url: "https://inpho.cogs.indiana.edu/pubs/collection/add/existing",
    data: JSON.stringify(dataObject),
    success: function(data){
      /*Very vague check for the return, doesnt handle if anyother cases are encountered*/
      if(data == "Success"){
        render({message: "Success"}, "#messageTemplate", "#collectionConfirmModal .modal-body");
      }
    },
    contentType: "application/json",
    dataType: "json"
  });

}

/*
The POST Ajax request function
*/
function postNewCollection(newCollectionName){
  console.log("Calling the API to save new collection " + newCollectionName);
  /*The values are hard coded, change it according to the Session*/
  /*Hard coded values start*/
  var citationIds = [36388,36389];
  var submitter = "pjcraig";
  var owner = "pjcraig";
  var user_id = 0;
  /*Hard coded values ends*/

  var dataObject = { "collection_name" : newCollectionName,
                    "user_id" : user_id,
                    "submitter" : submitter,
                    "owner" : owner,
                    "cit_ids" : citationIds 
                   };
  $.ajax({
    crossDomain : true,
    method: 'POST',
    url: "https://inpho.cogs.indiana.edu/pubs/collection/add/new",
    data: JSON.stringify(dataObject),
    success: function(data){
      /*Very vague check for the return, doesnt handle if anyother cases are encountered*/
      if(data == "Success"){
        loadCollections(userName);
        var currentModal = $("#addToCollection").attr("data-target");
        $(currentModal).modal("hide");
      }
    },
    contentType: "application/json",
    dataType: "json"
  });
}

/*
Load collections, which loads the collections into the select
*/
function loadCollections(userName){
  var newItem = {
    collection_id: "new",
    collection_name: "New Collection"
  }
  renderAppend3(newItem, "#optionTemplate", "#listCollections");
  $.getJSON("/collection/owner/" + userName, function(collectionData) {
    collectionData.forEach(function(item){
      renderAppend3(item, "#optionTemplate", "#listCollections");
      console.log(item);
    })
  });
}
