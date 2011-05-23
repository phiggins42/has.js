(function(has, addtest, cssprop){

    // http://github.com/kangax/cft
    var toString = {}.toString,
        STR = "string",
        FN = "function",
        FUNCTION_CLASS = "[object Function]"
    ;

    function testForIn(value){
        var i,
            count = 0,
            klass = function(){ this.toString = 1; };

        for(i in new klass){
            count++;
        }
        return count == value;
    }

    // true for IE < 9
    addtest("bug-for-in-skips-shadowed", function(){
        return testForIn(0);
    });

    // true for Safari 2
    addtest("bug-for-in-repeats-shadowed", function(){
        return testForIn(2);
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
        var buggy = null,
            s = "a";
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
        return (.9).toFixed() == 0;
    });

    if(!has("dom")){ return; }

    addtest("bug-offset-values-positioned-inside-static", function(g, d, el){
        var div, fake,
            buggy = null,
            de = d.documentElement,
            id = "__test_" + Number(new Date()),
            css = "margin:0;padding:0;border:0;visibility:hidden;",
            root = d.body || (function(){
                fake = true;
                return de.insertBefore(d.createElement("body"), de.firstChild);
            }());

        el.innerHTML =
            "<div style='position:absolute;top:10px;" + css + "'>"+
            "<div style='position:relative;top:10px;" + css + "'>"+
            "<div style='height:10px;font-size:1px;"  + css + "'><\/div>"+
            "<div id='" + id + "'>x<\/div>"+
            "<\/div>"+
            "<\/div>";

        root.insertBefore(el, root.firstChild);
        div = d.getElementById(id);

        if(div.firstChild){
            buggy = false;
            if(div.offsetTop != 10){
                // buggy, set position to relative and check if it fixes it
                div.style.position = "relative";
                if(div.offsetTop == 10){
                    buggy = true;
                }
            }
        }
        if(fake){
            root.parentNode.removeChild(root);
        }
        root.removeChild(el);
        has.clearElement(el);
        return buggy;
    });

    // Opera 9.x (possibly other versions as well) returns actual values (instead of "auto")
    // for statically positioned elements
    addtest("bug-computed-values-for-static", function(g, d){
        var cs,
            view,
            de = d.documentElement,
            style = d.style,
            position = null,
            buggy = position;

        if(has("dom-computed-style")){
            // if element is not statically positioned, make it as such, then restore
            view = d.defaultView;
            cs = view.getComputedStyle(de, null);
            if(cs.position != "static"){
                position = cs.position;
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
        var cs,
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
            de = d.documentElement;

        el.style.cssText = "width:40px;height:40px;";

        try{
            de.insertBefore(el, de.firstChild);
            buggy = el.clientWidth == 0;
            de.removeChild(el);
        }catch(e){}

        el.style.cssText = "";
        return buggy;
    });

    addtest("bug-contains", function(g, d, el){
        var buggy = null,
            e2 = d.createElement("div");

        if(has.isHostType(el, "contains")){
            buggy = el.contains(e2);
        }
        return buggy;
    });

    addtest("bug-query-selector-ignores-caps", function(g, d, el){
        var e2,
            buggy = null;

        if(d.compatMode == "BackCompat" && has.isHostType(el, "querySelector")){
            e2 = d.createElement("span");
            e2.className = "Test";
            el.appendChild(e2);
            buggy = (el.querySelector(".Test") != null);
            el.removeChild(e2);
        }
        return buggy;
    });

    // true for Safari
    addtest("bug-typeof-nodelist-function", function(g, d){
        return (typeof d.documentElement.childNodes == FN);
    });

    // true for IE
    addtest("bug-getelementsbytagname-returns-comment-nodes", function(g, d, el){
        var all,
            buggy = null;

        el.appendChild(d.createElement("span")).appendChild(d.createTextNode("a"));
        el.appendChild(d.createComment("b"));
        all = el.getElementsByTagName("*");

        // IE5.5 returns a 0-length collection when calling getElementsByTagName with wildcard
        if(all.length){
            buggy = !!all[1] && all[1].nodeType != 1;
        }
        has.clearElement(el);
        return buggy;
    });

    // name attribute can not be set at run time in IE < 8
    // http://msdn.microsoft.com/en-us/library/ms536389.aspx
    addtest("bug-readonly-element-name", function(g, d, el){
        var buggy, form = el.appendChild(d.createElement("form")),
            input = form.appendChild(d.createElement("input"));

        input.name = "x";
        buggy = input !== form.elements["x"];
        has.clearElement(el);
        return buggy;
    });

    // type attribute can only be set once and cannot be changed once in DOM
    // http://msdn.microsoft.com/en-us/library/ms534700.aspx
    addtest("bug-readonly-element-type", function(g, d, el){
        var buggy = true,
            input = el.appendChild(d.createElement("input"));

        input.type = "text";
        try {
          input.type = "password";
          buggy = input.type != "password";
        } catch (e) { }
        has.clearElement(el);
        return buggy;
    });

    // true for IE
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

    // true for IE
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
        var buggy = true,
            script = d.createElement("script");

        try{
            script.appendChild(d.createTextNode(""));
            buggy = !script.firstChild ||
                (script.firstChild && script.firstChild.nodeType != 3);
        }catch(e){}
        return buggy;
    });

    addtest("bug-getelementbyid-ids-names", function(g, d){
        var input
            name = "__test_" + Number(new Date()),
            root = d.getElementsByTagName("head")[0] || d.documentElement,
            buggy = null;

        if(has("dom-create-attr")){
            input = d.createElement("<input name='"+ name +"'>");
        }else{
            input = d.createElement("input");
            input.name = name;
        }
        try{
            root.insertBefore(input, root.firstChild);
            buggy = d.getElementById(name) == input;
            root.removeChild(input);
        }catch(e){}
        return buggy;
    });

    addtest("bug-getelementbyid-ignores-case", function(g, d){
        var buggy,
            id = "__test_" + Number(new Date()),
            script = d.createElement("script"),
            root = d.getElementsByTagName("script")[0].parentNode;

        script.id = id;
        script.type = "text/javascript";
        root.insertBefore(script, root.firstChild);
        buggy = d.getElementById(id.toUpperCase()) == script;
        root.removeChild(script);
        return buggy;
    });

    addtest("bug-getelementsbyname", function(g, d, el){
        var buggy,
            script = d.createElement("script"),
            id = "__test_" + Number(new Date()),
            root = d.getElementsByTagName("script")[0].parentNode;

        script.id = id;
        script.type = "text/javascript";
        root.insertBefore(script, root.firstChild);
        buggy = d.getElementsByName(id)[0] == script;
        root.removeChild(script);
        return buggy;
    });

    addtest("bug-xpath-position", function(g, d, el){
        var buggy = null,
            xpath = ".//*[local-name()='p' or local-name()='P'][position() = 2]";

        if(has.isHostType(d, "evaluate") && has.isHostType(g, "XPathResult")){
            el.appendChild(d.createElement("p")).appendChild(d.createTextNode("a"));
            el.appendChild(d.createElement("p")).appendChild(d.createTextNode("b"));
            xpath = d.evaluate(xpath, el, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

            if(xpath && has.isHostType(xpath, "snapshotItem")){
                xpath = xpath.snapshotItem(0);
                buggy = !!(xpath && xpath.firstChild) && xpath.firstChild.nodeValue != "b";
            }
            has.clearElement(el);
        }
        return buggy;
    });

    addtest("bug-overflow-style", function(g, d, el){
        el.innerHTML = "<p style='overflow: visible;'>x</p>";

        var buggy = null,
            p = el.firstChild,
            style = p && p.style;

        if(style){
            style.overflow = "hidden";
            buggy = style.overflow != "hidden";
        }
        el.innerHTML = "";
        return buggy;
    });

    // TODO: Add more QSA tests
    addtest("bug-qsa", function(g, d, el){
        var buggy = null;
        if(has.isHostType(el, "querySelectorAll")){
            el.appendChild(d.createElement("object"))
                .appendChild(d.createElement("param"));
            buggy = el.querySelectorAll("param").length != 1;
            has.clearElement(el);
        }
        return buggy;
    });

})(has, has.add, has.cssprop);

