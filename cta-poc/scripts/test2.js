var dataList = "";

//var lastFocused=null;

function getProtocolTitleValue() {
    return $('#protocol-title').val()
}

function getDrugNameValue() {
    return $('#drug-name').val()
}

function getConditionValue() {
    return $('#condition-name').val()
}

function getSponsorNameValue() {
    return $('#sponsor-name').val()
}

function getProtocolIdValue() {
    return $('#protocol-id').val()
}

function getControlIdValue() {
    return $('#control-id').val()
}

function getStatusIdValue() {
    return $('#status-list').val()
}

function getPopulationIdValue() {
    return $('#population-list').val()
}

function getNolStartValue() {
    return $('#nol-startdate').val()
}


function getNolEndValue() {
    return $('#nol-enddate').val()
}

function getStudyStartFromDate() {
    return $('#study-start-startdate').val()
}

function getStudyStartToDate() {
    return $('#study-start-enddate').val()
}

function getStudyEndFromDate() {
    return $('#study-end-startdate').val()
}

function getStudyEndToDate() {
    return $('#study-end-enddate').val()
}


function filterRecords() {
    sessionStorage.setItem("title", getProtocolTitleValue());
    sessionStorage.setItem("drug", getDrugNameValue());
    sessionStorage.setItem("sponsor", getSponsorNameValue());
    sessionStorage.setItem("protocolId", getProtocolIdValue());
    sessionStorage.setItem("controlId", getControlIdValue());
    sessionStorage.setItem("conditions", getConditionValue());
    sessionStorage.setItem("studyEndTo", getStudyEndToDate());
    sessionStorage.setItem("studyEndFrom", getStudyEndFromDate());
    sessionStorage.setItem("studyStartTo", getStudyStartToDate());
    sessionStorage.setItem("studyStartFrom", getStudyStartFromDate());
    sessionStorage.setItem("nolEnd", getNolEndValue());
    sessionStorage.setItem("nolStart", getNolStartValue());
    sessionStorage.setItem("populationId", getPopulationIdValue());
    sessionStorage.setItem("statusId", getStatusIdValue());
    $('#cta-results-table').DataTable().search("").draw();

}

function clearFilter() {

    sessionStorage.clear();
    $('#filter-form').trigger("reset");
    //document.getElementById("filter-form").reset();

    $('#cta-results-table').DataTable().search("").draw();
}

function collapseFilter() {
    // $('#search-param').removeAttr("open")
    $('#search-summary').click();
}

function loadFilters() {


    let attr = $('#search-param').attr('open');
    if (!attr) {
        $('#protocol-title').val(sessionStorage.getItem("title"));
        $('#drug-name').val(sessionStorage.getItem("drug"));
        $('#sponsor-name').val(sessionStorage.getItem("sponsor"))
        $('#protocol-id').val(sessionStorage.getItem("protocolId"));
        $('#control-id').val(sessionStorage.getItem("controlId"));
        $('#condition-name').val(sessionStorage.getItem("conditions"));
        $('#study-end-enddate').val(sessionStorage.getItem("studyEndTo"));
        $('#study-end-startdate').val(sessionStorage.getItem("studyEndFrom"));
        $('#study-start-enddate').val(sessionStorage.getItem("studyStartTo"));
        $('#study-start-startdate').val(sessionStorage.getItem("studyStartFrom"));
        $('#nol-startdate').val(sessionStorage.getItem("nolStart"));
        $('#nol-enddate').val(sessionStorage.getItem("nolEnd"));
        $('#population-list').val(sessionStorage.getItem("populationId"));
        $('#status-list').val(sessionStorage.getItem("statusId"));

    }


}

$(document).on("wb-ready.wb", function (event) {
    console.warn("dfgfdgdfdgdfdgd")
    //loadFilters();
});
/*async function postData() {
    // Default options are marked with *
    const response = await fetch('http://dotnet-dev.hc.local/api/clinical-trial/status?count=500&lang=en')
    const  data = await response.json()
    console.warn(data);
    return data
}*/


