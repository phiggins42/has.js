(function(has, addtest, cssprop ){
    // Adapted from Juriy Zaytsev's Common Feature Tests (http://github.com/kangax/cft)

    var FN = "function";

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
        if(typeof s.replace == FN){
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
        if(typeof s.split == FN){
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
            return (typeof g == FN);
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
        if(e.style && typeof re.test == FN){
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

    // Opera 9.x (possibly other versions as well) returns actual values (instead of "auto") 
    // for statically positioned elements
    addtest('bug-computed-values-for-static', function(g, d){
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
            return (typeof d.forms == FN);
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


    
})(has, has.add, has.cssprop);