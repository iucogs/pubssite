
//mlaAuthorFormat formats author array for mla style
function mlaAuthorFormat(authorsArray) {
	//first name is last name, first name
	var formattedAuthor = authorsArray[0];
	//Account for authors with no last name
	var firstAuthor = formattedAuthor.split(",");
	if (firstAuthor[1] === " ") {
		formattedAuthor = firstAuthor[0];
	}
	//each subsequent name needs to be first name, last name
	if (authorsArray.length > 1) {
		//flag for multiple authors, to be used with edited book citation (since the editors are stored in authorsArray) 
		var multipleAuthors = true; 
		for (var i = 1; i < authorsArray.length; i++) {
			var fullNameArr = authorsArray[i].split(",");
			var firstName = fullNameArr[1];
			var lastName = fullNameArr[0];
			//add 'and' for last author
			if (i === (authorsArray.length -1)) {
				formattedAuthor += ", and " + firstName + " " + lastName;
			}
			else {
				formattedAuthor += ", " + firstName + " " + lastName;
			}
		}
		//flag for multiple authors, to be used with edited book citation (since the editors are stored in authorsArray) 
		var multipleAuthors = true; 
	}
	//add a period to the end of the author string
	if (formattedAuthor.slice(-1) != ".") {
		formattedAuthor += ".";
	}

	return [formattedAuthor, multipleAuthors];
}

function mlaEditorFormat(editorsStr) {
	var formattedEdName = "";
	//split editors string into an array where each element is one name
	var edArray = editorsStr.split(";");
	//mla doesn't need alphabetized editors ? 
	//loop through edArray
	for (var i = 0; i < edArray.length; i++) {
		//split each string in array into an array containing editor's first/last names
		var edNameSplit = edArray[i].split(",");
		var firstName = edNameSplit[1];
		var lastName = edNameSplit[0];
		//acounts for cases where there is no comma between last and first name
		if (firstName === undefined) {
			firstName = "";
		}
		//citation with single editor
		if (edArray.length === 1) {
			formattedEdName += "Ed." + firstName + " " + lastName;
		}
		//citation with more that 1 editor
		else {
			//add Eds.
			if (i === 0) {
				formattedEdName += "Eds. ";
			}
			if (i === edArray.length - 1) {
				formattedEdName += " and " + firstName + " " + lastName;

			}
			else {
				formattedEdName += firstName + " " + lastName + ", ";
			}
		}
	}
	return formattedEdName;
}

