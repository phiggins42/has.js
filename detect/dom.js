(function(has, addtest, cssprop){

    addtest("dom-quirks", function(g, d){
        if(typeof d.compatMode == "string"){
            return (d.compatMode == "BackCompat");
        }
        if(d.createElement){
            var el = d.createElement("div");
            if(el && el.style){
                el.style.width = "1";
            }
            return el.style.width == "1px";
        }
        return null;
    });
    
    addtest("dom-dataset", function(g, d, e){
        e.setAttribute("data-a-b", "c");
        return has.isHostType(e, "dataset") && e.dataset.aB == "c";
    });
    
    // works in all but IE < 9
    addtest("dom-addeventlistener", function(g, d) {
        return has.isHostType(d, "addEventListener");
    }, true);
    
    // should fail in webkit, as they dont support it.
    addtest("dom-attrmodified", function(g, d, el){
        var supported = null,
            listener = function(){ supported = true; };
        
        if(has("dom-addeventlistener")){
            supported = false;
            el.addEventListener("DOMAttrModified", listener, false);
            el.setAttribute("___TEST___", true);
            el.removeAttribute("___TEST___", true);
            el.removeEventListener("DOMAttrModified", listener, false);
        }
        return supported;
    });
    
    addtest("dom-subtreemodified", function(g, d, el){
        var supported = null,
            listener = function(){ supported = true; };
        
        if(has("dom-addeventlistener")){
            supported = false;
            el.appendChild(d.createElement("div"));
            el.addEventListener("DOMSubtreeModified", listener, false);
            has.clearElement(el);
            el.removeEventListener("DOMSubtreeModified", listener, false);
        }
        return supported;
    });
    
    //  FROM cft.js
    addtest("dom-children", function(g, d, el){
        var supported = null;
        if(el && has.isHostType(el, "children")){
            var div = el.appendChild(d.createElement("div")),
                children = el.children;
            
            // Safari 2.x returns ALL children including text nodes
            el.appendChild(d.createTextNode("x"));
            div.appendChild(div.cloneNode(false));
            supported = !!children && children.length == 1 && children[0] == div;
        }
        return supported;
    });
    
    addtest("dom-tagname-uppercase", function(g, d, el){
        return el ? el.nodeName == "DIV" : null;
    });
    
    // FIXME: these don't need to be here, was just doing first pass at inspection ^ph
    addtest("dom-html5", function(g, d, el){
        el.innerHTML = "<nav>a</nav>";
        return el.childNodes.length == 1;
    });
    
    addtest("dom-html5-shived", function(g, d){
        var unsupported = !has("dom-html5");
        if(unsupported){
            // shim it:
            ("abbr article aside audio canvas details figcaption figure footer header " +
            "hgroup mark meter nav output progress section summary time video").replace(/\w+/g,function(n){ 
                d.createElement(n) 
            });
        }
        return unsupported;
    });
    
    addtest("dom-html5-fixed", function(g, d, e){
        el.innerHTML = "<nav>a</nav>";
        return el.childNodes.length == 1;
    });
    
    addtest("dom-create-attr", function(g, d){
        var canCreate = false;
        try{
            d.createElement("<input type='hidden' name='hasjs'>");
            canCreate = true;
        }catch(e){
            console.warn("woops", e);
        }
        return canCreate;
    });
    
})(has, has.add, has.cssprop);
