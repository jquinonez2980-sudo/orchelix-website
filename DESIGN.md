---
name: Orchelix Marketing — The Ruled Record
description: A ruled-record world for the marketing site — warm paper, near-black night bands, graphite ruling, one flat royal-blue stamp, one wide light display face.
colors:
  field: "#F5F1EA"
  field-2: "#EFE9E0"
  field-3: "#E6DFD4"
  stock: "#F8F4ED"
  stock-2: "#EFE9E0"
  foil: "#3657B1"
  foil-lift: "#4B72DC"
  foil-ink: "#FFFFFF"
  rule: "rgba(18, 20, 26, 0.45)"
  rule-quiet: "rgba(18, 20, 26, 0.16)"
  rule-text: "#12141A"
  tick-text: "#12141A"
  tick: "#ADB5BD"
  ink: "#12141A"
  ink-2: "rgba(18, 20, 26, 0.72)"
  ink-3: "rgba(18, 20, 26, 0.62)"
  hair: "rgba(18, 20, 26, 0.12)"
  hair-2: "rgba(18, 20, 26, 0.07)"
  ink-on-stock: "#12141A"
  ink-on-stock-2: "rgba(18, 20, 26, 0.72)"
  night-field: "#14171C"
  night-ink: "#E8EAEE"
  night-ink-2: "rgba(232, 234, 238, 0.84)"
  night-ink-3: "rgba(232, 234, 238, 0.74)"
  night-foil: "#6484DB"
  night-foil-ink: "#12141A"
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
    fontSize: "clamp(1.9rem, 4.6vw, 3.5rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "0.07em"
    fontVariation: "wdth 125"
    textTransform: "uppercase"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.7vw, 2.4rem)"
    fontWeight: 300
    lineHeight: 1.12
    letterSpacing: "0.07em"
    fontVariation: "wdth 125"
    textTransform: "uppercase"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.1875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.06em"
    fontVariation: "wdth 125"
    textTransform: "uppercase"
  body:
    fontFamily: "Literata, Georgia, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.13em"
    fontVariation: "wdth 125"
    fontFeature: "\"tnum\" 1"
    textTransform: "uppercase"
  action:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "0.12em"
    fontVariation: "wdth 125"
    textTransform: "uppercase"
rounded:
  none: "0px"
  panel: "18px"
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
    letterSpacing: "0.16em"
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
    size: "0.6875rem"
    letterSpacing: "0.12em"
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

> **Scope.** This document records the marketing surface: `/`, `/pricing`, `/solutions`, `/how-it-works`, `/industries`, `/about`, `/book`, `/try-esmi`, `/privacy`, `/terms`, plus shared `Nav` and `Footer`.  
> **Operate:** `/dashboard/*` uses the same graphite/magenta tokens via `.lg-app` remaps and is an Operate surface (denser, review/coach verbs) — not a second brand.  
> **AcumenAI is retired (2026-09-11).** `/acumen`, `/es/acumen`, and the `/app` operator console were removed and 301 to `/solutions`. The navy/gold finance language that was allowed "for that product only" has no remaining home — do not reintroduce it anywhere.
>
> **The token file is deliberately split.** `app/globals.css` holds three unrelated systems in one file: the Tailwind `@theme` navy/teal/gold scales and their `:root` aliases (product surfaces — dashboard, forms, legacy marketing routes), the `--lg-*` block (this system), and the `.esmi-dark` block (`/try-esmi` only). Do not "unify" them. The `--lg-*` block is additive and is the only source of truth for anything documented here.
>
> **Two files are exempt from the detector, and the exemption is recorded here because it cannot be recorded where it is configured.** `.impeccable/config.json` holds `detector.ignoreFiles` as bare globs with no room for a reason, so: `app/api/contact/route.ts` and `app/api/leads/meta/route.ts` are transactional **email** templates, not web UI. Inline hex, table layout, and rounded corners are the only styling mail clients render reliably, and a design system for the web surface has no business governing them. They accounted for 41 of the 74 findings outstanding at the end of the conversion. Nothing else is ignored; every remaining finding is a real one on an unconverted surface.
>
> **The site is mostly converted; residual mixed systems remain.** Core marketing routes (`/`, `/pricing`, `/solutions`, `/how-it-works`, `/industries`, `/about`, `/book`) and shared chrome use this system. Residual mixed systems: `/get-started` (navy/teal wizard), product dashboard under `.lg-app` remaps (Operate surface, not a marketing twin), blog article bodies, and privacy/terms. Anything new on public routes should be built in this system.

## Current direction (2026-09-11) — read this first

This document was written across three rebrands and much of it still describes the earlier ones. **Where anything below conflicts with this section, this section wins,** and the conflicting passage is history rather than instruction.

