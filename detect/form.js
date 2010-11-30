(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;

    function typeValidates( type ){
        input.setAttribute("type", type);
        input.value = "\x01";
        return has("input-checkvalidity") && input.type == type &&
               (/search|tel/.test(type) || input.value != "\x01" || !input.checkValidity());
    }

    if(!has("dom")){ return; }

    var input = document.createElement("input");

    addtest("input-checkvalidity", function(){
        return has.isHostType(input, "checkValidity");
    });

    addtest("input-attr-autocomplete", function(){
        return ("autocomplete" in input);
    });

    addtest("input-attr-autofocus", function(){
        return ("autofocus" in input);
    });

    addtest("input-attr-list", function(){
        return ("list" in input);
    });

    addtest("input-attr-placeholder", function(){
        return ("placeholder" in input);
    });

    addtest("input-attr-max", function(){
        return ("max" in input);
    });

    addtest("input-attr-maxlength", function(){
        return ("maxLength" in input);
    });

    addtest("input-attr-min", function(){
        return ("min" in input);
    });

    addtest("input-attr-multiple", function(){
        return ("multiple" in input);
    });

    addtest("input-attr-pattern", function(){
        return ("pattern" in input);
    });

    addtest("input-attr-readonly", function(){
        return ("readOnly" in input);
    });

    addtest("input-attr-required", function(){
        return ("required" in input);
    });

    addtest("input-attr-size", function(){
        return ("size" in input);
    });

    addtest("input-attr-step", function(){
        return ("step" in input);
    });

    addtest("input-attr-selectedoption", function(){
        return ("selectedOption" in input);
    });

    addtest("input-attr-indeterminate ", function(){
        return ("indeterminate " in input);
    });

    addtest("input-attr-willvalidate", function(){
        return ("willValidate" in input);
    });

    addtest("input-attr-valueasnumber", function(){
        return ("valueAsNumber" in input);
    });

    addtest("input-attr-valueasdate", function(){
        return ("valueAsDate" in input);
    });

    addtest("input-attr-validity", function(){
        return has.isHostType(input, "validity");
    });

    addtest("input-attr-validationmessage", function(){
        return ("validationMessage" in input);
    });

    addtest("input-attr-willvalidate", function(){
        return ("willValidate" in input);
    });

    addtest("input-type-color", function(){
        return typeValidates("color");
    });

    addtest("input-type-search", function(){
        return typeValidates("search");
    });

    addtest("input-type-tel", function(){
        return typeValidates("tel");
    });

    addtest("input-type-url", function(){
        return typeValidates("url");
    });

    addtest("input-type-email", function(){
        return typeValidates("email");
    });

    addtest("input-type-datetime", function(){
        return typeValidates("datetime");
    });

    addtest("input-type-date", function(){
        return typeValidates("date");
    });

    addtest("input-type-month", function(){
        return typeValidates("month");
    });

    addtest("input-type-week", function(){
        return typeValidates("week");
    });

    addtest("input-type-time", function(){
        return typeValidates("time");
    });

    addtest("input-type-datetime-local", function(){
        return typeValidates("datetime-local");
    });

    addtest("input-type-number", function(){
        return typeValidates("number");
    });

    addtest("input-type-range", function(g, d){
        return typeValidates("range");
    });

})(has, has.add, has.cssprop);
