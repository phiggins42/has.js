(function(has, addtest, cssprop){

    var STR = "string",
        FN = "function"
    ;

    if(!has("dom")){ return; }

    var audio = document.createElement("audio");

    addtest("audio", function(){
        return has.isHostType(audio, "canPlayType");
    });

    addtest("audio-ogg", function(){
        return has("audio") && audio.canPlayType("audio/ogg; codecs='vorbis'");
    });

    addtest("audio-mp3", function(){
        return has("audio") && audio.canPlayType("audio/mpeg;");
    });

    addtest("audio-wav", function(){
        return has("audio") && audio.canPlayType("audio/wav; codecs='1'");
    });

    addtest("audio-m4a", function(){
        return has("audio") && (audio.canPlayType("audio/x-m4a;") || audio.canPlayType("audio/aac;"));
    });

})(has, has.add, has.cssprop);
