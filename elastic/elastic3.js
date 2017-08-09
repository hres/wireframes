function start() {
  $.ajax({
    url: "https://elastic-gate.hc.local:443/_all/_search",
    method: "GET"
    success: function(response) {
      console.log(response);
    }
  });
}
