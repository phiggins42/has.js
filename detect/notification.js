(function(has, addtest){
    
    var toString = {}.toString,
        FUNCTION_CLASS = "[object Function]";
    
    if(!has("dom")){ return; }
    
    addtest("notification", function(){
        return toString.call(window.Notification) === FUNCTION_CLASS ||
                toString.call(window.webkitNotifications) === FUNCTION_CLASS;
    });

    has.add("notification-checkpermission", function () {
        return toString.call(window.Notification.permission) === FUNCTION_CLASS ||
                toString.call(window.webkitNotifications.checkPermission) === FUNCTION_CLASS;
    });

    has.add("notification-requestpermission", function () {
        return toString.call(window.Notification.requestPermission) === FUNCTION_CLASS ||
                toString.call(window.webkitNotifications.requestPermission) === FUNCTION_CLASS;
    });
    
})(has, has.add);