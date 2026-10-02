$(function () {
    var sound = new Audio("./assets/audio/pranam.mp3");
    var played = false;

    sound.preload = "auto";

    function playOnce() {
        if (played) {
            return;
        }

        played = true;

        var promise = sound.play();

        if (promise !== undefined) {
            promise.catch(function () {
                played = false;
                $(document).one("click keydown touchstart", playOnce);
            });
        }
    }

    playOnce();
});
