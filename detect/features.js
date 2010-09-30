(function(has, addtest, cssprop){

    // define a couple "constants" for reuse ...
    // just need to ensure they are the same across detect/*.js 
    // so we can wrap in a single (fn(){})() at 'build' ^ph
    var STR = "string",
        FN = "function"
    ;   

    // FIXME: isn't really native
    addtest("native-console", function(global){
        return !!("console" in global);
    });

    if(!has('is-browser')){ return; }

    // begin browser tests (dom-dataset? ^ph)
    addtest("native-dataset", function(g, d, e){
        e.setAttribute("data-a-b", "c");
        return !!(e.dataset && e.dataset.aB === "c");
    });

    // FIXME: need to decide how to handle 'branching' like this ^ph
    addtest("native-xhr", function(){
        var xhrTests = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'],
            http, ret;
        try{
            http = new XMLHttpRequest();
            if(http){
                ret = new Boolean(true); 
                ret.ACTIVEX = false; 
            }
        }catch(e){
            for(var i = 0, xhr; xhr = xhrTests[i]; i++){
                try{
                    http = new ActiveXObject(xhr);
                }catch(e){}
                if(http){
                    // FIXME: should this be true and sniff ACTIVEX
                    ret = new Boolean(false);
                    ret.ACTIVEX = xhr;
                    break;
                }
            }
        }
        delete xhrTests;
        return ret;
    });
    
    // FROM cft.js
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
    
    /**
     * geolocation tests for the new Geolocation API specification.
     *   This test is a standards compliant-only test; for more complete
     *   testing, including a Google Gears fallback, please see:
     *   http://code.google.com/p/geo-location-javascript/
     * or view a fallback solution using google's geo API:
     *   http://gist.github.com/366184
     */

    addtest("geolocation", function() {
        return !!navigator.geolocation;
    });

    addtest("crosswindowmessaging", function(global) {
        return !!global.postMessage;
    });
        
    addtest('orientation',function(global){
        return 'ondeviceorientation' in global;
    });
    
    /*
     * not sure if there is any point in testing for worker support
     * as an adequate fallback is impossible/pointless 
     * 
     * ^rw
     */

    addtest("native-worker", function(global){
        return !!("Worker" in global);
    });

    addtest("native-sharedworker", function(global){
        return !!("SharedWorker" in global);
    });    
    
    addtest("native-eventsource", function(global){
        return !!("EventSource" in global);
    });
    
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

})(has, has.add, has.cssprop);
