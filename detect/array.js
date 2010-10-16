(function(has, addtest, cssprop){

    var toString = {}.toString,
        EMPTY_ARRAY = [],
        FUNCTION_CLASS = "[object Function]";

    // Array tests
    addtest("array-every", function(){
        return toString.call(EMPTY_ARRAY.every) == FUNCTION_CLASS;
    });

    addtest("array-filter", function(){
        return toString.call(EMPTY_ARRAY.filter) == FUNCTION_CLASS;
    });

    addtest("array-foreach", function(){
        return toString.call(EMPTY_ARRAY.forEach) == FUNCTION_CLASS;
    });

    addtest("array-indexof", function(){
        return toString.call(EMPTY_ARRAY.indexOf) == FUNCTION_CLASS;
    });

    addtest("array-isarray", function(){
        return toString.call(Array.isArray) == FUNCTION_CLASS &&
            Array.isArray(EMPTY_ARRAY) === true;
    });

    addtest("array-lastindexof", function(){
        return toString.call(EMPTY_ARRAY.lastIndexOf) == FUNCTION_CLASS;
    });

    addtest("array-map", function(){
        return toString.call(EMPTY_ARRAY.map) == FUNCTION_CLASS;
    });

    addtest("array-reduce", function(){
        return toString.call(EMPTY_ARRAY.reduce) == FUNCTION_CLASS;
    });

    addtest("array-reduceright", function(){
        return toString.call(EMPTY_ARRAY.reduce) == FUNCTION_CLASS;
    });

    addtest("array-some", function(){
        return toString.call(EMPTY_ARRAY.some) == FUNCTION_CLASS;
    });

    addtest("array-es5", function(){
        return has("array-every") && has("array-filter") && has("array-foreach") &&
            has("array-indexof") && has("array-isarray") && has("array-lastindexof") &&
            has("array-map") && has("array-reduce") && has("array-reduceright") &&
            has("array-some");
    });

    addtest("array-slice-nodelist", function(g, d, el){
        var supported = true,
            de = d.documentElement,
            id = de.id;

        // Opera 9.25 bug
        de.id = "length";
        // older Safari will return an empty array
        try{
            supported = !!EMPTY_ARRAY.slice.call(d.childNodes, 0)[0];
        }catch(e){}

        de.id = id;
        return supported;
    });

})(has, has.add, has.cssprop);
