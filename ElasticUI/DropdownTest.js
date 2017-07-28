$(document).ready(function () {

    var tst = [{
      "health": "yellow",
      "status": "open",
      "index": "drug_mono_5_test",
      "uuid": "S_gAAxDPT3mA7SSLzKnvrg",
      "pri": "5",
      "rep": "1",
      "docs.count": "37405",
      "docs.deleted": "7843",
      "store.size": "4.8gb",
      "pri.store.size": "4.8gb"
    },
    {
      "health": "yellow",
      "status": "open",
      "index": "ecommerce",
      "uuid": "DcNw3C9UTb-E_-1rwhgF5Q",
      "pri": "5",
      "rep": "1",
      "docs.count": "0",
      "docs.deleted": "0",
      "store.size": "795b",
      "pri.store.size": "795b"
    },
    {
      "health": "green",
      "status": "open",
      "index": "drug_mono3",
      "uuid": "o5kIvEPWQambZEPlCG1g6w",
      "pri": "5",
      "rep": "0",
      "docs.count": "30557",
      "docs.deleted": "453",
      "store.size": "3gb",
      "pri.store.size": "3gb"
    },
    {
      "health": "yellow",
      "status": "open",
      "index": ".river_web",
      "uuid": "sCulfWINQeWU3rsNgtKbJA",
      "pri": "5",
      "rep": "1",
      "docs.count": "1",
      "docs.deleted": "0",
      "store.size": "10.8kb",
      "pri.store.size": "10.8kb"
    },
    {
      "health": "green",
      "status": "open",
      "index": ".tasks",
      "uuid": "NdKGzglxSKiwaEL8gisYFQ",
      "pri": "1",
      "rep": "0",
      "docs.count": "4",
      "docs.deleted": "0",
      "store.size": "25.1kb",
      "pri.store.size": "25.1kb"
    },
    {
      "health": null,
      "status": "close",
      "index": "drug_mono",
      "uuid": "J-VJv-ykQICp8-KO8uAp-Q",
      "pri": null,
      "rep": null,
      "docs.count": null,
      "docs.deleted": null,
      "store.size": null,
      "pri.store.size": null
    },
    {
      "health": "green",
      "status": "open",
      "index": "webindex",
      "uuid": "f1CM0IG1Qfi0oryMMiwTlw",
      "pri": "10",
      "rep": "0",
      "docs.count": "0",
      "docs.deleted": "0",
      "store.size": "1.5kb",
      "pri.store.size": "1.5kb"
    },
    {
      "health": "yellow",
      "status": "open",
      "index": ".kibana",
      "uuid": "Tw4sH7LpS8OYv72aMh8XEw",
      "pri": "1",
      "rep": "1",
      "docs.count": "41",
      "docs.deleted": "7",
      "store.size": "124.2kb",
      "pri.store.size": "124.2kb"
    },
    {
      "health": "green",
      "status": "open",
      "index": "spm_20170711",
      "uuid": "Zz8qhAESR4ifrngrr8SeEA",
      "pri": "10",
      "rep": "0",
      "docs.count": "10566",
      "docs.deleted": "0",
      "store.size": "207.3mb",
      "pri.store.size": "207.3mb"
    },
    {
      "health": "yellow",
      "status": "open",
      "index": "test_pm-2017-07",
      "uuid": "VUv-NVJ1TzWroiqq03iMSw",
      "pri": "5",
      "rep": "1",
      "docs.count": "1715",
      "docs.deleted": "2",
      "store.size": "152mb",
      "pri.store.size": "152mb"
    }];

    var disp = "";

    for (var i = 0; i < tst.length; i++) {
      disp += "<option>" + tst[i].index + "</option>";
    }

    $("#indexes").html(disp);
});