$(document).ready(function () {

    //sessionStorage.clear();
    loadStatus();
    loadPopulation();
    loadFilters();

    window['wb-tables'] = ({
        "searching": false,
        "processing": true, // control the processing indicator.
        "serverSide": true, // recommended to use serverSide when data is more than 10000 rows for performance reasons

        "columnDefs": [

            { "orderable": false, "targets": [0,2,4] },
            { "width": "25%", "targets": [0] },
            { "width": "30%", "targets": [1] },
            {
                "targets": [ 5 ],
                "visible": false,
                "searchable": false
            },
        ],
        "order": [[ 5, "desc" ]],
        keys: {
            blurable: false
        },
        "ajax": {
            // "url":"https://localhost:44329/api/clinical-trial?title="+title,
            "url": "scripts/serverSideProcessing.php",
            error: function (jqXHR, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + jqXHR.statusText + "\r\n" + jqXHR.responseText + "\r\n" + ajaxOptions.responseText);
                alert("Connection error with data source. Try refreshing the page.")
                alert(JSON.parse(jqXHR.responseText));
            },
            "cache": false,
            "type": "POST",
            "data": function (d) {
                d.title = getProtocolTitleValue();
                d.drug = getDrugNameValue();
                d.sponsor = getSponsorNameValue();
                d.protocol = getProtocolIdValue();
                d.control = getControlIdValue();
                d.status = getStatusIdValue();
                d.condition = getConditionValue();
                d.population = getPopulationIdValue();
                d.nolStart = getNolStartValue();
                d.nolEnd = getNolEndValue();
                d.studyStartFrom = getStudyStartFromDate();
                d.studyStartTo = getStudyStartToDate();
                d.studyEndFrom = getStudyEndFromDate();
                d.studyEndTo = getStudyEndToDate();
                d.lang=getLanguage();
            },
        },
        //'incident.incident_id brandManufacturerList'
        "columns": [
            {
                'data': 'brandManufacturerList',
                'render': function (data, type, full, meta) {
                    //dataList=meta.settings.aoData;

                    sessionStorage.dataList = JSON.stringify(meta.settings.aoData);

                    var result = "";
                    if (data && data.length > 0) {
                        data.forEach(element =>
                            result = result + ", " + element["brand_name"])
                        result = result.substring(2);

                    }
                    return'<input type="submit" name="action" value="'+result+'" aria-rowindex="'+meta.row+'" style="height:100%;text-align: left;white-space: normal;" class=" btn-link btn-block cta-details-link">';
                    //return "<a class='cta-details-link' href='" + meta.row + "' aria-rowindex='" + meta.row + "' role='button'>" + result + "</a>"

                }
            },
            {
                'data': 'protocol_title',
                'render': function (data, type, full, meta) {
                    return data
                }
            },
            {
                'data': 'medConditionList',
                'render': function (data, type, full, meta) {
                    var result = [];

                    if (!data && data.length < 1) return data;
                    data.forEach(element =>
                        result.push(element["med_condition"]))
                    var unique = new Set(result);
                    var html = "";
                    for (let item of unique.values()) {
                        html = html + item + ", ";
                    }
                    if (html && html.length > 2) {
                        html = html.substring(0, html.length - 2)
                    }
                    return html
                }
            },

            {
                'data': 'status',
                'render': function (data, type, full, meta) {
                    return data
                }
            },
            {
                'data': 'studyPopulationList',
                'render': function (data, type, full, meta) {
                    var result = [];

                    if (!data && data.length < 1) return data;
                    data.forEach(element =>
                        result.push(element["population"]))
                    var unique = new Set(result);
                    var html = "";
                    for (let item of unique.values()) {
                        html = html + item + ", ";
                    }
                    if (html && html.length > 2) {
                        html = html.substring(0, html.length - 2)
                    }
                    return html
                }
            },
            {
                'data': 'submission_no',
                'render': function (data, type, full, meta) {
                    return data
                }
            },

        ],
    });
});


function isEnglish() {
    return document.documentElement.lang === "en"
}

function isFrench() {
    return !isEnglish();
}

function getLanguage() {
    if (isFrench()) return "fr";
    return "en";
}

function loadStatus() {
    let select = document.getElementById("status-list");
    let option = document.createElement('option');
    option.text = "All";
    option.value = "";

    select.add(option, 0);
    fetch("./scripts/helper-cta.php?lang=" + getLanguage(), {
        method: "Get",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
    })
        .then((response) => (response.text()))
        .then((res) => {
                if (!res) return;

                let data = JSON.parse(res).data;
                let sortedList = [];
                let n = 1;
                data.forEach(function (element) {
                    let option = document.createElement('option');
                    option.text = element.status;
                    option.value = element.cta_status_id;
                    select.add(option, n);
                    n++;
                })


            }
        )
}

function loadPopulation() {
    let select = document.getElementById("population-list");
    let option = document.createElement('option');
    option.text = "All"; //lang
    option.value = "";


    select.add(option, 0);
    fetch("./scripts/cta-population.php?lang=" + getLanguage(), {
        method: "Get",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
    })
        .then((response) => (response.text()))
        .then((res) => {

                if (!res) return;
                let data = JSON.parse(res).data;


                let sortedList = [];
                let n = 1;
                data.forEach(function (element) {
                    let option = document.createElement('option');
                    option.text = element.population;
                    option.value = element.study_population_id;
                    select.add(option, n);
                    n++;
                })


            }
        )
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
        displayName += data[i] + " " + "<br>";
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
