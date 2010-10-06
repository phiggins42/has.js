(function(has, addtest, cssprop){

    addtest("event-contextmenu", function(g, d, e){
        if(e.setAttribute){
            e.setAttribute("oncontextmenu", "");
            return (typeof e.oncontextmenu != "undefined");
        }
        return null;
    });

    var event_tests = function(g, d, test){
        var result = {
            metakey: false,
            preventdefault: false,
            srcelement: false,
            relatedtarget: false
        };
        if(d.createElement){
            var i = d.createElement("input"),
                root = d.documentElement;
            if(i && i.style && i.click && root && root.appendChild && root.removeChild){
                i.type = "checkbox";
                i.style.display = "none";
                i.onclick = function(e){
                    var e = e || g.event;
                    result.metakey = ("metaKey" in e);
                    result.preventdefault = ("preventDefault" in e);
                    result.srcelement = ("srcElement" in e);
                    result.relatedtarget = ("relatedTarget" in e);
                };
                root.appendChild(i);
                i.click();
                root.removeChild(i);
                i.onclick = null;
                i = null;
            }
        }
        
        addtest("event-metakey", result.metakey);
        addtest("event-preventdefault", result.preventdefault);
        addtest("event-srcelement", result.srcelement);
        addtest("event-relatedtarget", result.relatedtarget);
        return result[test];
    };

    addtest("event-metakey", function(g, d){
        return event_tests(g, d, "metakey");
    });

    addtest("event-preventdefault", function(g, d){
        return event_tests(g, d, "preventdefault");
    });

    addtest("event-srcelement", function(g, d){
        return event_tests(g, d, "srcelement");
    });
    
    addtest("event-relatedtarget", function(g, d){
        return event_tests(g, d, "relatedtarget");
    });

})(has, has.add, has.cssprop);
