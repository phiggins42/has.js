(function(has, addtest, cssprop){

    addtest("dom-dataset", function(g, d, e){
        e.setAttribute("data-a-b", "c");
        return !!(e.dataset && e.dataset.aB === "c");
    });

    // should fail in webkit, as they dont support it.
    addtest('dom-attrmodified', function(g, d){
        var bool = false,
            root = d.documentElement;
        
        //  IE versions prior to IE9 will not have support for either
        //  document.addEventListener or any of the mutation events
        if(document.addEventListener){
          var listener = function(){ bool = true; };
          root.addEventListener("DOMAttrModified", listener, false);
          root.setAttribute("___TEST___", true);
          root.removeAttribute("___TEST___", true);
          root.removeEventListener("DOMAttrModified", listener, false);
        }
        
        return bool;
    });

    // works in chrome/ff. not in opera.
    addtest('dom-subtreemodified', function(g, d){

        var bool = false,
            elem = d.createElement("div"),
            listener = function(){ bool = true; };

        //  IE versions prior to IE9 will not have support for either
        //  document.addEventListener or any of the mutation events
        if(document.addEventListener){
          elem.innerHTML = "<elem></elem>";
          elem.addEventListener("DOMSubtreeModified", listener, false);
          elem.innerHTML = "<foo></foo>";
          elem.removeEventListener("DOMSubtreeModified", listener, false);
        }        
        
        return bool;

    });

    //  FROM cft.js
    addtest('dom-children-returns-nodes', function(g, d, e){
        var de = d.documentElement,
            supported = null;
        if(de && typeof de.children != 'undefined'){
            e.innerHTML = '<div><p>a<\/p><\/div>b<!-- x -->';
            // Safari 2.x returns ALL elements in `children`
            // We check that first element is a DIV and that it's the only one element returned
            supported = (e.children && 
                e.children.length === 1 && 
                e.children[0] &&
                e.children[0].tagName &&
                e.children[0].tagName.toUpperCase() === 'DIV');
            e.innerHTML = '';
        }
        return supported;
    });

    addtest('dom-tagname-uppercase', function(g, d){
        var e = d && d.documentElement;
        if(e){
            return 'HTML' === e.nodeName;
        }
        return null;
    });

})(has, has.add, has.cssprop);
