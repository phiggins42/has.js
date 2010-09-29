(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;   


    // JSON tests
    addtest("json-parse", function(global){
        return !!("JSON" in global && typeof JSON.parse == FN && JSON.parse('{"a":true}').a);
    });
    
    addtest("json-stringify", function(global){
        return !!("JSON" in global && typeof JSON.stringify == FN && JSON.stringify({a:true}) == '{"a":true}');
    });

})(has, has.add, has.cssprop);