(function(has, addtest, cssprops)


    // String tests
    addtest("string-trim", function(){
        return "trim" in String.prototype;
    });


})(has, has.add, has.cssprops);
