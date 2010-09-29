(function(has){
    // Adapted from http://github.com/kangax/cft

    var addtest = has.add;

    // non-browser specific
    addtest('eval-global-scope', function(g){
        var fnId = '__eval' + Number(new Date()),
            passed = false;

        try{
            // catch indirect eval call errors (i.e. in such clients as Blackberry 9530)
            g.eval('var ' + fnId + '=true');
        }catch(e){}
        passed = (g[fnId] === true);
        if(passed){
            try{
                delete g[fnId];
            }catch(e){
                g[fnId] = void 0;
            }
        }
        return passed;
    });

    addtest('bug-string-replace-ignores-functions', function(g){
        var s = 'a';
        if(typeof s.replace == 'function'){
            return (s.replace(s, function(){ return ''; }).length !== 0);
        }
        return null;
    });

    addtest('bug-arguments-instanceof-array', function(g){
        return arguments instanceof g.Array;
    });

    addtest('bug-array-concat-arguments', function(g){
        return (function(){
            if(has('bug-arguments-instanceof-array')){
                return [].concat(arguments)[0] !== 1;
            }
            return null;
        })(1,2);
    });

    addtest('bug-dontenum-enumerable', function(){
        for(var prop in { toString: true }){
            return false;
        }
        return true;
    });

    addtest('bug-regexp-whitespace', function(){
        var str = "\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u180E\u2000\u2001\u2002"+
                "\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029";
        return !/^\s+$/.test(str);
    });

    addtest('bug-string-split-regexp', function(){
        var s = 'a_b';
        if(typeof s.split == 'function'){
            return s.split(/(_)/).length !== 3;
        }
        return null;
    });

    addtest('bug-function-expression', function(){
        var g = null;
        return (function(){
            var f = function g(){};
            // `g` should be resolved to `null` (the one we declared outside this function)
            // but since named function expression identifier leaks onto the enclosing scope in IE, 
            // it will be resolved to a function
            return (typeof g == 'function');
        })();
    });

    if(!has('is-browser')){ return; }

    // Browser features:

    addtest('dom-tagname-uppercase', function(g, d){
        var e = d && d.documentElement;
        if(e){
            return 'HTML' === e.nodeName;
        }
        return null;
    });

    addtest('array-prototype-slice-nodelist', function(g, d){
        try{
            return (Array.prototype.slice.call(d.forms, 0) instanceof Array);
        }catch(e){
            return false;
        }
    });

    addtest('native-has-attribute', function(g, d){
        if(d.createElement){
            var i = d.createElement('iframe'),
                root = d.documentElement,
                frames = g.frames;
            if(root && root.appendChild && root.removeChild){
                i.style.display = 'none';
                root.appendChild(i);
                // some clients (e.g. Blackberry 9000 (Bold)) throw error when accesing frame's document
                try{
                    var frame = frames[frames.length-1];
                    if(frame){
                        var doc = frame.document;
                        if(doc && doc.write){
                            doc.write('<html><head><title></title></head><body></body></html>');
                            var present = doc.documentElement ? ('hasAttribute' in doc.documentElement) : false;
                            root.removeChild(i);
                            i = null;
                            return present;
                        }
                    }
                }catch(e){
                    return null;
                }
            }
        }
        return null;
    });

    addtest('event-contextmenu', function(g, d, e){
        if(e.setAttribute){
            e.setAttribute('oncontextmenu', '');
            return (typeof e.oncontextmenu != 'undefined');
        }
        return null;
    });

    addtest('css-rgba', function(g, d, e){
        var re = /^rgba/,
            result = null,
            prev;
        if(e.style && typeof re.test == 'function'){
            try{
                prev = e.style.color;
                e.style.color = 'rgba(1,1,1,0.5)';
                result = re.test(e.style.color);
                e.style.color = prev;
            }catch(e){
                result = false;
            }
        }
        return result;
    });

    addtest('css-enabled', function(g, d){
        var b = d.body,
            supported = null;
        if(b && b.appendChild && b.removeChild){
            var e = d.createElement('div');
            if(e && e.style){
                e.style.display = 'none';
                b.appendChild(e);
                supported = (e.offsetWidth === 0);
                b.removeChild(e);
                e = null;
            }
        }
        return supported;
    });

    var event_tests = function(g, d, test){
        var result = {
            metakey: false,
            preventdefault: false,
            srcelement: false,
            relatedtarget: false
        };
        if(d.createElement){
            var i = d.createElement('input'),
                root = d.documentElement;
            if(i && i.style && i.click && root && root.appendChild && root.removeChild){
                i.type = 'checkbox';
                i.style.display = 'none';
                i.onclick = function(e){
                    var e = e || g.event;
                    result.metakey = ('metaKey' in e);
                    result.preventdefault = ('preventDefault' in e);
                    result.srcelement = ('srcElement' in e);
                    result.relatedtarget = ('relatedTarget' in e);
                };
                root.appendChild(i);
                i.click();
                root.removeChild(i);
                i.onclick = null;
                i = null;
            }
        }
        addtest('event-metakey', result.metakey);
        addtest('event-preventdefault', result.preventdefault);
        addtest('event-srcelement', result.srcelement);
        addtest('event-relatedtarget', result.relatedtarget);
        return result[test];
    };

    addtest('event-metakey', function(g, d){
        return event_tests(g, d, 'metakey');
    });
    addtest('event-preventdefault', function(g, d){
        return event_tests(g, d, 'preventdefault');
    });
    addtest('event-srcelement', function(g, d){
        return event_tests(g, d, 'srcelement');
    });
    addtest('event-relatedtarget', function(g, d){
        return event_tests(g, d, 'relatedtarget');
    });

    // Opera 9.x (possibly other versions as well) returns actual values (instead of "auto") 
    // for statically positioned elements
    addtest('dom-computed-values-for-static', function(g, d){
        var view = d.defaultView;
        if (view && view.getComputedStyle) {
            var de = d.documentElement;
            var position = null;
            var style = view.getComputedStyle(de, null);
            // if element is not statically positioned, make it as such, then restore
            if(style.position !== 'static'){
                position = style.position;
                de.style.position = '';
            }
            var result = (view.getComputedStyle(de, null).left !== 'auto');
            if(position !== null){
                de.style.position = position;
            }
            return result;
        }
        return null;
    });

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

    // Browser bugs:

    addtest('bug-contains', function(g, d, e){
        var e2 = d.createElement('div');
        if(e && e2 && e.contains){
            return e.contains(e2);
        }
        return null;
    });

    addtest('bug-query-selector-ignores-caps', function(g, d, e){
        if(d.compatMode == 'BackCompat'){
            var e2 = d.createElement('span');
            if(e2 && e.appendChild && e.querySelector){
                e2.className = 'Test';
                e.appendChild(e2);
                var buggy = (e.querySelector('.Test') !== null);
                e.removeChild(e2);
                e2 = null;
                return buggy;
            }
        }
        return null;
    });

    addtest('bug-typeof-nodelist-function', function(g, d){
        if(d.forms){
            return (typeof d.forms == 'function');
        }
        return null;
    });

    // IE returns comment nodes as part of `getElementsByTagName` results
    addtest('bug-getelementsbytagname-returns-comment-nodes', function(g, d, e){
        if(e && e.getElementsByTagName){
            e.innerHTML = '<span>a</span><!--b-->';
            var all = e.getElementsByTagName('*');
            // IE5.5 returns a 0-length collection when calling getElementsByTagName with wildcard
            if(all.length){
                var lastNode = e.getElementsByTagName('*')[1];
                var buggy = !!(lastNode && lastNode.nodeType === 8);
                lastNode = all = null;
                e.innerHTML = '';
                return buggy;
            }
        }
        return null;
    });

    // name attribute can not be set at run time in IE
    // http://msdn.microsoft.com/en-us/library/ms536389.aspx
    addtest('bug-setattribute-ignores-name', function(g, d){
        var elForm = d.createElement('form'),
            elInput = d.createElement('input'),
            root = d.documentElement;
        if (elForm && elInput && elInput.setAttribute && elForm.appendChild && 
            root && root.appendChild && root.removeChild) {
            elInput.setAttribute('name', 'test');
            elForm.appendChild(elInput);
            // Older Safari (e.g. 2.0.2) populates "elements" collection only when form is within a document
            root.appendChild(elForm);
            var isBuggy = elForm.elements ? (typeof elForm.elements['test'] == 'undefined') : null;
            root.removeChild(elForm);
            return isBuggy;
        }
        return null;
    });

    addtest('bug-properties-are-attributes', function(g, d, e){
        if(e && e.getAttribute){
            e.__foo = 'bar';
            var buggy = (e.getAttribute('__foo') === 'bar');
            return buggy;
        }
        return null;
    });

    addtest('bug-pre-ignores-newline', function(g, d){
        var el = d.createElement('pre');
        var txt = d.createTextNode('xx');
        var root = d.documentElement;
        if(el && el.appendChild && txt && root && root.appendChild && root.removeChild){
            el.appendChild(txt);
            root.appendChild(el);
            var initialHeight = el.offsetHeight;
            el.firstChild.nodeValue = 'x\nx';
            // check if `offsetHeight` changed after adding '\n' to the value
            var isIgnored = (el.offsetHeight === initialHeight);
            root.removeChild(el);
            el = txt = null;
            return isIgnored;
        }
        return null;
    });

    addtest('bug-select-innerhtml', function(g, d){
        var el = d.createElement('select'), 
            isBuggy = true;
        if(el){
            el.innerHTML = '<option value="test">test<\/option>';
            if(el.options && el.options[0]){
                isBuggy = el.options[0].nodeName.toUpperCase() !== 'OPTION';
            }
            el = null;
            return isBuggy;
        }
        return null;
    });

    addtest('bug-table-innerhtml', function(g, d){
        try{
            var el = d.createElement('table');
            if(el && el.tBodies){
                el.innerHTML = '<tbody><tr><td>test<\/td><\/tr><\/tbody>';
                var isBuggy = typeof el.tBodies[0] == 'undefined';
                el = null;
                return isBuggy;
            }
        }catch(e){
            return true;
        }
    });

    addtest('bug-script-rejects-textnode-append', function(g, d){
        var s = d.createElement('script'),
            isBuggy = false;
        if(s && s.appendChild){
            try{
                s.appendChild(d.createTextNode(''));
                isBuggy = !s.firstChild || (s.firstChild && s.firstChild.nodeType !== 3);
            }catch(e){
                return true;
            }
            s = null;
            return isBuggy;
        }
        return null;
    });

    addtest('bug-getelementbyid-ids-names', function(g, d){
        if(d.getElementsByTagName && d.createElement){
            // need to feature test all these DOM methods before calling them
            var num = Number(new Date()),
                name = '__test_' + num,
                head = d.getElementsByTagName('head')[0],
                isBuggy = false, 
                el;
            try{
                el = d.createElement('<input name="'+ name +'">');
            }catch(e){
                el = d.createElement('input');
                el.name = name;
            }
            if(head.appendChild && head.removeChild){
                head.appendChild(el);
                var testElement = d.getElementById(name);
                isBuggy = !!(testElement && (testElement.nodeName.toUpperCase() === 'INPUT'));
                head.removeChild(el);
                el = null;
                return isBuggy;
            }
        }
        return null;
    });

    addtest('bug-getelementbyid-ignores-case', function(g, d){
        if(d.createElement && d.getElementsByTagName && d.getElementById){
            var el = d.createElement('script'),
                head = d.getElementsByTagName('head')[0];
            if(el && head && head.appendChild && head.removeChild){
                el.type = 'text/javascript';
                el.id = 'A';
                head.appendChild(el);
                var buggy = !!d.getElementById('a');
                head.removeChild(el);
                el = null;
                return buggy;
            }
        }
        return null;
    });

    addtest('bug-getelementsbyname', function(g, d){
        var isBuggy = null, 
            docEl = d.documentElement;
        if(docEl && docEl.appendChild && docEl.removeChild &&
            d.getElementsByName && d.createElement){
            var el = d.createElement('div');
            if(el){
                var uid = 'x' + (Math.random() + '').slice(2);
                el.id = uid;
                docEl.appendChild(el);
                isBuggy = d.getElementsByName(uid)[0] === el;
                docEl.removeChild(el);
            } 
        }
        return isBuggy;
    });

    addtest('bug-offset-values-positioned-inside-static', function(g, d){
        var body = d.body, 
            isBuggy = null;
        if(body && body.insertBefore && d.createElement && d.getElementById){
            var id = 'x' + (Math.random() + '').slice(2);
            var clearance = "margin:0;padding:0;border:0;visibility:hidden;";
            var payload = '<div style="position:absolute;top:10px;' + clearance + '">'+
                '<div style="position:relative;top:10px;' + clearance + '">'+
                '<div style="height:10px;font-size:1px;' + clearance + '"><\/div>'+
                '<div id="'+id+'">x<\/div>'+
                '<\/div>'+
                '<\/div>';
            var wrapper = d.createElement('div');
            if(wrapper){
                wrapper.innerHTML = payload;
                body.insertBefore(wrapper, body.firstChild);
                var el = d.getElementById(id);
                if (el && el.style) {
                    if (el.offsetTop !== 10) {
                        // buggy, set position to relative and check if it fixes it
                        el.style.position = 'relative';
                        if (el.offsetTop === 10) {
                            isBuggy = true;
                        }
                    } else {
                        isBuggy = false;
                    }
                }
                body.removeChild(wrapper);
            }
            wrapper = null;
        }
        return isBuggy;
    });

    addtest('bug-xpath-position', function(g, d){
        var isBuggy = null;
        if(d.evaluate && g.XPathResult){
            var el = d.createElement('div');
            el.innerHTML = '<p>a</p><p>b</p>'
            var xpath = ".//*[local-name()='p' or local-name()='P'][position() = 2]";
            var result = d.evaluate(xpath, el, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            if(result && result.snapshotItem){
                isBuggy = (result.snapshotItem(0).innerHTML !== 'b');
            }
            el.innerHTML = '';
        }
        return isBuggy;
    });

    addtest('bug-overflow-style', function(g, d, e){
        var isBuggy = null;
        e.innerHTML = '<p style="overflow: visible;">x</p>';
        var firstChild = e.firstChild;
        if(firstChild && firstChild.style){
            firstChild.style.overflow = 'hidden';
            isBuggy = firstChild.style.overflow !== 'hidden';
        }
        firstChild = null;
        e.innerHTML = '';
        return isBuggy;
    });

    addtest('bug-qsa', function(g, d, e){
        var isBuggy = null;
        if(e && e.querySelectorAll){
            e.innerHTML = '<object><param name=""></object>';
            isBuggy = e.querySelectorAll("param").length != 1;
            e.innerHTML = '';
        }
        return isBuggy;
    });
})(has);
