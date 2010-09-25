has = (function(d){

    var el = d.createElement("has"),
        testCache = {}, 
        has = function(name){
            if(typeof testCache[name] == "function"){
                testCache[name] = testCache[name](d, el);
            }
            return testCache[name];
        };
    
    has.add = function(name, test, now){
        testCache[name] = now ? test(d, el) : test;
    }
    
    has.all = function(){
        var ret = {};
        for(var i in testCache){
            ret[i] = has(i);
        }
        return ret;
    }
    
    return has;

})(document);