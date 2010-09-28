(function(has){

    // FIXME: break this out into "modules", like array.js, dom.js, lang.js (?)

    var addtest = has.add;
   
    addtest("native-dataset", function(d, e){
       e.setAttribute("data-a-b", "c");
       return (e.dataset && e.dataset.aB === "c");
    });
    
    // FIXME: perhaps wrap in a single "MDC-Array" test?
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

    // FIXME: poorly named, might be useless
    addtest("beget", !!("create" in Object));


    var elem = document.createElement( "canvas" );
    addtest("canvas", function(doc) { 
       return !!(elem.getContext && elem.getContext('2d'));
    });
    addtest("canvastext", function(doc) {
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
    
    // should fail in webkit, as they dont support it.
    addtest('mutation-attrmodified', function(){
      var bool = false;
      var listener = function(){ bool = true; };
      document.documentElement.addEventListener("DOMAttrModified", listener, false);
      document.documentElement.setAttribute("___TEST___", true);
      document.documentElement.removeAttribute("___TEST___", true);
      document.documentElement.removeEventListener("DOMAttrModified", listener, false);
      return bool;
    });



    // works in chrome/ff. not in opera.

    addtest('mutation-domsubtreemodified', function(){

      var bool = false;
      var listener = function(){ console.log(arguments); bool = true; };

      var elem = document.createElement("div");
      //document.documentElement.appendChild(elem)
      elem.innerHTML = "<elem></elem>";

      elem.addEventListener("DOMSubtreeModified", listener, false);
      elem.innerHTML = "<foo></foo>";
      elem.removeEventListener("DOMSubtreeModified", listener, false);
      return bool;

    });

})(has);