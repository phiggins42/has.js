define(["has!dom?./a:./b", "./has-plugin-test!true?false?./a:false?./b:./c:./d", "./has-plugin-test!false?a:"], function(dom, branch, none){
	console.assert(dom === "a","a");
	console.assert(branch === "c", "c");
	console.assert(none === undefined, "undefined");
	console.log("passed tests");
});