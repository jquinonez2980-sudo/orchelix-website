# Fonts

The brand uses **Montserrat** for display + body, loaded locally from this folder.
JetBrains Mono is used sparingly for code / timestamps / version strings, served
from Google Fonts.

## Files in use

The `@font-face` block in `../colors_and_type.css` references the **variable** font
files — they cover the entire 100–900 weight range plus italics in two TTF files:

- `Montserrat-VariableFont_wght.ttf` — regular, 100–900 weight axis
- `Montserrat-Italic-VariableFont_wght.ttf` — italic, 100–900 weight axis

The full set of static weight files is also present in this folder
(`Montserrat-Thin.ttf` … `Montserrat-Black.ttf` and their italics). They are
included as a fallback for tools or rendering engines that don't support the
variable axis. Modern browsers will use the variable font directly.

## Why Montserrat

Montserrat is the brand font specified by the founder — a geometric sans with a
slightly condensed feel that matches the look of the wordmark in the
Orchelix lockup. It has generous weight coverage (especially the high-impact
`800` and `900` weights used for the `ORCHELIX` wordmark) and good readability
at small sizes for body copy.

## Substitution

There is no substitution now — Montserrat is the official font and it ships with
the design system. Production code that loads the system via `colors_and_type.css`
will get Montserrat automatically, provided the `fonts/` directory ships alongside.
