(function(has, addtest, cssprops) {

    // String tests
    addtest("string-trim", function(){
        return ({}).toString.call(String.prototype.trim) == "[object Function]";
    });

})(has, has.add, has.cssprops);
