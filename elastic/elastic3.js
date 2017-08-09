function start() {
  $.ajax({
    url: "https://elastic-gate.hc.local:443/_cat/indices?format=json",
    method: "GET",
    success: function(response) {
      console.log(response);
    }
  });
}
