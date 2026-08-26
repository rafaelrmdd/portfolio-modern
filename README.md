# portfolio-modern

A one-page personal portfolio. Bold, gradient-led, bilingual (EN/PT), with a
day/night theme that follows the OS preference until you override it.

Built with **Vite + React 19 + TypeScript + Tailwind CSS v4 + Motion**.

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

## The hero visual

The hero artwork is deliberately unbuilt. `HeroVisual` in
[`src/components/sections/HeroVisual.tsx`](src/components/sections/HeroVisual.tsx)
reserves the space at its final dimensions with a dashed frame and a label.

When you decide what goes there — a shader, a particle field, a 3D object —
replace the contents of that one component. Nothing else on the page moves:
`Hero` only knows that something square-ish lives in that column. No WebGL
dependency is installed yet, so the bundle carries no cost for the empty slot.

## Theming

The palette is **Ember**: a warm crimson-to-amber duotone on a near-neutral
base, defined as CSS custom properties at the top of
[`src/styles/index.css`](src/styles/index.css).

Both themes are designed rather than derived — the light theme deepens the
accent to hold contrast on paper-white, the dark theme brightens it so it
glows. To reskin the whole site, change the values in `:root` and `.dark`;
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

One long page. `SECTION_IDS` in [`src/lib/sections.ts`](src/lib/sections.ts) is
the single source for both the anchor targets and the keys used to look up nav
labels, so navigation and content cannot drift apart. The header highlights the
active link via an `IntersectionObserver` scroll-spy.

## Accessibility notes

- Skip-to-content link, landmark elements, and labelled controls.
- `prefers-reduced-motion` is respected globally in CSS and per-component via
  Motion's `useReducedMotion`.
- Buttons use solid high-contrast fills; the gradient is reserved for
  decoration and large display type, never for small text on a colored field.

## Not included, on purpose

No router, no CMS, no contact form or backend, no blog, no per-project detail
pages, no tests, no analytics, and no deploy configuration. The build output in
`dist/` is a plain static bundle and will work on any static host.
