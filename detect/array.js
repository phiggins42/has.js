(function(has, addtest, cssprop){
    
    // Array tests
    addtest("array-every", function(){
        return typeof [].every == "function";
    });
    
    addtest("array-filter", function(){
        return typeof [].filter == "function";
    });
    
    addtest("array-foreach", function(){
        return typeof [].forEach == "function";
    });
    
    addtest("array-indexof", function(){
        return typeof [].indexOf == "function";
    });
    
    addtest("array-isarray", function(){
        return typeof Array.isArray == "function" && Array.isArray([]);
    });
    
    addtest("array-lastindexof", function(){
        return typeof [].lastIndexOf == "function";
    });
    
    addtest("array-map", function(){
        return typeof [].map == "function";
    });
    
    addtest("array-reduce", function(){
        return typeof [].reduce == "function";
    });
    
    addtest("array-reduceright", function(){
        return typeof [].reduce == "function";
    });
    
    addtest("array-some", function(){
        return typeof [].map == "function";
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
