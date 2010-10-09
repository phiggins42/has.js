(function(has, addtest, cssprop){

    var FN = "function",
        STR = "string"
    ;

    var elem = document.createElement("canvas"); // FIXME: needs to be self-containedish ^ph

    addtest("canvas", function(){ 
        return !!(elem.getContext && elem.getContext("2d"));
    });
    
    addtest("canvas-text", function(){
        return has("canvas") && typeof elem.getContext("2d").fillText == FN;
    });
    
    addtest("svg", function(g){
        return "SVGAngle" in g;
    });
    
    addtest("svg-inlinesvg", function(g, d, e){
        e.innerHTML = "<svg/>";
        return (e.firstChild && e.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
    });
    
    addtest("svg-smil", function(g, d){
        return !!d.createElementNS && /SVG/.test(tostring.call(d.createElementNS(ns.svg,"animate")));
    });

    addtest("svg-clippaths", function(g, d){
        return !!d.createElementNS && /SVG/.test(tostring.call(d.createElementNS(ns.svg,"clipPath")));
    });
    
    addtest("vml", function(g, d, e){
        /*
          Sources:
          http://en.wikipedia.org/wiki/Vector_Markup_Language
          http://msdn.microsoft.com/en-us/library/bb263897(v=VS.85).aspx
          http://www.svg-vml.net/Zibool-compar.htm
        */          

        var vml;

        e.innerHTML = '<v:shape adj="1"/>';
        vml = div.firstChild;

        return "adj" in vml;
    });
    
    addtest("canvas-webgl", function(){
      try{
          if(elem.getContext('webgl')){ return true; }
      }catch(e){}
      
      try{
          if(elem.getContext('experimental-webgl')){ return true; }
      }catch(e){}

      return false;
    });

})(has, has.add, has.cssprop);
