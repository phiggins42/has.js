(function(define){
define(["has"], function(has){

    var toString = {}.toString,
    	addtest = has.add,
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

});
})(typeof define != "undefined" ? define : function(deps, factory){
	factory(has); // the use global has() if a module system is not available 
});

