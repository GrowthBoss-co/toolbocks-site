# toolbocks-site-v2

Candidate rebuild of the ToolBocks marketing site (`toolbocks.com`), structured
on the [Orizon Webflow template](https://orizon-template.webflow.io/) and filled
with ToolBocks product, copy and visuals.

Scaffolded from [ai-website-cloner-template](https://github.com/JCodesMore/ai-website-cloner-template)
(MIT), whose `/clone-website` skill and agent config files are still in this repo.

**Status: preview only.** Not deployed, no git remote, nothing merged. The live
site is still the static build in `../toolbocks-site`.

## Preview

```bash
npm install
npm run dev      # http://localhost:3000
```

Other commands: `npm run build`, `npm run lint`, `npm run typecheck`,
`npm run check` (all three).

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript strict ·
Tailwind CSS v4 · DM Sans via `next/font`.

The product UI visuals ship as markup rather than screenshots, so they stay
sharp at any density and restyle with the design tokens.

## Layout

```
src/app/globals.css              design tokens + typography/layout primitives
src/app/layout.tsx               fonts, metadata
src/app/page.tsx                 section order
src/lib/content.ts               ALL copy, in one file
src/components/ui-kit.tsx        Button, Eyebrow, SectionHeader
src/components/icons.tsx         SVG icons (no emoji anywhere)
src/components/visuals.tsx       ToolBocks product UI visuals
src/components/sections/         one file per page section
docs/research/DESIGN_TOKENS.md   what was extracted from Orizon, and what changed
```

## Before this can go public

Two sections carry deliberate placeholders, flagged in `src/lib/content.ts` and
called out on the page itself:

1. **Testimonials** (`testimonials.isPlaceholder`) — ToolBocks has no published
   client quotes. Every quote is a stand-in. Replace with real attributable
   quotes, or delete the section.
2. **Pricing** (`pricing.isPlaceholder`) — there is no public ToolBocks pricing.
   Tier names, feature lists and the monthly/annual mechanic are real; every
   dollar figure is invented for layout.

Also worth confirming:

- `APP_URL` in `src/lib/content.ts` points at `https://toolbocks.com`. Per the
  tenancy plan the app moves to `app.toolbocks.com`, which needs the licence
  re-minted for that host first.
- The integration rows use two-letter monograms and name pills, not official
  brand logos. Swap in real marks where each brand's guidelines allow it.
- Stats in `content.ts` (1,928 calls, 9 integrations) came from the current live
  site copy. Re-check them before publishing.
