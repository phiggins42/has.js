(function(define){
define(["has"], function(has){
	
    var addtest = has.add,
    	STR = "string",
        FN = "function"
    ;

    // JSON tests
    addtest("json-parse", function(g){
        var parsed, supported = false;
        if("JSON" in g && typeof JSON.parse == FN){
          parsed = JSON.parse('{"a":true}');
          supported = !!(parsed && parsed.a);
        }
        return supported;
    });

    addtest("json-stringify", function(g){
        return ("JSON" in g) && typeof JSON.stringify == FN && JSON.stringify({a:true}) == '{"a":true}';
    });

});
})(typeof define != "undefined" ? define : function(deps, factory){
	factory(has); // use global has() if a module system is not available 
});
