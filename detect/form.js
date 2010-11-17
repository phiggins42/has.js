(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;

    function propValidates( prop ){
        input.setAttribute("type", prop);
        input.value = "\x01";
        return has("input-checkvalidity") && input.type == prop &&
               (/search|tel/.test(prop) || input.value != "\x01" || !input.checkValidity());
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
        return propValidates("color");
    });

    addtest("input-type-search", function(){
        return propValidates("search");
    });

    addtest("input-type-tel", function(){
        return propValidates("tel");
    });

    addtest("input-type-url", function(){
        return propValidates("url");
    });

    addtest("input-type-email", function(){
        return propValidates("email");
    });

    addtest("input-type-datetime", function(){
        return propValidates("datetime");
    });

    addtest("input-type-date", function(){
        return propValidates("date");
    });

    addtest("input-type-month", function(){
        return propValidates("month");
    });

    addtest("input-type-week", function(){
        return propValidates("week");
    });

    addtest("input-type-time", function(){
        return propValidates("time");
    });

    addtest("input-type-datetime-local", function(){
        return propValidates("datetime-local");
    });

    addtest("input-type-number", function(){
        return propValidates("number");
    });

    addtest("input-type-range", function(g, d){
        return propValidates("range");
    });

})(has, has.add, has.cssprop);
