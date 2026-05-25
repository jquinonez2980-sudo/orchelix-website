# Marketing site UI kit

A click-through hi-fi recreation of what the Orchelix homepage will look like.
Not production code — the React tree is intentionally simple so the kit can be
embedded as a single HTML file, copied into a real codebase, or used as the
reference for a real Next.js/Astro build.

## What's in it

- `index.html` — entry point. Composes the page top-to-bottom from `<Components />`.
- `Components.jsx` — every section as a small React component. Components are
  exported to `window` so other Babel scripts (or future kits) can use them.
- `styles.css` — kit-scoped styles, layered on top of the root design tokens via
  `@import url('../../colors_and_type.css')`.

## Sections

| Component | What it does |
|---|---|
| `<Nav>` | Sticky translucent top nav with brand lockup, primary links, and call-to-action. |
| `<Hero>` + `<HeroFigure>` | Headline + lead, dual-button CTA row, and a stylized operator-console visual on the right. |
| `<LogoStrip>` | Cool-neutral logo strip of representative Canadian SME customers. |
| `<AgentGrid>` + `<Agent>` | The agent stack — 6 product cards, each with a monogram icon and a status badge. |
| `<HowItWorks>` | 3-step pilot-to-scale narrative. |
| `<Stats>` | Dark navy stat strip with four big numbers. |
| `<Testimonial>` | Pull-quote + customer pic panel (helix mark on a navy field). |
| `<CTABand>` | Navy → teal gradient panel with two CTAs. |
| `<Footer>` | Multi-column footer + legal row. |

## How to reuse

Pull `Components.jsx` into a real app and the components will work as-is, provided
you ship `styles.css` alongside (or migrate its rules into your styling solution).
Every visible token comes from `colors_and_type.css` via CSS custom properties.
