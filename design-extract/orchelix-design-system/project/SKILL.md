---
name: orchelix-design
description: Use this skill to generate well-branded interfaces and assets for Orchelix AI Consulting (multi-agent revenue-ops systems for Canadian SMEs, with the Esmi Virtual Receptionist sub-brand). Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping and production.
user-invocable: true
---

# Orchelix design skill

Read the `README.md` file within this skill, and explore the other available files:
- `colors_and_type.css` — every design token. Import first.
- `assets/` — real brand assets (logos, marks, Esmi sub-brand).
- `fonts/` — typography notes and substitutions.
- `ui_kits/marketing-site/` — homepage kit (React + CSS).
- `ui_kits/console-app/` — operator console kit (React + CSS).
- `preview/` — small reference cards demonstrating every primitive.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy assets out
and create static HTML files for the user to view. Always import
`colors_and_type.css` first so tokens are available. For the Orchelix mark, prefer
`assets/orchelix-mark.png` on light backgrounds and `assets/orchelix-mark-light.png`
on dark. For the Esmi sub-brand, use `assets/esmi-logo.png` (transparent) or
`assets/esmi-logo-dark.png` (with the native navy backdrop).

If working on production code, copy assets and read the rules in `README.md` to
become an expert in designing with this brand. Pay particular attention to the
**Content fundamentals** section — Orchelix's voice is the most distinctive thing
about it and easy to get wrong.

If the user invokes this skill without any other guidance, ask them what they want
to build or design, ask some focused questions (audience, format, fidelity, which
agent product), and act as an expert designer who outputs HTML artifacts *or*
production code, depending on the need.
