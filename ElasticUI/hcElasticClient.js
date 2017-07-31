//hcElasticClient.js

//jQuery connection setup to elastic server
var client = new $.es.Client({
  hosts: "https://elastic-gate.hc.local",
  log: "trace"
});

$(document).ready(function () {

  //populate dropdown menu to current list of indexes

  client.cluster.health({}, function () {
    console.log("health");
  })

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

function perfSearch () {

  var index = $("#indexes").val();

    client.search({
      index: index,
      body: {
        query: {
          match_all: {}
        }
      }
    });
}

function postToGoogle (jsondata) {

  $("#google").html(data);
}
