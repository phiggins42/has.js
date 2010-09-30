# has.js

Pure feature detection library, a la carte style.

This document is **not** complete. 

## About

Browser sniffing and feature inference are flawed techniques for detecting browser support in client side JavaScript. The goal of 
**has.js** is to provide a collection of self-contained tests and unified framework around using pure feature detection for whatever 
library consumes it. 

You likely _won't_ see **has.js** as a public API in any library. The idea is that _%yourfavoritelibrary%_ will import some or all
the available tests, based on their own needs for providing you a normalized future proof API against common tasks.

**not stable**, so keep that in mind. This is a young project, and the decided naming conventions may be a moving target. 
The tests are nothing that haven't been done over and over in various places,
so the intention is to come to some agreement on a basic naming convention and API based on real world use cases.

Currently, the testing convention is _has('somefeature')_ returns _Boolean_. eg:

    if(has("function-bind")){
        // your enviroment has a native Function.prototype.bind
    }else{
        // you should get a new browser. 
    }
    
In the real world, this may translate into something like:

    mylibrary.trim = has("string-trim") ? function(str){
        return (str || "").trim();
    } : function(str){
        /* do the regexp based string trimming you feel like using */
    }

By doing this, we can easily defer to browser-native versions of common functions, augment prototypes (which **has.js** will _not_ do) to 
supplement the natives, or whatever we choose.

Running _has()_ is a one-time cost, deferred until needed. After first run, subsequent _has()_ checks are cached and return immediately.

## Testing Registration

Each test is self-contained. Register a test with _has.add()_:

    has.add("some-test-name", function(global, document, anElement){
        // global is a reference to global scope, document is the same
        // anElement only exists in browser enviroments, and can be used
        // as a common element from which to do DOM working.
        // ALWAYS CLEAN UP AFTER YOURSELF in a test. No leaks, thanks. 
        // return a Boolean from here.
        return true; 
    });
    
You can register and run a test immediately by passing a truthy value after the test function:

    has.add("some-other-test", function(){
        return false; // Boolean
    }, true)

This is preferred over what would seem a much more effective version:

    // this is not wrapped in a function, and should be:
    has.add("some-other-test", !!("foo" in bar)); // or whatever
    
By forcing a function wrapper around the test logic we are able to defer execution until needed, as well as provide a normalize way for 
each test to have it's own execution context. This way, we can remove some or all the tests we do not need in whatever upstream library
should adopt has.

## Platform Builds

Something resembling a "builder" is coming. 

## Contribute

**has.js** contributions are covered under a common license by way of [Dojo Foundation CLA](http://dojofoundation.org/cla), and brought to you by the following awesome folks:

  + [John David Dalton](http://allyoucanleet.com/) - FuseJS Project Lead
  + [Bryan Forbes](http://http://www.reigndropsfall.net) - Dojo Committer
  + [Andrée Hansson](http://github.com/peol)
  + [Peter Higgins](http://higginsforpresident.net) - Dojo Project Lead
  + [Paul Irish](http://paulirish.com) - jQuery Dev Team
  + [Rick Waldron](http://github.com/rwldrn/)
  + [Juriy Zaytsev](http://perfectionkills.com) -

## License 

Tentatively, **has.js** is available under the Academic Free License, New BSD License, and the MIT License. Providing this common code under multiple licenses requires us to have all contributors agree to a [CLA](http://dojofoundation.org/cla).

