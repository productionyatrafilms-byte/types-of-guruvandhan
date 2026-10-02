# types.html — Build Instructions

Source: Types of Guru Vandan final — file key `ZNcZD6VWrb3iOL1jJCp4Ud`
Base frame size: **1920 x 1080** (px -> vw divides by 1920; font px / 19.2 = vw)
Base template: `basic-template.html`. Shared styles live in `assets/css/common.css`.

**STATUS: built (collapsed + expanded states). Types 2 and 3 have no destination page yet.**

---

## Navigation

← from: `index.html` (bubble "Guru Vandana can be categorized into three types.")
→ to: `feta.html` (flower 1). Flowers 2 and 3: no pages supplied.

Frames `2:920` (Frame 11) and `2:963` (Frame 13) carry the same layers — **one page in two states**.
There is no button in either frame, so the page opens by itself shortly after load.
Toggle class on `.stage`: `is-open`.

| State | Frame | Differences |
|---|---|---|
| collapsed | `2:920` Frame 11 | three `type` flowers stacked at the centre (345 wide); flower 1 is on top |
| expanded | `2:963` Frame 13 | flower 1 left, flower 2 centre and big (571), flower 3 right |

Frame 13 also holds three parked slider popups (`video`, `video 2`, `video 3`, below the frame).
They are not built here: flower 1's slider is the `feta.html` page.

---

## 0. Assets

| File | Use |
|---|---|
| bgborder.png, innerbg.png, videos/ripple.mp4 | page backgrounds (`common.css`) |
| topicflowers.png | `type` flower (346 px, scaled up 1.65x for the centre flower) |
| titlebox.png | title pill, stretched with `border-image` so the ornaments keep their size |
| home.png / homehover.png | home button |

Fonts: Katibeh (flower text and title), Bakbak One (shortcut numbers and labels) — **not supplied**, falls back to Baloo.

---

## 1. Structure

```
.main-container
├── .inner-bg                 shared panel
└── .stage
    ├── img.stage-spacer      1920x949, y 69..1018
    ├── .type-bubble x3       flowers
    ├── .page-title           titlebox.png border-image + text
    ├── .shortcut-keys        5 buttons
    └── .home-btn
Vertical % = (y - 69) / 949
```

## 2. Frame 2:920 — collapsed

  2.1- `.type-bubble` x3 stacked: left `40.9896%` (787), top `31.4015%` (367), width `17.9876%` (345.363)
       stack order bottom to top: 2, 3, 1
  2.2- text Katibeh `2.0833vw` (40), line-height `2.0208vw` (0.97), `#b60000`, shadow `0 0 0.125vw rgba(0,0,0,.25)`
       box left `22.58%`, width `55.01%`, centred on `51.445%` of the bubble
  2.3- `.page-title` "Guru Vandana can be categorized into three types." — element left `18.5833%` (356.8),
       top `2.2867%`, width `63.0365%` (1210.3), Katibeh `3.3333vw` (64) `#b60000`, centre x 960
  2.4- `.home-btn` — `home.png` left `6.5104%` (125), top `1.2645%` (81), width `3.5417%` (68)
  2.5- `.shortcut-key` x5 — left `4.4792%` (86), width `3.4167%` (65.6), tops `30.7692%`, `38.2508%`, `45.7324%`, `53.2140%`, `60.6954%`
       2.5.1- outer circle `#f8ffc3` 62%, inner circle `#ffacac` with 2 `#e15757` border, number Bakbak One `2.0833vw` `#7f2929`
       2.5.2- hover: inner circle `#fb3a04` with white border, number `#fffbf2`, white tray slides out to the right with the label (12 → `0.625vw`, `#716969`)

## 3. Frame 2:963 — expanded

  3.1- flower 1 "1. Jaghanya ( Feta Vandan)": left `13.0208%` (250), top `36.8809%` (419), width `17.9876%`
  3.2- flower 2 "2. Madhyam (Thobh Vandan)": left `35.1563%` (675), top `24.9737%` (306), width `29.7396%` (571), text `3.3333vw` (64), line-height `3.2333vw`
  3.3- flower 3 "3. Utkrushta (Dwadashavat Vandan)": left `69.0625%` (1326), top `36.8809%`, width `17.9876%`
  3.4- on click of any flower → the flowers stack back together (same 2s as the spread), then the browser goes to that flower's page:
       flower 1 → `feta.html`; flower 2 → `Thobh.html` and flower 3 → `Dwadashavart.html`
  3.5- the flower art spins clockwise (11s per turn) from the moment the flowers spread out and keeps spinning while they stack

## 4. Open questions

1. Destination pages for flowers 2 and 3 (and shortcut keys 3, 4, 5). Frame 13's parked popups for Thobh and Dwadashavart still need slide images.
2. Katibeh is supplied; `Bakbak One` is not.
3. Hindi and Gujarati copy for every string (English is repeated as a placeholder).
4. The centre flower is `topicflowers.png` enlarged 1.65x, so it is slightly soft. A 571 px export would fix that.
