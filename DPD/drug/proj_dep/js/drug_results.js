var _DRUG=window.DRUG;

//TODO clean up table initialization do it manually?
//add results table tag to global?
$(document).ready(function() {
    //set attribute dynamically for language

    $("#results-table").attr("data-wb-tables",_DRUG.RESULTS_TABLE);
    initTableWet();

});


// This must be a hyperlink
$('#linkExcel').on('click', function (event) {
    ExportTableToCSV.apply(this, [$('#results-table'), 'mdi_imm.csv']);
});


/**
 * Creates the url for the search functionality using server side processing
 * Remove characters that interfere with search success
 * @returns {string}
 */
function getServerSideProcessingURL() {
    return DRUG.END_POINT;
  //  return _DRUG.SERVER_SIDE_PROCESSING_END_POINT;
}

/**
 * Checks for the addition of the language tag
 * @param query -string to process
 * @returns {string}
 * @private
 */
function _checkForLang(query){
    if(!query) return query;
    var index=query.lastIndexOf("&");
    var testString=query.substring(index,query.length-1);
    if(testString.indexOf("lang")>-1){
        return query.substring(0,index);
    }
    return query;
}

/**
 * Sets the terms UI with the terms values
 * @param q
 * @private
 */
function _uiSetTermsDisplay(q) {
    if (!q) return;
    $("#"+_DRUG.TERMS_TAG).text(" "+q);
}

function initTableWet() {
    //TODO update initialization?
    window['wb-tables'] = {
        "destroy": true,
        "processing": true,
        "serverSide": false,
        "autoWidth": false,
        "ajax": {
            "searching": false,
            "url": getURL(),
            "dataSrc":"",
            "cache": true,
            "data": function ( d ) {
                //datatables expects json tag of data
                var temp={};
                temp.data=d;
            }
        },
        'bStateSave': true,
        'columns': [
            {data: 'drug_product.status_current'},
            {'data': 'drug_product.drug_identification_number',

                'render': function (data, type, full, meta) {
                    //sets code for the drug and the query to return to
                    return '<a href="drug_details.html?q='+full.drug_product.drug_code+'&pr='+_getTerms()+'">'+data+'</a>';
                }
            },
            {'data': 'drug_product.company',
                'render': function (data, type, full, meta) {
                    return data.company_name;
                }
            },
            {'data': 'drug_product.brand_name'},
            {'data': 'drug_product.class'},
            {
                'data': 'drug_product',
                'render': function (data, type, full, meta) {
                    if(data.hasOwnProperty("product_monograph_en_url")||data.hasOwnProperty("product_monograph_fr_url")){
                        return 'Yes'; //TODO lang
                    }
                    return "No"; //TODO lang
                    //"product_monograph_en_url": "https://pdf.hres.ca/dpd_pm/00042091.PDF",
                    //   "product_monograph_fr_url": "https://pdf.hres.ca/dpd_pm/00042092.PDF",
                }
            },
            {
                'data': 'drug_product.schedule',
                'render': function (data, type, full, meta) {
                   if(!data ||data.length==0) return "";
                     return arrayNameDisplay(data);
                }
            },

            {'data': 'drug_product.number_of_ais'},
            {
                'data': 'drug_product.active_ingredients',
                'render': function (data, type, full, meta) {
                    return arrayNameDisplay(data);

                }
            }
        ]
    }
}

/**
 * For the Device type, display lang specific data
 * @param data- the field/column triggered in the tale def
 * @param full- the entire incident record
 * @returns {string}
 */
function deviceDescriptionDisplay(data, full) {
    var displayValue = "";
    if (isFrench()) {
        displayValue = full.incident.device_desc_f;
    } else {
        displayValue = full.incident.device_desc_e;
    }
    return ($.trim(displayValue));
}



function problemDetailCodeTypeDisplay(data,full){
    var displayName = "";
    var unique = {};
            for (var i = 0; i < full.incident.problem_detail.length; i++) {
                var code=full.incident.problem_detail[i].code_type_e;
                if (isFrench()) code=full.incident.problem_detail[i].code_type_f;
                if (!unique.hasOwnProperty(code)){
                    displayName += code + "<br>";
                    unique[code]=1;
                }
            }
    displayName = displayName.substring(0, displayName.length - 4);
    return ((displayName));
}




