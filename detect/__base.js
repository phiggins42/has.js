(function(define){
define(["has"], function(has){
	
    var addtest = has.add,
    	STR = "string",
        FN = "function"
    ;

    // above this line is "boilerplate" template for all test groupings.
    // while each module has it's own enclosing function, these strings
    // and aliases passed through the self-executing-anon-function are
    // common across all tests. This is so we can blindly pull parts
    // of other test modules into a single rollup. Tests should be 
    // "as standalone as humanly possible", with some exceptions (and 
    // then, only for the benefit of performance and sharing)

    // put your tests here, eg:
    addtest("has-test-skeleton", function(global, document, anElement){
        return true; // Boolean
    });
	return has;
});
})(typeof define != "undefined" ? define : function(deps, factory){
	factory(has); // use global has() if a module system is not available 
});

