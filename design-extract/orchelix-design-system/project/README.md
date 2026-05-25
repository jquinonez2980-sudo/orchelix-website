# Orchelix Design System

Design system, brand guidelines, and UI kits for **Orchelix AI Consulting** — a Canadian
firm building multi-agent AI systems that orchestrate revenue operations (sales,
marketing, finance) for SMEs, professional corporations, churches/non-profits, and
service businesses. Bilingual English/Spanish is a first-class consideration.

This project is intentionally early-stage: there is **no existing site, codebase, or
Figma file**. Everything in here was derived from the brand brief and the two logo
references the founder provided.

---

## Sources we worked from

| Source | What it gave us |
|---|---|
| `assets/orchelix-logo-lockup.jpeg` | The hero logo lockup — DNA helix mark (navy + teal) above the `ORCHELIX / AI CONSULTING` wordmark. |
| `assets/orchelix-brand-overview.jpeg` | Side-by-side breakdown of mark and typography from the founder. |
| `assets/esmi-logo-source.jpeg` | The **Esmi** sub-brand mark — the name of the Virtual Receptionist product. Cyan/blue wordmark on dark navy. |
| Brief notes from the founder | Brand voice, target audience, product roadmap (Virtual Receptionist → Sales/Marketing/Finance → Accounting OS → embodied AI). |

There is no Figma URL, no GitHub repo, no production codebase to point at yet — when
those arrive, append them to this table and re-derive any tokens that drift.

---

## Index

| File / folder | What it is |
|---|---|
| `colors_and_type.css` | **Start here.** Single source of truth for every color, type ramp, spacing token, radius, shadow, motion curve. Imported by every kit. |
| `assets/` | Real brand assets — Orchelix lockup PNG/JPEG, helix mark (extracted from JPEG), Esmi sub-brand marks, source JPEGs. |
| `fonts/` | Font readme. We're using Google-hosted Manrope as a placeholder — see Typography below. |
| `preview/` | Small HTML cards that populate the Design System review tab (one card per concept). |
| `ui_kits/marketing-site/` | Full marketing homepage — nav, hero, agent grid, stats, testimonial, CTA band, footer. |
| `ui_kits/console-app/` | Operator console for the Orchelix platform — agent dashboard with live receptionist run. |
| `SKILL.md` | Cross-compatible skill manifest so this system can be loaded by Claude Code. |

---

## Content fundamentals

**Voice.** Calm, declarative, and confident — the way a senior consultant talks to an
owner-operator. No hype words ("game-changing", "revolutionary"), no exclamation marks,
no emoji in body copy. We sell trust before we sell technology.

