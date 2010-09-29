(function(has, addtest, cssprop){

    // FIXME: break this out into "modules", like array.js, dom.js, lang.js (?) ^ph

    // we could define a couple "constants" for reuse ...
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
    



})(has, has.add, has.cssprop);
