(function(has, addtest, cssprop){


    // Array tests
    addtest("array-foreach", function(){
        return "forEach" in [];
    });

    addtest("array-isarray", function(){
        return "isArray" in Array && Array.isArray([]);
    });

    addtest("array-map", function(){
        return "map" in [];
    });
    
    addtest("array-es5", function(){
        var ar = [];
        return has("array-isarray") && ("indexOf" in ar) && ("lastIndexOf" in ar) &&
            ("every" in ar) && ("some" in ar) && has("array-foreach") &&
            has("array-map") && ("filter" in ar) && ("reduce" in ar) && ("reduceRight" in ar);
    });

    
    // FROM cft.js
    addtest('array-prototype-slice-nodelist', function(g, d){
        try{
            return (Array.prototype.slice.call(d.forms, 0) instanceof Array);
        }catch(e){
            return false;
        }
    });




})(has, has.add, has.cssprop);
