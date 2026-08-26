# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server on http://localhost:5173
npm run typecheck  # tsc -b, types only
npm run build      # typecheck, then production build into dist/
npm run preview    # serve the production build
```

There is no test runner, linter, or formatter configured — `npm run typecheck`
is the only automated gate, and it is strict (`noUnusedLocals`,
`noUnusedParameters`, `verbatimModuleSyntax`). Run it after any change.

## What this is

A single-page personal portfolio: Vite + React 19 + TypeScript + Tailwind CSS
v4 + Motion. No router, no backend, no CMS, no tests, no analytics, no deploy
config — `dist/` is a plain static bundle. Keep it that way unless asked.

## Architecture

**All copy lives in `src/content/site.ts`.** It exports
`content: Record<Locale, Dictionary>` with `en` and `pt` dictionaries, both
annotated as `Dictionary`. Adding a string to one language without the other is
a compile error — that type is the entire reason there is no i18n library.
Components never hold user-facing strings; they read `t` from `useI18n()`.
Adding a project or skill group means editing `projects.items` /
`skills.groups` in both languages, nothing else.

**`SECTION_IDS` in `src/lib/sections.ts`** is the single source for the anchor
ids *and* the keys used to look up nav labels in `Dictionary["nav"]`. Adding a
section means adding an id there, a nav label in both dictionaries, and
rendering the section in `App.tsx`.

**Two providers wrap everything** (`ThemeProvider` outside `I18nProvider` in
`App.tsx`). Both follow the same shape and split across three files so the
context object stays free of components:

- `theme-context.ts` / `i18n-context.ts` — context + storage-key constants
- `ThemeProvider.tsx` / `I18nProvider.tsx` — state, `localStorage`, DOM side effects
- `useTheme.ts` / `useI18n.ts` — the `use(Context)` hook that throws outside its provider

Resolution order for both: stored `localStorage` override, else the system/
browser preference (live-updating while no override is stored). The inline
script in `index.html` applies theme and `<html lang>` **before first paint**;
if you change storage keys (`theme`, `lang`) or the `.dark` class, that script
must change with them or the page flashes on load.

**Styling is CSS custom properties, not Tailwind's palette.** `src/styles/index.css`
defines two separately authored palettes in `:root` / `.dark` — light
"Concrete" (warm unbleached concrete, never white) and dark "Night City"
(blue-black with a rose/cyan neon pair) — and exposes them via `@theme inline`
as `bg-bg`, `text-fg`, `text-muted`, `border-line`, `text-accent`,
`text-accent-2`, `from-grad-from`, `to-grad-to`. Neither theme is derived by
inverting the other; edit both. Each also defines its own `--scene-*` set,
which is what makes the hero SVG read as night and as overcast day.

Component classes: `.hud` (the mono micro-label used everywhere), `.btn` /
`.btn-primary` / `.btn-ghost` (cut-corner, never rounded — the site has no
pills), `.text-gradient`, `.outlined` / `.outlined-fg`, `.rule`. Utilities:
`.marquee-track` / `.marquee-mask`, `.grain`, `.scanlines`. Never hardcode a
color in a component — reskinning is meant to be two blocks of CSS.

Note `@custom-variant dark (&:where(.dark, .dark *))`: `dark:` is class-driven,
not `prefers-color-scheme`, because the toggle must override the OS.

**Motion is centralized in `src/components/ui/Reveal.tsx`** — the scroll-reveal
wrapper every section uses, fires once, and honors `useReducedMotion()`.
Reach for `Reveal` before writing a bespoke `motion.div`. CSS also kills all
animation globally under `prefers-reduced-motion`.

**The hero artwork is hand-authored SVG in `src/components/scene/`** — a figure
on a rooftop parapet over a neon skyline. `skyline.ts` generates each depth
layer from a seeded PRNG (buildings, setbacks, antennas, lit windows);
`CityScene.tsx` composes sky, three skyline depths, rain, rooftop and figure.
Every fill reads a `--scene-*` property, so it recolors with the theme. No
WebGL and no image assets are involved.

Two constraints there are easy to break:

- The SVG is `preserveAspectRatio="xMidYMid slice"` over a 1600x900 viewBox, so
  a portrait viewport shows roughly the middle 400 units only. Anything that
  must survive on mobile belongs near x=800; the figure sits at x=900 for
  exactly this reason.
- Parallax is CSS: `Hero` writes `--mx` / `--my` from pointer position and the
  layers translate off them. The scene must never re-render on mousemove, so
  keep that out of React state.

## Conventions

- Named exports only; one component per file, `PascalCase.tsx`.
- Section content goes through `<Section>` (`layout/Section.tsx`), which takes a
  `SectionId`, derives the oversized 01–04 index from `SECTION_IDS`, and renders
  the label/heading/intro block and the `Container` width.
- Icons are hand-written inline SVGs in `ui/icons.tsx` — no icon package.
- Comments explain *why* (a contrast decision, a pre-paint constraint, an
  accessibility tradeoff). Match that density; don't narrate what the code does.
- Accessibility is load-bearing here: skip link, landmarks, labelled toggles,
  `aria-hidden` on decorative elements. Preserve it in new markup.
