(function(define){
define(["require", "./has"], function(require){
	// this allows us to use has as a dependency plugin for RequireJS and other AMD loaders (like Dojo). The syntax supports the ternary operation for branching:
	// define("my-module", ["has!array-every?module-using-every:module-using-for-loop"], function(arrayModule){
	// });
	var has;
	return function(id, parentRequire, loaded){
		// split into the different branches, based on has features
		// first parse the id
		console.log("id", id);
		var tokens = id.match(/[\?:]|[^:\?]*/g), i = 0;
		console.log("tokens", tokens);
		has = has || require("./has");
		function get(skip){
			var operator, term = tokens[i++];
			if(term == ":"){
				// empty string module name, resolves to undefined
				return;
			}else{
				// postfixed with a ? means it is a feature to branch on, the term is the name of the feature
				if(tokens[i++] == "?"){ 
					if(!skip && has(term)){
						// matched the feature, get the first value from the options 
						return get();
					}else{
						// did not match, get the second value, passing over the first
						get(true);
						return get(skip);
					}
				}
				// a module
				return term;
			}
		}
		try{
		id = get();
		}catch(e){
			console.error(e);
		}
		console.log("requiring", id);
		if(id){
			parentRequire([id], loaded);
		}
		loaded(null);
	}
});
})(typeof define != "undefined" ? define : function(deps, factory){factory(has);});