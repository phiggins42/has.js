(function(has, addtest, cssprop){

    var FN = "function",
        STR = "string",
        toString = {}.toString
    ;

    if(!has("dom")){ return; }

    // FIXME: needs to be self-containedish ^ph
    var canvas = document.createElement("canvas");

    addtest("canvas", function(){
        return has.isHostType(canvas, "getContext") && !!canvas.getContext("2d");
    });

    addtest("canvas-webgl", function(){
        return !!window.WebGLRenderingContext;
    });

    addtest("canvas-text", function(){
        return has("canvas") && typeof canvas.getContext("2d").fillText == FN;
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
