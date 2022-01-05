/*
 * Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
 * wet-boew.github.io/wet-boew/License-en.html / wet-boew.github.io/wet-boew/Licence-fr.html
 */
/*jshint unused: false*/
( function( $, wb ) {
"use strict";

wb.doc.on( "click vclick", "#overlay-open-btn", function( event ) {
	console.log("Startered")
	if ( event.stopPropagation ) {
		event.stopImmediatePropagation();
	} else {
		event.cancelBubble = true;
	}
	console.log("hjere")
	$( "#" + $( "#overlay-select" ).val() ).trigger( "open.wb-overlay" );
} );

} )( jQuery, wb );





document.onclick = function (e) {
	e = e ||  window.event;
	var element = e.target || e.srcElement;
	if (element.tagName == 'A') {
		window.lastElement=element;
		someFunction(element.getAttribute('aria-rowindex'));
		return false; // prevent default action and stop event propagation
	}
};



function someFunction(index)
{

	//var detailsData=window.dataList[href]._aData;
	let parsedData= JSON.parse(sessionStorage.dataList)
	if(!parsedData) return;
	let detailsData= parsedData[index]._aData;
	if(!detailsData) return;
	document.getElementById('data-nol').innerHTML=detailsData.nol_date;
	document.getElementById('data-date-start').innerHTML=detailsData.start_date;
	document.getElementById('data-date-end').innerHTML=detailsData.end_date;
	document.getElementById('data-title').innerHTML=detailsData.protocol_title;
	document.getElementById('data-protocol-number').innerHTML=detailsData.protocol_no;
	document.getElementById('data-drug-name').innerHTML=detailsData.name_concat;
	document.getElementById('data-control-number').innerHTML=detailsData.submission_no;
	document.getElementById('data-status').innerHTML=detailsData.status;

		var brandConcat="";
		var sponsorConcat="";
		if(detailsData.brandManufacturerList && detailsData.brandManufacturerList.length>0){
			detailsData.brandManufacturerList.forEach(function(element) {
				brandConcat=brandConcat+", "+element["brand_name"];
				sponsorConcat+=", "+element["sponsor_name"];
			})
			brandConcat=brandConcat.substring(2);
			sponsorConcat=sponsorConcat.substring(2);

		}
	document.getElementById('data-drug-name').innerHTML=brandConcat;
		var conditionList=[];
		//if(!detailsData && detailsData.medConditionList.length<1) return "";
	detailsData.medConditionList.forEach(element =>
			conditionList.push(element["med_condition"]))
		var unique=new Set(conditionList);
		var conditionConcat="";
		for (let item of unique.values()){
			conditionConcat=conditionConcat+item+", ";
		}
		if(conditionConcat && conditionConcat.length>2) {
			conditionConcat = conditionConcat.substring(0, conditionConcat.length - 2)
		}
	document.getElementById('data-med-condition').innerHTML=conditionConcat;
	document.getElementById('data-sponsor').innerHTML=sponsorConcat;

	 $( "#mid-screen").trigger( "open.wb-overlay" );
	return false;
}

$( document ).on( "closed.wb-overlay", ".wb-overlay", function( event ) {
	console.warn("trggered")
	window.lastElement.focus();
});