(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;   

    addtest("css-content-box", function(g, d, e){
        var fake = false,
            root = d.body || (function() {
                fake = true;
                return d.documentElement.appendChild(d.createElement("body"));
            }());
        e.style.cssText = "position: absolute; top: -4000px; width: 40px; height: 40px; border: 1px solid black;";
        root.appendChild(e);

        var isContentBox = e.clientWidth == 40;

        root.removeChild(e);

        if(fake){
            d.documentElement.removeChild(root);
        }

        e.style.cssText = "";

        return isContentBox;
    });

    addtest("css-position-fixed", function(g, d){
        var test = d.createElement("div"),
            control = test.cloneNode(false),
            fake = false,
            root = d.body || (function() {
                fake = true;
                return d.documentElement.appendChild(d.createElement("body"));
            }());

        var oldCssText = root.style.cssText;
        root.style.cssText = "padding:0;margin:0";
        test.style.cssText = "position:fixed;top:42px";
        root.appendChild(test);
        root.appendChild(control);

        var ret = test.offsetTop !== control.offsetTop;

        root.removeChild(test);
        root.removeChild(control);
        root.style.cssText = oldCssText;

        if(fake){
            d.documentElement.removeChild(root);
        }

        return ret;
    });
    
    addtest("css-border-radius", function(g, d, e){
        return cssprop("borderRadius", e);
    });

    addtest("css-box-shadow", function(g, d, e){
        return cssprop("boxShadow", e);
    });

    addtest("css-box-sizing", function(g, d, e){
        return cssprop("boxSizing", e);
    });

    addtest("css-opacity", function(g, d, e){
        return cssprop("opacity", e);
    });
    
    addtest("css-opacity-filter", function(g, d){
        return !has("css-opacity") && (typeof d.documentElement.filters != "undefined");
    });

    addtest("css-resize", function(g, d, e){
        return cssprop("resize", e);
    });

    addtest("css-selectable", function(g, d, e){
        return cssprop("userSelect", e);
    });
    
    addtest("css-pointerevents", function(g, d, e){
        return cssprop("pointerEvents", e);
    });

    addtest("css-text-overflow", function(g, d, e){
        return cssprop("textOverflow", e);
    });

    addtest("css-text-shadow", function(g, d, e){
        return cssprop("textShadow", e);
    });

    addtest("css-transform", function(g, d, e){
        return cssprop("transform", e);
    });

    //FROM cft.js
    addtest("css-rgba", function(g, d, e){
        var re = /^rgba/,
            result = null,
            prev;
        if(e.style && typeof re.test == FN){
            try{
                prev = e.style.color;
                e.style.color = "rgba(1,1,1,0.5)";
                result = re.test(e.style.color);
                e.style.color = prev;
            }catch(e){
                result = false;
            }
        }
        return result;
    });
    
    //FROM cft.js
    addtest("css-enabled", function(g, d){
        var b = d.body,
            supported = null;
        if(b && b.appendChild && b.removeChild){
            var e = d.createElement("div");
            if(e && e.style){
                e.style.display = "none";
                b.appendChild(e);
                supported = (e.offsetWidth === 0);
                b.removeChild(e);
                e = null;
            }
        }
        return supported;
    });
    
    // FIXME: modernizr has flexbox, backgroundsize, borderimage, cssanimations, csscolumns, cssgradients,
    // cssreflections, csstransforms, csstransforms3d, csstransitions, fontface

})(has, has.add, has.cssprop);
