(function(has, addtest, cssprop){

// FIXME: add juriy's CFT tests ^PI
//   http://github.com/kangax/cft


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
    
})(has, has.add, has.cssprop);
