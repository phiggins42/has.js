(function(has, addtest){
    
    var toString = {}.toString,
        FUNCTION_CLASS = "[object Function]";

    if(!has("dom")){ return; }
    
    var dialog = document.createElement("dialog");
    
    addtest("dialog", function(){
        return toString.call(dialog.show) == FUNCTION_CLASS;
    });
    
    addtest("dialog-open", function(){
        return ("open" in dialog);
    });
    
    addtest("dialog-show", function(){
        return toString.call(dialog.show) == FUNCTION_CLASS;
    });
    
    addtest("dialog-show-modal", function(){
        return toString.call(dialog.showModal) == FUNCTION_CLASS;
    });
    
    addtest("dialog-close", function(){
        return toString.call(dialog.close) == FUNCTION_CLASS;
    });
    
})(has, has.add);