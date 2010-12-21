(function(define){
define(["has"], function(has){
	
    var addtest = has.add,
    	toString = {}.toString,
        FUNCTION_CLASS = "[object Function]";

    // Function tests
    addtest("function-bind", function(){
        return toString.call(Function.bind) == FUNCTION_CLASS;
    });

    addtest("function-caller", function(){ 
        function test(){ return test.caller !== undefined; }
        return test();
    });

});
})(typeof define != "undefined" ? define : function(deps, factory){
	factory(has); // use global has() if a module system is not available 
});

