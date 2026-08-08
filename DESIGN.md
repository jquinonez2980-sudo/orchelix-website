---
name: Orchelix Marketing — The Ruled Record
description: A bound-ledger world for the marketing site — navy buckram field, gold foil stamp, red column ruling, tabular registers.
colors:
  field: "#071A2E"
  field-2: "#0B2338"
  field-3: "#102C44"
  stock: "#EDE9DC"
  stock-2: "#E2DDCB"
  foil: "#D9A21B"
  foil-lift: "#EFBB3C"
  foil-ink: "#2A1D02"
  rule: "#B4342A"
  rule-quiet: "rgba(180, 52, 42, 0.34)"
  rule-text: "#DE6A5C"
  tick-text: "#37A87E"
  tick: "#2F8F6B"
  ink: "#F4F1E8"
  ink-2: "rgba(238, 240, 245, 0.72)"
  ink-3: "rgba(226, 232, 242, 0.52)"
  hair: "rgba(226, 232, 242, 0.16)"
  hair-2: "rgba(226, 232, 242, 0.09)"
  ink-on-stock: "#10243A"
  ink-on-stock-2: "#4A5A6E"
typography:
  scale:
    micro: "0.625rem"
    micro-lift: "0.6875rem"
    action-xs: "0.75rem"
    meta: "0.8125rem"
    body-sm: "0.875rem"
    body-base: "0.9375rem"
    body-md: "1rem"
    body-lead: "1.0625rem"
    entry: "1.1875rem"
    entry-lg: "1.25rem"
    figure: "1.5rem"
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.4vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 0.94
    letterSpacing: "-0.028em"
    fontVariation: "wdth 82"
    textTransform: "uppercase"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.85rem, 3.2vw, 2.9rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.022em"
    fontVariation: "wdth 82"
    textTransform: "uppercase"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.008em"
    fontVariation: "wdth 86"
    textTransform: "uppercase"
  body:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "Azeret Mono, ui-monospace, monospace"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.13em"
    fontFeature: "\"tnum\" 1, \"zero\" 1"
    textTransform: "uppercase"
  action:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.08em"
    fontVariation: "wdth 88"
    textTransform: "uppercase"
rounded:
  none: "0px"
spacing:
  hair: "0.5rem"
  cell: "0.85rem"
  row: "1.6rem"
  gutter: "1.25rem"
  column: "3.5rem"
  section: "5rem"
  section-lg: "7rem"
components:
  stamp:
    backgroundColor: "{colors.foil}"
    textColor: "{colors.foil-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0.95rem 1.7rem"
  stamp-compact:
    backgroundColor: "{colors.foil}"
    textColor: "{colors.foil-ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0.6rem 1.05rem"
    size: "0.75rem"
  quiet-action:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    padding: "0"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-2}"
    typography: "{typography.action}"
    rounded: "{rounded.none}"
    size: "0.8125rem"
  register-row:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.72rem 0"
  section-field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "5rem 1.25rem"
    width: "1320px"
  section-stock:
    backgroundColor: "{colors.stock}"
    textColor: "{colors.ink-on-stock}"
    rounded: "{rounded.none}"
    padding: "3.5rem 1.25rem"
    width: "1320px"
---

# Design System: Orchelix Marketing — The Ruled Record

> **Scope.** This document records the marketing surface only: `/`, `/pricing`, `/solutions`, `/how-it-works`, `/industries`, `/about`, plus the shared `Nav` and `Footer`. It does **not** govern `/dashboard/*` or `/try-esmi`, which deliberately run separate, older token systems.
>
> **The token file is deliberately split.** `app/globals.css` holds three unrelated systems in one file: the Tailwind `@theme` navy/teal/gold scales and their `:root` aliases (product surfaces — dashboard, forms, legacy marketing routes), the `--lg-*` block (this system), and the `.esmi-dark` block (`/try-esmi` only). Do not "unify" them. The `--lg-*` block is additive and is the only source of truth for anything documented here.
>
> **The site is in a mixed state.** `/book`, `/acumen`, `/blog`, `/ai-receptionist`, `/missed-calls`, `/home-services`, `/kitchen-bath`, and the whole `/es` tree still carry the previous light/teal design. They now sit under the new `Nav` and `Footer`, so a visitor can cross from this world into the old one in a single click. Anything new on those routes should be built in this system, not matched to the page around it.

