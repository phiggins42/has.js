(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;
    
    var input = document.createElement("input");

    function supportsModernInputProp( thing, prop ) {
        
        thing.setAttribute("type", prop);
        
        var bool = thing.type !== "text";
        
        if(bool) {
            input.value = "\\<<---x";
            
            //  From the original `testProp` function
            if(/^(search|tel)$/.test(input.type)){
                //  spec doesnt define any special parsing or detectable UI 
                //  behaviors so we pass these through as true
                //  interestingly, opera fails the earlier test, so it doesn't
                //  even make it here.
                
                //  this fakes out the value test
            }else{
                //  if the upgraded input compontent rejects the :) text, we got a winner
                bool = input.value != "\\<<---x";
            }            
        }
        
        return bool;
    }
    
    //  @jdalton: I tried using the has.isHostType, but it nose dived on all but the `validity` prop

    addtest("input-attribute-autocomplete", function(){
        return ("autocomplete" in input);
    });

    addtest("input-attribute-autofocus", function(){
        return ("autofocus" in input);
    });

    addtest("input-attribute-list", function(){
        return ("list" in input);
    });

    addtest("input-attribute-placeholder", function(){
        return ("placeholder" in input);
    });

    addtest("input-attribute-max", function(){
        return ("max" in input);
    });
    
    addtest("input-attribute-maxlength", function(){
        return ("maxLength" in input);
    });

    addtest("input-attribute-min", function(){
        return ("min" in input);
    });

    addtest("input-attribute-multiple", function(){
        return ("multiple" in input);
    });

    addtest("input-attribute-pattern", function(){
        return ("pattern" in input);
    });

    addtest("input-attribute-readonly", function(){
        return ("readOnly" in input);
    });
    
    addtest("input-attribute-required", function(){
        return ("required" in input);
    });

    addtest("input-attribute-size", function(){
        return ("size" in input);
    });

    addtest("input-attribute-step", function(){
        return ("step" in input);
    });
    
    addtest("input-attribute-selectedoption", function(){
        return ("selectedOption" in input);
    });

    addtest("input-attribute-indeterminate ", function(){
        return ("indeterminate " in input);
    });

    addtest("input-attribute-willvalidate", function(){
        return ("willValidate" in input);
    });

    addtest("input-attribute-valueasnumber", function(){
        return ("valueAsNumber" in input);
    });

    addtest("input-attribute-valueasdate", function(){
        return ("valueAsDate" in input);
    });

    addtest("input-attribute-validity", function(){
        //return ("validity" in input);
        
        return has.isHostType(input, "validity");
    });

    addtest("input-attribute-validationmessage", function(){
        return ("validationMessage" in input);
    });

    addtest("input-attribute-willvalidate", function(){
        return ("willValidate" in input);
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
