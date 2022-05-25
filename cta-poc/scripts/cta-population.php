<?php
$requestData= $_REQUEST;
$lang=urlencode((string)$requestData['lang']);
if(empty($lang)) $lang="en";
$ch = curl_init();

// set URL and other appropriate options
curl_setopt($ch, CURLOPT_URL, "http://dotnet-dev.hc.local:5008/api/clinical-trial/studypopulation?count=500&format=json&lang=".$lang);
curl_setopt($ch, CURLOPT_HEADER, 0);

// grab URL and pass it to the browser
$response=curl_exec($ch);

// close cURL resource, and free up system resources
curl_close($ch);
//echo $response;
