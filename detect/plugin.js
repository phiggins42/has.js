(function(define){
define(["has"], function(has){
	// this allows us to use has as a dependency plugin for RequireJS and other AMD loaders (like Dojo). The syntax is:
	// define("my-module", ["has!array-every:module-using-every,default:module-using-for-loop"], function(arrayModule){
	// });
	return function(require, id, loaded){
		// split into the different branches
		var branches = id.split(",");
		for(var i = 0; i < branches.length; i++){
			// break into feature to check and module id to load
			var featureModule = branches[i].split(":");
			if(has(featureModule[0])){
				// passed feature test, require it asynchronously and call loaded when it loaded
				return require([featureModule[1]], loaded);
			}
		}
		// no matches, return null
		loaded(null);
	}
	// provide a default test that always returns true
	has.addtest("default", function(){
		return true;
	});
});
})(typeof define != "undefined" ? define : function(deps, factory){factory(has);});