## Overview

**Creative North Star: "The Ruled Record"**

The interface *is* the audit trail. The world is a bound ledger: a navy buckram field carrying a real cloth weave, ruled off in red, stamped once in gold foil, and filled with rows of tabular figures. Nothing decorative is added on top of the record — the record itself is the composition. The first viewport does not introduce the product with a centered headline and three identical cards; it puts the call register on the page at full scale, with its own column heads, its own notation legend, and a foot rule tallied from the rows above it.

Density is high and deliberate. Rows are close-set, labels are small caps in mono, and the space between sections is generous so that each ruled block reads as a page in a book rather than a card in a feed. The palette is almost entirely one dark field with three tonal steps, plus two pale ledger-stock tones that let a section flip to a paper surface when the content wants to be read rather than scanned. Colour appears in exactly two places: the red column rule, which is structure and never an alert, and the gold foil, which is scarce enough that its appearance means "this is the action."

The build refuses two specific things, and the refusal is durable: the category's centered hero with three identical product cards, and its opposite, the cream editorial broadsheet. Neither one puts the artifact on the page.

**Key Characteristics:**
- Navy buckram field with a shipped SVG cloth tile carrying its own alpha — dominant across every page.
- Red vertical column ruling as the primary structural device; it is a rule, not a warning.
- Gold foil reserved for the primary action and the wordmark, and for nothing else.
- Zero corner radius everywhere; every edge is a ruled edge.
- Archivo condensed caps / Literata / Azeret Mono tabular figures.
- Registers, bands, and rate schedules built as real ruled tables and definition lists.

## Colors

A single dark cloth field in three tonal steps, two pale ledger-stock inversions, and two colours of consequence: a red structural rule and a gold foil stamp.

### Primary
- **Foil Gold** (`#D9A21B`): The stamp. It marks the primary action ("Book a pilot") and the masked wordmark, plus the three system-level accents that read as notation rather than decoration: the `BOOKED` disposition, the `ES` language marker, and the headline price in the rate schedule. It also carries every browser surface — selection background, caret, scrollbar thumb, focus ring.
- **Foil Lift** (`#EFBB3C`): The lit step of the foil, used inside the metallic ramp and for hover brightening. Never used as a flat fill.
- **Foil Ink** (`#2A1D02`): The near-black brown that sits *on* foil. The stamp's label colour; it is the only text colour permitted on a foil surface.

### Secondary
- **Rule Red** (`#B4342A`): The ledger's ruling. Full strength for section top-rules, the margin rule down the register, the measure ticks at the field edge, and inline separators. This colour never signals error or danger anywhere in this world.
- **Rule Red, Quiet** (`rgba(180, 52, 42, 0.34)`): The vertical ruling between columns — register columns, `Band` columns, rate-schedule cells. The quiet step is what makes a table read as a ledger instead of a grid.

### Tertiary
- **Tick Green** (`#2F8F6B`): One job only — the `ANSWERED` disposition in the register legend and its keyed swatch. It exists so the disposition key has four distinguishable states without stretching the foil.

