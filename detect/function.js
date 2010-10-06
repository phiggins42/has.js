 (function(has, addtest, cssprop){

    // Function tests
    addtest("function-bind", function(){
        return "bind" in Function.prototype;
    });

    addtest("function-caller", function() { 
        function test(undefined) { return test.caller !== undefined; }
        return test();
    });

})(has, has.add, has.cssprop);
