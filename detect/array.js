(function(has, addtest, cssprop){
    
    var toString = {}.toString,
        FUNCTION_CLASS = '[object Function]';
    
    // Array tests
    addtest("array-every", function(){
        return toString.call([].every) == FUNCTION_CLASS;
    });
    
    addtest("array-filter", function(){
        return toString.call([].filter) == FUNCTION_CLASS;
    });
    
    addtest("array-foreach", function(){
        return toString.call([].forEach) == FUNCTION_CLASS;
    });
    
    addtest("array-indexof", function(){
        return toString.call([].indexOf) == FUNCTION_CLASS;
    });
    
    addtest("array-isarray", function(){
        return toString.call(Array.isArray) == FUNCTION_CLASS &&
            Array.isArray([]) === true;
    });
    
    addtest("array-lastindexof", function(){
        return toString.call([].lastIndexOf) == FUNCTION_CLASS;
    });
    
    addtest("array-map", function(){
        return toString.call([].map) == FUNCTION_CLASS;
    });
    
    addtest("array-reduce", function(){
        return toString.call([].reduce) == FUNCTION_CLASS;
    });
    
    addtest("array-reduceright", function(){
        return toString.call([].reduce) == FUNCTION_CLASS;
    });
    
    addtest("array-some", function(){
        return toString.call([].map) == FUNCTION_CLASS;
    });
    
    addtest("array-es5", function(){
        return has("array-every") && has("array-filter") && has("array-foreach") &&
            has("array-indexof") && has("array-isarray") && has("array-lastindexof") &&
            has("array-map") && has("array-reduce") && has("array-reduceright") &&
            has("array-some");
    });
    
    addtest('array-slice-nodelist', function(g, d, el){
        var supported = true, de = d.documentElement, id = de.id;
        // Opera 9.25 bug
        de.id = 'length';
        // older Safari will return an empty array
        try { supported = !![].slice.call(d.childNodes, 0)[0]; } catch(e) { }
        de.id = id;
        return supported;
    });

})(has, has.add, has.cssprop);