- **Ground.** Warm paper (`#F5F1EA` and its two steps), not white. Near-black **night** bands (`#14171C`) alternate with it: `night` is the sixth tone on the `Section` ladder, and it works by redeclaring the whole `--lg-*` family on the band, so `inkFor` / `ink2For` / `ink3For` / `hairFor` return the same variable names on every tone and the cascade resolves them. No call site picks a colour. Night lands on the homepage hero, the proof band, and the closing CTA; `/book` and the `/missed-calls` lead form stay light.
- **Accent.** One royal blue (`#3657B1` on paper, `#6484DB` on night). The stamp is a **flat** fill — the eight-stop metallic ramp, its lips, and its tinted drop shadow are retired, because a shimmering glowing button read as a game control. White on the paper stamp is 6.42:1; ink on the night stamp clears 4.5:1.
- **Type.** One display voice: **Archivo at the top of its width axis (`wdth` 125), light, uppercase, tracked open.** It replaced condensed heavy caps with negative tracking. All of it comes from tokens in `:root` — `--lg-stretch` (125%), `--lg-w-display` (300), `--lg-w-title` (400), `--lg-w-ui` (500), `--lg-track-display` (0.07em), `--lg-track-title` (0.06em), `--lg-track-ui` (0.16em), `--lg-track-label` (0.2em). Nothing hand-sets a width, a display weight, or a display tracking.
- **One family on the marketing surface.** `body[data-surface="site"]` (set by `app/[locale]/layout.tsx` through `Shell`) retargets `--font-mono` to Archivo, so the label voice, keys, and figures set in the same wide face — tabular via `"tnum"`. Azeret Mono remains only on the app surfaces (`/dashboard`, `/try-esmi`, onboarding), which never carry that attribute.
- **The lockup.** `app/components/sections/Lockup.tsx`: the helix mark as artwork, the name as **live text in the hero wordmark's setting** (Archivo, `--lg-stretch`, `--lg-w-display`, tracking 0.14em; the tagline at `--lg-w-ui`, 0.34em). Nav and Footer both render it. The old `orchelix-logo.svg` set its name in SVG `<text>` Inter, which an `<img>` cannot load, so it rendered in whatever system sans the visitor had.
- **Retired devices — do not reintroduce.** Registration plus marks around titles (`PlusFrame`), the right-edge tick rail, the live clock under the hero, the four-square Menu icon, the DAY/NIGHT control, the foil shimmer and glow, the Inscription WebGL scene on the homepage (unmounted; `app/inscription/` is on disk and unimported). Together they read as a game HUD, which is the one thing the owner has said this site must not look like.
- **Nav.** The six destinations sit in the bar from 1280px (Spanish from 1440px — its labels run ~180px longer); the Menu button hides where they arrive, and the phone number leaves the bar there (it is in the footer). Below that, the drawer.
- **Stamps wrap.** `Stamp` is `max-w-full` with a balanced wrap, because at the wide setting long Spanish labels run past 400px and a nowrap button pushed pages sideways at 375px.

## Overview

**Creative North Star: "The Ruled Record"**

The interface *is* the audit trail. The world is a ruled record: a white field, ruled off in graphite, stamped once in magenta, and filled with rows of tabular figures. Nothing decorative is added on top of the record — the record itself is the composition. The first viewport does not introduce the product with a centered headline and three identical cards; it puts the call register on the page at full scale, with its own column heads, its own notation legend, and a foot rule tallied from the rows above it.

Density is high and deliberate. Rows are close-set, labels are small caps in mono, and the space between sections is generous so that each ruled block reads as a page in a book rather than a card in a feed. The palette is one white field with two barely-separated tonal steps and a single accent. Structure is drawn entirely in graphite at varying alpha — the ruling that used to be red is now the ink's own colour, held back — so colour appears in exactly one place: the magenta stamp, scarce enough that its appearance means "this is the action."

**The 2026-08-10 rebrand inverted this world and the inversion is load-bearing.** It ran dark for its first life: a navy buckram field carrying a shipped SVG cloth weave, red column ruling, and a gold foil stamp. All three are gone. The weave was tuned against dark grounds and read as a grey smudge on white, so `.lg-cloth` and its `-2` / `-3` variants are now flat fills that keep their names only because components reference them. Red retired because the brand has one accent and does not spend it on dividers. What survived is the *structure* — the ruling, the density, the registers, the closed ramps — which is the evidence that this world was never really about being dark.

The inversion is load-bearing **for the marketing surface**. The homepage Inscription scene carries a scoped night palette (see The Inscription Exemption under Motion); that is a second light on the same world, not a return to the dark brand. It reaches `/` and `/es` only, through `[data-inscription]`, and no other route can see it.

The build refuses two specific things, and the refusal is durable: the category's centered hero with three identical product cards, and its opposite, the cream editorial broadsheet. Neither one puts the artifact on the page. Note that going light did **not** license the second one; a white field ruled in graphite is not a broadsheet.

**Key Characteristics:**
- Flat warm-paper field in three near-adjacent tonal steps, alternating with near-black night bands — no texture, no gradient, no material tile.
- Graphite ruling at low alpha as the primary structural device; it is a rule, not a warning.
- One flat royal-blue stamp reserved for the primary action, and for nothing else.
- Zero corner radius everywhere; every edge is a ruled edge.
- Archivo wide light caps (display, labels, figures) / Literata body. Azeret Mono on app surfaces only.
- Registers, bands, and rate schedules built as real ruled tables and definition lists.

## Colors

One white field in three near-adjacent tonal steps, a graphite ink that also draws every rule, and exactly one colour of consequence: the magenta stamp.

### Primary
- **Stamp Magenta** (`#B7135A`): The single accent. It marks the primary action ("Book a pilot"), plus the system-level accents that read as notation rather than decoration: the `BOOKED` disposition, the `ES` language marker, and the headline price in the rate schedule. It also carries every browser surface — selection background, caret, scrollbar thumb, focus ring. Measures 6.45:1 on the field, so it is safe as text as well as as a fill.
- **Stamp Lift** (`#D42670`): The lit step, used inside the metallic ramp and for hover brightening. Never used as a flat fill.
- **Stamp Ink** (`#FFFFFF`): The white that sits *on* the stamp. 6.45:1 against the magenta; the body ink would be 2.10:1 and fail outright, which is why this is a token and not an inherited value. It is the only text colour permitted on a stamp surface.

