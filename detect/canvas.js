(function(has, addtest, cssprop){

    var elem = document.createElement( "canvas" ); // FIXME: needs to be self-containedish ^ph
    addtest("canvas", function() { 
        return !!(elem.getContext && elem.getContext('2d'));
    });
    addtest("canvastext", function() {
        return !!(has("canvas") && typeof elem.getContext('2d').fillText == FN);
    });


})(has, has.add, has.cssprop);
