# Orchelix brand kit

Everything that carries the Orchelix logo lives here. The live site serves
copies from `/public` — this folder is the master set to hand to a printer,
a designer, or a platform that asks for a logo.

Updated 2026-09-11: the helix was retired and replaced by the **ring** — a
circle with one ribbon crossing it, vectorized from Jorge's own drawing.
Everything with the helix is in `_archive/`.

## Which file do I use?

| Need | File |
| --- | --- |
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
- **Colour.** Graphite `#12141A` by default; blue `#3657B1` as an accent; on dark `#14171C` use the night set (name `#E8EAEE`, ring `#6484DB`). One colour per mark — never gradients, rainbow, glow, shadow, or 3D in the logo.
- **Don't** stretch, rotate, outline, redraw, or put the mark inside a box or circle. Keep clear space around the lockup at least the width of the ring's inner opening.
- **Wordmark.** ORCHELIX is Archivo, light weight, widest setting, tracking 0.12em — already outlined in every file, so no font is needed to use them.

## Folders

- `mark/` — the ring alone. `svg/` has light / regular / heavy × ink / blue / white / night-blue; `png/` has the regular weight.
- `lockup/` — ring + ORCHELIX + AI CONSULTING, primary (side by side) and stacked, in ink, blue-mark, night, and white.
- `wordmark/` — the name without the ring.
- `icon/` — favicon and app icons.
- `social/` — share image and profile avatars.
- `email/` — the header logo used in lead emails.
- `print/` — business card files (front with QR → orchelix.com/jorge, plain front, back) and a mockup.
- `_archive/` — retired logos, kept for reference only:
  - `helix-original/` — the first helix logos (bold wordmark), the helix footer pattern, and the old share image.
  - `helix-archivo-interim/` — the helix with the wide Archivo wordmark (used briefly on 2026-09-11).
  - `icons-helix/` — helix favicons and app icons.

`orchelix-brand-sheet.png` shows every version at a glance.