### Neutral
- **Field** (`#FFFFFF`): The dominant ground. Flat — no tile, no gradient, no texture.
- **Field 2** (`#F1F3F5`) / **Field 3** (`#E4E7EB`): Adjacent sections step up one tone to separate without a divider. Field 3 is the closing tone. The steps are deliberately narrow; separation here is a whisper, and the ruling does the rest.
- **Ledger Stock** (`#F1F3F5`) / **Ledger Stock 2** (`#E4E7EB`): Retained as names for sections meant to be read at length. In the light world they resolve to the same values as Field 2 and Field 3 — the dark world's dramatic paper-inversion no longer exists, because the whole surface is already paper.
- **Ink** (`#2E323E`): Graphite. Primary text, and the source of every rule in the system. 12.79:1 on the field.
- **Ink 2** (`rgba(46, 50, 62, 0.68)`) / **Ink 3** (`rgba(46, 50, 62, 0.48)`): Body copy and label/meta text respectively. See the Ink Floor Rule — Ink 3 does not currently clear the text floor.
- **Rule** (`rgba(46, 50, 62, 0.55)`) / **Rule Quiet** (`rgba(46, 50, 62, 0.18)`): The ledger's ruling, at full and quiet strength. Full for section top-rules and the margin rule down the register; quiet for the verticals between columns. The quiet step is what makes a table read as a ledger instead of a grid.
- **Hair** (`rgba(46, 50, 62, 0.14)`) / **Hair 2** (`rgba(46, 50, 62, 0.08)`): Horizontal row separators. Hair for chrome edges (nav bottom, column-head rule), Hair 2 for entry rows.
- **Tick** (`#ADB5BD`): The inert mark. One job — the disposition swatch that is not `BOOKED`. A mark, never text (2.07:1).
- **Ink on Stock** (`#2E323E`) / **Ink on Stock 2** (`rgba(46, 50, 62, 0.68)`): The ink pair for stock-tone sections. Now identical to Ink and Ink 2, because the stock tones are no longer an inversion. Section tone still selects them automatically via `inkFor` / `ink2For` / `hairFor`; never hand-pick an ink for a stock section.

> **Retired tokens.** `--lg-field-vivid` still exists in `:root` but resolves to Field 3 and is a dead alias — the "one section reads as lit" idea depended on a gradient the rebrand removed. `rule-text` and `tick-text` still exist and both resolve to `#2E323E`; they are kept so the disposition map does not have to change shape, not because they are two colours. None of the three is a palette entry. Do not reach for them in new work.

### Named Rules

**The Stamp Scarcity Rule.** The stamp surface (`.lg-foil-surface`) marks the primary action. Nothing else. A finish review in the dark world found the accent on five elements — including a 10px chip — and the verdict was that the stamp had stopped meaning anything; the rebrand to a single-accent palette makes that failure cheaper to repeat, not harder. Status and disposition markers use `StatusKey`; secondary actions use `QuietAction` or an outline. If a new surface needs a second magenta thing, the answer is a keyed swatch, not a second stamp. (The class keeps the `foil` name from the dark world. The material is a magenta ramp now; only the token name is inherited.)

**The Marks-vs-Text Rule.** `rule`, `rule-quiet`, `hair`, `hair-2`, and `tick` are *marks* — rules, borders, and the small drawn swatches — where contrast is not a text requirement. Measured as text they run 1.29:1 to 3.27:1, all under the floor, and none of them may carry a word. In the dark world this rule was paired with lighter `-text` steps of the same hues; that pairing is gone, because status words are now simply set in `ink`. The base value draws; ink is read.

**The Ink Floor Rule.** Every ink that carries a word must clear 4.5:1 on the tone it sits on. Fixed 2026-08-12: alphas raised from the dark-world ladder (`0.68` / `0.48`) to values that clear AA on the light field.

| Value | Role | Alpha | Status |
| --- | --- | --- | --- |
| `ink-2` (`rgba(46,50,62,0.80)`) | body / secondary | 0.80 | Clears AA on field and field-3 |
| `ink-3` (`rgba(46,50,62,0.72)`) | label / meta | 0.72 | Clears AA on field |

Do not reintroduce sub-floor alphas. New ink steps are alphas of Graphite `#2E323E` that still pass 4.5:1 on the lightest ground they sit on.

**The Status Scale (product surface).** `/dashboard` carries real state that has to be readable at a glance in a table. With the palette down to one hue, colour alone can no longer separate four states: `foil` marks attention, pending, or the booked "AI moment," and everything else is held apart by ink tier, border weight, and the label itself. `Badge.tsx` is the single place these semantics are defined — green/red fills were removed 2026-08-12. Call outcomes bridge to the marketing register dispositions (`BOOKED` / `ROUTED` / `ANSWERED` / `CLOSED`) via labels in `CallLog.tsx` `OUTCOME_STYLE`.

**The Ruling Is Structure Rule.** The ruling is a structural colour. It draws column verticals, section top rules, ticks, and separators. It never carries error, danger, destructive, or "urgent" meaning on this surface. This survived the rebrand intact and got stronger: the ruling is now the ink's own colour at low alpha, so there is no longer even a distinct hue that could be mistaken for an alert. On the marketing surface an error is drawn with a device — a margin annotation of a heavy ink rule and a mono label — not by borrowing the rule; `/book` and `/try-esmi` both do this.

