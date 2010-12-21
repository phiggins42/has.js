(function(define){
define(["has"], function(has){
	
    var addtest = has.add;

    if(!has("dom")){ return; }

    var script = document.createElement("script");

    addtest("script-defer", function(){
        return ("defer" in script);
    });

    addtest("script-async", function(){
        return ("async" in script);
    });
	return has;
});
})(typeof define != "undefined" ? define : function(deps, factory){
	factory(has); // use global has() if a module system is not available 
});

