(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;

    var f = document.createElement("input");

    function testProp(prop, doc, del){
        
        f.setAttribute("type", prop);
        var bool = f.type !== "text";

        // chrome likes to falsely purport support, so we feed it a textual value
        // if that doesnt succeed then we know there's a custom UI
        if (bool){  

            f.value = ":)";

            if (/^range$/.test(f.type) && f.style.WebkitAppearance !== undefined){

              del.appendChild(f);

              // Safari 2-4 allows the smiley as a value, despite making a slider
              bool =  doc.defaultView.getComputedStyle && 
                      doc.defaultView.getComputedStyle(f, null).WebkitAppearance !== 'textfield' && 

                      // mobile android web browser has false positive, so must
                      // check the height to see if the widget is actually there.
                      (f.offsetHeight !== 0);

              del.removeChild(f);

            } else if (/^(search|tel)$/.test(f.type)){
              // spec doesnt define any special parsing or detectable UI 
              //   behaviors so we pass these through as true

              // interestingly, opera fails the earlier test, so it doesn't
              //  even make it here.

            } else if (/^(url|email)$/.test(f.type)) {

              // real url and email support comes with prebaked validation.
              bool = f.checkValidity && f.checkValidity() === false;

            } else {
              // if the upgraded input compontent rejects the :) text, we got a winner
              bool = f.value != smile;
            }
        }

        return !!bool;
    }
    
    // not to spec. just enough to do form.js
    function forEach(a, c){
        for(var i = 0, l = a.length; i < l; i++){
            c.call(a, a[i], i, a);
        }
    }
    
    forEach(["autocomplete", "autofocus", "list", "placeholder", "max", "min", "multiple", "pattern", "required", "step"], function(t){
        // Run through HTML5's new input attributes to see if the UA understands any.
        // We're using f which is the <input> element created early on
        // Mike Taylr has created a comprehensive resource for testing these attributes
        //   when applied to all input types: 
        //   http://miketaylr.com/code/input-type-attr.html
        // spec: http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary
        addtest("form-" + t, function(){
            return !!(t in f);
        });
    });

    forEach(["search", "tel", "url", "email", "datetime", "date", "month", "week", "time", "datetime-local", "number", "range", "color"], function(t){
        addtest("input-" + t, function(g, d){
            return testProp(t, d, d.documentElement);
        });
    });

})(has, has.add, has.cssprop);
