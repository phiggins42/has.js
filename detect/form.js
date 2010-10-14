(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;
    
    var input = document.createElement("input");

    function supportsModernInputProp( thing, prop ) {
        
        thing.setAttribute("type", prop);
        
        var bool = thing.type !== "text";
        
        if(bool) {
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
                bool = input.value != ":)";
            }            
        }
        
        return bool;
    }
    
    //  @jdalton: I tried using the has.isHostType, but it nose dived on all but the `validity` prop

    addtest("input-attr-autocomplete", function(){
        return "autocomplete" in input;
    });

    addtest("input-attr-autofocus", function(){
        return "autofocus" in input;
    });

    addtest("input-attr-list", function(){
        return "list" in input;
    });

    addtest("input-attr-placeholder", function(){
        return "placeholder" in input;
    });

    addtest("input-attr-max", function(){
        return "max" in input;
    });
    
    addtest("input-attr-maxlength", function(){
        return "maxLength" in input;
    });

    addtest("input-attr-min", function(){
        return "min" in input;
    });

    addtest("input-attr-multiple", function(){
        return "multiple" in input;
    });

    addtest("input-attr-pattern", function(){
        return "pattern" in input;
    });

    addtest("input-attr-readonly", function(){
        return "readOnly" in input;
    });
    
    addtest("input-attr-required", function(){
        return "required" in input;
    });

    addtest("input-attr-size", function(){
        return "size" in input;
    });

    addtest("input-attr-step", function(){
        return "step" in input;
    });
    
    addtest("input-attr-selectedoption", function(){
        return "selectedOption" in input;
    });

    addtest("input-attr-indeterminate ", function(){
        return "indeterminate " in input;
    });

    addtest("input-attr-willvalidate", function(){
        return "willValidate" in input;
    });

    addtest("input-attr-valueasnumber", function(){
        return "valueAsNumber" in input;
    });

    addtest("input-attr-valueasdate", function(){
        return "valueAsDate" in input;
    });

    addtest("input-attr-validity", function(){
        //return "validity" in input;
        
        return has.isHostType(input, "validity");
    });

    addtest("input-attr-validationmessage", function(){
        return "validationMessage" in input;
    });

    addtest("input-attr-willvalidate", function(){
        return "willValidate" in input;
    });



    addtest("input-type-search", function(g, d){
        return supportsModernInputProp(input, "search");
    });

    addtest("input-type-tel", function(g, d){
        return supportsModernInputProp(input, "tel");
    });

    addtest("input-type-url", function(g, d){
        // real url and email support comes with prebaked validation.
        return supportsModernInputProp(input, "email") && input.checkValidity;
    });

    addtest("input-type-email", function(g, d){
        // real url and email support comes with prebaked validation.
        return supportsModernInputProp(input, "email") && input.checkValidity;
    });

    addtest("input-type-datetime", function(g, d){
        return supportsModernInputProp(input, "datetime");
    });

    addtest("input-type-date", function(g, d){
        return supportsModernInputProp(input, "date");
    });

    addtest("input-type-month", function(g, d){
        return supportsModernInputProp(input, "month");
    });

    addtest("input-type-week", function(g, d){
        return supportsModernInputProp(input, "week");
    });

    addtest("input-type-time", function(g, d){
        return supportsModernInputProp(input, "time");
    });

    addtest("input-type-datetime-local", function(g, d){
        return supportsModernInputProp(input, "datetime-local");
    });

    addtest("input-type-number", function(g, d){
        return supportsModernInputProp(input, "number");
    });

    addtest("input-type-range", function(g, d){
        var bool  = supportsModernInputProp(input, "range"), 
            del   = document.documentElement;
        
        // WebKit has a few false positives, so we go more robust 
        if(bool && input.style.WebkitAppearance !== undefined) {
            del.appendChild(input);

            // Safari 2-4 allows the smiley as a value, despite making a slider
            bool =  doc.defaultView.getComputedStyle && 
                    doc.defaultView.getComputedStyle(input, null).WebkitAppearance !== 'textfield' && 

                    // mobile android web browser has false positive, so must
                    // check the height to see if the widget is actually there.
                    (input.offsetHeight !== 0);

            del.removeChild(input);
        }
        
        return bool;
    });

    addtest("input-type-color", function(g, d){
        return supportsModernInputProp(input, "color");
    });
    
})(has, has.add, has.cssprop);
