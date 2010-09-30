(function(has, addtest, cssprop){

    var script = document.createElement('script');

    addtest("script-defer", function() {
        return !!("defer" in script);
    });

    addtest("script-async", function(){
        return !!("async" in script);
    });    

})(has, has.add, has.cssprop);