**Person.** We address the reader as **you** ("Agents that run **your** revenue
operations"). We refer to ourselves as **Orchelix** or **we** — never "Orchelix AI"
(redundant) and never "the platform" (cold).

**Casing.**
- Wordmark: `ORCHELIX` in full upper case, `AI CONSULTING` beneath in upper case with wide tracking.
- Headlines: sentence case, never title case. "Agents that run your revenue operations." not "Agents That Run Your Revenue Operations."
- Eyebrows and category labels: UPPER CASE + 0.16em tracking. e.g. `THE AGENT STACK`, `CUSTOMER STORY`.
- Buttons: sentence case verbs. "Book a consultation", not "Book A Consultation" or "BOOK A CONSULTATION".

**Concrete over abstract.** Always favour the specific over the generic:
- ✅ "Answers, qualifies, and books — bilingually, 24/7."
- ❌ "Powerful AI-driven communication solutions."
- ✅ "A two-week pilot, a clear scorecard, and a senior consultant on the line."
- ❌ "End-to-end implementation services with white-glove support."

**Numbers and proof.** Lead with real numbers where we have them ("412 calls in the
first month", "14s pickup time", "87% resolved without escalation"). Avoid round-number
hand-waving like "10x faster" or "save thousands".

**Bilingual posture.** Spanish appears where it earns its place: customer quotes can
stay in Spanish without translation when the meaning is obvious, marketing copy
mentions `EN · ES` as a capability rather than a feature.

**Examples (lifted from the kits):**

> Agents that run your revenue operations.  
> Orchelix builds multi-agent systems that answer calls, qualify pipeline, close the
> books, and keep your operators in the loop — quietly, bilingually, and around the clock.

> The receptionist agent picked up 412 calls in its first month — bilingually, on
> weekends, and without missing a single appointment. It paid for itself before the
> pilot ended.

> Start with one agent. Pay for itself in 30 days.

---

## Visual foundations

**Palette.** Two brand colours, lots of cool neutrals.
- **Navy** (`#0A2540`, token `--navy-600`) is the heart — used for body text, primary
  buttons, the structural strand of the helix, and the deep brand surfaces. Scales
  from `--navy-50` (paper-light) to `--navy-900` (near-black).
- **Teal** (`#14B8A6`, `--teal-500`) is the only accent — used for the flowing strand
  of the helix, focus rings, the accent CTA, success states, and small moments of
  energy. Scales 50→900.
- **Neutrals are cool**, not warm. `--paper #FBFBFC`, `--surface-2 #F4F6F9`,
  `--line #E4E8EE`. Cooler grays sit better next to the navy.
- **Semantic colours are restrained**: success borrows from teal (`#0F9989`), info is
  a desaturated blue (`#2E6FB0`), warning amber, danger a muted brick. Never pure red.

**Typography.** Montserrat across the board — a geometric sans, with a slightly
condensed feel that matches the look of the wordmark. The full variable-weight
family ships locally in `fonts/`. Two weights do most of the heavy lifting:
`800` for display + the `ORCHELIX` mark, `400`/`500` for body. JetBrains Mono appears
in sparing places — code, metadata, timestamps, version strings. **Never two display
fonts; never script or serif.**

Hierarchy: `display-1 80px / display-2 64px / H1 48 / H2 32 / H3 24 / body 16 / micro 12`.
Tracking is slightly negative on display (`-0.02em`) and wide on eyebrows (`0.16em`).

**Backgrounds.** Mostly off-white (`--paper`). Heroes get a *very* subtle radial wash
of teal and navy — no full-bleed gradients except on the CTA band, where the helix
gradient (`navy → teal`) becomes the whole surface. **No photography of stock
business-people, no abstract 3D renders, no AI-generated illustration.** When the
brand needs to show its agent product, show actual UI (agent dashboards, timeline
panels, live transcripts).

**Borders & cards.** Cards are white on `--paper`, rounded `lg` (14px), 1px `--line`
border. On hover they lift 1px and gain `--shadow-md`. Cards never use only a coloured
left-border accent — if you need to mark a card as "primary", reach for a 3px
navy→teal *top* gradient bar instead (see `.agent::before` in the marketing kit).

**Shadows.** Always tinted navy, never pure black:
`0 8px 20px rgba(10, 37, 64, 0.08)`. Five steps `xs/sm/md/lg/xl`. Avoid shadows on
buttons unless the button is sitting on a coloured field.

**Radii.** `xs 4 / sm 6 / md 10 / lg 14 / xl 20 / pill 999`. Controls (buttons,
inputs) are `md`. Cards are `lg`. Large feature panels (CTA band, stat strip) get
`2xl 28`. Avoid mixing radii within a single composition.

**Motion.** Quiet. 120–380ms, with a calm out-curve (`cubic-bezier(0.2, 0.6, 0.2, 1)`).
Buttons get a 1px lift on hover and a 0.2s background swap — no bounce, no scale,
no spring. The only place we use a continuous animation is the **live status pulse**
on running agents — a subtle 1.6s ring that fades out.

**Hover & press states.**
- Primary button: background steps from `--navy-600` → `--navy-500`, 1px translate-up, faint shadow.
- Accent button: `--teal-500` → `--teal-400`.
- Ghost / text link: gains a `--surface-2` background.
- Cards: lift 1–3px, gain `--shadow-md`/`--shadow-lg`, sometimes reveal a top accent bar.
- Press: no shrink. Buttons return to flat (no translate), 80ms.

**Focus.** Always a 3px teal ring at ~35% opacity. Never browser default.

**Layout.**
- Marketing: 1200px max-width container, 32px gutters, 96px section padding.
- Operator console: 240px sidebar, full-bleed top bar, 28–32px main padding.
- Vertical rhythm uses the spacing scale (4-pt base). No arbitrary px values.

**Transparency & blur.** Used in exactly two places:
1. Sticky navs get `rgba(255,255,255,0.78)` + `backdrop-filter: saturate(140%) blur(10px)`.
2. The hero figure's overlay gradients use `rgba(20,184,166,0.30)`.
Outside of those, surfaces are opaque.

**Imagery vibe.** Cool, slightly muted, mostly UI-product imagery. When we need a
"customer" visual we use the helix mark inset into a deep navy gradient panel — not
stock photos. Eventually swap in real customer photography (warm-light, real
offices, never stock).

**The helix.** The double-helix mark always has the navy strand structural and the
teal strand active/flowing. When used on dark backgrounds the navy strand becomes
white; the teal stays teal (or gets brightened). Never recolour the mark with brand-
unrelated colours.

---

## Iconography

**System.** A **Lucide**-style line icon language: 1.6–1.7px stroke, 24px viewBox,
round caps and joins. We inline these as React SVG components inside each UI kit —
see `ui_kits/console-app/Components.jsx` → `<Icon name="…">` for the working set.

**No icon font is bundled.** We chose inline SVG over a font for two reasons:
(a) we currently only need a small set (10–14 glyphs) and (b) it keeps the kit
embeddable as a single HTML file. If the set grows past ~30 icons, switch to the
Lucide CDN (or copy `lucide-static/icons/` into `assets/icons/`).

**Substitution flag.** The Lucide-style glyphs we inline are *not* shipping from the
official Lucide library — they are hand-traced equivalents at the same stroke weight
so they sit consistently next to one another. If you adopt the official Lucide CDN
later, the visual rhythm will be unchanged.

**Emoji.** **Not used** in product surfaces, marketing copy, or UI labels. They
clash with the trustworthy, finance-adjacent tone. The only place a glyph creeps in
is the tabular `▲ / ▼` trend indicators in metric cards — those are stylistic, not
emoji.

**Logo as icon.** The Orchelix helix mark *itself* is the brand's primary icon — used
as a 22–28px nav-bar mark and as a 100% fill on dark "customer story" panels. The
Esmi wordmark is used on dark panels for the Virtual Receptionist product (it has
its own colour identity within the system — cyan/blue on navy).

**Asset inventory:**

| File | Use |
|---|---|
| `assets/orchelix-lockup.png` | Full lockup, transparent — for headers, splash, footer. |
| `assets/orchelix-lockup-light.png` | Full lockup, recoloured for dark backgrounds. |
| `assets/orchelix-mark.png` | Helix mark only — for tight nav-bar placements. |
| `assets/orchelix-mark-light.png` | Helix mark on dark backgrounds (navy → white, teal brightened). |
| `assets/esmi-logo.png` | Esmi wordmark, transparent — drop into product cards or live-call headers. |
| `assets/esmi-logo-dark.png` | Esmi wordmark on its native navy backdrop — use when the wordmark needs no surrounding panel. |
| `assets/orchelix-logo-lockup.jpeg` | Original founder-provided lockup (master). |
| `assets/orchelix-brand-overview.jpeg` | Original founder-provided side-by-side reference. |
| `assets/esmi-logo-source.jpeg` | Original founder-provided Esmi master. |

---

## Caveats & next steps

- **Fonts.** Montserrat is the official brand font and ships locally in `fonts/`
  (variable + full static weight set). The variable font handles all weights
  from 100 to 900 with italic. No substitution needed.
- **Logo files.** We only have JPEG masters. We extracted transparent PNGs but a
  proper vector (SVG/AI) from the designer would be ideal — especially for the
  console sidebar and small nav-bar usage.
- **Esmi sub-brand.** The Esmi name + visual identity were introduced for the
  Virtual Receptionist. The system *currently* treats Esmi as a sub-brand inside
  Orchelix (cyan/blue accent within an Orchelix-navy world). Future sub-brands for
  Sales-Ops, Accounting OS, Revenue Insights, and the Embodied AI product line will
  need their own pages here.
- **No code/Figma yet.** Once a real codebase or Figma exists, re-derive tokens from
  it rather than from this document.
