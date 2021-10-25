
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
        CURLOPT_HTTPHEADER => $headersSend,
        CURLOPT_URL => "https://rest-dev.hres.ca/dpd/dpd_search?select=drug_product&search=fts.aa-telmisartan-amlodipine&order=drug_product-%3E%3Ebrand_name"
    ));
    curl_setopt($ch, CURLOPT_HEADERFUNCTION,
        function ($curl, $header) use (&$rangeReturned) {
            $len = strlen($header);
            $header = explode(':', $header, 2);
            if (count($header) < 2) // ignore invalid headers
                return $len;
            if (strcmp("content-range", strtolower(trim($header[0]))) == 0) {
                list($part1, $rangeReturned) = explode('/', trim($header[1]));
            }
            return $len;
        }
    );
    $output = curl_exec($ch);
    // print_r($headersResult);
    //print_r($rangeReturned);

    #$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    #$header = substr($output, 0, $header_size);
    # var_dump($header);
    #$body = substr($output, $header_size);
    #var_dump(json_encode($output));
    #return $rangeReturned;
    $myObj = new stdClass();
    $myObj->maxCount = $rangeReturned;
    $myObj->data = json_decode($output);
    return (json_encode($myObj,JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PARTIAL_OUTPUT_ON_ERROR));

}
echo get_contents2();


