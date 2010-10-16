(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;

    function supportsModernInputProp( prop ){
        input.setAttribute("type", prop);
        var supported = input.type != "text";

        if(supported){
            input.value = ":)";

            //  From the original `testProp` function
            if(/^(search|tel)$/.test(input.type)){
                //  spec doesnt define any special parsing or detectable UI
                //  behaviors so we pass these through as true
                //  interestingly, opera fails the earlier test, so it doesn't
                //  even make it here.

                //  this fakes out the value test
            }else{
                //  if the upgraded input compontent rejects the :) text, we got a winner
                supported = input.value != ":)";
            }
        }
        return supported;
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
        return supportsModernInputProp("color");
    });

    addtest("input-type-search", function(){
        return supportsModernInputProp("search");
    });

    addtest("input-type-tel", function(){
        return supportsModernInputProp("tel");
    });

    addtest("input-type-url", function(){
        // real url and email support comes with prebaked validation.
        return has("input-checkvalidity") && supportsModernInputProp("email");
    });

    addtest("input-type-email", function(){
        // real url and email support comes with prebaked validation.
        return has("input-checkvalidity") && supportsModernInputProp("email");
    });

    addtest("input-type-datetime", function(){
        return supportsModernInputProp("datetime");
    });

    addtest("input-type-date", function(){
        return supportsModernInputProp("date");
    });

    addtest("input-type-month", function(){
        return supportsModernInputProp("month");
    });

    addtest("input-type-week", function(){
        return supportsModernInputProp("week");
    });

    addtest("input-type-time", function(){
        return supportsModernInputProp("time");
    });

    addtest("input-type-datetime-local", function(){
        return supportsModernInputProp("datetime-local");
    });

    addtest("input-type-number", function(){
        return supportsModernInputProp("number");
    });

    addtest("input-type-range", function(g, d){
        var de = d.documentElement,
            supported = supportsModernInputProp("range");

        // WebKit has a few false positives, so we go more robust
        if(supported && has("dom-computed-style") &&
                typeof input.style.WebkitAppearance != "undefined"){

            de.appendChild(input);

            // Safari 2-4 allows the smiley as a value, despite making a slider
            supported = d.defaultView.getComputedStyle(input, null).WebkitAppearance != "textfield" &&
                // mobile android web browser has false positive, so must
                // check the height to see if the widget is actually there.
                (input.offsetHeight !== 0);

            de.removeChild(input);
        }
        return supported;
    });

})(has, has.add, has.cssprop);
