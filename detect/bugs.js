(function(has, addtest, cssprop){

    // http://github.com/kangax/cft
    var toString = {}.toString,
        STR = "string",
        FN = "function",
        FUNCTION_CLASS = "[object Function]"
    ;

    if(!has("dom")){ return; }

    // Opera 9.x (possibly other versions as well) returns actual values (instead of "auto")
    // for statically positioned elements
    addtest("bug-computed-values-for-static", function(g, d){
        var computed,
            de = d.documentElement,
            view = d.defaultView,
            style = d.style,
            position = null,
            buggy = position;

        if(has("dom-computed-style")){
            // if element is not statically positioned, make it as such, then restore
            computed = view.getComputedStyle(de, null);
            if(computed.position != "static"){
                position = computed.position;
                style.position = "";
            }
            buggy = !!(buggy = view.getComputedStyle(de, null)) && buggy.left != "auto";
            if(position !== null){
                style.position = position;
            }
        }
        return buggy;
    });

    addtest("bug-computed-style-hidden-zero-height", function(g, d){
        var css,
            de = d.documentElement,
            style = de.style,
            display = style.display,
            buggy = null;

        if(has("dom-computed-style")){
            style.display = "none";
            cs = d.defaultView.getComputedStyle(de, null);
            buggy = cs && cs.height == "0px";
            style.display = display;
        }
        return buggy;
    });

    addtest("bug-root-children-not-styled", function(g, d, el){
        var buggy = null,
            root = d.documentElement;

        el.style.cssText = "width:40px;height:40px;";

        try{
            root.insertBefore(el, root.firstChild);

            result = el.clientWidth == 0;

            root.removeChild(el);
        }catch(e){}

        el.style.cssText = "";
        return result;
    });

    addtest("bug-contains", function(g, d, el){
        var e2 = d.createElement("div");
        if(has.isHostType(el, "contains")){
            return el.contains(e2);
        }
        return null;
    });

    addtest("bug-query-selector-ignores-caps", function(g, d, el){
        if(d.compatMode == "BackCompat"){
            var e2 = d.createElement("span");
            if(el.querySelector){
                e2.className = "Test";
                el.appendChild(e2);
                var buggy = (e.querySelector(".Test") !== null);
                el.removeChild(e2);
                e2 = null;
                return buggy;
            }
        }
        return null;
    });

    addtest("bug-typeof-nodelist-function", function(g, d){
        return has.isHostType(d, "forms") ? (typeof d.forms == FN) : null;
    });

    // IE returns comment nodes as part of `getElementsByTagName` results
    addtest("bug-getelementsbytagname-returns-comment-nodes", function(g, d, el){
        el.innerHTML = "<span>a</span><!--b-->";
        var all = el.getElementsByTagName("*");
        // IE5.5 returns a 0-length collection when calling getElementsByTagName with wildcard
        if(all.length){
            var lastNode = el.getElementsByTagName("*")[1];
            var buggy = !!(lastNode && lastNode.nodeType === 8);
            lastNode = all = null;
            el.innerHTML = "";
            return buggy;
        }
        return null;
    });

    // name attribute can not be set at run time in IE
    // http://msdn.microsoft.com/en-us/library/ms536389.aspx
    addtest("bug-setattribute-ignores-name", function(g, d){
        var elForm = d.createElement("form"),
            elInput = d.createElement("input"),
            root = d.documentElement;

        elInput.setAttribute("name", "test");
        elForm.appendChild(elInput);
        // Older Safari (e.g. 2.0.2) populates "elements" collection only when form is within a document
        root.appendChild(elForm);
        var buggy = elForm.elements ? (typeof elForm.elements["test"] == "undefined") : null;
        root.removeChild(elForm);
        return buggy;
    });

    addtest("bug-properties-are-attributes", function(g, d, el){
        el.__foo = "bar";
        var buggy = el.getAttribute("__foo") == "bar";
        if(buggy){
            el.removeAttribute("__foo");
        }else{
            delete el.__foo;
        }
        return buggy;
    });

    addtest("bug-pre-ignores-newline", function(g, d){
        var buggy,
            de = d.documentElement,
            el = de.appendChild(d.createElement("pre")),
            txt = el.appendChild(d.createTextNode("xx")),
            initialHeight = el.offsetHeight;

        el.firstChild.nodeValue = "x\nx";
        // check if `offsetHeight` changed after adding "\n" to the value
        buggy = el.offsetHeight == initialHeight;
        de.removeChild(el);
        return buggy;
    });

    addtest("bug-select-innerhtml", function(g, d, el){
        var buggy = true;
        el = d.createElement("select");
        el.innerHTML = "<option value='test'>test<\/option>";
        if(has.isHostType(el, "options") && el.options[0]){
            buggy = el.options[0].nodeName.toUpperCase() != "OPTION";
        }
        return buggy;
    });

    addtest("bug-table-innerhtml", function(g, d, el){
        var buggy = true;
        el = d.createElement("table");
        try{
            if(has.isHostType(el, "tBodies")){
                el.innerHTML = "<tbody><tr><td>test<\/td><\/tr><\/tbody>";
                buggy = typeof el.tBodies[0] == "undefined";
            }
        }catch(e){}
        return buggy;
    });

    addtest("bug-script-rejects-textnode-append", function(g, d){
        var s = d.createElement("script"),
            buggy = false;
        if(s && s.appendChild){
            try{
                s.appendChild(d.createTextNode(""));
                buggy = !s.firstChild || (s.firstChild && s.firstChild.nodeType !== 3);
            }catch(e){
                return true;
            }
            return buggy;
        }
        return null;
    });

    addtest("bug-getelementbyid-ids-names", function(g, d){
        if(d.getElementsByTagName && d.createElement){
            // need to feature test all these DOM methods before calling them
            var num = Number(new Date()),
                name = "__test_" + num,
                head = d.getElementsByTagName("head")[0],
                buggy = false,
                el;
            try{
                el = d.createElement("<input name='"+ name +"'>");
            }catch(e){
                el = d.createElement("input");
                el.name = name;
            }
            if(head.appendChild && head.removeChild){
                head.appendChild(el);
                var testElement = d.getElementById(name);
                buggy = !!(testElement && (testElement.nodeName.toUpperCase() === "INPUT"));
                head.removeChild(el);
                el = null;
                return buggy;
            }
        }
        return null;
    });

    addtest("bug-getelementbyid-ignores-case", function(g, d){
        if(d.createElement && d.getElementsByTagName && d.getElementById){
            var el = d.createElement("script"),
                head = d.getElementsByTagName("head")[0];
            if(el && head && head.appendChild && head.removeChild){
                el.type = "text/javascript";
                el.id = "A";
                head.appendChild(el);
                var buggy = !!d.getElementById("a");
                head.removeChild(el);
                el = null;
                return buggy;
            }
        }
        return null;
    });

    addtest("bug-getelementsbyname", function(g, d){
        var buggy = null,
            docEl = d.documentElement;
        if(docEl && docEl.appendChild && docEl.removeChild &&
            d.getElementsByName && d.createElement){
            var el = d.createElement("div");
            if(el){
                var uid = "x" + (Math.random() + "").slice(2);
                el.id = uid;
                docEl.appendChild(el);
                buggy = d.getElementsByName(uid)[0] === el;
                docEl.removeChild(el);
            }
        }
        return buggy;
    });

    addtest("bug-offset-values-positioned-inside-static", function(g, d){
        var body = d.body,
            buggy = null;
        if(body && body.insertBefore && d.createElement && d.getElementById){
            var id = "x" + (Math.random() + "").slice(2);
            var clearance = "margin:0;padding:0;border:0;visibility:hidden;";
            var payload = "<div style='position:absolute;top:10px;" + clearance + "'>"+
                "<div style='position:relative;top:10px;" + clearance + "'>"+
                "<div style='height:10px;font-size:1px;" + clearance + "'><\/div>"+
                "<div id='" + id + "'>x<\/div>"+
                "<\/div>"+
                "<\/div>"
            ;
            var wrapper = d.createElement("div");
            if(wrapper){
                wrapper.innerHTML = payload;
                body.insertBefore(wrapper, body.firstChild);
                var el = d.getElementById(id);
                if(el && el.style){
                    if(el.offsetTop !== 10){
                        // buggy, set position to relative and check if it fixes it
                        el.style.position = "relative";
                        if(el.offsetTop === 10){
                            buggy = true;
                        }
                    }else{
                        buggy = false;
                    }
                }
                body.removeChild(wrapper);
            }
            wrapper = null;
        }
        return buggy;
    });

    addtest("bug-xpath-position", function(g, d, el){
        var buggy = null,
            xpath = ".//*[local-name()='p' or local-name()='P'][position() = 2]";

        if(has.isHostType(d, "evaluate") && typeof g.XPathResult == "object"){
            el.innerHTML = "<p>a</p><p>b</p>";
            xpath = d.evaluate(xpath, el, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if(xpath && has.isHostType(xpath, "snapshotItem")){
                buggy = xpath.snapshotItem(0).innerHTML != "b";
            }
            el.innerHTML = "";
        }
        return buggy;
    });

    addtest("bug-overflow-style", function(g, d, el){
        el.innerHTML = "<p style='overflow: visible;'>x</p>";

        var buggy = null,
            style = el.firstChild && el.firstChild.style;
  
        if(style){
            style.overflow = "hidden";
            buggy = style.overflow != "hidden";
        }
        el.innerHTML = "";
        return buggy;
    });

    addtest("bug-qsa", function(g, d, el){
        var buggy = null;
        if(has.isHostType(el, "querySelectorAll")){
            el.innerHTML = "<object><param name=''></object>";
            buggy = el.querySelectorAll("param").length != 1;
            el.innerHTML = "";
        }
        return buggy;
    });


    addtest("bug-string-split-regexp", function(){
        var buggy = null, s = "a_b";
        if(toString.call(s.split) == FUNCTION_CLASS){
            buggy = s.split(/(_)/).length != 3;
        }
        return buggy;
    });

    addtest("bug-function-expression", function(){
        // `x` should be resolved to `null` (the one we declared outside this function)
        // but since named function expression identifier leaks onto the enclosing scope in IE,
        // it will be resolved to a function
        var f = function x(){},
           buggy = typeof x == FN;
        if(buggy){
          x = null;
        }
        return buggy;
    });

    addtest("bug-string-replace-ignores-functions", function(){
        var buggy = null, s = "a";
        if(toString.call(s.replace) == FUNCTION_CLASS){
            buggy = s.replace(s, function(){ return ""; }) != "";
        }
        return buggy;
    });

    addtest("bug-arguments-instanceof-array", function(g){
        return arguments instanceof g.Array;
    });

    addtest("bug-array-concat-arguments", function(){
        return (function(){
            var buggy = null;
            if(has("bug-arguments-instanceof-array")){
                buggy = [].concat(arguments)[0] != 1;
            }
            return buggy;
        })(1,2);
    });

    addtest("bug-dontenum-enumerable", function(){
        for(var prop in { toString: true }){
            return false;
        }
        return true;
    });

    // ES5 added <BOM> (\uFEFF) as a whitespace character
    var whitespace = "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002"+
        "\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";

    addtest("bug-es5-trim", function(){
        var buggy = null;
        if(has("string-trim")){
            buggy = !!whitespace.trim();
        }
        return buggy;
    });

    addtest("bug-es5-regexp", function(){
        return !(/^\s+$/).test(whitespace);
    });

    addtest("bug-tofixed-rounding", function(){
        return (0.9).toFixed() == 0;
    });

    // IE bug
    addtest("bug-bgimagecache", function(g, d){
        var buggy = false;
        try{
            // TODO: Fix false positive for Chrome
            d.execCommand("BackgroundImageCache", false, true);
            buggy = true;
        }catch(e){}
        return buggy;
    });

})(has, has.add, has.cssprop);
