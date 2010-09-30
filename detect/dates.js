(function(has, addtest, cssprop){

    // Date tests
    addtest("date-toisostring", function(){
        return "toISOString" in Date.prototype;
    });

    addtest("date-tojson", function(){
        return "toJSON" in Date.prototype;
    });

    addtest("date-now", function(){
        return "now" in Date;
    });

})(has, has.add, has.cssprop);