### Neutral
- **Buckram Field** (`#071A2E`): The dominant ground. Always paired with the cloth tile (`/textures/buckram.svg`, 180×180 repeat).
- **Buckram Field 2** (`#0B2338`) / **Buckram Field 3** (`#102C44`): Adjacent sections step up one tone to separate without a divider. Field 3 is the closing tone.
- **Ledger Stock** (`#EDE9DC`) / **Ledger Stock 2** (`#E2DDCB`): The pale writing surface. Used for whole sections that are meant to be read at length, as a page turn inside the dark run.
- **Ink** (`#F4F1E8`): Warm-white primary text on the field. Never pure white and never gray — it is tinted from the field's own hue.
- **Ink 2** (`rgba(238, 240, 245, 0.72)`) / **Ink 3** (`rgba(226, 232, 242, 0.52)`): Body copy and label/meta text respectively.
- **Hair** (`rgba(226, 232, 242, 0.16)`) / **Hair 2** (`rgba(226, 232, 242, 0.09)`): Horizontal row separators. Hair for chrome edges (nav bottom, column-head rule), Hair 2 for entry rows.
- **Ink on Stock** (`#10243A`) / **Ink on Stock 2** (`#4A5A6E`): The inverse ink pair for stock-tone sections. Section tone selects them automatically via `inkFor` / `ink2For` / `hairFor`; never hand-pick an ink for a stock section.

### Named Rules

**The Foil Scarcity Rule.** The gold foil *surface* (`.lg-foil-surface`) marks the primary action and the wordmark. Nothing else. In the current build that is three "Book a pilot" stamps and one masked lockup. A finish review found foil on five elements — including a 10px chip — and the verdict was that the stamp had stopped meaning anything. Status and disposition markers use `StatusKey`, a keyed foil-or-tick swatch; secondary actions use `QuietAction` or an outline. If a new surface needs a second gold thing, the answer is a keyed swatch, not a second stamp.

**The Marks-vs-Text Rule.** `rule` and `tick` are *marks* — rules, borders, and the small drawn swatches — where contrast is not a text requirement. Measured as text on the field they are 2.90:1 and 4.40:1, both under the floor, so any status **word** uses the lighter `rule-text` (5.28:1) or `tick-text` (5.91:1) step instead. The base value draws; the `-text` value is read. This is the same relationship `foil-lift` has to `foil`, not a new hue.

**The Status Scale (product surface).** `/dashboard` carries real state that has to be readable at a glance in a table, so it uses the four values the call register already ships: `tick-text` for success, `foil` for attention or pending, `rule-text` for failure or destructive, `ink-3` for inert. `Badge.tsx` is the single place these semantics are defined — the blanket colour mappings in `globals.css` cannot distinguish success from warning on their own, and collapsing both to foil would destroy the distinction. Note this narrows the six-tone source scale to four hues; `info` and voicemail are held apart by ink tier and border weight rather than colour.

**The Red Is Structure Rule.** Rule red is a ruling colour. It draws column verticals, section top rules, ticks, and separators. It never carries error, danger, destructive, or "urgent" meaning on this surface. On the marketing surface an error is drawn with a device — a margin annotation of a heavy ink rule and a mono label — not by borrowing the rule; `/book` and `/try-esmi` both do this. The product surface is the documented exception: see The Status Scale above.

**The Tinted Ink Rule.** No neutral gray text. Every ink on the field is pulled toward the field's blue-white; every ink on stock is pulled toward the field's navy. Measured contrast on the field runs 4.68–8.41:1 alpha-composited; a new ink value has to land inside that band.

## Typography

**Display Font:** Archivo (variable, `wdth` axis) with `ui-sans-serif, system-ui, sans-serif`
**Body Font:** Literata with `Georgia, serif`
**Label/Mono Font:** Azeret Mono with `ui-monospace, monospace`

**Character:** Condensed grotesque caps carry the authority of a ledger column head; a screen serif gives body copy document texture rather than UI gloss; a true tabular mono makes every number a measurement instead of a costume. All three were chosen specifically to sit outside the usual defaults — no Inter, no system stack, no geometric-sans-plus-one-serif reflex.

### The ramp

Eleven fixed steps, in `rem`. Every one is used at least twice across the
converted routes, and the normative copy is `typography.scale` in this file's
frontmatter — that map is what the detector reads. A size that is not here is
drift, not a decision.

```
0.625   0.6875   0.75   0.8125   0.875   0.9375   1   1.0625   1.1875   1.25   1.5
```

