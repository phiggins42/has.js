(function(has, addtest, cssprop){

    var toString = {}.toString,
        NEW_DATE = new Date,
        FUNCTION_CLASS = "[object Function]";

    // Date tests
    addtest("date-toisostring", function(){
        return toString.call(NEW_DATE.toISOString) == FUNCTION_CLASS;
    });

    addtest("date-tojson", function(){
        return toString.call(NEW_DATE.toJSON) == FUNCTION_CLASS;
    });

    addtest("date-now", function(){
        return toString.call(Date.now) == FUNCTION_CLASS;
    });

})(has, has.add, has.cssprop);
