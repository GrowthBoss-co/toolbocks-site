# Design tokens

Source: `https://orizon-template.webflow.io/` (Orizon Webflow template by Mirac Sinir).

Extracted from the site's compiled stylesheet
`orizon-template.webflow.shared.85b2fce84.min.css` rather than sampled from a
browser, so every value below is the authored one. Webflow's variable names have
been de-noised (`--_colors---base--neutral-950` becomes `--n-950`).

Implemented in `src/app/globals.css`.

## What we kept vs changed

| Layer | Decision |
| --- | --- |
| Type scale, tracking, line heights | Kept 1:1 |
| Spacing scale, section rhythm, container widths | Kept 1:1 |
| Radii, border widths, card surfaces | Kept 1:1 |
| Neutral colour ramp | Kept 1:1 (it is a good near-black ramp) |
| **Primary colour ramp** | **Replaced.** Orizon's blue `#3b82f6` slot is filled with ToolBocks indigo `#5C5AFF` |
| **Accent** | **Added.** ToolBocks lime `#DAFF00` |
| **Font** | **Replaced.** Inter becomes DM Sans, the ToolBocks brand face |
| Product screenshots, avatars, logo, brand icons | **Not reused.** All rebuilt as ToolBocks markup |

## Colours

Neutrals (unchanged from Orizon):

```
0 #ffffff   50 #f5f7fa   100 #f2f5f8   200 #e1e4ea   300 #cacfd8   400 #99a0ae
500 #717784   600 #525866   700 #2b303b   800 #222530   900 #181b25   950 #0e121b
```

Primary (ToolBocks indigo, replacing Orizon's blue):

```
50 #f0f0ff   100 #e4e3ff   200 #cbcaff   300 #aba9ff   400 #8482ff   500 #5c5aff
600 #4e46e5   700 #3f37c4   800 #332ca0   900 #2a2580   950 #1a1650
```

Status: green `#27c06e`, warning `#e6a819`, red `#e93544`. Translucent fills are
the base colour at 10% alpha.

Semantic mapping used in markup: `strong` = n-950 (page), `surface` = n-900
(cards), `surface-800`/`surface-700` (nested chips), `ink` = white, `soft` =
n-300, `soft-400` = n-400, `sub` = n-500, `line` = n-700.

## Typography

DM Sans throughout. Weights 400 / 500 / 600 / 700.

| Token | >991px | ≤991px | ≤767px | Tracking | Line height |
| --- | --- | --- | --- | --- | --- |
| h1 | 4rem | 4rem | 3rem | -0.04em | 1.2 |
| h2 | 3rem | 3rem | 2rem | -0.03em | 1.2 |
| h3 | 2.5rem | 2rem | 1.5rem | -0.025em | 1.2 |
| h4 | 2rem | 2rem | 1.5rem | -0.02em | 1.3 |
| h5 | 1.5rem | 1.5rem | 1.5rem | -0.015em | 1.4 |
| h6 | 1.25rem | 1.25rem | 1.25rem | -0.0125em | 1.4 |

Body: main 1rem/1.6, large 1.125rem/1.5 at -0.01em, small 0.875rem/1.6.
Eyebrow: 1rem/1, weight 500, +0.01em, uppercase, primary-coloured.

Note: Orizon styles the bare `h1`–`h6` tags directly off this scale, which is
why a plain `<h3>` in a feature card is 2.5rem. Mirrored in our base layer.

## Spacing

```
2xs .125  xs .25  sm .5  md .75  lg 1  xl 1.5  2xl 2  3xl 2.5
4xl 3  5xl 3.5  6xl 4  7xl 5  8xl 7.5  9xl 8.75    (rem)
```

## Radii

`small .5rem`, `medium .75rem`, `large 1rem`, `xlarge 1.25rem`, `round 100vw`.
Border width 1px.

## Layout and section rhythm

Container widths: main `79rem`, large `90rem`, small `64rem`.

| Token | >991px | ≤991px | ≤767px |
| --- | --- | --- | --- |
| site margin | 2rem | 2rem | 1rem |
| site gutter | 1.5rem | 1.5rem | 1rem |
| section tiny | 3rem | 2.5rem | 2.5rem |
| section small | 5rem | 4rem | 3.5rem |
| section main | 7.5rem | 5rem | 4rem |
| section large | 8.75rem | 7.5rem | 5rem |
| section hero | 11.875rem | 10rem | 9rem |

Orizon declares these on `body` inside `@media` blocks; the `:root` block it
emits at 479px repeats the desktop values but loses on specificity, so ≤479px
behaves the same as ≤767px. Reproduced as three effective steps.

## Signature treatments worth naming

- **Text gradient** on every section title: `linear-gradient(180deg, #fff, #99a0ae)` clipped to text.
- **Hero glow**: three stacked layers, a `blur(100px)` horizontal bar in `plus-lighter` blend plus two `radial-gradient` corner blooms at 80% opacity.
- **Hero visual**: `1.5rem` top radius, a `0 0 0 10px rgb(255 255 255 / .08)` ring, and a bottom gradient that dissolves the screenshot into the page.
- **Screenshot fade**: every product image gets a 40%-height bottom gradient to the card colour.
- **Popular pricing plan**: `inset 0 0 0 1px` primary ring plus a `blur(50px)` primary orb bleeding in from above in `plus-lighter`.
- **Button hover**: label sits in a clipped 1.5rem window with a duplicate stacked beneath; the pair slides up on hover.
- **Marquees**: two identical tracks, each `min-width: 100%`, translating 0 to -100%.
