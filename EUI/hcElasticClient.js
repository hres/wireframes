//hcElasticClient.js

//JavaScript connection setup to elastic server

var client = new elasticsearch.Client({
  host: "https://elastic-gate.hc.local",
  log: "trace"
})

//jQuery connection setup to elastic server
/*
var client = new $.es.Client({
  hosts: "https://elastic-gate.hc.local:443",
  log: "trace"
});
*/

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

function perfSearch() {

  var index = $("#indexes").val();
  var str = $("#searchquery").val();

  if (str.indexOf(" ") <= 0) {
    client.search({
      index: index,
      body: {
        query: {
          match: {
            "_all": str
          }
        }
      }
    }).then(function (response) {
      postToGoogle(response);
    });
  }
  else {
    client.search({
      index: index,
      body: {
        query: {
          match_phrase: {
            "_all": str
          }
        }
      }
    }).then(function (response) {
      postToGoogle(response);
    });
  }
}

function postToGoogle(jsondata) {

  var data = JSON.stringify(jsondata);

  $("#google").html(data);
}
