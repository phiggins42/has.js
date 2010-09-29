 (function(has, addtest, cssprops) {

    // Function tests
    addtest("function-bind", function(){
        return "bind" in Function.prototype;
    });

    addtest("function-caller", (function(undefined) { 
        function test() { return test.caller !== undefined; }
        return test();
    })());


})(has, has.add, has.cssprops);
