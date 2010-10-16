(function(has, addtest, cssprop){

    // FIXME: break this out into "modules", like array.js, dom.js, lang.js (?) ^ph

    // we could define a couple "constants" for reuse ...
    // just need to ensure they are the same across detect/*.js
    // so we can wrap in a single (fn(){})() at 'build' ^ph
    var toString = {}.toString,
        FN = "function",
        FUNCTION_CLASS = "[object Function]",
        OBJECT = Object
    ;

    // true for Gecko, Webkit, Opera 10.5+
    addtest("object-__proto__", function(){
        var supported = false,
            arr = [],
            obj = { },
            backup = arr.__proto__;

        if(arr.__proto__ == Array.prototype &&
                obj.__proto__ == Object.prototype){
            // test if it's writable and restorable
            arr.__proto__ = obj;
            supported = typeof arr.push == "undefined";
            arr.__proto__ = backup;
        }
        return supported && typeof arr.push == FN;
    });

    addtest("object-create", function(){
        return toString.call(OBJECT.create) == FUNCTION_CLASS;
    });

    addtest("object-getprototypeof", function(){
        return toString.call(OBJECT.getPrototypeOf) == FUNCTION_CLASS;
    });

    addtest("object-seal", function(){
        return toString.call(OBJECT.seal) == FUNCTION_CLASS;
    });

    addtest("object-freeze", function(){
        return toString.call(OBJECT.freeze) == FUNCTION_CLASS;
    });

    addtest("object-issealed", function(){
        return toString.call(OBJECT.isSealed) == FUNCTION_CLASS;
    });

    addtest("object-isfrozen", function(){
        return toString.call(OBJECT.isFrozen) == FUNCTION_CLASS;
    });

    addtest("object-keys", function(){
        return toString.call(OBJECT.keys) == FUNCTION_CLASS;
    });

    addtest("object-preventextensions", function(){
        return toString.call(OBJECT.preventExtensions) == FUNCTION_CLASS;
    });

    addtest("object-isextensible", function(){
        return toString.call(OBJECT.isExtensible) == FUNCTION_CLASS;
    });

    addtest("object-defineproperty", function(){
        return toString.call(OBJECT.defineProperty) == FUNCTION_CLASS;
    });

    addtest("object-defineproperties", function(){
        return toString.call(OBJECT.defineProperties) == FUNCTION_CLASS;
    });

    addtest("object-getownpropertydescriptor", function(){
        return toString.call(OBJECT.getOwnPropertyDescriptor) == FUNCTION_CLASS;
    });

    addtest("object-getownpropertynames", function(){
        return toString.call(OBJECT.getOwnPropertyNames) == FUNCTION_CLASS;
    });

    addtest("object-es5", function(){
        return has("object-create") && has("object-defineproperties") && has("object-defineproperty") &&
               has("object-freeze") && has("object-getownpropertydescriptor") && has("object-getownpropertynames") &&
               has("object-getprototypeof") && has("object-isextensible") && has("object-isfrozen") &&
               has("object-issealed") && has("object-keys") && has("object-preventextensions") && has("object-seal");
    });

})(has, has.add, has.cssprop);
