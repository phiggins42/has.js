(function(has, addtest, cssprop){


    // should fail in webkit, as they dont support it.
    addtest('dom-attrmodified', function(g, d){
        var bool = false,
            root = d.documentElement;
            
        var listener = function(){ bool = true; };
        root.addEventListener("DOMAttrModified", listener, false);
        root.setAttribute("___TEST___", true);
        root.removeAttribute("___TEST___", true);
        root.removeEventListener("DOMAttrModified", listener, false);
        return bool;
    });

    // works in chrome/ff. not in opera.
    addtest('dom-subtreemodified', function(g, d){

        var bool = false,
            elem = d.createElement("div"),
            listener = function(){ bool = true; };

        elem.innerHTML = "<elem></elem>";

        elem.addEventListener("DOMSubtreeModified", listener, false);
        elem.innerHTML = "<foo></foo>";
        elem.removeEventListener("DOMSubtreeModified", listener, false);
        return bool;

    });

})(has, has.add, has.cssprop);
