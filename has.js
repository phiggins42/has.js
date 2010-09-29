has = (function(g, d){
    
    // summary: A simple feature detection function/framework.
    //
    // name: String
    //      The name of the feature to detect, as defined by the overall `has` tests.
    //      Tests can be registered via `has.add(testname, testfunction)`. 
    //
    // example:
    //      mylibrary.bind = has("native-bind") ? function(fn, context){
    //          return fn.bind(context);
    //      } : function(fn, context){
    //          return function(){
    //              fn.apply(context, arguments);
    //          }
    //      }
    
    var el = d && d.createElement("has"),
        testCache = {}, 
        has = function(/* String */name){
            if(typeof testCache[name] == "function"){
                testCache[name] = testCache[name](g, d, el);
            }
            return testCache[name]; // Boolean
        }
    ;
    
    has.add = function(/* String */name, /* Function|Boolean */test, /* Boolean? */now){
        // summary: Register a new feature detection test for some named feature
        //
        // name: String
        //      The name of the feature to test.
        //
        // test: Function|Boolean
        //      A test function to register. If a function, queued for testing until actually
        //      needed. Can be a boolean if the test is incredibly trivial, though in this case
        //      be sure to NOT pass the `now` member, as any truthy value there assumes
        //      the `test` is a function. The test function should return a boolean indicating
        //      the presence of a feature. Truthy values will suffice. 
        //
        // now: Boolean? 
        //      Optional. Omit if `test` is not a function. Provides a way to immediately
        //      run the test and cache the result.
        // example:
        //      A redundant test, testFn with immediate execution:
        //  |       has.add("javascript", function(){ return true; }, true); 
        //  
        // example:
        //      Again with the redundantness:
        //  |       has.add("javascript", true);
        //
        // example:
        //      Two things are passed to the testFunction. `document`, and a generic element
        //      from which to work your test, should the need arise. 
        //  |       has.add("bug-byid", function(doc, el){
        //  |           // doc == document, el == the generic element
        //  |           return false; // fake test, byid-when-form-has-name-matching-an-id is slightly longer
        //  |       });
        testCache[name] = now ? test(g, d, el) : test;
    };
    
    var ucFirstRE = /^(.)/,
        wordRE = /(\w+)/g,
        prefixes = 'Webkit Moz O ms Khtml'
    ;
        
    // cssprop adapted from http://gist.github.com/598008 (thanks, ^pi)
    has.cssprop = function(styleName, elem){
        var s, camel;
        if(elem && (s = elem.style)){
            if(typeof s[styleName] == "string"){ return true; }
            camel = styleName.replace(ucFirstRE, function(all, letter){
                return letter.toUpperCase();
            });
            return (prefixes.replace(wordRE, function(prefix){
                if(typeof s[prefix + camel] == "string"){ return true; }
            }).indexOf('true') != -1);
        }
        return false;
    }
    
    has.all = function(){
        // summary: For debugging or logging, can be removed in production. Run all known tests 
        //  at some point in time for the current environment. 
        var ret = {};
        for(var i in testCache){
            try{
                ret[i] = has(i);
            }catch(e){
                ret[i] = "error";
                ret[i].ERROR_MSG = e;
            }
        }
        return ret; // Object
    };

    has.add('is-browser', function(global, document, element){
        return (typeof document != 'undefined' && typeof element != 'undefined' && typeof navigator != 'undefined');
    }, true);
    
    //>>include detect/bugs.js
    //>>include detect/features.js
    
    return has;

})(this, document);


