<?php

$data = json_encode($_POST);
$fp = fopen("results.data", "a+");
fputs($fp, $data . "\n");
fclose($fp);

header("Location: results.php");
