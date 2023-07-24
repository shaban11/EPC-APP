<?php

    header('Content-Type: application/json; charset=UTF-8');

    $ch = curl_init();
    
    // $url='https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=&rows=10&sort=population&facet=timezone&facet=country&refine.country_code='. $_REQUEST['countryCode'];
    $url= '-v -X GET  -H "Accept: text/csv" -H "Authorization: Basic c2hhYmFucEBob3RtYWlsLmNvLnVrOjI2MTVjZWQzNDc1NmE1ZGQ4ODZhMDY3YjljMTVhM2ZhYWQzYmI0NDE=" "https://epc.opendatacommunities.org/api/v1/domestic/search"';

    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    $response = curl_exec($ch);

    if($err = curl_error($ch)) {
        echo $err;
    } else {
        $cities = json_decode($response, true);

        $output['status']['code'] = "200";
        $output['status']['name'] = "ok";
        $output['status']['description'] = "success";
        $output['data']['cities'] = $cities;
    
    }

    echo json_encode($output); 

    curl_close($ch)

?>
