(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;   

    // JSON tests
    addtest("json-parse", function(global){
        var parsed, supported = false;
        if("JSON" in global && typeof JSON.parse == FN){
          parsed = JSON.parse('{"a":true}');
          supported = !!(parsed && parsed.a);
        }
        return supported;
    });
    
    addtest("json-stringify", function(global){
        return "JSON" in global && typeof JSON.stringify == FN && JSON.stringify({a:true}) == '{"a":true}';
    });

})(has, has.add, has.cssprop);