Above `1.5rem` type is fluid, never a fixed step, and only in these two clamps —
both of which live in a shared primitive, which is the point:

```
clamp(2.5rem,  5.4vw, 4.25rem)   Display  — PageTitle, the page-opening headline
clamp(1.85rem, 3.2vw, 2.9rem)    Headline — SectionTitle, every section title
```

### Values the build carries that are not on the ramp

Recorded as defects, not as steps. Each is a hand-rolled inline heading or size
that predates the shared primitives, and each should fold into the step beside
it. The detector is correct to keep flagging them.

| Value | Where | Uses | Folds into |
| --- | --- | --- | --- |
| `clamp(1.9rem, 3.4vw, 3rem)` | `Solutions`, `Why`, `HowItWorks` inline `<h2>` | 3 | `SectionTitle` |
| `clamp(2.1rem, 4.4vw, 3.75rem)` | `FinalCTA` inline `<h2>` | 1 | `SectionTitle` |
| `clamp(1.75rem, 3vw, 2.6rem)` | `Problem` inline `<h2>` | 1 | `SectionTitle` |
| `clamp(1.75rem, 3vw, 2.5rem)` | `Solutions` inline `<h2>` | 1 | `SectionTitle` |
| `1.35rem` | `Solutions`, `EntryTitle size=` | 2 | `1.25rem` |
| `1.125rem` | `industries` lead-in | 1 | `1.0625rem` |

### Hierarchy
- **Display** (Archivo 700, `wdth` 82%, `clamp(2.5rem, 5.4vw, 4.25rem)`, line-height 0.94–0.96, tracking `-0.028em`, uppercase): Page-opening headlines only, one per page, `max-width` 15–18ch with `text-wrap: balance`.
- **Headline** (Archivo 700, `wdth` 82%, `clamp(1.85rem, 3.2vw, 2.9rem)`, line-height 1.02, tracking `-0.022em`, uppercase): Section titles, `max-width` ~20ch. Always via `SectionTitle`; a section title is never hand-set.
- **Title** (Archivo 600, `wdth` 86%, 1.0625 / 1.1875 / 1.25rem, tracking `-0.008em`, uppercase): Entry headings inside a ruled list. `1.5rem` is reserved for the one headline figure per column in the rate schedule.
- **Body** (Literata 400, 0.875 / 0.9375 / 1 / 1.0625rem, line-height 1.62): All prose. Measure is capped at 58ch by default, 40–60ch in practice. Prose links do not use a browser underline — they carry a 1px foil `text-decoration-color` at `0.22em` offset.
- **Label** (Azeret Mono 400, 0.625 / 0.6875rem, tracking `0.11em`–`0.15em`, uppercase): Column heads, terms in a `RuledList` or `Band`, register cells, meta, legend text, the foot-rule tally, and the skip link.
- **Action** (Archivo 700 stamped / 600 quiet, `wdth` 88%, 0.75 / 0.8125 / 0.875 / 0.9375 / 1rem, tracking `0.08em` stamped / `0.04em` quiet, uppercase): Every button and link that is an action.

### Named Rules

**The Tabular Figures Rule.** Any number that is a quantity, a time, a count, or a price gets `.lg-fig` — Azeret Mono with `tabular-nums` and `"tnum" 1, "zero" 1`. A number set in the body serif is a word, not a figure. Columns of numbers must align on the digit.

**The Closed Ramp Rule.** The type ramp is closed: eleven fixed steps and two clamps, enumerated in `typography.scale` and in "The ramp" above. Above `1.5rem` type is fluid and comes from `PageTitle` or `SectionTitle` — a heading is never hand-set with a new clamp, because that is how six near-duplicate headline sizes got into a build that has two headline roles.

**The Condensed Caps Rule.** Display, headline, title, and action are all uppercase Archivo on the `wdth` axis between 82% and 88% — tighter as the type gets bigger. Body copy is never uppercase and never condensed. There is no sentence-case display size in this system.

