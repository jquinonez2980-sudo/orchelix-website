---
name: Orchelix Marketing — The Ruled Record
description: A ruled-record world for the marketing site — white field, graphite ruling, one magenta stamp, tabular registers.
colors:
  field: "#FFFFFF"
  field-2: "#F1F3F5"
  field-3: "#E4E7EB"
  stock: "#F1F3F5"
  stock-2: "#E4E7EB"
  foil: "#B7135A"
  foil-lift: "#D42670"
  foil-ink: "#FFFFFF"
  rule: "rgba(46, 50, 62, 0.55)"
  rule-quiet: "rgba(46, 50, 62, 0.18)"
  rule-text: "#2E323E"
  tick-text: "#2E323E"
  tick: "#ADB5BD"
  ink: "#2E323E"
  ink-2: "rgba(46, 50, 62, 0.68)"
  ink-3: "rgba(46, 50, 62, 0.48)"
  hair: "rgba(46, 50, 62, 0.14)"
  hair-2: "rgba(46, 50, 62, 0.08)"
  ink-on-stock: "#2E323E"
  ink-on-stock-2: "rgba(46, 50, 62, 0.68)"
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
> **Two files are exempt from the detector, and the exemption is recorded here because it cannot be recorded where it is configured.** `.impeccable/config.json` holds `detector.ignoreFiles` as bare globs with no room for a reason, so: `app/api/contact/route.ts` and `app/api/leads/meta/route.ts` are transactional **email** templates, not web UI. Inline hex, table layout, and rounded corners are the only styling mail clients render reliably, and a design system for the web surface has no business governing them. They accounted for 41 of the 74 findings outstanding at the end of the conversion. Nothing else is ignored; every remaining finding is a real one on an unconverted surface.
>
> **The site is in a mixed state.** `/book`, `/acumen`, `/blog`, `/ai-receptionist`, `/missed-calls`, `/home-services`, `/kitchen-bath`, and the whole `/es` tree still carry the previous light/teal design. They now sit under the new `Nav` and `Footer`, so a visitor can cross from this world into the old one in a single click. Anything new on those routes should be built in this system, not matched to the page around it.

## Overview

**Creative North Star: "The Ruled Record"**

The interface *is* the audit trail. The world is a ruled record: a white field, ruled off in graphite, stamped once in magenta, and filled with rows of tabular figures. Nothing decorative is added on top of the record — the record itself is the composition. The first viewport does not introduce the product with a centered headline and three identical cards; it puts the call register on the page at full scale, with its own column heads, its own notation legend, and a foot rule tallied from the rows above it.

Density is high and deliberate. Rows are close-set, labels are small caps in mono, and the space between sections is generous so that each ruled block reads as a page in a book rather than a card in a feed. The palette is one white field with two barely-separated tonal steps and a single accent. Structure is drawn entirely in graphite at varying alpha — the ruling that used to be red is now the ink's own colour, held back — so colour appears in exactly one place: the magenta stamp, scarce enough that its appearance means "this is the action."

**The 2026-08-10 rebrand inverted this world and the inversion is load-bearing.** It ran dark for its first life: a navy buckram field carrying a shipped SVG cloth weave, red column ruling, and a gold foil stamp. All three are gone. The weave was tuned against dark grounds and read as a grey smudge on white, so `.lg-cloth` and its `-2` / `-3` variants are now flat fills that keep their names only because components reference them. Red retired because the brand has one accent and does not spend it on dividers. What survived is the *structure* — the ruling, the density, the registers, the closed ramps — which is the evidence that this world was never really about being dark.

The build refuses two specific things, and the refusal is durable: the category's centered hero with three identical product cards, and its opposite, the cream editorial broadsheet. Neither one puts the artifact on the page. Note that going light did **not** license the second one; a white field ruled in graphite is not a broadsheet.

**Key Characteristics:**
- Flat white field in three near-adjacent tonal steps — no texture, no gradient, no material tile.
- Graphite ruling at low alpha as the primary structural device; it is a rule, not a warning.
- Magenta reserved for the primary action, and for nothing else.
- Zero corner radius everywhere; every edge is a ruled edge.
- Archivo condensed caps / Literata / Azeret Mono tabular figures.
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

