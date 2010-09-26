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

    // FIXME: should we test all obj types or just some
    addtest("native-JSON", function(){
        return !!("JSON" in window && JSON.parse('{"a":true}'));
    });

    // FIXME: isn't really native
    addtest("native-console", !!("console" in window));

    // FIXME: poorly named, might be useless
    addtest("beget", !!("create" in Object));


    var elem = doc.createElement( "canvas" );
    addtest("canvas", function(doc) { 
       return elem.getContext && elem.getContext('2d'); 
    });
    addtest("canvastext", function(doc) {
        return !!(has(canvas) && typeof elem.getContext('2d').fillText == 'function');
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
        
})(has);