**The Foreign Mark Rule.** A third party's brand is not ours to restyle, and the conversion stops at its edge. The sign-in surfaces' "Sign in with Google" buttons carry Google's own dark button spec — ground `#131314`, border `#8E918F`, label `#E3E3E3` — because Google's branding guidelines permit only light (`#FFFFFF`), neutral (`#F2F2F2`), or dark (`#131314`) grounds beneath the multicolour mark. The four logo colours (`#4285F4`, `#34A853`, `#FBBC05`, `#EA4335`) are likewise fixed. These seven values are the only colours on a converted surface that are outside this palette on purpose; the detector is right to flag them and this note is the answer. Any future third-party mark gets the same treatment: use their sanctioned form, document it here, and change nothing else.

**The Tinted Ink Rule.** No neutral gray text. Every ink is Graphite `#2E323E` or an alpha of it — a blue-leaning near-black, never a true neutral. This rule outlived the field it was written for: it used to mean "tint toward the field's blue-white," and now means "one graphite, composited." A new ink value is an alpha of `ink`, not a new hex.

### Orphaned colour (closed)

The rebrand swept the palette but left six values behind in the dark world's gold and red. All six were closed on 2026-08-10, in the commit after the one that recorded them. They are kept here as the worked example of how this class of bug is fixed, because the palette will move again someday:

| Where | Was | Now |
| --- | --- | --- |
| **Skip link** (`.lg-skip`) | `#2A1D02` on `--lg-foil` — **2.55:1** | `--lg-foil-ink` — **6.45:1** |
| `/app` primary buttons (`.lg-app .bg-teal-500`) | same pairing, **2.55:1** | `--lg-foil-ink` |
| `.lg-ticks` — measure ticks beside the register | retired red at `0.85` / `0.5` | `--lg-rule` / `--lg-rule-quiet` |
| `.lg-app .bg-rose-50` | `rgba(180, 52, 42, 0.12)` | `--lg-hair` |
| `.lg-stamp:active` — the pressed lips | gold-brown `rgba(74,48,4)` / `rgba(58,38,2)` | the accent's own `rgba(50,4,22)` family |
| `:focus-visible` | `border-radius: 4px` | `0` |

**The skip link was the serious one** — an accessibility control that PRODUCT.md names as a baseline, failing WCAG AA at 2.55:1 because the ground under it was recoloured gold → magenta and the brown label was left behind. **The lesson is that recolouring a ground is never a one-line change:** every value that was chosen *against* that ground has to move with it, and the ones that hurt most are the ones nobody looks at — a skip link is invisible until someone tabs into it.

Two rules for the next palette move. Every replacement above resolves to a **documented token**, not a fresh alpha picked to match the old value — that is what keeps a fix from becoming the next generation of drift. And nothing here was ever added to the frontmatter to quiet the detector; the detector was correct at every step and the code is what moved.

## Typography

**Display Font:** Archivo (variable, `wdth` axis) with `ui-sans-serif, system-ui, sans-serif`
**Body Font:** Literata with `Georgia, serif`
**Label Font:** Archivo (same family, wide) on the marketing surface; Azeret Mono with `ui-monospace, monospace` on app surfaces only

**Character:** Wide, light, open-tracked caps — calm and automotive rather than stamped and dense — carry every heading, label, and action; a screen serif gives body copy document texture rather than UI gloss. (Until 2026-09-11 this read "condensed grotesque caps" plus a tabular mono; that pairing was retired as HUD-like.) All three were chosen specifically to sit outside the usual defaults — no Inter, no system stack, no geometric-sans-plus-one-serif reflex.

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
clamp(1.9rem, 4.6vw, 3.5rem)     Display  — PageTitle, the page-opening headline
clamp(1.5rem, 2.7vw, 2.4rem)     Headline — SectionTitle, every section title
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
- **Display** (Archivo 300, `wdth` 125, `clamp(1.9rem, 4.6vw, 3.5rem)`, line-height 1.08, tracking `0.07em`, uppercase): Page-opening headlines only, one per page, `max-width` 15–18ch with `text-wrap: balance`. The clamp came down from 2.5–4.25rem with the move to wide light caps: they read larger at the same size, and a long word at 125% width has to fit 335px.
- **Headline** (Archivo 300, `wdth` 125, `clamp(1.5rem, 2.7vw, 2.4rem)`, line-height 1.12, tracking `0.07em`, uppercase): Section titles, `max-width` ~20ch. Always via `SectionTitle`; a section title is never hand-set.
- **Title** (Archivo 400, `wdth` 125, 1.0625 / 1.1875 / 1.25rem, tracking `0.06em`, uppercase): Entry headings inside a ruled list. `1.5rem` is reserved for the one headline figure per column in the rate schedule.
- **Body** (Literata 400, 0.875 / 0.9375 / 1 / 1.0625rem, line-height 1.62): All prose. Measure is capped at 58ch by default, 40–60ch in practice. Prose links do not use a browser underline — they carry a 1px foil `text-decoration-color` at `0.22em` offset.
- **Label** (Archivo 400 at `wdth` 125 on the marketing surface — Azeret Mono on app surfaces — 0.625 / 0.6875rem, tracking `0.11em`–`0.2em`, uppercase): Column heads, terms in a `RuledList` or `Band`, register cells, meta, legend text, the foot-rule tally, and the skip link.
- **Action** (Archivo 500, `wdth` 125, 0.6875 / 0.75 / 0.8125 / 0.875 / 0.9375 / 1rem, tracking `0.12em` on a stamp, `0.16em` in the nav stamp, `0.12em` on nav links, uppercase): Every button and link that is an action.