**The Ink Floor Rule.** Every ink that carries a word must clear 4.5:1 on the tone it sits on. Two shipped values do not, and both are inherited from an alpha ladder that was calibrated against a dark ground where the same alphas landed much brighter:

| Value | Where | Measured | Needs |
| --- | --- | --- | --- |
| `ink-3` (`rgba(46,50,62,0.48)`) | label / meta text | **2.71:1** on field | ≈0.72 alpha |
| `ink-2` (`rgba(46,50,62,0.68)`) | body copy on `field-3` | **4.24:1** | ≈0.72 alpha |

`ink-2` on the white field is 4.68:1 and passes. These are recorded as defects, not as steps — the detector is right to keep flagging any new ink below the floor, and the fix is to raise the two alphas rather than to widen the rule.

**The Status Scale (product surface).** `/dashboard` carries real state that has to be readable at a glance in a table. With the palette down to one hue, colour alone can no longer separate four states: `foil` marks attention or pending, and everything else is held apart by ink tier, border weight, and the label itself. `Badge.tsx` is the single place these semantics are defined. Do not reintroduce a green or a red to the product surface to recover the old four-hue scale — that is a design-system change, and it would contradict the single-accent decision the rebrand was for.

**The Ruling Is Structure Rule.** The ruling is a structural colour. It draws column verticals, section top rules, ticks, and separators. It never carries error, danger, destructive, or "urgent" meaning on this surface. This survived the rebrand intact and got stronger: the ruling is now the ink's own colour at low alpha, so there is no longer even a distinct hue that could be mistaken for an alert. On the marketing surface an error is drawn with a device — a margin annotation of a heavy ink rule and a mono label — not by borrowing the rule; `/book` and `/try-esmi` both do this.

**The Foreign Mark Rule.** A third party's brand is not ours to restyle, and the conversion stops at its edge. `/app`'s "Sign in with Google" buttons carry Google's own dark button spec — ground `#131314`, border `#8E918F`, label `#E3E3E3` — because Google's branding guidelines permit only light (`#FFFFFF`), neutral (`#F2F2F2`), or dark (`#131314`) grounds beneath the multicolour mark. The four logo colours (`#4285F4`, `#34A853`, `#FBBC05`, `#EA4335`) are likewise fixed. These seven values are the only colours on a converted surface that are outside this palette on purpose; the detector is right to flag them and this note is the answer. Any future third-party mark gets the same treatment: use their sanctioned form, document it here, and change nothing else.

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

Column grids are asymmetric on purpose — the home hero runs `0.72fr / 1.28fr` so the register is wider than the offer copy, and pricing runs `1fr / 0.85fr`. Column gap is a constant `3.5rem` (`gap-x-14`); row gap runs `2.5rem`–`3.5rem`. Content blocks are anchored to a top rule (`2px solid` `rule` graphite for a section-level register, `1px` for a sub-list) and separated internally by `1px` hairlines. Nothing is boxed.

Breakpoints observed in the build: `640px`, `900px`/`901px`, `1023px`/`1024px`, and Tailwind's `sm`/`lg`. Zero horizontal overflow at 375px and 1905px.

### Named Rules

**The Register Degradation Rule.** The call register has three states and they are not interchangeable. Above 900px: five ruled columns with `rule-quiet` verticals and a desktop-only alternating band (`min-width: 901px`, `rgba(46,50,62,0.028)`). Between 641 and 900px: verticals retire, each entry becomes two lines (reason on the first; outcome and disposition sharing the second), and the outcome/disposition column heads hide. At 640px and below: one ruled line per entry, and the outcome column is dropped entirely so the reason and disposition survive. The reason at every step is that the record must read as a continuously ruled run, not as a stack of blocks — which is also why the alternating band never ships below 901px.

**The Register Leads Rule.** Below 1024px the hero grid flattens to a column and the register is ordered *first* (`.lg-hero-register { order: -1 }`). The opening screen is the artifact at every width; the offer copy follows it.

**The Two Devices Rule.** `RuledList` reads DOWN the page — label left, value right, one entry per hairline-separated row. `Band` reads ACROSS it — label stacked above value, verticals between columns only, no horizontal separators. They are formally distinct and must stay that way. Stacking two `RuledList`s in sequence flattens their meaning into one undifferentiated run; if a second data block follows a `RuledList`, it changes axis.

