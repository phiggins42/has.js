(function(has, addtest, cssprop){

    if(!has("dom")){ return; }

    // FROM cft.js
    addtest("css-enabled", function(g, d, el){
        var fake,
            supported,
            de = d.documentElement,
            root = d.body || (function(){
                fake = true;
                return de.insertBefore(d.createElement("body"), de.firstChild);
            }());

        el.style.display = "none";
        root.insertBefore(el, root.firstChild);
        supported = (el.offsetWidth === 0);
        root.removeChild(el);

        if(fake){
            root.parentNode.removeChild(root);
        }
        return supported;
    });

    addtest("css-content-box", function(g, d, el){
        var fake,
            root,
            de = d.documentElement,
            supported = null;

        if(has("css-enabled")){
            root = d.body || (function(){
                fake = true;
                return de.insertBefore(d.createElement("body"), de.firstChild);
            }());

            el.style.cssText = "position: absolute; top: -4000px; width: 40px; height: 40px; border: 1px solid black;";
            root.insertBefore(el, root.firstChild);

            supported = (el.clientWidth == 40);
            root.removeChild(el);
            el.style.cssText = "";
        }
        if(fake){
            root.parentNode.removeChild(root);
        }
        return supported;
    });

    addtest("css-position-fixed", function(g, d, el){
        var backup,
            control,
            fake,
            root,
            de = d.documentElement,
            supported = null;

        if(has("css-enabled")){
            control = el.cloneNode(false);
            root = d.body || (function(){
                fake = true;
                return de.insertBefore(d.createElement("body"), de.firstChild);
            }());

            backup = root.style.cssText;
            root.style.cssText = "padding:0;margin:0";
            el.style.cssText = "position:fixed;top:42px";

            root.insertBefore(control, root.firstChild);
            root.insertBefore(el, control);
            supported = (el.offsetTop !== control.offsetTop);

            root.removeChild(el);
            root.removeChild(control);
            root.style.cssText = backup;
            el.style.cssText = "";
        }
        if(fake){
            root.parentNode.removeChild(root);
        }
        return supported;
    });

    // FROM cft.js
    addtest("css-rgba", function(g, d, el){
        var re = /^rgba/,
            supported = null;

        if(has("css-enabled")){
          try{
              el.style.color = "rgba(1,1,1,0.5)";
              supported = re.test(el.style.color);
              el.style.color = "";
          }catch(e){}
        }
        return supported;
    });

    addtest("css-border-radius", function(g, d, el){
        return cssprop("borderRadius", el);
    });

    addtest("css-box-shadow", function(g, d, el){
        return cssprop("boxShadow", el);
    });

    addtest("css-box-sizing", function(g, d, el){
        return cssprop("boxSizing", el);
    });

    addtest("css-opacity", function(g, d, el){
        return cssprop("opacity", el);
    });

    addtest("css-opacity-filter", function(g, d){
        return !has("css-opacity") && (typeof d.documentElement.filters != "undefined");
    });

    addtest("css-resize", function(g, d, el){
        return cssprop("resize", el);
    });

    addtest("css-selectable", function(g, d, el){
        return cssprop("userSelect", el);
    });

    addtest("css-style-float", function(g, d, el){
        return cssprop("styleFloat", el);
    });

    // TODO: Fix false positive in Opera
    addtest("css-pointerevents", function(g, d, el){
        return cssprop("pointerEvents", el);
    });

    addtest("css-text-overflow", function(g, d, el){
        return cssprop("textOverflow", el);
    });

    addtest("css-text-shadow", function(g, d, el){
        return cssprop("textShadow", el);
    });

    addtest("css-transform", function(g, d, el){
        return cssprop("transform", el);
    });

    // FIXME: modernizr has flexbox, backgroundsize, borderimage, cssanimations, csscolumns, cssgradients,
    // cssreflections, csstransforms, csstransforms3d, csstransitions, fontface

})(has, has.add, has.cssprop);
