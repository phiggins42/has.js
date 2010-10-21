<!DOCTYPE html>
<html>
<head>
    <style type='text/css'>
        tbody td, thead td {
            font-size:9pt;
        }
        
        thead td {
            border-bottom:1px solid #ededed;
        }
        
        thead td, tbody td {
            padding:2px;
            border-right:1px solid #ededed;
        }
        
        td.yes { background-color:green; }
        td.no { background-color:red; }
        td.maybe { background-color:yellow; }
        td.unknown { background-color:#ededed; }
        
    </style>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title>has.js results matrix</title>
</head>
<body>
    <?php
    
        // load allll the data
        $lines = file("results.data");
        
        // go over each line, adjusting our flat list of data
        // into something like array(
        //      "someuseragent" => array(
        //          $test1, $test2, $test3 // where each are results of a test from this UA
        //      )
        //  )
        $out = array();
        foreach($lines as $line){
            $data = json_decode($line);
            $ua = $data -> useragent;
            if(empty($out[$ua])){
                $out[$ua] = array();
            }
            unset($data -> useragent);
            $out[$ua][] = $data;
        }

        // go over each useragent, and compare each of the tests in the dataset.
        // if they are all the same, display without issue.

        global $master_test_list;
        $master_test_list = array();

        foreach($out as $agent => $dataset){
            
            $numtests = count($dataset);
            
            // pull out all the unique test names we know about
            foreach($dataset as $datapart){
                foreach($datapart as $name => $value){
                    if(!in_array($name, $master_test_list)){
                        $master_test_list[] = $name; 
                    }
                }
            }
            
        }

        function mixdown($results){
            // this is making me insane. trying to cover the cases where a couple
            // things may or may not happen.
            // * some test may not have been written at the time the other data was collected
            //      + in this case we need to specify "unknown" class.
            // * some tests, sorted by useragent, may have varying results. 
            //      + in this case, we need to use 'maybe' class ......
            //      + this is probably bad, as it means perhaps faulty data has
            //        gotten into our suite. 
            // jesus christ i should just flatten the tests immediately. huh?
            $ret = array();
            foreach($results as $test){
                foreach($test as $k => $v){
                    if($v == "true"){
                    //    print $v . ":";
                    }
                    //print $k . "<br>";
                }
            }
        }
    
    ?>
    
    <h1>Thanks!</h1>
    
</body>
</html>