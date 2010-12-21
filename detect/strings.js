(function(define){
define(["has"], function(has){
	
    var addtest = has.add;

    // String tests
    addtest("string-trim", function(){
        return ({}).toString.call(''.trim) == "[object Function]";
    });

	return has;
});
})(typeof define != "undefined" ? define : function(deps, factory){
	factory(has); // use global has() if a module system is not available 
});

