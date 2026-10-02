$(function () {
    var $stage = $(".stage");
    var leaving = false;

    function openFlowers() {
        $stage.addClass("is-open is-spinning");
    }

    function cssTime(name) {
        var raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
        var value = parseFloat(raw);
        return raw.slice(-2) === "ms" ? value : value * 1000;
    }

    setTimeout(openFlowers, 700);

    $(".type-bubble").on("click", function (event) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.which === 2) {
            return;
        }

        event.preventDefault();

        if (leaving || !$stage.hasClass("is-open")) {
            return;
        }

        leaving = true;
        var href = $(this).attr("href");

        $stage.addClass("is-leaving").removeClass("is-open");

        setTimeout(function () {
            $stage.addClass("is-faded");
        }, cssTime("--leave-time"));

        setTimeout(function () {
            window.location.href = href;
        }, cssTime("--leave-time") + cssTime("--fade-time") + 50);
    });

    window.addEventListener("pageshow", function (event) {
        if (event.persisted) {
            leaving = false;
            $stage.removeClass("is-leaving is-faded");
            setTimeout(openFlowers, 300);
        }
    });
});
