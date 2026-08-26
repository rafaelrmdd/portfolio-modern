# portfolio-modern

A one-page personal portfolio: cyberpunk-leaning, type-led, bilingual (EN/PT),
with a day/night theme that follows the OS preference until you override it.

Built with **Vite + React 19 + TypeScript + Tailwind CSS v4 + Motion**.
Type is Anton (display), Space Grotesk (UI) and JetBrains Mono (the HUD labels).

## Getting started

```bash
npm install
npm run dev        # dev server on http://localhost:5173
npm run build      # typecheck, then production build into dist/
npm run preview    # serve the production build locally
npm run typecheck  # types only
```

## Filling in your content

**Everything writeable lives in [`src/content/site.ts`](src/content/site.ts).**
No component needs to be touched to put real content on the site — copy,
links, projects, skills, social handles and page metadata are all in that one
file, and it currently holds obvious placeholders.

It exports `content: Record<Locale, Dictionary>` with an `en` and a `pt`
dictionary. Because both are annotated as `Dictionary`, **adding a string to
one language without adding it to the other is a compile error** — that is the
whole reason this is a plain typed object instead of an i18n library.

Adding a project is one entry in `projects.items` in each language. `repoUrl`
and `liveUrl` are optional; the card renders only the links you supply.

## The hero scene

The artwork is **hand-authored SVG**, not an image file: a figure standing on a
rooftop parapet looking out over a neon skyline. It lives in
[`src/components/scene/`](src/components/scene/).

It is drawn rather than shipped as a PNG so that it recolors with the theme
(every fill reads a `--scene-*` custom property), stays sharp at any viewport,
and costs a few KB instead of a few hundred.

- `skyline.ts` generates each depth layer from a seeded PRNG — buildings,
  setbacks, antennas and lit windows. Change a seed to reroll a layer.
- `CityScene.tsx` composes sky, three skyline depths, rain, the rooftop and the
  figure. The figure is drawn in a local 100 x 231 box and placed by a single
  transform, so adjusting the pose means editing one small set of numbers.
- Parallax is driven by `--mx` / `--my`, which `Hero` writes from pointer
  position straight to CSS — the scene never re-renders on mousemove.

The composition is centered horizontally on purpose: the SVG uses
`preserveAspectRatio="xMidYMid slice"`, so a portrait viewport only shows the
middle of the viewBox. Anything important placed near the left or right edge
disappears on mobile.

## Theming

Two palettes, authored separately rather than one inverted into the other, at
the top of [`src/styles/index.css`](src/styles/index.css):

- **Dark — "Night City"**: blue-black, never neutral grey, lit by a rose/cyan
  neon pair. The accents are the only saturated things on the page.
- **Light — "Concrete"**: unbleached warm concrete, deliberately **not** white.
  The reference is an overcast, smog-lit afternoon, so the neons survive into
  daylight as deep ink versions of themselves instead of washing out.

Each theme also defines its own `--scene-*` set, which is what makes the same
SVG read as night and as overcast day. To reskin the whole site, change the values in `:root` and `.dark`;
every component reads them through Tailwind theme tokens (`bg-bg`, `text-fg`,
`border-line`, `text-accent`, `from-grad-from`, and so on), so nothing
hardcodes a color.

Theme resolution order:

1. A stored override in `localStorage` (set by the header toggle), otherwise
2. the OS `prefers-color-scheme`, live-updating while no override is stored.

A small script in `index.html` applies the theme before first paint, so there
is no light-mode flash on load.

## Language

Same shape as the theme: a stored choice in `localStorage`, otherwise the
browser language (`pt*` gets Portuguese, everything else English). The provider
keeps `<html lang>`, the document title and the meta description in sync with
the active locale.

## Layout

One long page: hero, about, work, stack, contact. `SECTION_IDS` in
[`src/lib/sections.ts`](src/lib/sections.ts) is the single source for the anchor
targets, the section numbering (01–04) and the keys used to look up nav labels,
so navigation and content cannot drift apart. The header highlights the active
link via an `IntersectionObserver` scroll-spy.

Work is a list of full-width rows rather than a card grid, and Stack is one
scrolling marquee band per group rather than an icon wall.

## Accessibility notes

- Skip-to-content link, landmark elements, and labelled controls.
- `prefers-reduced-motion` is respected globally in CSS and per-component via
  Motion's `useReducedMotion`.
- Buttons use solid high-contrast fills; the gradient is reserved for
  decoration and large display type, never for small text on a colored field.

## Not included, on purpose

No router, no CMS, no contact form or backend, no blog, no per-project detail
pages, no tests, no analytics, no WebGL, and no deploy configuration. The build output in
`dist/` is a plain static bundle and will work on any static host.
