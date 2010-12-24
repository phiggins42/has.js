define(["has!dom?./a:./b", "has/array!array-every?./a:./b", "./has-plugin-test!true?false?./a:false?./b:./c:./d", "./has-plugin-test!false?a"], function(dom, every, branch, none){
	console.assert(dom === "a","dom");
	console.assert(every === ([].every ? "a": "b"), "every");
	console.assert(branch === "c", "branch");
	console.assert(none === undefined, "undefined");
	console.log("passed tests");
});