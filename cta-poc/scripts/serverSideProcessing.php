<?php

$curl = curl_init();
//worked
$requestData= $_REQUEST;
$input_protocol_title=urlencode((string)$requestData['title']);
$input_drug_name=urlencode((string)$requestData['drug']);
$input_sponsor_name=urlencode((string)$requestData['sponsor']);
$input_protocol_id=urlencode((string)$requestData['protocol']);
$input_control_id=urlencode((string)$requestData['control']);
$input_condition=urlencode((string)$requestData['condition']);
$input_population=urlencode((string)$requestData['population']);
$input_status=urlencode((string)$requestData['status']);
$input_nol_start=urlencode((string)$requestData['nolStart']);
$input_nol_end=urlencode((string)$requestData['nolEnd']);
$input_study_start_from=urlencode((string)$requestData['studyStartFrom']);
$input_study_start_to=urlencode((string)$requestData['studyStartTo']);
$input_study_end_from=urlencode((string)$requestData['studyEndFrom']);
$input_study_end_to=urlencode((string)$requestData['studyEndTo']);
$input_lang=urlencode((string)$requestData['lang']);


$encoded_vals=(http_build_query($requestData));
$url_concat='http://dotnet-dev.hc.local/api/clinical-trial?drugName='.$input_drug_name.'&title='.$input_protocol_title.
    '&sponsor='.$input_sponsor_name.'&protocolId='.$input_protocol_id.'&controlNumber='.$input_control_id
    .'&pop='.$input_population.'&status='.$input_status .'&condition='.$input_condition.'&nolStartDate='.$input_nol_start
    .'&nolEndDate='.$input_nol_end.'&trialStartDateFrom='.$input_study_start_from.'&trialStartDateTo='.$input_study_start_to
    .'&trialEndDateFrom='.$input_study_end_from.'&trialEndDateTo='.$input_study_end_to.'&lang='.$input_lang;
//http://dotnet-dev.hc.local/api/clinical-trial/fullsearch?count=500&lang=en&title=tt&drugName=ner&sortAsc=true


curl_setopt_array($curl, array(
    CURLOPT_URL => $url_concat,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => $encoded_vals,
    CURLOPT_HTTPHEADER => array(
        'Content-Type: application/x-www-form-urlencoded'
    ),
));
$response = curl_exec($curl);
curl_close($curl);
/*if(empty($response)){
    $response="{data:[]}";
}*/
echo $response;
