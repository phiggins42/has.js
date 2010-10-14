(function(has, addtest, cssprop){

    var FN = "function",
        STR = "string",
        toString = {}.toString
    ;

    var elem = document.createElement("canvas"); // FIXME: needs to be self-containedish ^ph

    addtest("canvas", function(){ 
        return (elem.getContext && elem.getContext("2d");
    });
    
    addtest("canvas-text", function(){
        return has("canvas") && typeof elem.getContext("2d").fillText == FN;
    });
    
    addtest("svg", function(g){
        return ("SVGAngle" in g);
    });
    
    var svgNS = "http://www.w3.org/2000/svg";

    addtest("svg-inlinesvg", function(g, d, e){
        var supported = null;
        e.innerHTML = "<svg/>";

        supported = (e.firstChild && e.firstChild.namespaceURI) == svgNS;

        e.innerHTML = "";
        return supported;
    });
    
    addtest("svg-smil", function(g, d){
        return !!d.createElementNS && /SVG/.test(toString.call(d.createElementNS(svgNS,"animate")));
    });

    addtest("svg-clippaths", function(g, d){
        return !!d.createElementNS && /SVG/.test(toString.call(d.createElementNS(svgNS,"clipPath")));
    });
    
    addtest("vml", function(g, d, e){
        /*
          Sources:
          http://en.wikipedia.org/wiki/Vector_Markup_Language
          http://msdn.microsoft.com/en-us/library/bb263897(v=VS.85).aspx
          http://www.svg-vml.net/Zibool-compar.htm
        */          
        var vml, supported;

        e.innerHTML = "<v:shape adj=\"1\"/>";
        vml = e.firstChild;

        supported = "adj" in vml;

        vml = null;
        e.innerHTML = "";

        return supported;
    });
    
    addtest("canvas-webgl", function(){
        try{
            if(elem.getContext("webgl")){ return true; }
        }catch(e){}

        try{
            if(elem.getContext("experimental-webgl")){ return true; }
        }catch(e){}

        return false;
    });

})(has, has.add, has.cssprop);
