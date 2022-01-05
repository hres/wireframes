/**
 * Creates a table header with captions for each column
 * @param tableName- the ID of the table to lookup
 * @param data -an array of heading names
 */
function generateTableHead(tableName, data) {
    var table = document.getElementById(tableName)
    var thead = table.createTHead();
    var row = thead.insertRow();
     for (var i=0; i<data.length;i++) {
      var th = document.createElement("th");
      var text = document.createTextNode(data[i]);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

/***
 * Generates the table caption. Uses wb-inv property to make invisible
 * @param tableName - the id of the table to modify
 * @param captionText- the text to add
 */
function generateTableCaption(tableName,captionText){
    var table = document.getElementById(tableName)
    if(table){
    var captionHTML = table.createCaption();
    captionHTML.innerHTML = captionText;
    captionHTML.className+="wb-inv" //invisible WET
    }
    else{
        console.warn("generateTableCaption:No table found")
    }
}

/***
 * Formats a date to the GoC standard of YYYY-MM-DD
 * @param date -date string to format
 * @returns {string}
 */
function formatDate(date) {
    if(!date) return "";
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    console.log(d.toString())
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

/***
 * Converts text to Title case- first letter of each word is capitalized
 * @param str - the string to convert
 * @returns {string}
 */
function titleCase(str) {
    if(!str) return "";
    str=str.trim(); //leading and lagging spaces cause a failure
    return str.toLowerCase().split(' ').map(function(word) {
        var result="";
        if(word) {
            result = word.replace(word[0], word[0].toUpperCase());
        }
        return result;
    }).join(' ');
  }


function upperCaseCovid( str){

    if(!str) return "";


    const regex = /covid-19/gi;
    var modResult=str.replace(regex,"COVID-19")

    return modResult;
}
function upperCaseSars( str){

    if(!str) return "";
    const regex = /sars-cov-2/gi;
    var modResult=str.replace(regex,"SARS-COV-2")

    return modResult;
}
function upperCaseiGG( str){

    if(!str) return "";
    const regex = /igg/gi;
    var modResult=str.replace(regex,"IgG")

    return modResult;
}
function upperCaseIGM( str){

    if(!str) return "";
    const regex = /igm/gi;
    var modResult=str.replace(regex,"IgM")

    return modResult;
}



function replaceNewLine(str){
    if(!str) return "";
    const regex=/\r?\n/g;
    return str.replace(regex, "<br /> ");
}

function bracketsUpperCase(str){
    if(!str) return "";
    const regexRoundBrackets = /\(.*?\)/gm;
    return str.replace(regexRoundBrackets,function(word) {
        return word.toLocaleUpperCase();
    });
}

function bracketsTitleCase(str){
    if(!str) return "";
    const regexRoundBrackets = /\(.*?\)/gm;
   /// return str.replace(regexRoundBrackets,function(word) {
            //account for the bracket Uppercase on space bracket,dash or slash
        var tt= str.toLowerCase().replace(/(?:^|[\s\\(-/])[A-Za-zÀ-ÖØ-öø-ÿ]/g, function (match) {
            return match.toUpperCase();
        });

        return tt
  //  });
}
function forwardSlashUpperCase(str){
    const regex = /\/.* /ig;
    if(!str) return "";
    return str.replace(regex,function(word) {
        return word.toLocaleUpperCase();
    });
    //return str.replace(regex,word=>word.toLocaleUpperCase())
}

//applies MDIOL regex rules
function applyAllWordRegex(str){
    if(!str) return;
    var modResult=str
        .replace(/covid/gi,"COVID")
        .replace(/covid-19/gi,"COVID-19")
        .replace(/cov-2/gi,"CoV-2")
        .replace(/ppe/gi,"PPE")
        .replace(/sars/gi,"SARS")
        .replace(/pcr/gi,"PCR")
        .replace(/igm/gi,"IgM")
        .replace( /igg/gi,"IgG")
        .replace(/uv/gi,"UV")
        .replace(/kn95/gi,"KN95")
        .replace(/ffp/gi,"FFP")
        .replace(/rsv/gi,"RSV")
        .replace(/(^|\s+)Ab/," AB")
        .replace(/(^|\s+)Ab(\s+|$)/," AB")
        .replace(/uv/gi,"UV")
        .replace(/ffp/gi,"FFP")
        .replace(/(^|\s+)Ag/," AG")
        .replace(/(^|\s+)Ag(\s+|$)/," AG")
        .replace(/ncov/gi,"NCoV")
        .replace(/mri/gi,"MRI")
        .replace(/(^|\s+)ct(\s+|$)/,"CT")
        .replace(/iga/gi,"IgA")
    return modResult;
    //COVID, COVID-19, CoV-2, PPE, SARS, PCR, IgM, IgG, UV, KN95, FFP, RSV, AB, AG, NCoV, MRI, CT, IgA
    //const regex = /(^|\s+)ct(\s+|$)/
}



function escapeRegExp(text) {

    return text.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}



/**
 * Gets the values for a given key. Used for language but could be used for others
 * @param lang the key to search for
 * @param data the json data to search
 * @returns {Array}
 */

  function getLocalizedArray(lang, data){
    if(!lang) lang="en";
    //assumes key value pair of en:title, fr:title
    var _headings=[];
    var keys=Object.keys(data)
     for (var i=0; i<keys.length;i++) {
        var rec=data[keys[i]];
        _headings.push(rec[lang])
    }
    return _headings;
}

/***
 *  Returns the language of the page. Defaults to English if not set
 * @param document - jquery document object
 * @returns {string} fr or en for Canada
 */
function getLanguage(document){

    //get lang from document
    if (document && document.documentElement && document.documentElement.lang === "fr"){
        return "fr";
    }
    return "en";
}

/**
 * Sets up the table for display
 * @param table_id - the id set in html of the table
 * @param page_length -number or rows per page
 * @param headingsArray - the   array of headings
 * @param searchText - the searchText parameters for the WET table
 */
function setupTable(table_id,page_length,headingsArray,searchText){
  /*  $(("#"+table_id)).attr("data-wb-tables", searchText)
        .attr("data-page-length", (""+page_length));*/
    //generateTableCaption(table_id,table_caption);
    setupTableNoHeader(table_id,page_length,searchText)
    generateTableHead(table_id,headingsArray);
}

function setupTableNoHeader(table_id,page_length,searchText){
    $(("#"+table_id)).attr("data-wb-tables", searchText)
        .attr("data-page-length", (""+page_length));

}



/***
 * Gets the caption for the table. SET THE CAPTION JSON FOR YOUR IMPLEMENTATION
 * @param lang - the language of the caption
 * @param data- the json to search
 * @returns string in the language of the caption. Defaults english
 */
function getCaption(lang,data){
    if(!lang) lang="en";
    return data[lang];
}

function OnFail(result) {
	console.error("There was an error "+result)
    //window.location.href = "./genericError.html";
}