**The No Kicker Rule.** Headings stand alone. No eyebrow, no kicker, no small-caps label above a heading, no `01 / 02 / 03` section numbering. If a section needs context before the heading, it belongs in the prose after it.

## Layout

Every page is a stack of full-bleed `Section` bands, each in one of five tones (`field`, `field-2`, `field-3`, `stock`, `stock-2`). Tone changes are the only section divider; there is no horizontal rule between sections. Inside a section the content sits in a `1320px` max-width container with `20px / 32px / 40px` responsive gutters (`px-5 sm:px-8 lg:px-10`) and vertical padding of `80px` rising to `112px` at `lg` (`py-20 lg:py-28`), or `56px / 80px` in `tight` mode.

Column grids are asymmetric on purpose — the home hero runs `0.72fr / 1.28fr` so the register is wider than the offer copy, and pricing runs `1fr / 0.85fr`. Column gap is a constant `3.5rem` (`gap-x-14`); row gap runs `2.5rem`–`3.5rem`. Content blocks are anchored to a top rule (`2px solid` rule red for a section-level register, `1px` for a sub-list) and separated internally by `1px` hairlines. Nothing is boxed.

Breakpoints observed in the build: `640px`, `900px`/`901px`, `1023px`/`1024px`, and Tailwind's `sm`/`lg`. Zero horizontal overflow at 375px and 1905px.

### Named Rules

**The Register Degradation Rule.** The call register has three states and they are not interchangeable. Above 900px: five ruled columns with red verticals and a desktop-only alternating band (`min-width: 901px`, `rgba(226,232,242,0.028)`). Between 641 and 900px: verticals retire, each entry becomes two lines (reason on the first; outcome and disposition sharing the second), and the outcome/disposition column heads hide. At 640px and below: one ruled line per entry, and the outcome column is dropped entirely so the reason and disposition survive. The reason at every step is that the record must read as a continuously ruled run, not as a stack of blocks — which is also why the alternating band never ships below 901px.

**The Register Leads Rule.** Below 1024px the hero grid flattens to a column and the register is ordered *first* (`.lg-hero-register { order: -1 }`). The opening screen is the artifact at every width; the offer copy follows it.

**The Two Devices Rule.** `RuledList` reads DOWN the page — label left, value right, one entry per hairline-separated row. `Band` reads ACROSS it — label stacked above value, verticals between columns only, no horizontal separators. They are formally distinct and must stay that way. Stacking two `RuledList`s in sequence flattens their meaning into one undifferentiated run; if a second data block follows a `RuledList`, it changes axis.

## Elevation & Depth

There are no elevation shadows in this system. Nothing floats, nothing is lifted, and there are no cards. Depth comes from three places: the tonal step between adjacent field tones, the physical weave of the cloth tile, and the pressed edges of the foil stamp. The only `box-shadow` in the world is on the foil, and it is describing a physical stamping — a bright top lip, a dark bottom lip, a hairline of contact shadow, and a tight drop that reads as the block sitting *in* the cover rather than above it. On `:active` the whole shadow inverts to an impressed state and the block translates down 2px.

### Shadow Vocabulary
- **Foil relief** (`box-shadow: inset 0 1px 0 rgba(255,244,205,0.85), inset 0 -1px 0 rgba(74,48,4,0.9), 0 1px 0 rgba(0,0,0,0.5), 0 14px 26px -16px rgba(0,0,0,0.75)`): The stamp at rest. Only ever on `.lg-foil-surface`.
- **Foil impressed** (`box-shadow: inset 0 1px 0 rgba(255,244,205,0.5), inset 0 -1px 0 rgba(74,48,4,0.95), inset 0 2px 6px rgba(58,38,2,0.5)`): The stamp on `:active`, paired with `translateY(2px)`.

### Named Rules

**The Produced Materials Rule.** A material must be manufactured, not named. The cloth is a real tiled SVG carrying its own alpha, because blend modes collapse to nothing over a ground this dark. The foil is an eight-stop metallic ramp at 100° with lit and shadowed lips. An earlier pass used a 1.8%-alpha gradient and a flat gold rectangle and it was rejected as a compliance token rather than a shipped material. If a new material is introduced, it ships as a produced asset or it does not ship.

