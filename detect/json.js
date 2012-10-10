(function(has, addtest, cssprop, undef){
    var FN = "function";

    // Determines whether the (possibly native) `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    addtest("json-parse", function(){
        var supported = false, value;
        if(typeof JSON == "object" && JSON){
            if(typeof JSON.parse == FN){
                try{
                    // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                    // Conforming implementations should also coerce the initial argument to
                    // a string prior to parsing.
                    if(JSON.parse("0") === 0 && !JSON.parse(false)){
                        // Simple parsing test.
                        value = JSON.parse("{\"A\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}");
                        if((supported = value.A.length == 5 && value.A[0] == 1)){
                            try{
                                // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                                supported = !JSON.parse('"\t"');
                            }catch(e){}
                            if(supported){
                                try{
                                    // FF 4.0 and 4.0.1 allow leading `+` signs, and leading and
                                    // trailing decimal points. FF 4.0, 4.0.1, and IE 9-10 also
                                    // allow certain octal literals.
                                    supported = JSON.parse("01") != 1;
                                }catch(e){}
                            }
                        }
                    }
                }catch(e){
                    supported = false;
                }
            }
        }
        return supported;
    });

    addtest("json-stringify", function(){
        var supported = false, value;
        if(typeof JSON == "object" && JSON){
            if(typeof JSON.stringify == FN){
                // A test function object with a custom `toJSON` method.
                (value = function(){
                    return 1;
                }).toJSON = value;
                try{
                    supported =
                        // Firefox 3.1b1 and b2 serialize string, number, and boolean
                        // primitives as object literals.
                        JSON.stringify(0) === "0" &&
                        // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                        // literals.
                        JSON.stringify(new Number()) === "0" &&
                        JSON.stringify(new String()) == '""' &&
                        // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                        // does not define a canonical JSON representation (this applies to
                        // objects with `toJSON` properties as well, *unless* they are nested
                        // within an object or array).
                        JSON.stringify(isNaN) === undef &&
                        // IE 8 serializes `undefined` as `"undefined"`. Safari 5.1.7 and FF
                        // 3.1b3 pass this test.
                        JSON.stringify(undef) === undef &&
                        // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                        // respectively, if the value is omitted entirely.
                        JSON.stringify() === undef &&
                        // FF 3.1b1, 2 throw an error if the given value is not a number,
                        // string, array, object, Boolean, or `null` literal. This applies to
                        // objects with custom `toJSON` methods as well, unless they are nested
                        // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                        // methods entirely.
                        JSON.stringify(value) === "1" &&
                        JSON.stringify([value]) == "[1]" &&
                        // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                        // `"[null]"`.
                        JSON.stringify([undef]) == "[null]" &&
                        // YUI 3.0.0b1 fails to serialize `null` literals.
                        JSON.stringify(null) == "null" &&
                        // FF 3.1b1, 2 halts serialization if an array contains a function:
                        // `[1, true, isNaN, 1]` serializes as "[1,true,],". These versions
                        // of Firefox also allow trailing commas in JSON objects and arrays.
                        // FF 3.1b3 elides non-JSON values from objects and arrays, unless they
                        // define custom `toJSON` methods.
                        JSON.stringify([undef, isNaN, null]) == "[null,null,null]" &&
                        // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                        // where character escape codes are expected (e.g., `\b` => `\u0008`).
                        JSON.stringify({ "A": [value, true, false, null, "\0\b\n\f\r\t"] }) == '{"A":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}' &&
                        // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                        JSON.stringify(null, value) === "1" &&
                        JSON.stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                        // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                        // serialize extended years.
                        JSON.stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                        // The milliseconds are optional in ES 5, but required in 5.1.
                        JSON.stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                        // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                        // four-digit years instead of six-digit years. Credits: @Yaffle.
                        JSON.stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                        // Safari <= 5.1.7 and Opera >= 10.53 incorrectly serialize millisecond
                        // values less than 1000. Credits: @Yaffle.
                        JSON.stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
                }catch(e){
                    supported = false;
                }
            }
        }
        return supported;
    });

    addtest("json", function(){
        return has("json-stringify") && has("json-parse");
    });
})(has, has.add, has.cssprop);