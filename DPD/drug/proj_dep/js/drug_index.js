"use strict";
var _DRUG = window.DRUG; //get globals

$(document).ready(function () {
    //update URL for the env.
    var baseUrl = window.location.protocol + "//" + window.location.host;
   // var disclaimer = baseUrl + _DRUG.DISCLAIMER_PAGE;
   // var zipFile = baseUrl + _DRUG.EXTRACT_PATH;
   // $("#" + _DRUG.DISCLAIM_TAG).attr("href", disclaimer);
   // $("#" + _DRUG.ZIP_TAG).attr("href", zipFile);
   // var mdall_link=_DRUG.MDALL_EN;
   // if(!isEnglish()) mdall_link=_DRUG.MDALL_FR;
   // $("#mdall-href").attr("href", mdall_link);
});

function isEnglish() {
    return document.documentElement.lang === "en"
}

/**
 * Splits a string using the autocomplete delimiter
 * @param val input string
 * @returns {Array|*|never|string[]|null}
 */
function split(val) {
    return val.split(_DRUG.AUTOCOMPLETE_DELIMITER);
}

/**
 * Extracts the last term in a string based on delmiter
 * @param term -string to parse
 * @returns {string} -the rightmost tern
 */
function extractLast(term) {
    if (!term) return "";
    var temp = split(term).pop();
    return $.trim(temp);
}

/**
 * Gets the raw request and parses it. Used to pass to the results page
 */
function passRequestToResults() { //TODO delete

    var queryString = $(_DRUG.SEARCH_BOX_ID).val();
    var results = "";
    window.location.href = _DRUG.RESULTS_PAGE_NAME + "?q=" + encodeURIComponent(queryString);
}

function removeLeadingIllegal(terms) {
    var search = terms.substr(0, 1);
    var i = $.inArray(search, _DRUG.ILLEGAL_AUTO);
    if (i > -1) {
        return terms.substr(1, terms.length - 1);
    }
    return terms;
}

/**
 * gets the query for autocomplete lookups
 * @param term -the string to search for
 * @returns {string} end point with appropriate query
 */
function getTermQuery(term) {
    if (term.indexOf(" ") === -1) {
        //single term search
        return _DRUG.END_POINT + "dpd_lookup"+ "?or=(or(brand_name.ilike."+term+"*,company_name.ilike."+term+"*),ingredient.ilike."+term+"*)" + "&limit=" + _DRUG.AUTOCOMPLETE_QUERY_LIMIT;
    }
    return _DRUG.END_POINT + "dpd_lookup"+ "?or=(or(brand_name.plfts."+term+"*,company_name.plfts."+term+"*),ingredient.plfts."+term+"*)" + "&limit=" + _DRUG.AUTOCOMPLETE_QUERY_LIMIT;
}

/**q.forEach((_q) => {

https://rest-dev.hres.ca/dpd/dpd_lookup?or=(or(brand_name.ilike.rest*,company_name.ilike.rest*),ingredient.ilike.rest*)&limit=20
**/
/**
 * After recieving the query, parse the terms and identify them to users
 * @param query- the term to search
 * @param data
 * @returns {Array}
 */
function processAutoCompleteTerms(query, data) {
    var suggestions = [];
    if (!query) return [];
    var term = query.toLowerCase();

    var keywords = $.map(data, (obj) => {
           return([
               obj.brand_name + " " + _DRUG.START_AUTO + _DRUG.BRAND_TYPE + _DRUG.END_AUTO,
               obj.company_name + " " + _DRUG.START_AUTO + _DRUG.COMPANY_TYPE + _DRUG.END_AUTO,
               obj.ingredient + " " + _DRUG.START_AUTO + _DRUG.INGREDIENT_TYPE + _DRUG.END_AUTO,
               obj.status_current + " " + _DRUG.START_AUTO + _DRUG.STATUS_TYPE + _DRUG.END_AUTO,
               obj.status_current_fr + " " + _DRUG.START_AUTO + _DRUG.STATUS_TYPE + _DRUG.END_AUTO
           ]);
    });
    keywords.forEach((keyword) => {
        if (keyword.toLowerCase().indexOf(term) > -1) {
            const pushKeyword = keyword.toLowerCase()
            if (!suggestions.includes(pushKeyword)) suggestions.push(pushKeyword);
        }
    });
    return suggestions;
}

function _trimAutocompleteType(value) {
    if (!value) return "";
    var location = value.lastIndexOf(window.DRUG.START_AUTO);
    if (location > -1) {
        return (value.substring(0, location));
    } else if (location = value.lastIndexOf(window.DRUG.END_AUTO > -1)) {
        return (value.substring(0, location));
    }
    return value;
}


/**
 * Used by the jquery UI autocomplete to get and list terms
 * @param request
 * @param response
 */
function getAutoTerms(request, response) {
    // delegate back to autocomplete, but extract the last term
    var term = $.trim(request.term);
    if (term) {
        term = extractLast(request.term)
        term = removeLeadingIllegal(term);
    }
    $.ajax({
        url: getTermQuery(term),
        dataType: "json",
        cache: true,
        success: function (data) {
            var dataList = processAutoCompleteTerms(term, data);
            dataList.splice(_DRUG.MAX_AUTOCOMPLETE_LIST);
            return response(dataList);
        }
    });
}



/**
 * Used for selection of autocomplete terms by the JQuery UI plugin
 * @param ui
 * @param event
 * @param value
 */
function selectAutoTerms(ui, event, value) {
    var terms = split(value);
    // remove the current input
    terms.pop();
    // add the selected item
    for (var i = 0; i < terms.length; i++) {
        terms[i] = $.trim(terms[i]) + " " + _DRUG.AUTOCOMPLETE_DELIMITER + " ";
    }
    terms.push(_trimAutocompleteType(ui.item.value));
    // add placeholder
    terms.push(_DRUG.AUTOCOMPLETE_DELIMITER + " ");
    return (terms.join(""));
}
