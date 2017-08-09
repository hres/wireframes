function start() {
  $.ajax({
    url: "http://elastic-gate.hc.local:80/_cat/indices?format=json",
    method: "GET",
    success: function(response) {
      console.log(response);
    }
  });
}
