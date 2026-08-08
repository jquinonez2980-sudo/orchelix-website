# Orchelix Marketing Redesign — Content & IA

> **Conversion status (2026-08-08).** The visual world is "The Ruled Record"
> (seed key `8a1b2873`); see `DESIGN.md` for the system and `PRODUCT.md` for
> product truth. Shared primitives live in `app/components/ledger/index.tsx` —
> build new pages from those rather than writing local inline styles.
>
> | Route | State |
> |---|---|
> | `/` | Converted |
> | `/pricing` | Converted — rate schedule replaces the three-card layout |
> | `/solutions` | Converted — shipped vs in-development split preserved |
> | `/how-it-works` | Converted |
> | `/industries` | Converted |
> | `/about` | Converted |
> | Nav + Footer | Converted (site-wide) |
> | `/book`, `/acumen`, `/blog` | **Not converted** — old light/teal world |
> | `/ai-receptionist`, `/missed-calls` | **Not converted** |
> | `/home-services`, `/kitchen-bath` | **Not converted** |
> | `/es` tree | **Not converted** |
>
> Unconverted pages now sit under the new Nav and Footer, so the site is in a
> visibly mixed state until they are done.
>
> Truth fixes applied during conversion: removed unverified pickup-latency
> claims ("14-second pickup", "before the third ring") from `/solutions`, and
> removed the fabricated client names that were being reused as demo data on
> `/how-it-works`. Do not reintroduce either.

Steps 1–2 of the redesign brief. Scope: **marketing pages only** (`/dashboard/*` and
`/try-esmi` are out of scope). Design system lives in `DESIGN.md` (step 3, pending).

---

## 1. Content inventory

The existing copy is strong — senior, specific, concrete, no hype. It is an asset and
is preserved almost entirely. What changes is typography, layout, colour, and motion.

### Positioning
- **Line:** "Built like a consultancy. Priced like software."
- **Category:** multi-agent systems that run revenue operations
- **Audience:** owner-led businesses and professional services — Architecture & Design,
  Stone & Fabrication, Field Service, Manufacturing, Healthcare, Legal
- **Tone:** senior, competent, calm confidence

### The three products
| # | Product | Promise |
|---|---|---|
| 01 | **Revenue-Ops Agents** | Qualify every lead, follow up on time, close more deals. |
| 02 | **Esmi** — Virtual Receptionist | 24/7 call handling, books appointments, routes urgent calls, human-sounding in EN and ES. Every call ends with a transcript and a reason. |
| 03 | **AcumenAI** — Accounting & Finance OS | Automated bookkeeping, reconciliations, a month-end close you can trust. |

Framing that must survive: *three agents, one operator console, one audit trail.*

### The problem (cost of manual ops)
1. Calls that go unanswered → voicemails → customers who booked with whoever picked up first
2. Follow-up that arrives late → decision already made, quote already signed
3. A month-end that drags → steering on last month's numbers
4. Best people on busywork → judgment hires doing data entry

### Why Orchelix (four differentiators)
1. **Senior consultants, not a help desk.** A senior operator you can call by name.
2. **Bilingual from day one.** EN + ES natively, FR as an add-on.
3. **PIPEDA-aligned. SOC 2 in progress.** Audit trail auditors accept. Data residency by request.
4. **Human-in-the-loop, always.** Approve, override, or coach in one click.

### How it works (the 14-day pilot)
1. **Map the workflow.** Senior consultant writes the workflow we automate first.
2. **Deploy in 14 days.** First agent live in your tools — phone, inbox, CRM, ledger.
3. **Audit every action.** Every call, email, reconciled line logged.
4. **Scale on your timeline.** Add the next agent once the first earned the room.

### Pricing
Tiers **Starter $299 / Growth $599 / Scale $999**, plus add-ons ($49/mo, $99, $99/mo, Custom).

### Contact / trust signals
Phone (561) 566-1066 · EN·ES bilingual · SOC 2 in-progress · PIPEDA-aligned ·
West Palm Beach, FL — serving Palm Beach County and South Florida.

### Removed (decision: 2026-08-08)
Fabricated named testimonials (Marisol Santiago/Riverstone Clinic, Javier
Cárdenas/Northstar Accounting) and invented client logos (Northstar, Bloom & Co.,
Maplewood HVAC, Iglesia Pueblo, Riverstone Clinic) are **removed entirely**, not
restyled. Replaced with honest capability framing, consistent with the earlier
stat-band remediation. No named quotes or logos until real ones exist.

