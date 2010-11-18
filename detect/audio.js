(function(has, addtest, cssprop){

    var CAN_PLAY_GUESSES = { "maybe": 1, "probably": 1 },
        STR = "string",
        FN = "function"
    ;

    if(!has("dom")){ return; }

    var audio = document.createElement("audio");

    addtest("audio", function(){
        return has.isHostType(audio, "canPlayType");
    });

    // TODO: evaluate if these tests fit within the has.js scope because they don't
    // provide a definate yes or no answer
    //
    // NOTE: Opera returns a false-negative in this test if there are single spaces
    // around the codes value, e.g. codes='vorbis'
    addtest("audio-ogg", function(){
        return has("audio") && !!CAN_PLAY_GUESSES[audio.canPlayType("audio/ogg; codecs=vorbis")];
    });

    addtest("audio-mp3", function(){
        return has("audio") && !!CAN_PLAY_GUESSES[audio.canPlayType("audio/mpeg;")];
    });

    addtest("audio-wav", function(){
        return has("audio") && !!CAN_PLAY_GUESSES[audio.canPlayType("audio/wav; codecs=1")];
    });

    addtest("audio-m4a", function(){
        return has("audio") && !!(CAN_PLAY_GUESSES[audio.canPlayType("audio/x-m4a;")] ||
            CAN_PLAY_GUESSES[audio.canPlayType("audio/aac;")]);
    });

})(has, has.add, has.cssprop);
