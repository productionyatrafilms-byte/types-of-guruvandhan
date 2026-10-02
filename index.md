# index.html — Build Instructions

Source: Types of Guru Vandan final — file key `ZNcZD6VWrb3iOL1jJCp4Ud`
Base frame size: **1920 x 1080** (px -> vw divides by 1920; font px / 19.2 = vw)
Base template: `basic-template.html` — content goes in `.main-container > .stage`

**STATUS: intro + open states built. Bow state and popups blocked on assets (see section 5).**

---

## Navigation

← from: none (entry page)
→ to: none yet

Frames `2:27` (Frame 34) and `2:1703` (Frame 3) carry the same layers (p2 x4, p1,
Guru Vandan, Types of, boy, girl, Enter, LAG) — they are **one page in two states**.
Toggle class on `.stage`: `is-open`.

| State | Frame | Differences |
|---|---|---|
| intro | `2:27` Frame 34 | bubbles stacked behind the flower, flower 799 wide, Enter visible, no back button |
| open | `2:1703` Frame 3 | bubbles on the four corners, flower 705 wide, Enter parked below the frame, back button visible |
| bow | `2:1752` Frame 4 | boy and girl bowing (each body part rotated); not built — needs part sprites |

---

## 0. Assets

### 0.1 — Images

| File | Layer / use | Natural px |
|---|---|---|
| bgborder.png | `border 1` cream frame art | 1920x1080 |
| innerbg.png | `bg` orange pattern, base layer under the ripple video | 1759x942 |
| outerflower.png | `p1` scalloped orange flower | 799x800 |
| innerflower.png | `p1 > flower` pink flower with cream circle | 634x634 |
| topicflowers.png | `p2` topic bubble | 346x346 |
| boy.png | `boy` | 149x574 |
| girl.png | `girl` | 173x517 |
| back.png | `Layer 4` back button | 60x60 |
| background.png | `.page-bg` (fully transparent) | 1920x1080 |
| stage-spacer.png | transparent spacer | 1920x1080 |

Missing: bowing sprites (back hand, face, eyeblink, body, arm, hand for boy and
girl), popup slide images, `Bakbak One` font.

### 0.2 — Fonts

| Family | Used for | File in /fonts/ |
|---|---|---|
| Katibeh | Types of, Guru Vandan, bubble text | `Katibeh-Regular.ttf` — **not supplied** |
| Baloo | Enter, E / H / G | `Baloo Regular 400.ttf` |
| Hindi | `.hindi` text | `ITFDevanagari.ttc` |
| Gujrati | `.gujrati` text | `NotoSansGujarati-Regular.ttf` |

---

## 1. Palette

```
--cream:        #ffeed9    bgborder.png fill / body background
--frame-red:    #e04014    inner frame border, Types of border
--badge-fill:   #ffeab6    Types of badge
--title-red:    #b60000    Guru Vandan, bubble text
--badge-text:   #ad0000    Types of
--enter-top:    #ffd0a9    Enter gradient start
--enter-bottom: #fb3a04    Enter gradient end
--enter-border: #fff2e2    Enter border
```

---

## 2. Structure

```
body
├── img.page-bg                transparent
├── img.frame-border           bgborder.png — outside .main-container, stretched to the body (100% x 100%)
└── .main-container
    └── .stage
    ├── .inner-bg              innerbg.png, top 0, radius 65, border 7 #e04014
    ├── img.stage-spacer       transparent 1920x949, trimmed to y 69..1018 (panel top to the characters' feet)
    ├── .topic-bubble x4       topicflowers.png + text
    ├── .center-flower         outerflower.png + innerflower.png
    ├── .center-title          Guru Vandan
    ├── .types-of              badge
    ├── .figure-boy / .figure-girl
    ├── .enter-btn
    └── .back-btn

Content extent: y 69 .. 1018 -> spacer 1920x949 (`python make-spacer.py 1920 69 1018`).
Vertical % = (y - 69) / 949. `.main-container` uses `align-content: center`.
`.frame-border` stays outside the container and stretches to the whole body; `.inner-bg` is inside `.stage` at its top left.
About 12px of scroll on a 1920x937 window, like Gyan Panchami.
```

---

