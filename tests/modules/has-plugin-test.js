define(["has"], function(has){
	has.add("true", true);
	has.add("false", function(){
		return false;
	});
	return has;
});