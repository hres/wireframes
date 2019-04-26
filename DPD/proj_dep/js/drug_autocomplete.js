"use strict";
$(document).ready(function () {
    autocompleteInit()
});

/**
 * Initializes the functionality for all the events for JQuery-ui autocomplete plugin
 * Depends upon the following (must be loaded first):
 * getAutoTerms,extractLast,selectAutoTerms
 */
function autocompleteInit() {
    var _GLOBAL = window.DRUG;
    $(_GLOBAL.SEARCH_BOX_ID)
    // don't navigate away from the field on tab when selecting an item
        .on("keydown", function (event) {

            if (event.keyCode === $.ui.keyCode.TAB &&
                $(this).autocomplete("instance").menu.active) {
                event.preventDefault();
            }
            if (event.keyCode === 13) {
                var curr = $(".selector").val();
                if (!curr) {
                    return true;
                }else if(curr.length===0) {
                    //never happens
                    return true;
                }
            }
        })
        .autocomplete({
            source: function (request, response) {
                // delegate back to autocomplete, but extract the last term
                response = getAutoTerms(request, response);
            },
            minLength: _GLOBAL.AUTOCOMPLETE_MIN_LENGTH,
            search: function () {
                extractLast(this.value);
            },
            focus: function () {
                // prevent value inserted on focus
                return false;
            },
            select: function (event, ui) {
                this.value = selectAutoTerms(ui, event, this.value);
                return false;
            }
        });
}




function end() {

    $("#drug-table").attr("hidden", true);
    $("#pagination").attr("hidden", true);
    $("#empty").attr("hidden", false);
}

function makeDate(iso) {

    const d = new Date(iso);
    const month = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate()

    return d.getFullYear() + "-" + month + "-" + day;
}