### Named Rules

**The Tabular Figures Rule.** Any number that is a quantity, a time, a count, or a price gets `.lg-fig` — tabular figures (`"tnum" 1`), which on the marketing surface are Archivo's and on app surfaces are Azeret Mono's. A number set in the body serif is a word, not a figure. Columns of numbers must align on the digit.

**The Closed Ramp Rule.** The type ramp is closed: eleven fixed steps and two clamps, enumerated in `typography.scale` and in "The ramp" above. Above `1.5rem` type is fluid and comes from `PageTitle` or `SectionTitle` — a heading is never hand-set with a new clamp, because that is how six near-duplicate headline sizes got into a build that has two headline roles.

**The Wide Light Caps Rule.** Display, headline, title, label, and action are all uppercase Archivo at `--lg-stretch` (125%), light to medium weight, tracked open — tracking opens further as type gets smaller. Never condensed, never heavier than 500, never negative tracking. Body copy is never uppercase and never set in the display face. There is no sentence-case display size in this system. (Replaces the Condensed Caps Rule, 2026-09-11.)

**The No Kicker Rule.** Headings stand alone. No eyebrow, no kicker, no small-caps label above a heading, no `01 / 02 / 03` section numbering. If a section needs context before the heading, it belongs in the prose after it.

## Layout

Every page is a stack of full-bleed `Section` bands, each in one of five tones (`field`, `field-2`, `field-3`, `stock`, `stock-2`). Tone changes are the only section divider; there is no horizontal rule between sections. Inside a section the content sits in a `1320px` max-width container with `20px / 32px / 40px` responsive gutters (`px-5 sm:px-8 lg:px-10`) and vertical padding of `80px` rising to `112px` at `lg` (`py-20 lg:py-28`), or `56px / 80px` in `tight` mode.

Column grids are asymmetric on purpose — the home hero runs `0.72fr / 1.28fr` so the register is wider than the offer copy, and pricing runs `1fr / 0.85fr`. Column gap is a constant `3.5rem` (`gap-x-14`); row gap runs `2.5rem`–`3.5rem`. Content blocks are anchored to a top rule (`2px solid` `rule` graphite for a section-level register, `1px` for a sub-list) and separated internally by `1px` hairlines. Nothing is boxed.

Breakpoints observed in the build: `640px`, `900px`/`901px`, `1023px`/`1024px`, and Tailwind's `sm`/`lg`. Zero horizontal overflow at 375px and 1905px.

### Named Rules

**The Register Degradation Rule.** The call register has three states and they are not interchangeable. Above 900px: five ruled columns with `rule-quiet` verticals and a desktop-only alternating band (`min-width: 901px`, `rgba(46,50,62,0.028)`). Between 641 and 900px: verticals retire, each entry becomes two lines (reason on the first; outcome and disposition sharing the second), and the outcome/disposition column heads hide. At 640px and below: one ruled line per entry, and the outcome column is dropped entirely so the reason and disposition survive. The reason at every step is that the record must read as a continuously ruled run, not as a stack of blocks — which is also why the alternating band never ships below 901px.

**The Register Leads Rule.** Below 1024px the hero grid flattens to a column and the register is ordered *first* (`.lg-hero-register { order: -1 }`). The opening screen is the artifact at every width; the offer copy follows it.

**The Two Devices Rule.** `RuledList` reads DOWN the page — label left, value right, one entry per hairline-separated row. `Band` reads ACROSS it — label stacked above value, verticals between columns only, no horizontal separators. They are formally distinct and must stay that way. Stacking two `RuledList`s in sequence flattens their meaning into one undifferentiated run; if a second data block follows a `RuledList`, it changes axis.

## Elevation & Depth

