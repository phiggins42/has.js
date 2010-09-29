(function(has, addtest, cssprops) {


    // Array tests
    addtest("array-foreach", function(){
        return "forEach" in [];
    });

    addtest("array-isarray", function(){
        return "isArray" in Array && Array.isArray([]);
    });

    addtest("array-map", function(){
        return "map" in [];
    });
    
    addtest("array-es5", function(){
        var ar = [];
        return has("array-isarray") && ("indexOf" in ar) && ("lastIndexOf" in ar) &&
            ("every" in ar) && ("some" in ar) && has("array-foreach") &&
            has("array-map") && ("filter" in ar) && ("reduce" in ar) && ("reduceRight" in ar);
    });


})(has, has.add, has.cssprops);
