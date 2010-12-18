define(["has!dom?./a:./b", "./has-plugin-test!true?false?./a:false?./b:./c:./d"], function(dom, branch){
	console.log("dom", dom);
	console.log("branch", branch);
	console.assert(dom === "a");
	console.assert(branch === "c");
	console.log("passed tests");
});