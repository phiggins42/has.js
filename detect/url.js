(function (has, addtest) {
    
    var toString = {}.toString,
        FUNCTION_CLASS = "[object Function]";

    // See if URL is available
    addtest("native-url", function (g) {
        return has.isHostType(g, "URL");
    });

    // Test for URL's methods
    addtest("url-create-object-url", function () {
        return toString.call(URL.createObjectURL) == FUNCTION_CLASS;
    });
    
    addtest("url-revoke-object-url", function () {
        return toString.call(URL.revokeObjectURL) == FUNCTION_CLASS;
    });

})(has, has.add);