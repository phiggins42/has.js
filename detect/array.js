(function(has, addtest, cssprop){

    var EMPTY_ARRAY = [],
        STR = "string",
        FN = "function"
    ;

    // Array tests
    addtest("array-every", function(){
        return typeof EMPTY_ARRAY.every == FN;
    });

    addtest("array-filter", function(){
        return typeof EMPTY_ARRAY.filter == FN;
    });

    addtest("array-foreach", function(){
        return typeof EMPTY_ARRAY.forEach == FN;
    });

    addtest("array-indexof", function(){
        return typeof EMPTY_ARRAY.indexOf == FN;
    });

    addtest("array-isarray", function(){
        return typeof Array.isArray == FN && Array.isArray(EMPTY_ARRAY);
    });

    addtest("array-lastindexof", function(){
        return typeof EMPTY_ARRAY.lastIndexOf == FN;
    });

    addtest("array-map", function(){
        return typeof EMPTY_ARRAY.map == FN;
    });

    addtest("array-reduce", function(){
        return typeof EMPTY_ARRAY.reduce == FN;
    });

    addtest("array-reduceright", function(){
        return typeof EMPTY_ARRAY.reduce == FN;
    });

    addtest("array-some", function(){
        return typeof EMPTY_ARRAY.some == FN;
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
