# Orchelix brand kit

Everything that carries the Orchelix logo lives here. The live site serves
copies from `/public` — this folder is the master set to hand to a printer,
a designer, or a platform that asks for a logo.

Updated 2026-09-11: the helix was retired and replaced by the **ring** — a
circle with one ribbon crossing it, vectorized from Jorge's own drawing.
Everything with the helix is in `_archive/`.

Updated 2026-09-25: the kit moved to the site's vivid palette. The solid blues
are now `#2451E6` (on light) and `#60A5FA` (on dark), the night ground is
`#060A14`, and there is a new **gradient** version of the mark and lockups for
the website and app icons.

## Which file do I use?

| Need | File |
| --- | --- |
| Website header, app icons, digital anything (the vivid look) | `lockup/svg/orchelix-lockup-primary-gradient-mark.svg` · on dark `…-primary-night-gradient.svg` · symbol only `mark/svg/orchelix-mark-*-gradient.svg` |
| Website header, documents, anything on a light background | `lockup/svg/orchelix-lockup-primary-ink.svg` |
| Same, with the brand blue | `lockup/svg/orchelix-lockup-primary-blue-mark.svg` |
| Dark background | `lockup/svg/orchelix-lockup-primary-night.svg` |
| On the blue, or over a photo | `lockup/svg/orchelix-lockup-primary-white.svg` |
| Square or centered spaces (slides, signage, the card back) | `lockup/svg/orchelix-lockup-stacked-*.svg` |
| Just the symbol | `mark/svg/orchelix-mark-regular-*.svg` |
| Somewhere that won't take SVG (Canva, Word, social platforms) | the matching file in `lockup/png/` or `mark/png/` (transparent) |
| LinkedIn / WhatsApp / Google Business profile photo | `social/avatar-paper-800.png` or `social/avatar-night-800.png` |
| Link previews (what shows when orchelix.com is shared) | `social/og-image.jpg` |
| Email header | `email/email-logo.png` |
| Browser tab / phone home screen | `icon/` (`favicon.ico`, `icon-*.png`) |
| Business cards (MOO Standard, print-ready) | `print/` |

## Rules

- **Line weights.** `regular` is the default. `light` only large (64px and up, print, hero). `heavy` for small sizes (under 32px).
- **16px.** The full ring can't survive 16px, so `icon/orchelix-icon-16.svg` (outer ring + the diagonal band) is the only sanctioned simplification — use it at 16px and nowhere else.
- **Colour.** Two families:
  - **Solid — the official logo** for print, email, business cards, the favicon and anywhere colour can't be trusted: blue `#2451E6` on light, graphite `#12141A` when it must be neutral; on dark `#060A14` use the night set (name `#EAF0FA`, ring `#60A5FA`).
  - **Gradient — digital only** (website header, app icons, share image): the ring runs `#1E40AF → #2563EB → #22D3EE` on light and `#3B82F6 → #22D3EE → #A5F3FC` on dark, top-left to bottom-right. Only the ring takes the gradient; the name stays solid.
  - Never rainbow, glow, shadow, or 3D in the logo files themselves (the site may animate the mark; the files stay flat).
- **Don't** stretch, rotate, outline, redraw, or put the mark inside a box or circle. Keep clear space around the lockup at least the width of the ring's inner opening.
- **Wordmark.** ORCHELIX is Archivo, light weight, widest setting, tracking 0.12em — already outlined in every file, so no font is needed to use them.

## Folders

- `mark/` — the ring alone. `svg/` has light / regular / heavy × ink / blue / white / night-blue / gradient / night-gradient; `png/` has the regular weight.
- `lockup/` — ring + ORCHELIX + AI CONSULTING, primary (side by side) and stacked, in ink, blue-mark, gradient-mark, night, night-gradient, and white.
- `wordmark/` — the name without the ring.
- `icon/` — favicon (solid ring on night, 16/32/48) and app icons (gradient ring on night, 48–512). `orchelix-icon.svg` is the app-icon master, `orchelix-icon-solid.svg` / `orchelix-icon-16.svg` the favicon masters.
- `social/` — share image and profile avatars.
- `email/` — the header logo used in lead emails.
- `print/` — business card files (front with QR → orchelix.com/jorge, plain front, back) and a mockup.
- `_archive/` — retired logos, kept for reference only:
  - `helix-original/` — the first helix logos (bold wordmark), the helix footer pattern, and the old share image.
  - `helix-archivo-interim/` — the helix with the wide Archivo wordmark (used briefly on 2026-09-11).
  - `icons-helix/` — helix favicons and app icons.

`orchelix-brand-sheet.png` shows every version at a glance.