There are no elevation shadows in this system. Nothing floats, nothing is lifted, and there are no cards. Depth comes from two places: the tonal step between adjacent field tones, and the pressed edges of the stamp. (It used to come from three — the cloth tile's physical weave was the middle term, and the rebrand removed it.) The only `box-shadow` in the world is on the stamp, and it is describing a physical stamping — a bright top lip, a dark bottom lip, a hairline of contact shadow, and a tight drop that reads as the block sitting *in* the surface rather than above it. On `:active` the whole shadow inverts to an impressed state and the block translates down 2px.

### Shadow Vocabulary
- **None.** The stamp's relief and impressed shadows were retired with the metallic ramp (2026-09-11). The stamp is a flat fill; `:active` keeps only the 2px `translateY` of Press.

### Named Rules

**The Produced Materials Rule.** A material must be manufactured, not named. (The stamp no longer claims to be a material: since 2026-09-11 it is a flat accent fill, and the rule now governs illustrations and photography only — remove a material that stops working rather than ship a washed-out version.) An earlier pass used a flat rectangle and it was rejected as a compliance token rather than a shipped material; that judgment stands for any future material. What changed at the rebrand is that this rule now governs exactly one material instead of two. The cloth tile was the other — a real tiled SVG carrying its own alpha — and it was retired rather than recoloured, because the same alpha-composited threads that read as grain on navy read as a grey smudge on white. **Retiring a material is in-rule; faking one is not.** The honest move when a produced material stops working on a new ground is to remove it, not to ship a washed-out version that satisfies the vocabulary without doing the work.

**The No Float Rule.** Surfaces do not lift. There is no ambient shadow, no hover elevation, no card. Hover changes a rule, a brightness, or a fill — never a `translateY` on a container.

## Motion

**Creative North Star: "The Record Being Written"**

Motion in this world is *inscription*. A ledger's things get ruled, struck, settled, and stamped — nothing floats, fades ambiently, or glows. This is the same refusal the Elevation section makes about shadow, extended to time: the record is the composition, so motion may only show the record being made.

That produces the two things the category's motion never has. Everything is **triggered** — by arrival in the viewport, by a hover, by a click, by a real network event — and nothing loops. And everything animates **from an already-legible default**, so the page reads with JS off, with motion suppressed, and in the frame before any animation starts.

### The four verbs

Every animation on this surface is one of these four. A fifth is a change to this document, not a decision a page gets to make on its own.

| Verb | What it does | Properties | Duration | Curve |
| --- | --- | --- | --- | --- |
| **Rule** | a line draws in from one origin | `transform: scaleX` | `--lg-dur-rule` 260ms | `--ease-emphasized` |
| **Settle** | a row lands into place from 6px | `transform: translateY`, `opacity` | `--lg-dur-settle` 380ms | `--ease-emphasized` |
| **Strike** | a mark is revealed left-to-right | `clip-path: inset()` | `--lg-dur-strike` 300ms | `--ease-emphasized` |
| **Press** | the stamp impresses into the cover | `transform: translateY`, `box-shadow` | `--lg-dur-press` 120ms | `--ease-standard` |

Plus one state duration — `--lg-dur-state` (180ms, `--ease-standard`) — for hover, focus, and toggles, and `--lg-stagger` (45ms) between siblings in a settling run.

Keyframes: `lg-settle`, `lg-strike`, `lg-rule-draw`. Utility classes: `.lg-strike`, `.lg-pending-rule`. `.lg-quiet::after` and `.lg-summary::before` are Rule, written before the token existed.

### Named Rules

**The Closed Vocabulary Rule.** Four verbs, three durations, one stagger, two curves — closed the same way the type ramp is closed. A motion value that is not in the table above is drift, not a decision. In particular there is **no new easing curve**: `--ease-emphasized` (`0.16, 1, 0.3, 1`) is within a rounding error of the canonical strong ease-out, and a second scale beside it would be a defect. `ease-in` is never used on this surface — it starts slow and delays the exact moment the user is watching.

**The Nothing Loops Rule.** No animation on a functional element repeats forever to assert a system state. `infinite` on a state indicator — "the AI is thinking," "it's listening," "it's loading" — is a claim that stays on screen after it stops being true, which is a lie in motion the same way a fabricated typing cadence is a lie in copy. A state that persists is drawn as a held mark, not as a breathing one: the chat's pending state is a foil rule that draws once in 260ms and holds, because a line held open in a ledger is a real thing and a pulsing dot is not. Three loops were removed on 2026-08-08 — `lg-typing` (a three-dot "AI thinking" indicator and a blinking caret), `esmi-wave-idle` (a waveform breathing on an untouched page), and `esmi-spin` (a tool spinner that repeated a label already written beside it). The waveform's remaining animation is gated on a request actually being in flight.

**The rule does not reach decoration.** It was never a claim that a marketing illustration has to hold still — every example above is a UI element mimicking a state it may not be in. Fourteen `infinite` loops shipped on 2026-08-11 across four illustrations: the solutions-page particle field drifting, the how-it-works and industries diagrams pulsing signal along their real lines, and five cut pieces of the about-page artwork breathing in and out. None of them assert anything about the product's state — a particle field that stopped moving wouldn't mean the network went offline, and a cube that stopped breathing wouldn't mean a pilot failed. They're closer to grain in a photograph than to a progress indicator, and the exemption is exactly that narrow: decorative motion on a marketing illustration that carries no claim about system state may loop. Anything wired to a real state — loading, listening, sending, thinking — still resolves once and holds, per the rule above.

**The Legible Default Rule.** Every verb animates *to* the resting state, never *from* invisibility. Remove the animation — by reduced motion, by JS being off, by an observer that never fires — and the final state is what's already on the page. A page whose content is gated behind an animation is broken, not animated.

**The Reduced Motion Rule.** Fewer and gentler, not zero. Transform- and clip-based movement is dropped so nothing travels or wipes; colour and opacity transitions that aid comprehension stay. Every verb ships its `prefers-reduced-motion` path in the same commit as the verb.

**The Real Cadence Rule.** Where motion represents something happening, it is driven by the real event and not by a timer that imitates one. `/try-esmi` strikes each word group as the backend's SSE stream delivers it, so the pace on screen *is* the model's pace — which is also why there is no "skip" control: there is no artificial queue to skip past. A simulated typing cadence would be a fabrication in motion, and the honesty standard does not stop at copy.

### The Inscription Exemption (homepage only) — RETIRED

> Retired 2026-09-11: the scene is no longer mounted on `/` or `/es`, and the DAY/NIGHT control it drove is gone. `app/inscription/` stays on disk, unimported. Kept below as a record of what the exemption allowed; it grants nothing today.

The homepage renders a pinned WebGPU/WebGL scene — an optical glass ledger volume written by voice filaments across one night. It is scoped to `/` and `/es` via `[data-inscription]` and reaches no other route.

This is an elevation of the Ruled Record into space, not a relaxation of it. The record is still the composition; the scene renders the same register the DOM states, under two lights.

**The scene may:**

- **Refract and transmit.** Glass is a produced material — manufactured, not named — so it satisfies the Produced Materials Rule rather than escaping it.
- **Hold a gentle continuous presence.** The volume may drift and relight while idle. It asserts no system state, so the Nothing Loops Rule's decorative exemption covers it.
- **Bloom on exactly two things:** the voice filament, and the stamp moment. Nowhere else, at no other time.
- **Write rows on scroll.** Beats are triggered by scroll position, never by a timer imitating one — the Real Cadence Rule applies unchanged.
- **Carry a second, night palette,** scoped to the homepage.

**Still forbidden, unchanged:**

- **No ambient glow, float, or decorative elevation on any DOM surface.** The No Float Rule is untouched: the scene sits *behind* the record and never lifts it. A floating control panel over the scene is a card and is out of rule — this is why the day/night control is a ruled segment in the nav and not a fixed pill.
- **Magenta stays scarce.** In the scene it appears on the die and nothing else; the DOM still gets one stamp per view.
- **No new motion verb for DOM elements.** Rule, Settle, Strike, and Press remain closed. The scene's motion is not a fifth verb — it is scenery.
- **No content may be gated behind the scene.** The Legible Default Rule governs: the page must read complete with the canvas absent, failed, or refused.
- **Reduced motion and low-tier devices receive a still frame,** not a degraded animation.

## Shapes

Zero radius, everywhere. Corners are square on the stamp, on the mobile menu button, on section edges, on table cells, and on the focus ring — the global `:focus-visible` and `.lg-field :focus-visible` both set `border-radius: 0` so the ring squares off against the register's ruling instead of rounding over it. There is no rounded corner anywhere on the field — the last two, an 8px scrollbar thumb and a 4px global focus ring, were both removed. Radius 0 is literal, not approximate.

**`panel` (`18px`) is the one exception, and it is not this world's.** It belongs to the `/try-esmi` glass chat panel — a translucent, blurred pane that is a deliberate material treatment on a surface the Scope note above explicitly puts outside this document. It is recorded in the `rounded` scale anyway for one reason: the value lives in the shared `app/globals.css`, so anything reading that file has to be told the difference between a chosen shape and drift. Recording it is not permission to use it. **Nothing on the marketing surface may carry `panel`** — a rounded corner here would be the first soft edge in a world whose entire form language is the ruled edge, and the `/try-esmi` panel earns its radius by being glass, which the marketing surface has none of.

The recurring silhouette is the ruled block: a heavy top rule in `rule` graphite (`2px` for a primary register, `1px` for a nested one), a run of rows separated by hairlines, and — where it is a real tally — a second heavy rule closing the foot. Verticals are `1px` `rule-quiet` between columns. Every rule in this world is a drawn CSS border, gradient, or element; Unicode box-drawing characters, bullets, and glyph separators are not used. Icons are inline SVG paths (the nav toggle is the only one).

## Components

### Buttons

**The Stamp** — the primary action, and the only filled control in the system.
- **Shape:** Square (0 radius).
- **Primary:** Flat `--lg-foil` fill (royal blue; `--lg-night-foil` on night bands), label in Foil Ink, Archivo 500 at `wdth` 125, `0.9375rem`, tracking `0.12em`, uppercase, padding `0.95rem 1.7rem`, `max-width: 100%` with a balanced wrap. The nav variant is `.lg-nav__stamp` (`0.75rem`, tracking `0.16em`, padding `0.6rem 1.05rem`; `0.625rem` / `0.08em` under 480px).
- **Hover:** `filter: brightness(1.1)` over 120ms. No shimmer, no glow.
- **Active:** `translateY(2px)`, no shadow. The stamp presses in.
- **Quiet action (secondary):** Text in ink, Archivo 500 at `wdth` 125, tracking `0.04em`. A 1px foil rule sits 3px under the baseline and draws in from the left on hover (`scaleX(0) → 1`, 300ms, `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Reduced motion:** All stamp and quiet-action transitions are suppressed under `prefers-reduced-motion: reduce`.

### Navigation
- Sticky header on the paper field with a `1px` hair bottom border (rule-strength once scrolled), `1320px` container.
- The lockup (`Lockup.tsx`): helix mark as artwork, name as live Archivo text in the hero wordmark's setting. Mark 40px tall (32px under 480px, where the tagline drops).
- Links: Archivo 500 at `wdth` 125, `0.6875rem`, tracking `0.12em`, uppercase, in Ink 2, `1.25rem` apart, with the `QuietAction` underline on hover. In the bar from 1280px (English) / 1440px (Spanish); in the drawer below.
- The stamp is visible at every width. The phone number shows in the bar only below the link breakpoint (from 900px); where the links are in the bar it lives in the footer.
- Mobile: an outlined square toggle drawing two plain rules (an X when open), opening a Field-2 drawer. It hides wherever the links are in the bar.

### Lists and Data Blocks
- **RuledList** (`<dl>`): graphite top rule, rows of label-left (mono label, Ink 3) and value-right (Literata, ink), `0.8rem` vertical padding, hairline between rows. Reads down the page.
- **Band** (`<dl>`): graphite top rule, 2 → 3 → 5 responsive columns, label stacked above value, `rule-quiet` verticals *between* columns only (the first cell of every wrapped row is never ruled off from nothing). Reads across the page.
- **EntryList**: a `2px` graphite top rule over stacked `<article>` rows, each an uppercase entry title with optional mono meta right-aligned on the same baseline, and a 60ch prose paragraph beneath.
- **StatusKey**: a 14×2px drawn swatch in foil or ink, followed by a 10px mono uppercase label in the same colour. With one accent left, the key distinguishes states by the label, not by four hues. This is the system's status marker — it replaces every chip, pill, and badge.

### Disclosure Rows
`<details>` with the native marker removed. The summary carries a drawn 12px foil rule that grows to 26px when open (220ms, emphasized ease). Rows are separated by Hair 2 hairlines under a `2px` graphite top rule.

### Tables (Rate Schedule)
A real `<table>` with `border-collapse: collapse`, a screen-reader caption, `scope`-ed headers, `min-width: 720px` inside an `overflow-x-auto` wrapper. Column heads sit on a `2px` graphite rule; every column after the first is ruled off with a `rule-quiet` `border-left`; body rows close with a Hair 2 hairline. Values are right-aligned mono; the one headline figure per column steps up to Archivo 700 at `1.5rem` in foil.

### The Call Register (signature component)
The system's defining artifact and the hero of the home page. A `<figure>` with a mono caption on a `2px` graphite rule, a mono column-head row, ten ruled entries, and a foot rule whose tally is *derived from the rendered rows, never typed*. Each entry carries a tabular time, a language marker (foil when `ES`), a serif reason, a mono outcome, and a mono disposition coloured by its key. A `lg-margin-rule` graphite vertical runs down its left edge and `lg-ticks` graduated measure ticks (minor every 14px, major every 70px) run down the field edge beside it.

Motion: Settle, then Strike. Rows land in sequence (`--lg-dur-settle`, `--lg-stagger` per row), and each disposition is struck in via `clip-path` 180ms behind its own row, so the mark lands as the row does. Retimed 2026-08-08 from 620ms/90ms, where ten rows took 1.43s and read as slow rather than precise; the same picture now lands in 785ms. Both animate from an already-legible default, so the register reads with JS off, and both are disabled under `prefers-reduced-motion`.

### Browser Surfaces
Not optional, and not left to the browser: selection is foil-on-field, `accent-color` is foil, the caret on the field is foil, the field scrollbar is a thin translucent-foil thumb, and the focus ring on the field is a squared `2px` foil outline at `3px` offset.

## Do's and Don'ts

### Do:
- **Do** put the artifact in the first viewport. The register, the schedule, the record — at full scale, with its own notation, before any explanatory copy.
- **Do** reserve `.lg-foil-surface` for the primary action. Everything else that needs to read as marked uses `StatusKey` or a `QuietAction`.
- **Do** build data blocks from the shared primitives in `app/components/ledger/index.tsx`. Every marketing page composes from them; per-page inline restyling is exactly how the site drifted before.
- **Do** let the section `tone` choose the inks. Use `inkFor` / `ink2For` / `hairFor` rather than hand-picking a colour for a stock section.
- **Do** set every quantity, time, count, and price in `.lg-fig` tabular figures.
- **Do** anchor a block with a graphite top rule (`2px` primary, `1px` nested) and separate its rows with Hair 2 hairlines.
- **Do** change axis when two data blocks sit in sequence — a `RuledList` followed by a `Band`, never a `RuledList` followed by a `RuledList`.
- **Do** set type through the `--lg-*` type tokens (`--lg-stretch`, `--lg-w-*`, `--lg-track-*`) — never a hand-typed width, display weight, or display tracking.
- **Do** use real semantic tables and definition lists for tabular content, with a caption and scoped headers.
- **Do** provide a reduced-motion path for every animation, and make the default state the legible one.

### Don't:
- **Don't** add a second foil element to a screen that already has a stamp. Foil on five elements is what destroyed the stamp's meaning once already.
- **Don't** use the ruling as an error, alert, or destructive colour on this surface. It is structure.
- **Don't** round a corner. Radius is 0, including the focus ring on the field.
- **Don't** add a shadow to anything, the stamp included. No card elevation, no hover lift, no ambient glow.
- **Don't** reintroduce game-HUD devices: plus/registration marks, tick rails, live clocks or readouts, reticle or corner-square icons, shimmer or foil gradients, glows. The owner's standing direction is that the site must not look like a video game.
- **Don't** put an eyebrow, kicker, or `01/02/03` numbering above a heading.
- **Don't** ship a row of same-size icon + heading + text cards, or gradient text, or a sparkline standing in for content.
- **Don't** use a Unicode glyph as a rule, bullet, arrow, or separator. Rules are drawn; icons are inline SVG paths.
- **Don't** write `infinite` on anything that asserts a system state — a pulsing dot, a blinking caret, a spinner. A persistent state is a held mark, not a breathing one. Decorative motion on a marketing illustration that asserts no state is the one exemption — see the Nothing Loops Rule.
- **Don't** invent a duration or an easing curve. Four verbs, three durations, one stagger, two curves — the vocabulary is closed.
- **Don't** animate anything but `transform`, `opacity`, and `clip-path`, and don't gate content behind an animation.
- **Don't** introduce a font-size that is not in `typography.scale`, and don't hand-write a `clamp()` for a heading — use `PageTitle` or `SectionTitle`.
- **Don't** set body copy in uppercase or in the display face, don't condense or embolden the display face, and don't set a figure in the body serif.
- **Don't** show the alternating register band below 901px, or let a register entry occupy more than one line below 640px.
- **Don't** merge the `--lg-*` block with the navy/teal/gold `@theme` scales in `app/globals.css`. They serve different surfaces and the split is intentional.