## Elevation & Depth

There are no elevation shadows in this system. Nothing floats, nothing is lifted, and there are no cards. Depth comes from two places: the tonal step between adjacent field tones, and the pressed edges of the stamp. (It used to come from three — the cloth tile's physical weave was the middle term, and the rebrand removed it.) The only `box-shadow` in the world is on the stamp, and it is describing a physical stamping — a bright top lip, a dark bottom lip, a hairline of contact shadow, and a tight drop that reads as the block sitting *in* the surface rather than above it. On `:active` the whole shadow inverts to an impressed state and the block translates down 2px.

### Shadow Vocabulary
- **Stamp relief** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(50,4,22,0.6), 0 1px 0 rgba(0,0,0,0.12), 0 14px 26px -16px rgba(183,19,90,0.55)`): The stamp at rest. Only ever on `.lg-foil-surface`. The drop is tinted with the accent itself rather than black — on a white field an untinted drop reads as dirt.
- **Stamp impressed** (`box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), inset 0 -1px 0 rgba(50,4,22,0.75), inset 0 2px 6px rgba(50,4,22,0.45)`): The stamp on `:active`, paired with `translateY(2px)`. Same two-colour family as the relief — white highlight, `rgba(50,4,22)` shadow — with the highlight pulled back and the lower lip deepened so the block reads pressed into the surface rather than raised off it.

### Named Rules

**The Produced Materials Rule.** A material must be manufactured, not named. The stamp is an eight-stop metallic ramp at 100° with lit and shadowed lips. An earlier pass used a flat rectangle and it was rejected as a compliance token rather than a shipped material; that judgment stands for any future material. What changed at the rebrand is that this rule now governs exactly one material instead of two. The cloth tile was the other — a real tiled SVG carrying its own alpha — and it was retired rather than recoloured, because the same alpha-composited threads that read as grain on navy read as a grey smudge on white. **Retiring a material is in-rule; faking one is not.** The honest move when a produced material stops working on a new ground is to remove it, not to ship a washed-out version that satisfies the vocabulary without doing the work.

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

**The Nothing Loops Rule.** No animation repeats. `infinite` does not appear on this surface. A state that persists is drawn as a held mark, not as a breathing one: the chat's pending state is a foil rule that draws once in 260ms and holds, because a line held open in a ledger is a real thing and a pulsing dot is not. Three loops were removed on 2026-08-08 — `lg-typing` (a three-dot "AI thinking" indicator and a blinking caret), `esmi-wave-idle` (a waveform breathing on an untouched page), and `esmi-spin` (a tool spinner that repeated a label already written beside it). The waveform's remaining animation is gated on a request actually being in flight.

**The Legible Default Rule.** Every verb animates *to* the resting state, never *from* invisibility. Remove the animation — by reduced motion, by JS being off, by an observer that never fires — and the final state is what's already on the page. A page whose content is gated behind an animation is broken, not animated.

**The Reduced Motion Rule.** Fewer and gentler, not zero. Transform- and clip-based movement is dropped so nothing travels or wipes; colour and opacity transitions that aid comprehension stay. Every verb ships its `prefers-reduced-motion` path in the same commit as the verb.

**The Real Cadence Rule.** Where motion represents something happening, it is driven by the real event and not by a timer that imitates one. `/try-esmi` strikes each word group as the backend's SSE stream delivers it, so the pace on screen *is* the model's pace — which is also why there is no "skip" control: there is no artificial queue to skip past. A simulated typing cadence would be a fabrication in motion, and the honesty standard does not stop at copy.

## Shapes

Zero radius, everywhere. Corners are square on the stamp, on the mobile menu button, on section edges, on table cells, and on the focus ring — the global `:focus-visible` and `.lg-field :focus-visible` both set `border-radius: 0` so the ring squares off against the register's ruling instead of rounding over it. There is no rounded corner anywhere on the field — the last two, an 8px scrollbar thumb and a 4px global focus ring, were both removed. Radius 0 is literal, not approximate.

**`panel` (`18px`) is the one exception, and it is not this world's.** It belongs to the `/try-esmi` glass chat panel — a translucent, blurred pane that is a deliberate material treatment on a surface the Scope note above explicitly puts outside this document. It is recorded in the `rounded` scale anyway for one reason: the value lives in the shared `app/globals.css`, so anything reading that file has to be told the difference between a chosen shape and drift. Recording it is not permission to use it. **Nothing on the marketing surface may carry `panel`** — a rounded corner here would be the first soft edge in a world whose entire form language is the ruled edge, and the `/try-esmi` panel earns its radius by being glass, which the marketing surface has none of.

The recurring silhouette is the ruled block: a heavy top rule in `rule` graphite (`2px` for a primary register, `1px` for a nested one), a run of rows separated by hairlines, and — where it is a real tally — a second heavy rule closing the foot. Verticals are `1px` `rule-quiet` between columns. Every rule in this world is a drawn CSS border, gradient, or element; Unicode box-drawing characters, bullets, and glyph separators are not used. Icons are inline SVG paths (the nav toggle is the only one).

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
- Sticky header on the flat field with a `1px` hair bottom border, `1320px` container, `16px` vertical padding.
- Wordmark is the horizontal lockup used as a `mask-image` over the foil ramp (`.lg-foil-mark`), so the metal shows through the letterforms rather than knocking out flat white.
- Links: Archivo 500 at `wdth` 88%, `0.8125rem`, tracking `0.075em`, uppercase, in Ink 2, with the `QuietAction` foil underline on hover. The language toggle is a mono label in Ink 3.
- The stamp is visible at every width, because on mobile the register leads and the stamp is the only action above the fold.
- Mobile: an outlined square toggle drawing an inline SVG (three rules / an X), opening a Field-2 panel of full-width links separated by Hair 2 hairlines.

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
- **Do** reserve `.lg-foil-surface` for the primary action and the wordmark. Everything else that needs to read as marked uses `StatusKey` or a `QuietAction`.
- **Do** build data blocks from the shared primitives in `app/components/ledger/index.tsx`. Every marketing page composes from them; per-page inline restyling is exactly how the site drifted before.
- **Do** let the section `tone` choose the inks. Use `inkFor` / `ink2For` / `hairFor` rather than hand-picking a colour for a stock section.
- **Do** set every quantity, time, count, and price in `.lg-fig` tabular figures.
- **Do** anchor a block with a graphite top rule (`2px` primary, `1px` nested) and separate its rows with Hair 2 hairlines.
- **Do** change axis when two data blocks sit in sequence — a `RuledList` followed by a `Band`, never a `RuledList` followed by a `RuledList`.
- **Do** ship materials as produced assets: a real tile, a real ramp with lit and shadowed lips.
- **Do** use real semantic tables and definition lists for tabular content, with a caption and scoped headers.
- **Do** provide a reduced-motion path for every animation, and make the default state the legible one.

### Don't:
- **Don't** add a second foil element to a screen that already has a stamp. Foil on five elements is what destroyed the stamp's meaning once already.
- **Don't** use the ruling as an error, alert, or destructive colour on this surface. It is structure.
- **Don't** round a corner. Radius is 0, including the focus ring on the field.
- **Don't** add a shadow to anything but the foil. No card elevation, no hover lift, no ambient glow.
- **Don't** put an eyebrow, kicker, or `01/02/03` numbering above a heading.
- **Don't** ship a row of same-size icon + heading + text cards, or gradient text, or a sparkline standing in for content.
- **Don't** use a Unicode glyph as a rule, bullet, arrow, or separator. Rules are drawn; icons are inline SVG paths.
- **Don't** write `infinite`, a pulsing dot, a blinking caret, or a spinner. A persistent state is a held mark, not a breathing one.
- **Don't** invent a duration or an easing curve. Four verbs, three durations, one stagger, two curves — the vocabulary is closed.
- **Don't** animate anything but `transform`, `opacity`, and `clip-path`, and don't gate content behind an animation.
- **Don't** introduce a font-size that is not in `typography.scale`, and don't hand-write a `clamp()` for a heading — use `PageTitle` or `SectionTitle`.
- **Don't** set body copy in uppercase or in the condensed display face, and don't set a figure in the body serif.
- **Don't** show the alternating register band below 901px, or let a register entry occupy more than one line below 640px.
- **Don't** merge the `--lg-*` block with the navy/teal/gold `@theme` scales in `app/globals.css`. They serve different surfaces and the split is intentional.
