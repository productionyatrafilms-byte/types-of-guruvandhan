
// language change js
let currentLang = sessionStorage.getItem("lang");
if (!currentLang) {
    val("English");
} else {
    val(currentLang);
}

function val(selectedLang) {
    sessionStorage.setItem("lang", selectedLang);

    let English = document.getElementById("en");
    let Hindi = document.getElementById("hi");
    let Gujrati = document.getElementById("gu");

    if (selectedLang === "English") {

        document.getElementById("body");
        $(".english").show();
        $(".hindi, .gujrati").hide();

        English.checked = true;
        Hindi.checked = false;
        Gujrati.checked = false;
    }

    if (selectedLang === "Hindi") {
        document.getElementById("body");
        $(".hindi").show();
        $(".english, .gujrati").hide();
        English.checked = false;
        Hindi.checked = true;
        Gujrati.checked = false;
    }

    if (selectedLang === "Gujrati") {
        document.getElementById("body");
        $(".gujrati").show();
        $(".english, .hindi").hide();
        English.checked = false;
        Hindi.checked = false;
        Gujrati.checked = true;
    }
}

// ---------- Shared UI sounds ----------
// One Audio object per sound, reused (currentTime reset) on every play so a
// quick repeat click restarts the sound instead of overlapping it.
function playSound(audio) {
    try {
        audio.currentTime = 0;
        var promise = audio.play();
        if (promise !== undefined) promise.catch(function () {});
    } catch (e) {}
}

// Navigating on the same tick as the click kills the page (and its Audio)
// before playback starts, so wait a moment before leaving.
function playSoundThenNavigate(audio, href, delayMs) {
    playSound(audio);
    setTimeout(function () {
        audio.pause();
        window.location.href = href;
    }, delayMs || 120);
}

// Language toggle: only on a real click of the E/H/G radio, never on the
// programmatic val() calls that re-apply the stored language.
var langAudio = {
    English: new Audio("./assets/audio/Eng.mpeg"),
    Hindi: new Audio("./assets/audio/Hin.mpeg"),
    Gujrati: new Audio("./assets/audio/Guj.mpeg")
};
document.querySelectorAll('#language input[type="radio"]').forEach(function (input) {
    input.addEventListener("click", function () {
        var audio = langAudio[input.value];
        if (audio) playSound(audio);
    });
});

// Home / back buttons.
var popAudio = new Audio("./assets/audio/pop.mp3");
document.querySelectorAll(".home-btn, .home-btn-1, .back-btn, .page-back-btn").forEach(function (el) {
    el.addEventListener("click", function (event) {
        var href = el.getAttribute("href");
        if (href) {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.which === 2) return;
            event.preventDefault();
            playSoundThenNavigate(popAudio, href);
        } else {
            playSound(popAudio);
        }
    });
});

// Slider prev / next arrows.
var swiperAudio = new Audio("./assets/audio/swiper.mp3");
document.querySelectorAll(".btn-prev, .btn-next").forEach(function (btn) {
    btn.addEventListener("click", function () {
        playSound(swiperAudio);
    });
});

// Subpoints. Only the first second of topic.mp3 is heard.
var topicAudio = new Audio("./assets/audio/topic.mp3");
var topicTimer;
function playTopicSound() {
    playSound(topicAudio);
    clearTimeout(topicTimer);
    topicTimer = setTimeout(function () {
        topicAudio.pause();
    }, 1000);
}

// Side shortcut keys: sound, then navigate (as the topic dots do on Gyan Panchami).
document.querySelectorAll(".shortcut-key").forEach(function (link) {
    link.addEventListener("click", function (event) {
        var href = link.getAttribute("href");
        if (!href || href === "#") return;
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.which === 2) return;
        event.preventDefault();
        playTopicSound();
        setTimeout(function () {
            window.location.href = href;
        }, 1000);
    });
});

// Bubbles / flowers / main flower: they run their own exit animation and then
// navigate, so only the sound is played here, and only once the page is open.
document.querySelectorAll(".topic-bubble, .type-bubble, .center-flower, .center-title").forEach(function (el) {
    el.addEventListener("click", function () {
        if (document.querySelector(".stage.is-open")) playTopicSound();
    });
});
