(function(has){

    var addtest = has.add;
   
    addtest("native-dataset", function(d, e){
       e.setAttribute("data-a-b", "c");
       return (e.dataset && e.dataset.aB === "c");
    });
    
    var ar = [];
    addtest("native-forEach", !!("forEach" in ar));
    addtest("native-isArray", !!("isArray" in ar));
    addtest("native-map", !!ar.map);
    delete ar;

    addtest("window-console", !!("console" in window));
    addtest("beget", !!("create" in Object));

    var canvas = "canvas", canvastext = "canvastext";
    addtest(canvas, function(doc) {
        return !!doc.createElement( canvas ).getContext;
    });

    addtest(canvastext, function(doc) {
        return !!(has(canvas) && typeof doc.createElement( canvas ).getContext('2d').fillText == 'function');
    });
    
})(has);