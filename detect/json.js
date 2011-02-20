(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;

    // JSON tests
    addtest("json-parse", function(g){
        var parsed,
            supported = false;
        if("JSON" in g && typeof JSON.parse == FN){
          parsed = JSON.parse('{"a":true}');
          supported = !!(parsed && parsed.a);
        }
        return supported;
    });

    addtest("json-stringify", function(g){
        return ("JSON" in g) && typeof JSON.stringify == FN && JSON.stringify({a:true}) == '{"a":true}';
    });

})(has, has.add, has.cssprop);