**The No Float Rule.** Surfaces do not lift. There is no ambient shadow, no hover elevation, no card. Hover changes a rule, a brightness, or a fill — never a `translateY` on a container.

## Shapes

Zero radius, everywhere. Corners are square on the stamp, on the mobile menu button, on section edges, on table cells, and on the focus ring — `.lg-field :focus-visible` explicitly resets `border-radius: 0` so the ring squares off against the register's ruling instead of rounding over it. There is no rounded corner anywhere on the field — the last one, an 8px scrollbar thumb, was removed. Radius 0 is literal, not approximate.

The recurring silhouette is the ruled block: a heavy top rule in red (`2px` for a primary register, `1px` for a nested one), a run of rows separated by hairlines, and — where it is a real tally — a second heavy red rule closing the foot. Verticals are `1px` quiet red between columns. Every rule in this world is a drawn CSS border, gradient, or element; Unicode box-drawing characters, bullets, and glyph separators are not used. Icons are inline SVG paths (the nav toggle is the only one).

## Components

### Buttons

**The Stamp** — the primary action, and the only filled control in the system.
- **Shape:** Square (0 radius).
- **Primary:** Foil metallic ramp, label in Foil Ink, Archivo 700 at `wdth` 88%, `0.9375rem`, tracking `0.08em`, uppercase, padding `0.95rem 1.7rem`. The nav variant is compact (`0.75rem`, padding `0.6rem 1.05rem`).
- **Hover:** `filter: brightness(1.07) saturate(1.04)` over 120ms — the foil catches light, it does not move.
- **Active:** `translateY(2px)` with the impressed shadow. The stamp presses into the cover.
- **Quiet action (secondary):** Text in ink, Archivo 600 at `wdth` 88%, tracking `0.04em`. A 1px foil rule sits 3px under the baseline and draws in from the left on hover (`scaleX(0) → 1`, 300ms, `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Reduced motion:** All stamp and quiet-action transitions are suppressed under `prefers-reduced-motion: reduce`.

### Navigation
- Sticky header on the cloth field with a `1px` hair bottom border, `1320px` container, `16px` vertical padding.
- Wordmark is the horizontal lockup used as a `mask-image` over the foil ramp (`.lg-foil-mark`), so the metal shows through the letterforms rather than knocking out flat white.
- Links: Archivo 500 at `wdth` 88%, `0.8125rem`, tracking `0.075em`, uppercase, in Ink 2, with the `QuietAction` foil underline on hover. The language toggle is a mono label in Ink 3.
- The stamp is visible at every width, because on mobile the register leads and the stamp is the only action above the fold.
- Mobile: an outlined square toggle drawing an inline SVG (three rules / an X), opening a Field-2 panel of full-width links separated by Hair 2 hairlines.

### Lists and Data Blocks
- **RuledList** (`<dl>`): red top rule, rows of label-left (mono label, Ink 3) and value-right (Literata, ink), `0.8rem` vertical padding, hairline between rows. Reads down the page.
- **Band** (`<dl>`): red top rule, 2 → 3 → 5 responsive columns, label stacked above value, quiet-red verticals *between* columns only (the first cell of every wrapped row is never ruled off from nothing). Reads across the page.
- **EntryList**: a `2px` red top rule over stacked `<article>` rows, each an uppercase entry title with optional mono meta right-aligned on the same baseline, and a 60ch prose paragraph beneath.
- **StatusKey**: a 14×2px drawn swatch in foil, rule red, tick green, or Ink 3, followed by a 10px mono uppercase label. This is the system's status marker — it replaces every chip, pill, and badge.

### Disclosure Rows
`<details>` with the native marker removed. The summary carries a drawn 12px foil rule that grows to 26px when open (220ms, emphasized ease). Rows are separated by Hair 2 hairlines under a `2px` red top rule.

### Tables (Rate Schedule)
A real `<table>` with `border-collapse: collapse`, a screen-reader caption, `scope`-ed headers, `min-width: 720px` inside an `overflow-x-auto` wrapper. Column heads sit on a `2px` red rule; every column after the first is ruled off with a quiet-red `border-left`; body rows close with a Hair 2 hairline. Values are right-aligned mono; the one headline figure per column steps up to Archivo 700 at `1.5rem` in foil.

### The Call Register (signature component)
The system's defining artifact and the hero of the home page. A `<figure>` with a mono caption on a `2px` red rule, a mono column-head row, ten ruled entries, and a foot rule whose tally is *derived from the rendered rows, never typed*. Each entry carries a tabular time, a language marker (foil when `ES`), a serif reason, a mono outcome, and a mono disposition coloured by its key. A `lg-margin-rule` red vertical runs down its left edge and `lg-ticks` graduated measure ticks (minor every 14px, major every 70px) run down the field edge beside it.

Motion: rows settle in sequence (`translateY(6px)` + `opacity 0.35 → 1`, 620ms, `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 90ms per row), then the disposition tick wipes in via `clip-path` 380ms behind it. Both animate from an already-legible default, so the register reads with JS off, and both are disabled entirely under `prefers-reduced-motion`.

