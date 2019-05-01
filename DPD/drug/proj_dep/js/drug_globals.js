"use strict";
/**
 * Attach global variables to window. PLace in a single variable
 */
(function(window) {
    var DRUG={};
    DRUG.BRAND_TYPE="brand name";
    DRUG.COMPANY_TYPE="company";
    DRUG.STATUS_TYPE="status";
    DRUG.NOT_APPLICABLE="NA";
    DRUG.INGREDIENT_TYPE="ingredient";
    DRUG.QUERY_EQUAL="q=";
    DRUG.PREV_QUERY_EQUAL="pr=";
    DRUG.START_AUTO="[";
    DRUG.END_AUTO="]";
    DRUG.ILLEGAL_AUTO=["&",","];
    DRUG.SEARCH_BOX_ID = "#search";
    DRUG.AUTOCOMPLETE_QUERY_LIMIT = 600;
    DRUG.MAX_AUTOCOMPLETE_LIST = 8;
    DRUG.AUTOCOMPLETE_DELIMITER=",";
    DRUG.AUTOCOMPLETE_MIN_LENGTH=0;
    DRUG.MAX_RESULTS=10000;
    DRUG.TERMS_TAG="terms";
    DRUG.END_POINT="https://rest-dev.hres.ca/dpd/";
    DRUG.RESULTS_PAGE_NAME="drug_results.html";
    DRUG.RESULTS_TABLE='{"searching":false,"bDeferRender":true,"lengthMenu":[[10, 25, 50,100], [10, 25, 50,100]]}';
    window.DRUG=DRUG;
})(window);


/**
 * Update variables for french language
 */
$(document).ready(function() {

    if (document && document.documentElement && document.documentElement.lang === "fr"){
        window.DRUG.BRAND_TYPE="dispositif";
        window.DRUG.COMPANY_TYPE="entreprise";
        window.DRUG.INGREDIENT_TYPE="ingrédient";
        window.DRUG.STATUS_TYPE="état";
      //  window.DRUG.DISCLAIMER_PAGE="/static/content/mdidisclaim.php?lang=fr";
    }
});


