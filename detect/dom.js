(function(has, addtest, cssprop){

    if(!has("dom")){ return; }

    addtest("dom-quirks", function(g, d, el){
        var supported;
        if(typeof d.compatMode == "string"){
            supported = (d.compatMode == "BackCompat");
        }else{
            el.style.width = "1";
            supported = (e.style.width == "1px");
            el.style.cssText = "";
        }
        return supported;
    });

    addtest("dom-dataset", function(g, d, el){
        el.setAttribute("data-a-b", "c");
        return has.isHostType(el, "dataset") && el.dataset.aB == "c";
    });

    // works in all but IE < 9
    addtest("dom-addeventlistener", function(g, d){
        return has.isHostType(d, "addEventListener");
    });

    // works in all but IE
    addtest("dom-createelementns", function(g, d){
        return has.isHostType(d, "createElementNS");
    });

    // should fail in webkit, as they dont support it.
    addtest("dom-attrmodified", function(g, d, el){
        var supported = false,
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
        var supported = false,
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

    // FROM cft.js
    addtest("dom-children", function(g, d, el){
        var supported = false;
        if(has.isHostType(el, "children")){
            var div = el.appendChild(d.createElement("div")),
                children = el.children;

            // Safari 2.x returns ALL children including text nodes
            el.appendChild(d.createTextNode("x"));
            div.appendChild(div.cloneNode(false));
            supported = !!children && children.length == 1 && children[0] == div;
            has.clearElement(el);
        }
        return supported;
    });

    // true for html, xhtml and unknown elements are case
    // sensitive to how they are written in the markup
    addtest("dom-tagname-uppercase", function(g, d, el){
        return el.nodeName == "DIV";
    });

    addtest("dom-html5-elements", function(g, d, el){
        el.innerHTML = "<nav>a</nav>";
        return el.childNodes.length == 1;
    });

    // true for IE < 9
    // http://msdn.microsoft.com/en-us/library/ms536389(VS.85).aspx vs
    // http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-2141741547
    addtest("dom-create-attr", function(g, d){
        var input,
            supported = false;
        try{
            input = d.createElement("<input type='hidden' name='hasjs'>");
            supported = input.type == "hidden" && input.name == "hasjs";
        }catch(e){}
        return supported;
    });

    // TODO: this test is really testing if expando's become attributes (IE)
    // true for IE
    addtest("dom-selectable", function(g, d, el){
        var supported = false;
        try{
            el.unselectable = "on";
            supported = typeof el.attributes.unselectable != "undefined" &&
                el.attributes.unselectable.value == "on";
            el.unselectable = "off";
        }catch(e){}
        return supported;
    });

    // true for all modern browsers, including IE 9+
    addtest("dom-computed-style", function(g, d){
        return has.isHostType(d, "defaultView") && has.isHostType(d.defaultView, "getComputedStyle");
    });

    // true for IE
    addtest("dom-current-style", function(g, d){
        return !has("dom-computed-style") && has.isHostType(d.documentElement, "currentStyle");
    });

    // true for IE
    addtest("dom-element-do-scroll", function(g, d){
        return has.isHostType(d.documentElement, "doScroll");
    });

    // test for dynamic-updating base tag support (allows us to avoid href & src attr rewriting)
    // false for Firefox < 4 and IE < 8
    addtest("dom-dynamic-base", function (g, d, el){
        var attempt,
            backup,
            base,
            attempts = [[d.createElement("a"), "href"], [d.createElement("q"), "cite"]],
            head = d.getElementsByTagName("head")[0],
            href = location.href,
            fake = false,
            supported = null,
            token = location.search || location.hash;

        if(head){
            base = d.getElementsByTagName("base")[0] || (function(){
                fake = true;
                return head.insertBefore(d.createElement("base"), head.firstChild);
            })();

            backup = base.href || href.slice(0, token ? href.indexOf(token) : href.length).replace(/[^\/]*$/, "");
            base.href = location.protocol + "//x";

            // check support on more than one element to be thorough
            while(attempt = attempts.pop()){
                if(supported != false){
                    attempt[0][attempt[1]] = "y";
                    supported = attempt[0][attempt[1]].indexOf("x/y") > -1;
                }
            }
            // reset href before removal, otherwise href persists in Opera
            base.href = backup;
            if(fake){
                head.removeChild(base);
            }
        }
        return supported;
    });

    addtest("dom-nodelist-sliceable", function(g, d, el){
        var supported = false,
            de = d.documentElement,
            id = de.id;

        // Opera 9.25 bug
        de.id = "length";
        // older Safari will return an empty array
        try{
            supported = !![].slice.call(d.childNodes, 0)[0];
        }catch(e){}

        de.id = id;
        return supported;
    });

})(has, has.add, has.cssprop);
