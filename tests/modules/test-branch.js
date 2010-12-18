define(["has!dom?./a:./b", "./has-plugin-test!true?false?./a:false?./b:./c:./d", "./has-plugin-test!false?a:"], function(dom, branch, none){
	console.log("dom", dom);
	console.log("branch", branch);
	console.log("none", none);
	console.assert(dom === "a");
	console.assert(branch === "c");
	console.assert(none === null);
	console.log("passed tests");
});