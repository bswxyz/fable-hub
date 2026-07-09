# FABLE — the hub

**Twenty-five products that don’t exist. One studio that does.**

Live: <https://bswxyz.github.io/fable-hub/> · Master guide: <https://bswxyz.github.io/fable-hub/guide/>

Fable is a design-studio showcase. This hub is the front door: a gallery of 25 fictional-product
websites — each a complete, individually-crafted site with its own palette, type system, motion and
signature technique — plus the master guide documenting how the whole set was built. No two of the 25
share a template.

---

## Concept

Template galleries usually show one layout twenty-five times with the colours swapped. Fable does the
opposite: twenty-five **concrete product concepts** across twenty-five categories — a sleep wearable, an
eVTOL air-taxi, a literary magazine, a citizen-astronomy network — each forcing a genuinely different
design. A fictional product is a constraint generator: it tells you what *can’t* be generic. This hub
indexes all 25, links each to its live site / build guide / repo, and hosts the master methodology guide.

## Design system — the hub identity

The hub had to look like none of the 25, so it recedes and lets the thumbnails carry the colour.

- **Palette.** Near-black ink `--bg:#141318`, raised `--panel:#1b1a21`, warm off-white `--bone:#f2f0ea`,
  `--dim:#a5a1ac`, `--faint:#66626e`, hairline `--line:rgba(242,240,234,.10)`.
- **The spectrum accent.** The hub’s accent is *not one colour* — it is the **set of all 25 site accents**.
  That set appears as a thin animated gradient band in the hero (slow hue drift; static under
  `prefers-reduced-motion`), and again per-card: every gallery card’s hover glow, focus ring and palette
  dots use *that site’s* real accent hexes. Hover a card and you feel that product’s colour, not the hub’s.
- **Type trio.** **Sora** (display) / **Inter** (body) / **JetBrains Mono** (metadata) — Sora is used by
  none of the 25, so the hub reads as its own identity.
- **Signature easing.** `cubic-bezier(.19,1,.22,1)` (a strong expo-out) for reveals and lifts, with a
  `cubic-bezier(.78,0,.22,1)` curtain for the hero wordmark.
- **Motion.** Clipped-line hero intro, IntersectionObserver scroll reveals, count-up hero counters, and a
  working stack filter — all gated behind a `.js` class and fully disabled under reduced-motion.

## Stack — why vanilla

Three static files: `index.html`, `styles.css`, `main.js`. No framework, no build step, no dependencies.
The hub is the first thing anyone lands on, so it had to be feather-light — the entire page is HTML/CSS plus
a few KB of progressive-enhancement JS, and the 25 gallery thumbnails (~55 KB each, lazy-loaded below the
fold) are the only real weight (~1.6 MB total). Nothing blocks first paint; every link works with scripts
disabled.

## Running locally

No build required — serve the folder with any static server:

```bash
cd fable-hub
python3 -m http.server 8845      # then open http://localhost:8845
# or:  npx serve .
```

Opening `index.html` directly works too; a server just makes the relative paths behave exactly as on Pages.

## Structure

```
fable-hub/
├── index.html          # hero · stack filter · 25-card gallery · range band · guide teaser · footer
├── styles.css          # design tokens + full system (the hub identity lives here)
├── main.js             # hero intro, scroll reveals, count-up counters, stack filter (progressive)
├── guide/
│   └── index.html      # the master guide (methodology + links to all 25 guides & repos)
├── assets/
│   └── thumbs/         # 25 real 800px gallery previews (JPEG)
├── STATUS.md           # build tracker for all 25 + the hub
├── README.md
├── LICENSE             # MIT
└── .nojekyll           # Pages serves the folder verbatim
```

## Demo vs. real

- **The 25 products are fictional.** Aperture Lab, Perigee, Hangar 12 and the rest are design-showcase
  concepts, not shipping companies. Their interactive “engines” are faithful browser-side approximations
  built to demonstrate the design, not production backends — each site’s own README carries its demo-vs-real
  map.
- **The hub is real and complete.** This gallery, its filter, the spectrum accent and the master guide are a
  finished, deployed artifact. The design and code are AI-generated (by Claude, as “Fable”); the seven
  photographic heroes across the 25 were generated with Higgsfield, and every other visual is procedural
  (WebGL / canvas / SVG). That’s stated plainly here and in the guide.

---

© 2026 Fable. Designed & built by Fable. Code under the MIT License.