## 3. Frame 2:27 Guidelines — intro state

  3.1- `.frame-border` — `bgborder.png`, left 0, top 0, width 100%
  3.2- `.inner-bg` — `innerbg.png`, width `91.6146%` (1759), left `4.2188%` (81), top `6.3889%` (69),
       radius `3.3854vw` (65), border `0.3646vw` (7) `#e04014` drawn inside
  3.3- `.topic-bubble` x4 stacked at left `41.0417%` (788), top `31.4015%` (367), width `17.9876%` (345.363),
       behind the flower so they are hidden
  3.4- `.center-flower` — width `41.6146%` (799), left `29.2188%` (561), top `7.4816%` (140)
       3.4.1- `outerflower.png` fills the box
       3.4.2- `innerflower.png` inside: left `10.379%`, top `10.92%`, width `79.28%`
  3.5- `.center-title` — Katibeh `5vw` (96), line-height `3.3143vw` (66.285%), `#b60000`,
       text-shadow `0 0.2083vw 0.125vw rgba(0,0,0,.25)`, centred on x 960 / y 539.73, lines "Guru" / "Vandan"
  3.6- `.types-of` — left `40.1563%` (771), top `9.4444%` (102), width `19.6354%` (377), border `0.3125vw` (6)
       `#e04014`, radius `0.8854vw` (17), fill `#ffeab6`, text Katibeh `4.4271vw` (85) `#ad0000`,
       text centre sits on y 153 (17.5 below the badge centre)
  3.7- `.figure-boy` — `boy.png`, left `26.9271%` (517), top `39.6207%` (445), width `7.7568%` (148.93)
  3.8- `.figure-girl` — `girl.png`, left `64.1146%` (1231), top `45.4974%` (500.77), width `9.0104%` (173)
  3.9- `.enter-btn` — Baloo `1.875vw` (36) white, gradient `#ffd0a9` -> `#fb3a04`, border `0.1563vw` (3) `#fff2e2`,
       radius `5.2521vw` (100.84), shadow `0 0.5729vw 0.8021vw -0.0521vw rgba(0,0,0,.25)`,
       left `45.1172%`, top `91.8567%` (940), width `9.7885%` (187.94)
  3.10- language bar — global `#langSelect`, untouched (Figma LAG pill is orange, template is blue: see section 5)
  3.11- on click of `.enter-btn` → add `is-open` to `.stage` (frame `2:1703`); `.center-flower` also turns 90° clockwise (same duration and easing as the bubbles, 2s) and stays there; the back button turns it back

## 4. Frame 2:1703 Guidelines — open state

  4.1- `.topic-bubble` fly to the corners (all width `17.9876%`)
       4.1.1- "Guru Vandana can be categorized into three types." — left `9.0104%` (173), top `9.9052%` (163)
       4.1.2- "When can we do Guru Vandan?" — left `9.0104%`, top `52.8978%` (571)
       4.1.3- "Who bows to whom ?" — left `72.9688%` (1401), top `52.8978%`
       4.1.4- "When can we not do Guru Vandan ?" — left `72.9688%`, top `9.9052%`
       4.1.5- text Katibeh `1.875vw` (36), line-height `1.2429vw` (66.285%), `#b60000`,
              text-shadow `0 0 0.125vw rgba(0,0,0,.25)`, box left `22.58%`, width `55.01%`, centred on y `51.445%` of the bubble
  4.2- `.center-flower` shrinks to width `36.7273%` (705.164), left `31.655%`, top `12.4110%`
       4.2.1- `innerflower.png`: left `7.72%`, top `8.95%`, width `84.56%`
  4.3- `.enter-btn` moves to top `114.9631%` (1160), parked below the frame, clipped by `.stage`)
  4.4- `.back-btn` appears — `back.png`, left `6.3542%` (122), top `1.7914%` (86), width `2.69vw` (51.656),
       shadow `0 0.2083vw 0.1042vw rgba(0,0,0,.25)`
  4.4b- hover on `.center-title` (open state only) → outer flower scales to 0.94 and inner flower to 0.98 (0.4s), back to 1 on leave
  4.5- on click of `.back-btn` → remove `is-open` (back to intro)
  4.6- on click of a `.topic-bubble` → the four bubbles slide back behind the main flower (1.2s, `--leave-time`), and the main flower turns back 90° → 0° anticlockwise at the entrance speed (2s), then the page changes after the flower finishes:
       categories → `types.html`; when-do → `when.html`; who-bows → `bows.html`; when-not → `avoid.html`
  4.7- on click of the main flower or the "Guru Vandan" title (open state) → the same exit, then `guru.html`

## 5. Open questions

1. **Katibeh font** — Figma uses Katibeh for every heading. `fonts/Katibeh-Regular.ttf` is not in
   the folder; `@font-face` points at it and falls back to a serif until it is added.
2. **Frame 4 (bow)** — every body part is rotated separately (back hand, face, eyeblink, body, arm,
   hand). `boy.png` / `girl.png` are flattened standing poses, so the bow cannot be reproduced
   without the part sprites.
3. **Popups** — frames `video`, `video 3`, `video 4`, `video 5` sit parked below the frame
   (Swiper slider, 946x562 slides, 32px Bakbak One caption). Their slide images and the
   `Bakbak One` font are not in the folder. Confirm they should be built, and which bubble opens which.
4. **Translations** — Hindi and Gujarati text for every string. Placeholders currently repeat the English.
5. **Language bar** — Figma's pill (orange, Baloo, 153x57) differs from the template's `#langSelect`
   (blue, 1vw). The template marks it "never touch", so it is left as is.
6. `ripple.mp4` is in `assets/videos/` but no frame references it by name; assumed to belong to the bow state.