---

## 2. Information architecture

### Current problems
- **Nav has 7 items** (Agents, AcumenAI, Platform, Industries, Pricing, Try Esmi, About)
  and splits products illogically — AcumenAI sits beside "Agents", which is also products.
- **Two competing CTAs** — "Book a demo" and "Try Esmi" compete for the same intent.
- **`/es` is a hand-duplicated tree, not a locale system.** A single 1083-line
  `app/es/page.tsx` with hardcoded Spanish, no i18n library, no middleware, and Spanish
  versions of only 3 of ~12 marketing pages. This actively undermines the "bilingual is
  a real differentiator" claim — the site itself demonstrates bilingualism as bolted on.
- Overlapping landing pages (`/ai-receptionist`, `/missed-calls`, `/home-services`,
  `/kitchen-bath`, `/solutions`, `/industries`) with unclear hierarchy.

### Proposed structure

```
/                     Home
/products             Overview — the three agents, one console, one audit trail
  /products/esmi        Virtual Receptionist  (absorbs /ai-receptionist, /missed-calls)
  /products/revenue-ops Revenue-Ops Agents
  /products/acumen      AcumenAI              (from /acumen)
/how-it-works         Platform: 14-day pilot, audit trail, human-in-the-loop
/industries           Six verticals           (keeps /kitchen-bath, /home-services as children)
/pricing              Tiers + add-ons
/about                Team, approach, credentials
/book                 Primary conversion — Book a pilot
```

- **Nav: 5 items** — Products · How it works · Industries · Pricing · About
- **One primary CTA everywhere: "Book a pilot."** "Try Esmi" demotes to a secondary,
  contextual link on the Esmi product page (where intent is already qualified).
- **Language switch** stays in the nav as EN/ES.

### SEO note
The existing vertical landing pages (`/ai-receptionist/[industry]`, `/missed-calls`,
`/kitchen-bath`, `/home-services`) may carry organic traffic. They should be **redirected,
not deleted**, and `app/sitemap.ts` updated. Worth checking Search Console before any
route consolidation — this plan assumes redirects preserve them.

### Bilingual — DONE (structure), IN PROGRESS (copy)

The hand-duplicated `/es` tree is gone. Replaced with:

```
app/
  i18n/config.ts         locales, LOCALIZED_PATHS, TRANSLATED_PATHS, helpers
  i18n/dictionaries.ts   server-only per-locale loader
  i18n/messages/{en,es}.ts
  [locale]/              root layout (html lang) + the 7 marketing pages
  (site)/                root layout for everything else, English-only
proxy.ts                 rewrites unprefixed marketing paths to /en
```

**Design decisions worth not re-litigating:**

- **English stays unprefixed.** `/pricing`, never `/en/pricing` — the site has SEO
  history on those URLs. `proxy.ts` rewrites internally; the address bar is unchanged.
- **Two root layouts.** `<html lang>` has to vary and a root layout cannot read a child
  segment's params (`unstable_rootParams` was removed in Next 16). Hence `[locale]` and
  `(site)` are separate roots sharing `app/shell.tsx`. The "full page load when crossing
  root layouts" caveat costs nothing: the marketing components use plain `<a href>`.
- **`proxy.ts`, not `middleware.ts`.** Next 16 renamed the convention. Clerk is still
  invoked *conditionally* so marketing traffic never pays for auth middleware — the
  property the original file's comment was protecting.
- **Catalogues are pure data.** No functions: they cross into a Client Component (Nav)
  and would fail serialization. Interpolate with `"{n} calls".replace(...)` instead.
- **`dynamicParams = false` on untranslated pages.** Without it Next renders `/es/pricing`
  on demand with English body copy under a Spanish URL. Those routes 404 until their
  catalogue lands, and the language switcher falls back to the Spanish home.

**Translated today:** `/` only. Everything else is English-only by design, tracked in
`TRANSLATED_PATHS`. To translate a page: add its copy to both catalogues, add the path to
`TRANSLATED_PATHS`, delete the `dynamicParams = false` line. Sitemap hreflang and the
switcher pick it up automatically — they read the same constant.

**`app/i18n/messages/es.ts` needs native review before launch.**
