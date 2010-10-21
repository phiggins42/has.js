<!DOCTYPE html>
<html>
<head>
    <title>has.js submissions</title>
</head>
<body>
  
    <h1>FTW</h1>

    <?php

    if(!empty($_POST)){
        $data = json_encode($_POST);
        $fp = @fopen("results.data", "a+");
        if($fp){
            fputs($fp, $data . "\n");
            fclose($fp);
            print "<p>Data stashed. Really, <em>Thanks!</em></p>";
        }else{
            print "<p>It appears there was an issue.</p>";
        }
    }else{
        print "<p>No data set sent along?</p>";
    }

?>
<p><a href="runTests.html">back to runTests.html</a></p>
</body>
</html>