$(function () {
    var $stage = $(".stage");
    var leaving = false;

    function cssTime(name) {
        var raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        var value = parseFloat(raw);
        return raw.slice(-2) === "ms" ? value : value * 1000;
    }

    var transitionSound = new Audio("./assets/audio/transistion-click.mp3");

    $(".enter-btn").on("click", function () {
        playSound(transitionSound);
        $stage.addClass("is-open");
    });

    $(".center-title").on("mouseenter", function () {
        if ($stage.hasClass("is-open")) {
            $stage.addClass("is-flower-hover");
        }
    }).on("mouseleave", function () {
        $stage.removeClass("is-flower-hover");
    });


    function leaveTo(href) {
        if (leaving || !$stage.hasClass("is-open")) {
            return;
        }

        leaving = true;
        $stage.addClass("is-leaving");

        setTimeout(function () {
            window.location.href = href;
        }, Math.max(cssTime("--leave-time"), cssTime("--open-time")) + 50);
    }

    $(".topic-bubble").on("click", function (event) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.which === 2) {
            return;
        }

        event.preventDefault();
        leaveTo($(this).attr("href"));
    });

    $(".center-flower, .center-title").on("click", function () {
        leaveTo("./guru.html");
    });

    window.addEventListener("pageshow", function (event) {
        if (event.persisted) {
            leaving = false;
            $stage.removeClass("is-leaving");
        }
    });

    $(".back-btn").on("click", function () {
        $stage.removeClass("is-open");
    });
});
