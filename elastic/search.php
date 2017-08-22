<?php
echo "hello world";
$file_path = "https://elastic-gate.hc.local:443/_cat/indices";
$content = file_get_contents($file_path);
echo $content;
 echo "<script>console.log( 'PHP: " . $content . "' );</script>"
