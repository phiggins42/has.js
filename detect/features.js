(function(has, addtest, cssprop){

    // FIXME: break this out into "modules", like array.js, dom.js, lang.js (?) ^ph

    // we could define a couple "constants" for reuse ...
    // just need to ensure they are the same across detect/*.js 
    // so we can wrap in a single (fn(){})() at 'build' ^ph
    var STR = "string",
        FN = "function"
    ;   

    // Array tests
    addtest("array-foreach", function(){
        return "forEach" in [];
    });

    addtest("array-isarray", function(){
        return "isArray" in Array && Array.isArray([]);
    });

    addtest("array-map", function(){
        return "map" in [];
    });
    
    addtest("es5-array", function(){
        var ar = [];
        return has("array-isArray") && ("indexOf" in ar) && ("lastIndexOf" in ar) &&
            ("every" in ar) && ("some" in ar) && has("array-forEach") &&
            has("array-map") && ("filter" in ar) && ("reduce" in ar) && ("reduceRight" in ar);
    });

    // Function tests
    addtest("function-bind", function(){
        return "bind" in Function.prototype;
    });

    addtest("function-caller", (function(undefined) { 
        function test() { return test.caller !== undefined; }
        return test();
    })());

    // Object tests // break into detect/object.js
    addtest("object-create", function(){
        return "create" in Object;
    });
    
    addtest("object-getprototypeof", function(){
        return "getPrototypeOf" in Object;
    });
    
    addtest("object-seal", function(g){
        var o = Object;
        return ("seal" in o) && ("freeze" in o) && ("isSealed" in o) && ("isFrozen" in o);
    });
    
    addtest("object-keys", function(){
        return "keys" in Object;
    });
    
    addtest("object-extensible", function(){
        return ("preventExtensions" in Object) && ("isExtensible" in Object);
    });
    
    addtest("object-properties", function(){
        var o = Object;
        return ("defineProperty" in o) && ("defineProperties" in o) &&
            ("getOwnPropertyDescriptor" in o) && ("getOwnPropertyNames" in o);
    });
    
    addtest("es5-object", function(){
        return has("object-create") && has("object-getPrototypeOf") && has("object-seal") &&
            has("object-keys") && has("object-extensible") && has("object-properties");
    });

    // String tests
    addtest("string-trim", function(){
        return "trim" in String.prototype;
    });

    // Date tests
    addtest("date-toisostring", function(){
        return "toISOString" in Date.prototype;
    });

    addtest("date-tojson", function(){
        return "toJSON" in Date.prototype;
    });

    addtest("date-now", function(){
        return "now" in Date;
    });

    // JSON tests
    addtest("json-parse", function(global){
        return !!("JSON" in global && typeof JSON.parse == FN && JSON.parse('{"a":true}').a);
    });
    
    addtest("json-stringify", function(global){
        return !!("JSON" in global && typeof JSON.stringify == FN && JSON.stringify({a:true}) == '{"a":true}');
    });

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

    var elem = document.createElement( "canvas" ); // FIXME: needs to be self-containedish ^ph
    addtest("canvas", function() { 
        return !!(elem.getContext && elem.getContext('2d'));
    });
    addtest("canvastext", function() {
        return !!(has("canvas") && typeof elem.getContext('2d').fillText == FN);
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
    
    // should fail in webkit, as they dont support it.
    addtest('dom-attrmodified', function(g, d){
        var bool = false,
            root = d.documentElement;
            
        var listener = function(){ bool = true; };
        root.addEventListener("DOMAttrModified", listener, false);
        root.setAttribute("___TEST___", true);
        root.removeAttribute("___TEST___", true);
        root.removeEventListener("DOMAttrModified", listener, false);
        return bool;
    });

    // works in chrome/ff. not in opera.
    addtest('dom-subtreemodified', function(g, d){

        var bool = false,
            elem = d.createElement("div"),
            listener = function(){ bool = true; };

        elem.innerHTML = "<elem></elem>";

        elem.addEventListener("DOMSubtreeModified", listener, false);
        elem.innerHTML = "<foo></foo>";
        elem.removeEventListener("DOMSubtreeModified", listener, false);
        return bool;

    });

    // FIXME: move to detect/css.js perhaps ^ph
    addtest('css-position-fixed', function(g, d) {
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

        if(fake){
            d.documentElement.removeChild(root);
        }

        return ret;
    });
    
    addtest("css-border-radius", function(g, d, e){
        return cssprop('borderRadius', e);
    });

    addtest("css-box-shadow", function(g, d, e){
        return cssprop('boxShadow', e);
    });

    addtest("css-opacity", function(g, d, e){
        return cssprop('opacity', e);
    });

    addtest("css-resize", function(g, d, e){
        return cssprop('resize', e);
    });

    addtest("css-text-overflow", function(g, d, e){
        return cssprop('textOverflow', e);
    });

    addtest("css-text-shadow", function(g, d, e){
        return cssprop('textShadow', e);
    });

    addtest("css-transform", function(g, d, e){
        return cssprop('transform', e);
    });

})(has, has.add, has.cssprop);
