(function(has, addtest, cssprop){

    addtest("dom-dataset", function(g, d, e){
        e.setAttribute("data-a-b", "c");
        return !!(e.dataset && e.dataset.aB === "c");
    });
    
    // works in all but IE < 9
    addtest('dom-addeventlistener', function(g, d) {
        return has.isHostType(d, 'addEventListener');
    }, true);
    
    // should fail in webkit, as they dont support it.
    addtest('dom-attrmodified', function(g, d, el){
        var supported = null,
            listener = function(){ supported = true; };
        
        if(has('dom-addeventlistener')){
            supported = false;
            el.addEventListener("DOMAttrModified", listener, false);
            el.setAttribute("___TEST___", true);
            el.removeAttribute("___TEST___", true);
            el.removeEventListener("DOMAttrModified", listener, false);
        }
        return supported;
    });
    
    addtest('dom-subtreemodified', function(g, d, el){
        var supported = null,
            listener = function(){ supported = true; };
        
        if(has('dom-addeventlistener')){
            supported = false;
            el.appendChild(d.createElement("div"));
            el.addEventListener("DOMSubtreeModified", listener, false);
            has.clearElement(el);
            el.removeEventListener("DOMSubtreeModified", listener, false);
        }
        return supported;
    });
    
    //  FROM cft.js
    addtest('dom-children', function(g, d, el){
        var supported = null;
        if(el && has.isHostType(el, "children")){
            var div = el.appendChild(d.createElement("div")),
                children = el.children;
            
            // Safari 2.x returns ALL children including text nodes
            el.appendChild(d.createTextNode('x'));
            div.appendChild(div.cloneNode(false));
            supported = !!children && children.length == 1 && children[0] == div;
        }
        return supported;
    });
    
    addtest('dom-tagname-uppercase', function(g, d, el){
        return el ? el.nodeName == 'DIV' : null;
    });
    
})(has, has.add, has.cssprop);
