# Project Rules

## 1. Project Structure
```
projects/[name]/
├── basic-template.html      ← base shell, copy it for every page
├── index.html
├── [page].html
├── index.md                 ← written by Claude per page BEFORE any HTML
├── [page].md
├── figma-links.md
├── project.md
├── assets/
│   ├── css/
│   │   ├── style.css        ← shared shell, do not edit per page
│   │   └── [page].css       ← page styles
│   ├── js/
│   │   ├── custom.js        ← shared (language switch)
│   │   ├── jquery-3.7.1.js
│   │   └── [page].js        ← page scripts
│   ├── images/              ← PNG / JPG only
│   ├── videos/              ← MP4 / WebM only
│   └── plugins/swiper/
└── fonts/
```

CSS and JS must live under `assets/`. A bare `css/` or `js/` at the project
root loads nothing and the page silently renders unstyled.

---

## 2. Base Template
- Copy `basic-template.html` for every new page
- All page content goes inside `.main-container > .stage`
- Never hand-roll the page shell

---

## 3. Global Elements — Never Touch
| Element | Class / id |
|---|---|
| Page background | `.page-bg` — outside `.main-container` |
| Back / home button | `.back-btn` |
| Language switch | `#langSelect` |

---

## 4. Text Format — Every Visible Text Node
```html
<span class="english">Text</span>
<span class="hindi">Text</span>
<span class="gujrati">Text</span>
```
Figma normally only carries English — request the other two, do not invent them.

---

## 5. Images
- Path format: `assets/images/[layer-name].png`
- PNG or JPG only
- `width` in `%` or `vw`, `height` **always** `auto`
- If missing — add a placeholder, note it, do not break the layout

---

## 6. CSS Units
| Property | Unit |
|---|---|
| `font-size`, `line-height`, `letter-spacing` | `vw` only — never `clamp()` |
| `padding`, `margin`, `gap`, `border`, `border-radius`, `box-shadow` | `vw` |
| `width` | `%` or `vw` |
| `height` | `auto` — never a fixed height |
| `top`, `bottom`, `left`, `right`, `transform` | `%` or `vw` |

- No `px`, `rem`, `em`, `pt`, `clamp()`, `vh` anywhere — write `0`, not `0px`
- The ONLY permitted `vh` is `min-height: 100vh` on `.main-container`
- Colors and repeated values → CSS variables in `:root`
- Shared styles stay in `assets/css/style.css`; page styles go in `[page].css`

---

## 7. Layout
- `.stage` is sized by `stage-spacer.png` (transparent) so it holds the design's
  proportions while `height` stays `auto`
- **Size the spacer to the CONTENT EXTENT, not the Figma frame.** A frame carries
  dead space above the topmost element and below the bottom one; including it
  makes the page taller than the artwork and forces a scrollbar on every desktop
  browser (a maximised 1920x1080 screen leaves only ~937px of viewport)

      spacer height = bottom_of_lowest - top_of_highest

  then measure every vertical `%` from that top edge, not the frame's 0.
  Regenerate with `python make-spacer.py 1920 59 964`
- Everything else inside `.stage` is absolute and adds no height, so without the
  spacer the stage collapses to 0 and `overflow:hidden` hides the page
- Everything inside `.stage` is `position: absolute` with `%` top/left
- `line-height: 0` on every image wrapper
- Never position relative to `body`

---

## 8. Scroll — must match Kaussagg exactly
- Page sizes from **width** only
- Shrink the window and the artwork shrinks with it
- Make the window short enough and a **vertical scrollbar appears** — correct
- Horizontal scroll never appears
- Never cap the page with `max-width: …vh`; that letterboxes the design and is
  not what this project wants

---

## 9. Swiper Slider
- Swiper.js only, from `assets/plugins/swiper/`
- Custom prev/next buttons, no default arrows or pagination unless asked
```html
<div class="slider-wrapper">
  <div class="swiper my-swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">...</div>
    </div>
  </div>
  <div class="btn-prev"><img src="assets/images/prev.png" alt="Previous"></div>
  <div class="btn-next"><img src="assets/images/next.png" alt="Next"></div>
</div>
```

---

## 10. Typography
- `@font-face` from `/fonts/`
- Match font weight, letter spacing and line height exactly from Figma, in `vw`

---

## 11. Code Quality
- No inline CSS or inline JS
- No React, no Tailwind — plain HTML + CSS (Figma's MCP returns React/Tailwind
  as reference only; convert it)
- Descriptive class names taken from Figma layer names
- Every `<img>` needs a real `alt`
