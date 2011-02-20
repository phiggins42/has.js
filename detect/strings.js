(function(has, addtest, cssprop){

    // String tests
    addtest("string-trim", function(){
        return {}.toString.call(''.trim) == "[object Function]";
    });

})(has, has.add, has.cssprop);
