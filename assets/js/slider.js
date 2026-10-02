$(function () {
    var $stage = $(".stage");
    var page = PAGE_DATA[$stage.data("page")];

    if (!page) {
        return;
    }

    function escapeHtml(text) {
        return $("<div>").text(text).html();
    }

    function languages(text) {
        function span(language, value) {
            var fallback = value ? "" : " is-fallback";

            return '<span class="' + language + fallback + '">' + escapeHtml(value || text.english) + '</span>';
        }

        return span("english", text.english) + span("hindi", text.hindi) + span("gujrati", text.gujrati);
    }

    $(".page-title")
        .addClass("page-title-" + page.titleSize)
        .find(".page-title-text")
        .html(languages(page.title));

    if (page.captionWide) {
        $(".caption-slider").addClass("caption-slider-wide");
    }

    var slides = "";
    var captions = "";

    $.each(page.slides, function (index, slide) {
        slides += '<div class="swiper-slide slider-slide slider-slide-' + slide.fit + '">' +
            '<img class="slider-image" src="' + slide.image + '" alt="' + escapeHtml(page.title.english) + ', step ' + (index + 1) + '">' +
            '</div>';

        captions += '<div class="swiper-slide caption-slide">' +
            '<p class="caption-text">' + languages(slide.caption) + '</p>' +
            '</div>';
    });

    if (page.lastLink) {
        $stage.append(
            '<a class="pranam-link" href="' + page.lastLink.href + '">' +
            '<img class="pranam-link-image" src="./assets/images/arowAsset.png" alt="">' +
            '<span class="pranam-link-text">' + languages(page.lastLink.label) + '</span>' +
            '</a>'
        );
    }

    $(".main-swiper .swiper-wrapper").html(slides);
    $(".caption-slider .swiper-wrapper").html(captions);

    document.title = "Types of Guru Vandan - " + page.title.english;

    var captionSwiper = new Swiper(".caption-slider", {
        effect: "fade",
        fadeEffect: { crossFade: true },
        allowTouchMove: false,
        speed: 600
    });

    var mainSwiper = new Swiper(".main-swiper", {
        slidesPerView: 1,
        speed: 600,
        allowTouchMove: false,
        simulateTouch: false,
        grabCursor: false,
        keyboard: { enabled: true, onlyInViewport: true },
        navigation: { nextEl: ".btn-next", prevEl: ".btn-prev" },
        pagination: { el: ".slider-dots", clickable: true },
        controller: { control: captionSwiper },
        on: {
            slideChange: function () {
                $stage.toggleClass("is-last-slide", this.isEnd);
            }
        }
    });

    $stage.toggleClass("is-last-slide", mainSwiper.isEnd);

    val(sessionStorage.getItem("lang") || "English");
});
