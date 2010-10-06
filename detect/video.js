(function(has, addtest, cssprop){

    var video = document.createElement("video");

    addtest("video", function() {
        return has.isHostType(video, "canPlayType");
    });

    addtest("video-h264-baseline", function() {
        return has("video") && video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    });

    addtest("video-ogg-theora", function() {
        return has("video") && video.canPlayType('video/ogg; codecs="theora, vorbis"');
    });

    addtest("video-webm", function() {
        return has("video") && video.canPlayType('video/webm; codecs="vp8, vorbis"');
    });

})(has, has.add, has.cssprop);
