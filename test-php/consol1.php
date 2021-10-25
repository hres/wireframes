<?php
$text = $_POST['text'];
function get_contents2()
{
    #$headersResult = [];
    $ch = curl_init();
    $rangeReturned = -1;
    $headersSend = [
        'Prefer:count=exact',
        'Range-Unit:items'
    ];

    curl_setopt_array($ch, array(
        CURLOPT_RETURNTRANSFER => 1,
        CURLOPT_SSL_VERIFYPEER => 0,     // Disabled SSL Cert checks
        #CURLOPT_HTTPHEADER => $headersSend,
        CURLOPT_URL => "http://dotnet-dev.hc.local/api/drug/drugproduct2?count=50&lang=en"
    ));


    $output = curl_exec($ch);

    return $output;

}

echo get_contents2();


