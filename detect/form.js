(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;
    
    var input = document.createElement("input");

    function testProp(prop, doc){
        
        input.setAttribute("type", prop);
        
        var bool = input.type !== "text", del = doc.documentElement;

        // chrome likes to falsely purport support, so we feed it a textual value
        // if that doesnt succeed then we know there's a custom UI
        if(bool){  
            
            input.value = ":)";

            if(/^range$/.test(input.type) && input.style.WebkitAppearance !== undefined){
              
              
              del.appendChild(input);

              // Safari 2-4 allows the smiley as a value, despite making a slider
              bool =  doc.defaultView.getComputedStyle && 
                      doc.defaultView.getComputedStyle(input, null).WebkitAppearance !== 'textfield' && 

                      // mobile android web browser has false positive, so must
                      // check the height to see if the widget is actually there.
                      (input.offsetHeight !== 0);

              del.removeChild(input);

            }else if(/^(search|tel)$/.test(input.type)){
              // spec doesnt define any special parsing or detectable UI 
              //   behaviors so we pass these through as true

              // interestingly, opera fails the earlier test, so it doesn't
              //  even make it here.

            }else if(/^(url|email)$/.test(input.type)){

              // real url and email support comes with prebaked validation.
              bool = input.checkValidity && input.checkValidity() === false;

            }else{
              // if the upgraded input compontent rejects the :) text, we got a winner
              bool = input.value != ":)";
            }
        }

        return bool;
    }
    
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
        return ("maxlength" in input);
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
        return ("readonly" in input);
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

    addtest("input-type-search", function(g, d){
        return testProp("search", d);
    });

    addtest("input-type-tel", function(g, d){
        return testProp("tel", d);
    });

    addtest("input-type-url", function(g, d){
        return testProp("url", d);
    });

    addtest("input-type-email", function(g, d){
        return testProp("email", d);
    });

    addtest("input-type-datetime", function(g, d){
        return testProp("datetime", d);
    });

    addtest("input-type-date", function(g, d){
        return testProp("date", d);
    });

    addtest("input-type-month", function(g, d){
        return testProp("month", d);
    });

    addtest("input-type-week", function(g, d){
        return testProp("week", d);
    });

    addtest("input-type-time", function(g, d){
        return testProp("time", d);
    });

    addtest("input-type-datetime-local", function(g, d){
        return testProp("datetime-local", d);
    });

    addtest("input-type-number", function(g, d){
        return testProp("number", d);
    });

    addtest("input-type-range", function(g, d){
        return testProp("range", d);
    });

    addtest("input-type-color", function(g, d){
        return testProp("color", d);
    });
    
})(has, has.add, has.cssprop);
