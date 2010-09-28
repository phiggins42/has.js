(function(has){

    // FIXME: break this out into "modules", like array.js, dom.js, lang.js (?) ^ph

    var addtest = has.add;
   
    addtest("native-dataset", function(d, e){
       e.setAttribute("data-a-b", "c");
       return !!(e.dataset && e.dataset.aB === "c");
    });
    
    // FIXME: perhaps wrap in a single "MDC-Array" test? ^ph
    var ar = [];
    addtest("native-forEach", !!("forEach" in ar));
    addtest("native-isArray", !!("isArray" in Array));
    addtest("native-map", !!ar.map);
    delete ar;
    
    addtest('function-caller', (function(undefined) { 
      function test() { return test.caller !== undefined }
      return test();
    })());
    
    addtest("json-parse", function(){
        return !!("JSON" in window && typeof JSON.parse == "function" && JSON.parse('{"a":true}').a);
    });

    addtest("json-stringify", function(){
        return !!("JSON" in window && typeof JSON.stringify == "function" && JSON.stringify({a:true}) == '{"a":true}');
    });

    // FIXME: isn't really native
    addtest("native-console", !!("console" in window));

    // FIXME: poorly named, might be useless ^ph
    addtest("beget", !!("create" in Object));

    // FIXME: need to decide how to handle 'branching' like this ^ph
    var xhrTests = ['Msxml2.XMLHTTP', 'Microsoft.XMLHTTP', 'Msxml2.XMLHTTP.4.0'];
    addtest("native-xhr", function(){
        var http, ret;
        try{
            http = new XMLHttpRequest();
            if(http){ 
                ret = new Boolean(true); 
                ret.ACTIVEX = false; 
            }
        }catch(e){ 
            for(var i = 0, l = xhrTests.length; i < l; i++){
                var xhr = xhrTests[i];
                try{
                    http = new ActiveXObject(xhr);
                }catch(e){}
                if(http){ 
                    // FIXME: should this be true and sniff ACTIVEX
                    ret = new Boolean(false);
                    ret.ACTIVEX = xhr;
                }
                delete xhrTests;
            }
        }
        return ret;
    });

    var elem = document.createElement( "canvas" );
    addtest("canvas", function() { 
       return !!(elem.getContext && elem.getContext('2d'));
    });
    addtest("canvastext", function() {
        return !!(has("canvas") && typeof elem.getContext('2d').fillText == 'function');
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

    addtest("crosswindowmessaging", function() {
        return !!window.postMessage;
    });
        
    addtest('orientation',function(){
      return 'ondeviceorientation' in window;
    });
    
    addtest('positionfixed', function(d) {
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

        if (fake) {
            d.documentElement.removeChild(root);
        }

        return ret;
    });

})(has);