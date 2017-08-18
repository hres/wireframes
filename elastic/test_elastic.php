<?php

$response = http_get("https://elastic-gate.hc.local:443/_cat/indices?format=json", array(), $info);

echo $response
?>
