<?php
$text = $_POST['text'];
$output = wordwrap($text, 60, "<br>");
echo $output;
?>
