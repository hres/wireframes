
//if optYes is checked, all elements in the contentArray array will be shown; otherwise, they will be hidden
function ShowHideDivGenArray(optYes, contentArray) {
	for (var i = 0; i < contentArray.length; i++) {
		contentArray[i].style.display = optYes.checked ? "block" : "none";
	}
}

/*To Show and Hide Div -> if optYes is selected, content will show; otherwise it will hide*/
function ShowHideDivGen(optYes, content) { //general case
	content.style.display = optYes.checked ? "none" : "block";
}

//if opt is checked, all input and select elements in the contentArray array will be enabled; otherwise they will be disabled
function enableDisableDivArray(opt, contentArray) {
	for (var i = 0; i < contentArray.length; i++) {
		$(contentArray[i]).find('input, select, button').not('.readOnly').each(function() {
			$(this).prop("disabled", !(opt.checked));
		});
	}
}

//find "find" in a string "str" and replace it with "rep"
function replaceAll(str, find, rep) {
  return str.replace(new RegExp(find, 'g'), rep);
}

/*This is for changing the "Province/State" dropdown list when selecting a country from the "Country" dropdown list
For example, given the "Province/State" textbox id, if the country selected is "Canada", then the corresponding textbox will be populated with Canadian Provinces and Territories"
*/
function changeSuggestions(txtBoxCountryValue, txtBoxProvStateId) {
		var provStateTextBox = document.getElementById(txtBoxProvStateId);
			if (txtBoxCountryValue == 'Canada') {
				provStateTextBox.setAttribute('list','canProvSuggestions');
		   } else if (txtBoxCountryValue == 'United States') {
				provStateTextBox.setAttribute('list', 'usStateSuggestions');
		   } else {
				provStateTextBox.setAttribute('list', '');
		   }
}

