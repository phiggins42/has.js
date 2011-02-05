(function(has, addtest, cssprop){

    var toString = {}.toString,
        STR = "string",
        FN = "function"
    ;

    if(!has("dom")){ return; }

    addtest("canvas", function(g){
        return has.isHostType(g, "CanvasRenderingContext2D");
    });

    addtest("canvas-webgl", function(g){
        return has.isHostType(g, "WebGLRenderingContext");
    });

    addtest("canvas-text", function(g, d){
        return has("canvas") && typeof d.createElement("canvas").getContext("2d").fillText == FN;
    });


    var svgNS = "http://www.w3.org/2000/svg";

    addtest("svg", function(g){
        return ("SVGAngle" in g);
    });

    addtest("svg-inlinesvg", function(g, d, el){
        var supported = null;
        el.innerHTML = "<svg/>";
        supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
        el.innerHTML = "";
        return supported;
    });

    addtest("svg-smil", function(g, d){
        return has("dom-createelementns") && /SVG/.test(toString.call(d.createElementNS(svgNS, "animate")));
    });

    addtest("svg-clippaths", function(g, d){
        return has("dom-createelementns") && /SVG/.test(toString.call(d.createElementNS(svgNS, "clipPath")));
    });

    addtest("vml", function(g, d, el){
        /*
          Sources:
          http://en.wikipedia.org/wiki/Vector_Markup_Language
          http://msdn.microsoft.com/en-us/library/bb263897(v=VS.85).aspx
          http://www.svg-vml.net/Zibool-compar.htm
        */
        el.innerHTML = "<v:shape adj=\"1\"/>";
        var supported = ("adj" in el.firstChild);
        el.innerHTML = "";
        return supported;
    });

})(has, has.add, has.cssprop);
