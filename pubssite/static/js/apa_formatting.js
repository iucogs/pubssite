function apaAuthorFormat(authorsArray) {
	var formattedAuthor = "";
	//loop through all names in author array and split each name into array containing first/last names
	for (var i = 0; i < authorsArray.length; i++) {
		var fullNameArr = authorsArray[i].split(",");
		var firstInitial = fullNameArr[1].substring(0,2);
		var lastName = fullNameArr[0];
		//split into array containing first name and initials if they exist
		var initialsArr = fullNameArr[1].split(" ");
		//if initials exist, create midInitials variable
		if (initialsArr[2]) {
			var midInitials = initialsArr[2];
			//account for full name in data
			if (midInitials[1] != ".") 
				{
				midInitials = midInitials.substring(0,1) + ". ";
				}
			//if there's more than 1 intitial or suffix
			if (initialsArr.length > 2) 
				{
				//add more than 1 initial if it exists
				//account for full name necessary?
				for (var j = 3; j < initialsArr.length; j++) 
					{
					//add comma before suffix
					if (initialsArr[j] === "Jr." || "Sr.") 
						{
						midInitials += ", " + initialsArr[j];
						}
					else 
						{
						midInitials += " " + initialsArr[j];
						}
					}
				}
			}
		//format for citations with only 1 author
		if (authorsArray.length === 1) {
			//removes firstInitial if author does not have one (i.e. Aristotle)
			if (firstInitial === " ") {
				formattedAuthor += lastName + ".";
			}
			else {
				if (midInitials) {
					formattedAuthor += lastName + "," + firstInitial + ". " + midInitials;
				}
				else {
					formattedAuthor += lastName + "," + firstInitial + ".";
				}
			}
		}	
		//format for citations with more than 1 author
		else {
			//flag for multiple authors, to be used with edited book citation (since the editors are stored in authorsArray) 
			var multipleAuthors = true;
			//adds & before formattedAuthor if it is the last element in array
			if (i === (authorsArray.length - 1)) {
				//removes firstInitial if author does not have one
				if (firstInitial === " ") {
					formattedAuthor += "& " + lastName + ".";
				}
				else {
					if (midInitials) {
						formattedAuthor += " & " + lastName + "," + firstInitial + ". " + midInitials;
					}

					else {
						formattedAuthor += "& " + lastName + "," + firstInitial + ". ";
					}
				}	
			}
			else {
				//removes firstInitial if author does not have one
				if (firstInitial === " ") {
					formattedAuthor += lastName + ", ";
				 }
			 	else {
			 		if (midInitials) {
			 			formattedAuthor += lastName + "," + firstInitial + ". " + midInitials + ", ";
			 		}
			 		else {
			 			formattedAuthor += lastName + "," + firstInitial + "., ";
			 		}
			 	}
			}
		}
		//need format for citation with 7+ authors
	}
	return [formattedAuthor, multipleAuthors];
}


//apaEditorFormat edits editor data to fit APA citation style for inBook (first initials + last name)
//may not work if there is only 1 editor. Need to test/fix (I think I fixed this?)
function apaEditorFormat(editorsStr) {
	var formattedEdName = "";
	var alphaArray = [];
	//split editors string into an array
	var edArray = editorsStr.split(";");
	//creates a new array which switches first/last names in edArray in order to alphabetize 
	for (var i = 0; i < edArray.length; i++) {
		newSplit = edArray[i].split(",");
		newElem = newSplit[1] + "," + newSplit[0];
		alphaArray.push(newElem);
		alphaArray.sort();
	}
	//loop through names in alphabetized editor array and split into array containing first/last names
	for (var i = 0; i < alphaArray.length; i++) {
		var edNameSplit = alphaArray[i].split(",");
		var initials = edNameSplit[0];
		var edLastName = edNameSplit[1];
		//accounts for cases where there is no comma between last and first name
		if (initials === "undefined" || initials === "") {
			initials = "";
		}
		//check to make sure initials is not full first name, and if it is full first name grab initial
		else if (initials[2] != ".") {
			initials = initials[1] + ".";
		} 
		//citation with single editor
		if (edArray.length === 1) {
			formattedEdName += initials + " " + edLastName + " (Ed.)";
		}
		//citation with more than 1 editor
		else {
			//adds APA styling
			if (i === edArray.length - 1) {
				formattedEdName += " & " + initials + " " + edLastName + " (Eds.)";	
			}
			else {
				formattedEdName += initials + " " + edLastName + ",";
			}
		}
		
	}
	return formattedEdName;
}


//replaces 'and' with '&' in translator string
function transFormat(transStr) {
	var formattedTrans = transStr.replace("and", "&");
	return formattedTrans;
}

