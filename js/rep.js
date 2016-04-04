
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


//FOR STORING COOKIES - for storing previous URL accessed

//creates a cookie with the name cname, with the value cvalue and expires in exdays
function setCookie(cname, cvalue, exdays) {
	var expires;
	if (exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		expires = "; expires="+d.toUTCString();
	} else {
		expires = "";
	}
	document.cookie = cname+"="+cvalue+expires+"; path=/";
} 

//gets the value of a cookie
function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

//removes a cookie with name
function eraseCookie(name) {
	setCookie(name,"",-1);
}

/*changes label text of navigation pills according to enrolment type
- navPills: navigation pills/bar
- txtToChangeTo: label text to change for ALL links in navPills
end result will include a dash

FOLLOWS the following (for all links)
- before: STEP 1
- after: STEP 1 - New Enrolment
*/
function changeNavPills(navPills, txtToChangeTo) {
	//changes to navigation between steps when selecting an enrolment type
	var navPills = $(navPills);
	var txt;
	var index;
	$(navPills).children().each(function() {
		txt = $(this).find('a').text();
		index = txt.indexOf('- ');
		if (index == -1) {
			$(this).find('a').text(txt + ' - ' + txtToChangeTo);
		} else {
			$(this).find('a').text(txt.substr(0,(index+2)) + txtToChangeTo);
		}
	});
}

/**Sample - to display fields to pre-populate**/

function prePopulate(array, bolToPopulate) {
	if (array.length > 0) {
		for (var k = 0; k < array.length; k++) {
			var children = $('#' + array[k]).find('input:text, select');
			for (var i = 0; i < children.length; i++) {
				if (bolToPopulate == 'true') {
					$(children[i]).addClass('prePopulate');
				} else {
					$(children[i]).removeClass('prePopulate');
				}
			}
		}
		if (bolToPopulate == 'true') {
			alert('Pre-populate data into the fields below');
		} else {
			alert('Remove pre-populated data from the fields below');
		}
	}
}

/**TEMPORARY - for fixed navigation bar at top for DEMO PURPOSES ONLY **/
$(window).bind('scroll', function () {
    if ($(window).scrollTop() > 350) {
        $('.nvg').addClass('fixed');
    } else {
        $('.nvg').removeClass('fixed');
    }
});
