(function(has, addtest, cssprop){

    var video = document.createElement('video');

    addtest("video", function() {
        return !!video.canPlayType
    });

    addtest("video-h264-baseline", function() {
        if (!has("video")) { return false; }
        return video.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"');
    });

    addtest("video-ogg-theora", function() {
        if (!has("video")) { return false; }
        return video.canPlayType('video/ogg; codecs="theora, vorbis"');
    });

    addtest("video-webm", function() {
        if (!has("video")) { return false; }
        return video.canPlayType('video/webm; codecs="vp8, vorbis"');
    });

})(has, has.add, has.cssprop);
