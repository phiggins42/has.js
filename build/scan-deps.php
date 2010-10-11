<?php

    $alltests = array(
        "tests" => array(),
        "uses" => array()
    );

    $files = find_modules();
    
    foreach($files as $file){
        
        print "checking $file\n";
        $data = file_get_contents("../detect/" . $file);

        $uses = find_uses($data);
        $tests = find_tests($data);
        
        foreach($uses as $item){
            $alltests['uses'][] = $item;
        }
        
        foreach($tests as $item){
            $alltests['tests'][] = $item;
        }
        
    }

    print_r($alltests);
    
    function find_tests($file){
        
        $re = "/addtest\([\"\'](.*)[\"\'],/";
        preg_match_all($re, $file, $matches);
        return $matches[1];
        
    }
    
    function find_uses($file){
        $re =  "/has\([\"\']([a-zA-Z-_]+)[\"\']\)/";
        preg_match_all($re, $file, $matches);
        return $matches[1];
    }
    
    function find_modules($d = "../detect/", $f = "*.js"){
        foreach(array_diff(scandir($d),array('.','..')) as $f)if(is_file($d.'/'.$f)&&(($x)?ereg($x.'$',$f):1))$l[]=$f;
        return $l;
    }