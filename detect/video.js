(function(has, addtest, cssprop){

    if(!has("dom")){ return; }

    var video = document.createElement("video"),
        // IE9 is reported to throw errors if "Desktop Experience" is not installed
        // have a look at this:
        // https://github.com/Modernizr/Modernizr/issues/224
        canPlayType = function( type ) {
          try {
            return video.canPlayType( type );
          } catch( e ) { }
          return false;
        };

    addtest("video", function(){
        return has.isHostType(video, "canPlayType");
    });

    // note: in FF 3.5.1 and 3.5.0 only, "no" was a return value instead of empty string.

    addtest("video-h264-baseline", function(){
        // workaround required for ie9, who doesn't report video support without audio codec specified.
        //   bug 599718 @ msft connect
        var h264 = 'video/mp4; codecs="avc1.42E01E';
        return has("video") && ( canPlayType(h264 + '"') || canPlayType(h264 + ', mp4a.40.2"'));
    });

    addtest("video-ogg-theora", function(){
        return has("video") && canPlayType('video/ogg; codecs="theora, vorbis"');
    });

    addtest("video-webm", function(){
        return has("video") && canPlayType('video/webm; codecs="vp8, vorbis"');
    });

})(has, has.add, has.cssprop);
