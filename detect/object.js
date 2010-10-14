(function(has, addtest, cssprop){

    // FIXME: break this out into "modules", like array.js, dom.js, lang.js (?) ^ph

    // we could define a couple "constants" for reuse ...
    // just need to ensure they are the same across detect/*.js 
    // so we can wrap in a single (fn(){})() at 'build' ^ph
    var STR = "string",
        FN = "function", 
        OBJECT = Object
    ;   

    // true for Gecko, Webkit, Opera 10.5+
    addtest("object-__proto__", function(){
        var supported = false, arr = [], obj = { }, backup = arr.__proto__;
        if (arr.__proto__ == Array.prototype  &&
              obj.__proto__ == Object.prototype) {
            // test if it's writable and restorable
            arr.__proto__ = obj;
            supported = typeof arr.push == "undefined";
            arr.__proto__ = backup;
        }
        return supported && typeof arr.push == "function";
    });

    addtest("object-create", function(){
        return "create" in OBJECT;
    });
    
    addtest("object-getprototypeof", function(){
        return "getPrototypeOf" in OBJECT;
    });

    addtest("object-seal", function(g){
        return "seal" in OBJECT;
    });

    addtest("object-freeze", function(g){
        return "freeze" in OBJECT;
    });

    addtest("object-issealed", function(g){
        return "isSealed" in OBJECT;
    });

    addtest("object-isfrozen", function(g){
        return "isFrozen" in OBJECT;
    });
    
    addtest("object-keys", function(){
        return "keys" in OBJECT;
    });

    addtest("object-preventextensions", function(){
        return "preventExtensions" in OBJECT;
    });
    
    addtest("object-isextensible", function(){
        return "isExtensible" in OBJECT;
    });

    addtest("object-defineproperty", function(){
        return "defineProperty" in OBJECT;
    });

    addtest("object-defineproperties", function(){
        return "defineProperties" in OBJECT;
    });

    addtest("object-getownpropertydescriptor", function(){
        return "getOwnPropertyDescriptor" in OBJECT;
    });
    
    addtest("object-getownpropertynames", function(){
        return "getOwnPropertyNames" in OBJECT;
    });
    
    addtest("object-es5", function(){
        return has("object-create") && has("object-defineproperties") && has("object-defineproperty") && 
                has("object-freeze") && has("object-getownpropertydescriptor") && has("object-getownpropertynames") && 
                has("object-getprototypeof") && has("object-isextensible") && has("object-isfrozen") && 
                has("object-issealed") && has("object-keys") && has("object-preventextensions") && has("object-seal");
    });


})(has, has.add, has.cssprop);
