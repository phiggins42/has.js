(function(has, addtest){

    var methods = [
        "assert",
        "clear",
        "count",
        "debug",
        "dir",
        "dirxml",
        "error",
        "group",
        "groupCollapsed",
        "groupEnd",
        "info",
        "log",
        "markTimeline",
        "memoryProfile",
        "memoryProfileEnd",
        "profile",
        "profileEnd",
        "table",
        "time",
        "timeEnd",
        "timeStamp",
        "trace",
        "warn"
    ];

    addtest("console", function(g){
        return ("console") in g && typeof g.console == "object";
    });

    for(var method in methods){
        (function(m){
            addtest("console-" + m.toLowerCase(), function(g){
                return ("console") in g && m in g.console && typeof g.console[m] == "function";
            });
        }(methods[method]));
    }

})(has, has.add);