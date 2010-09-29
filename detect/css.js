(function(has, addtest, cssprop){


    // we could define a couple "constants" for reuse ...
    // just need to ensure they are the same across detect/*.js 
    // so we can wrap in a single (fn(){})() at 'build' ^ph
    var STR = "string",
        FN = "function"
    ;   

    addtest('css-position-fixed', function(g, d) {
        var test = d.createElement('div'),
            control = test.cloneNode(false),
            fake = false,
            root = d.body || (function() {
                fake = true;
                return d.documentElement.appendChild(d.createElement('body'));
            }());

        var oldCssText = root.style.cssText;
        root.style.cssText = 'padding:0;margin:0';
        test.style.cssText = 'position:fixed;top:42px';
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
        return cssprop('borderRadius', e);
    });

    addtest("css-box-shadow", function(g, d, e){
        return cssprop('boxShadow', e);
    });

    addtest("css-opacity", function(g, d, e){
        return cssprop('opacity', e);
    });

    addtest("css-resize", function(g, d, e){
        return cssprop('resize', e);
    });

    addtest("css-text-overflow", function(g, d, e){
        return cssprop('textOverflow', e);
    });

    addtest("css-text-shadow", function(g, d, e){
        return cssprop('textShadow', e);
    });

    addtest("css-transform", function(g, d, e){
        return cssprop('transform', e);
    });

})(has, has.add, has.cssprop);
