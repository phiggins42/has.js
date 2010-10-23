(function(has, addtest, cssprop){

    function event_tests(g, d, test){
        var de = d.documentElement,
            input = d.createElement("input"),
            result = {
                metakey: null,
                preventdefault: null,
                stoppropagation: null,
                srcelement: null,
                relatedtarget: null
            };

        if(has.isHostType(input, "click")){
            input.type = "checkbox";
            input.style.display = "none";
            input.onclick = function(e){
                e || (e = g.event);
                result.metakey = ("metaKey" in e);
                result.stoppropagation = ("stopPropagation" in e);
                result.preventdefault = ("preventDefault" in e);
                result.srcelement = ("srcElement" in e);
                result.relatedtarget = ("relatedTarget" in e);
            };
            try{
                de.insertBefore(input, de.firstChild);
                input.click();
                de.removeChild(input);
            }catch(e){}
            input.onclick = null;
        }

        addtest("event-metakey", result.metakey);
        addtest("event-preventdefault", result.preventdefault);
        addtest("event-stoppropagation", result.stoppropagation);
        addtest("event-srcelement", result.srcelement);
        addtest("event-relatedtarget", result.relatedtarget);
        return result[test];
    }

    if(!has("dom")){ return; }

    addtest("event-contextmenu", function(g, d, el){
        var supported = null;
        if(has.isHostType(el, "setAttribute")){
            el.setAttribute("oncontextmenu", "");
            supported = (typeof el.oncontextmenu != "undefined");
        }
        return supported;
    });

    addtest("event-metakey", function(g, d){
        return event_tests(g, d, "metakey");
    });

    addtest("event-preventdefault", function(g, d){
        return event_tests(g, d, "preventdefault");
    });

    addtest("event-stoppropagation", function(g, d){
        return event_tests(g, d, "stoppropagation");
    });

    addtest("event-srcelement", function(g, d){
        return event_tests(g, d, "srcelement");
    });

    addtest("event-relatedtarget", function(g, d){
        return event_tests(g, d, "relatedtarget");
    });

})(has, has.add, has.cssprop);