### Browser Surfaces
Not optional, and not left to the browser: selection is foil-on-field, `accent-color` is foil, the caret on the field is foil, the field scrollbar is a thin translucent-foil thumb, and the focus ring on the field is a squared `2px` foil outline at `3px` offset.

## Do's and Don'ts

### Do:
- **Do** put the artifact in the first viewport. The register, the schedule, the record — at full scale, with its own notation, before any explanatory copy.
- **Do** reserve `.lg-foil-surface` for the primary action and the wordmark. Everything else that needs to read as marked uses `StatusKey` or a `QuietAction`.
- **Do** build data blocks from the shared primitives in `app/components/ledger/index.tsx`. Every marketing page composes from them; per-page inline restyling is exactly how the site drifted before.
- **Do** let the section `tone` choose the inks. Use `inkFor` / `ink2For` / `hairFor` rather than hand-picking a colour for a stock section.
- **Do** set every quantity, time, count, and price in `.lg-fig` tabular figures.
- **Do** anchor a block with a red top rule (`2px` primary, `1px` nested) and separate its rows with Hair 2 hairlines.
- **Do** change axis when two data blocks sit in sequence — a `RuledList` followed by a `Band`, never a `RuledList` followed by a `RuledList`.
- **Do** ship materials as produced assets: a real tile, a real ramp with lit and shadowed lips.
- **Do** use real semantic tables and definition lists for tabular content, with a caption and scoped headers.
- **Do** provide a reduced-motion path for every animation, and make the default state the legible one.

### Don't:
- **Don't** add a second foil element to a screen that already has a stamp. Foil on five elements is what destroyed the stamp's meaning once already.
- **Don't** use rule red as an error, alert, or destructive colour on this surface. It is ruling.
- **Don't** round a corner. Radius is 0, including the focus ring on the field.
- **Don't** add a shadow to anything but the foil. No card elevation, no hover lift, no ambient glow.
- **Don't** put an eyebrow, kicker, or `01/02/03` numbering above a heading.
- **Don't** ship a row of same-size icon + heading + text cards, or gradient text, or a sparkline standing in for content.
- **Don't** use a Unicode glyph as a rule, bullet, arrow, or separator. Rules are drawn; icons are inline SVG paths.
- **Don't** introduce a font-size that is not in `typography.scale`, and don't hand-write a `clamp()` for a heading — use `PageTitle` or `SectionTitle`.
- **Don't** set body copy in uppercase or in the condensed display face, and don't set a figure in the body serif.
- **Don't** show the alternating register band below 901px, or let a register entry occupy more than one line below 640px.
- **Don't** merge the `--lg-*` block with the navy/teal/gold `@theme` scales in `app/globals.css`. They serve different surfaces and the split is intentional.
