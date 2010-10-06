(function(has, addtest, cssprop){

    var FN = "function",
        STR = "string"
    ;

    var elem = document.createElement( "canvas" ); // FIXME: needs to be self-containedish ^ph

    addtest("canvas", function() { 
        return !!(elem.getContext && elem.getContext("2d"));
    });
    
    addtest("canvas-text", function() {
        return has("canvas") && typeof elem.getContext("2d").fillText == FN;
    });
    
    addtest("svg", function(global) {
        return "SVGAngle" in global;
    });
    
    addtest("vml", function(global) {
        /*
          Sources:
          http://en.wikipedia.org/wiki/Vector_Markup_Language
          http://msdn.microsoft.com/en-us/library/bb263897(v=VS.85).aspx
          http://www.svg-vml.net/Zibool-compar.htm
        */          

        var div = document.createElement("div"),
            vml;

        div.innerHTML = '<v:shape adj="1"/>';
        vml = div.firstChild;

        return "adj" in vml;    
    });

})(has, has.add, has.cssprop);