/**
 * Concats array data for dsiplay. Each on new line
 * @param data- array to process
 * @returns {string}
 */
function arrayNameDisplay(data) {
    var displayName = "";
    if (!data) return "";
    if (!Array.isArray(data)) return $.trim(data);
    for (var i = 0; i < data.length; i++) {
        if(data[i]==null) data[i]="";
        displayName += data[i] +" "+ "<br>";
        //TODO relying on the space for csv download
    }
    displayName = displayName.substring(0, displayName.length - 4);
    return displayName;
}

/**
 * Exports table data to a csv- function take from review Desicions
 * @param $table -the table to process
 * @param filename -file
 * @constructor
 */
function ExportTableToCSV($table, filename) {

    var $rows = $table.find('tr:has(td),tr:has(th)'),
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character

        // actual delimiter characters for CSV format
        colDelim = '","',
        rowDelim = '"\r\n"',

        // Grab text from table into CSV formatted string
        csv = '"' + $rows.map(function (i, row) {
            var $row = $(row), $cols = $row.find('td,th');

            return $cols.map(function (j, col) {
                var $col = $(col), text = $col.text();
                return text.replace(/"/g, '""'); // escape double quotes

            }).get().join(tmpColDelim);

        }).get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"',
        // Data URI
        csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

    if (window.navigator.msSaveBlob) { // IE 10+
        //alert('IE' + csv);
        window.navigator.msSaveOrOpenBlob(new Blob([csv], {type: "text/plain;charset=utf-8;"}), filename)
    } else {
        $(this).attr({'download': filename, 'href': csvData, 'target': '_blank'});
    }
}
/**
 * Gets the filtered term string to pass to the server and display in results
 * @returns {string}
 * @private
 */

function _getTerms() {
    var term_query = "";
    var illegal = ["of", "&", "and", "?", "!", "or", "+", "-", "no.", "|", ",", ".","<",">"];
    var q = window.location.search.substr(3);
    var terms="";
    q = _checkForLang(q);
    _uiSetTermsDisplay(decodeURIComponent(q));
    terms = q.split(" ");
    for (var count = 0; count < illegal.length; count++) {
        var illegal_index = $.inArray(illegal[count], terms);
        if (illegal_index > -1) {
            terms.splice(illegal_index, 1);
            //reset term search, more than one
            count = count - 1;
        }
    }
    q = terms.join("%20");
    return q;
}



/**
 * Creates the url for the search functionality
 * Remove characters that interfere with search success
 * @returns {string}
 */
function getURL() {
    return createURLNoLimit() + "&limit=" + _DRUG.MAX_RESULTS;
}


/**
 * Creates the url without any limits
 * @returns {string}
 */
function createURLNoLimit() {

    return _DRUG.END_POINT  + _createTermQuery();
}
/**
 * Creates the term query to inject into an ajax requist
 * @returns {string}
 * @private
 */
function _createTermQuery() {
    var q=_getTerms();
    //https://rest-dev.hres.ca/dpd/dpd_search?search=plfts.%22bay%22&select=drug_product&order=drug_product-%3E%3Ebrand_name&limit=10000
    if (q) {
        term_query = "dpd_search?search=plfts." + "%22" + q + "%22" + "&select=drug_product&order=drug_product-%3E%3Ebrand_name";
    } else {
        term_query = "dpd_search?select=drug_product&order=drug_product-%3E%3Ebrand_name";
        //https://rest-dev.hres.ca/dpd/dpd_search?select=drug_product&order=drug_product-%3E%3Ebrand_name&limit=10000
    }
    return term_query;
}
function isEnglish() {
    return document.documentElement.lang === "en"
}

function isFrench() {
    return !isEnglish();
}

function passRequestToResults() {

    var queryString = $(_DRUG.SEARCH_BOX_ID).val();
    var results = "";
    window.location.href = _DRUG.RESULTS_PAGE_NAME
}


