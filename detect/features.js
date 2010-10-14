(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;   

    // FIXME: isn't really native
    // miller device gives "[object Console]" in Opera & Webkit. Object in FF, though. ^pi
    addtest("native-console", function(g){
        return !!("console" in g);
    });

    if(!has("is-browser")){ return; }

    addtest("native-xhr", function(g){
        return has.isHostType(g, "XMLHttpRequest");
    });
    
    addtest("native-cors-xhr", function(g){
        return has('native-xhr') && "withCredentials" in new XMLHttpRequest;
    });
    
    addtest("native-xhr-uploadevents", function(g){
        return has('native-xhr') && "upload" in new XMLHttpRequest;
    });
    
    addtest("activex", function(g){
        return has.isHostType(g, "ActiveXObject");
    });

    addtest("activex-enabled", function(g){
        var supported = null;
        if(has("activex")){
            try{
                supported = !!(new ActiveXObject("htmlfile"));
            }catch(e){
                supported = false;
            }
        }
        return supported;
    });

    // FROM cft.js
    addtest("native-has-attr", function(g, d){
        if(d.createElement){
            var i = d.createElement("iframe"),
                root = d.documentElement,
                frames = g.frames;
            if(root && root.appendChild && root.removeChild){
                i.style.display = "none";
                root.appendChild(i);
                // some clients (e.g. Blackberry 9000 (Bold)) throw error when accesing frame's document
                try{
                    var frame = frames[frames.length-1];
                    if(frame){
                        var doc = frame.document;
                        if(doc && doc.write){
                            doc.write("<html><head><title></title></head><body></body></html>");
                            var present = doc.documentElement ? ("hasAttribute" in doc.documentElement) : false;
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

    addtest("native-geolocation", function() {
        return !!navigator.geolocation;
    });

    addtest("native-crosswindowmessaging", function(global) {
        return !!global.postMessage;
    });
        
    addtest("native-orientation",function(global){
        return "ondeviceorientation" in global;
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
    addtest("eval-global-scope", function(g){
        var fnId = "__eval" + Number(new Date()),
            passed = false;

        try{
            // catch indirect eval call errors (i.e. in such clients as Blackberry 9530)
            g.eval("var " + fnId + "=true");
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
    
    // in chrome incognito mode, openDatabase is truthy, but using it
    //   will throw an exception: http://crbug.com/42380
    // we create a dummy database. there is no way to delete it afterwards. sorry. 
    addtest("native-sql-db", function(g){
        var result = !!g.openDatabase,
            dbname = "hasjstestdb";
            
        if(result){
            try{
                result = !!openDatabase( dbname, "1.0", dbname, 2e4);
            }catch(e){
                result = false;
            }
        }
        return result;
    });
    
    // FIXME: hosttype
    // FIXME: moz and webkit now ship this prefixed. check all possible prefixes. ^pi
    addtest("native-indexeddb", function(g){
        return !!g["indexedDB"];
    });
    
    addtest("native-history-state", function(g){
        return !!(g.history && history.pushState);
    });
    
    addtest("native-websockets", function(g){
        return ('WebSocket' in g);
    });
    
})(has, has.add, has.cssprop);
