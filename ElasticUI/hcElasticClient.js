//hcElasticClient.js

var client = new $.es.Client({
  hosts: "http://elastic-gate.hc.local",
  log: "trace"
});

$(document).ready(function () {

  //populate dropdown menu to contain current list of indexes

  client.cat.indices({
    format: "json",
  }).then(function (response) {

    var disp = "";

    for (var i = 0; i < response.length; i++) {
      disp += "<option>" + response[i].index + "</option>";
    }

    $("#indexes").html(disp);
  });
});
