# feta.html — Build Instructions

Source: Types of Guru Vandan final — file key `ZNcZD6VWrb3iOL1jJCp4Ud`
Base frame size: **1920 x 1080**. Shared styles in `assets/css/common.css`.

**STATUS: built. Slides 1 to 4 of type 1 only.**

---

## Navigation

← from: `types.html` (flower 1)
→ to: `types.html` via home / shortcut keys

Frames `2:1023` (Frame 12), `2:1271` (Frame 14), `2:1311` (Frame 15), `2:1351` (Frame 16) are **slides 1 to 4 of one Swiper**,
not four pages. Slide 1 has no previous arrow, slide 4 has no next arrow.

---

## Data-driven slides

All slider pages (feta, thobh, dwadashavart, guru, when, avoid, bows) are empty shells. `assets/js/data.js` holds `PAGE_DATA`;
`assets/js/slider.js` reads `.stage[data-page]`, fills the title, slides and captions, then starts both Swipers.

```
PAGE_DATA.<page> = {
  titleSize: "narrow" | "wide",
  captionWide: true,              // optional, for long captions
  title:   { english, hindi, gujrati },
  slides: [ { image, fit: "fit" | "cover" | "zoom", caption: { english, hindi, gujrati } } ]
}
```

`hindi` / `gujrati` fall back to the English text (shown in the English font) whenever they are empty.

The side navbar labels and the index page texts are plain HTML (three language spans). Where a Hindi or Gujarati text is missing, the span carries the English text and the class `is-fallback`; replace the text and remove that class when the translation is ready.

---

## 0. Assets

| File | Use |
|---|---|
| images/1/1/1.jpeg … 4.jpeg | slides (2752x1536), `object-fit: cover` |
| frame.png | slider outline (941x549) |
| frame-mask.png | generated from `frame.png` (inside filled), used as the slide mask |
| next.png / prev.png | slider arrows (91x91 incl. shadow, shown at 83) |
| titlebox.png, home.png, homehover.png | title pill, home button |

Fonts: Katibeh (title), Bakbak One (captions, shortcut numbers) — **not supplied**, falls back to Baloo.

---

## 1. Structure

```
.main-container
├── .inner-bg
└── .stage
    ├── img.stage-spacer       1920x949, y 69..1018
    ├── .page-title            "1. Feta Vandan"
    ├── .slider-box            slides, masked by frame-mask.png, frame.png on top
    ├── .btn-prev / .btn-next
    ├── .slider-dots           Swiper pagination
    ├── .caption-slider        second Swiper, controlled by the first
    ├── .shortcut-keys         5 buttons
    └── .home-btn
Vertical % = (y - 69) / 949
```

## 2. Frames 2:1023 / 2:1271 / 2:1311 / 2:1351

  2.1- `.page-title` "1. Feta Vandan" — element left `29.1823%` (560.3), top `2.2867%`, width `41.7708%` (802),
       Katibeh `3.3333vw` (64) `#b60000`
  2.2- `.slider-box` — left `25.5208%` (490), top `20.7587%` (266), width `49.0104%` (941), slides cover the box
       2.2.1- slide 1 image crop: width `131.75%`, left `-17.57%`, top `-14.28%` (Figma zooms the first slide)
       2.2.2- slides 2 to 4: `object-fit: cover`
  2.3- `.btn-next` — `next.png` left `78.4896%` (1507), top `44.89%`, width `4.7396%` (91)
  2.4- `.btn-prev` — `prev.png` left `16.7708%` (322), same top and width
  2.5- `.slider-dots` — left `46.0417%` (884), top `79.3467%` (822), 4 circles of `1.1979vw` (23), gap `1.0417vw` (20),
       active `#e04014`, inactive `#ffabab`, border `#d48d8d`
  2.6- `.caption-slider` — width `47.8125%` (918), centred on x 960 / y 923.5, Bakbak One `1.6667vw` (32) `#ad0000`
       2.6.1- slide 1: "Feta Vandan is  performed by joining 2 hands, touching forehead, slightly bending the head and saying 'Mathaen Vandami'."
       2.6.2- slide 2: "Feta Vandan is performed when we meet Sadhu Bhagwant on road or during Gochari."
       2.6.3- slide 3: "It is also performed when Sadhu Bhagwant is busy or standing."
       2.6.4- slide 4: "After Devsi Pratikraman also, we must perform Feta Vandan and say “Trikaal Vandana”"
  2.7- `.shortcut-keys` — same as `types.md`; the home button is replaced by a back button (`back.png` / `backhover.png`) that goes to `types.html`
  2.9- caption change between slides: the new caption slides down from above while cross-fading, the old one slides down and out (`2.5vw`, 0.6s)
  2.8- on load the slider, arrows, dots and caption rise from the bottom (translate `14vw` to 0, 1.2s; dots +0.12s, caption +0.25s)

## 3. Open questions

1. `Bakbak One` font file.
2. Hindi and Gujarati captions.
3. `frame-mask.png` is derived from `frame.png`; confirm the real mask shape if it differs.
