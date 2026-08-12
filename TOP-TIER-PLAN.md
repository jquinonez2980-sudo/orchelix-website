# Orchelix Top-Tier Plan

> **Purpose.** The complete plan to take marketing + product journey from “strong and distinctive” to **top tier for 2026** — without inventing proof, without another rebrand, and without splitting the product into three design systems again.
>
> **North star.** An owner-operator opens Esmi on Monday morning (often on a phone), reviews last night’s work in **English or Spanish**, coaches the agent once, and trusts every row like a ledger. The marketing site and the console feel like **one company**.
>
> **Status baseline (2026-08-12).** Marketing Ruled Record is largely converted. Dashboard has grouped IA, night-register Overview, coach-to-knowledge, EN/ES shell chrome, and visible sign-in.  
> **Execution progress:** Phase A largely implemented in-repo (call reviews via Clerk org metadata, Tonight’s work, deep links, coach → review). Phase B hero sample transcript + try-esmi CTAs. Remaining: full ES catalogs, SEO product-tree redirects (founder/SEO gate), Railway-native review schema when available.

---

## 0. Definition of done: “top tier”

Top tier is **not** “prettier than competitors.” It is all five of these true at once:

| # | Criterion | How we know |
|---|-----------|-------------|
| 1 | **Thesis intact** | Audit trail is the interface on marketing *and* in daily operate |
| 2 | **Proof before claim** | First viewport can demonstrate Esmi (audio + transcript), not only describe it |
| 3 | **One journey** | Land → Hear → Book/Apply → Configure → Live register → Coach — same world, no third UI |
| 4 | **Bilingual identity** | EN/ES parity on marketing *and* primary operator surfaces |
| 5 | **Honest product** | Shipped vs roadmap encoded; no fake logos, metrics, or clients |

**Out of scope for “top tier” (do not chase):** Acumen full product launch, Revenue-Ops GA, SOC 2 certification theater, multi-brand redesign, infinite animation polish.

---

## 1. Current state (honest)

### Strengths (protect)

- **Ruled Record** world: white field, graphite ruling, magenta stamp scarcity, ledger primitives
- **Honest shipping hierarchy** (Esmi live; RevOps/Acumen in development)
- **Fabricated proof removed** (policy locked in PRODUCT.md)
- **Proof assets:** public voice samples + try-esmi chat; hero embeds compact player
- **Dashboard:** Work/Configure/Account nav; night-register Overview; call coach → knowledge API; EN/ES chrome toggle; DraftModeBanner honesty
- **Trust:** Privacy with PIPEDA/Security anchors; sign-in shell fixed for blank-session bug

### Remaining gaps (ordered by impact)

| Gap | Type | Blocks top tier because… |
|-----|------|--------------------------|
| G1 | Backend + UI | Review queue / disposition override not first-class product verbs |
| G2 | Product UX | Overview is register-first but not “Tonight’s work” (open reviews + escalations) |
| G3 | Proof UX | Hero has audio; not audio **+** ruled transcript as one artifact |
| G4 | i18n | Dashboard Spanish is shell + primary pages, not full Work/Configure |
| G5 | IA | Marketing product tree still multi-route (`/ai-receptionist`, verticals) vs clean `/products/*` |
| G6 | Systems | Acumen `/app`, residual surfaces, email/Clerk edge cases |
| G7 | Trust/legal | Open claims (SOC 2 language, addresses) must stay verified-only |
| G8 | Perf/a11y | Mobile job-site bar not continuously enforced |

---

## 2. Non-negotiables (every phase)

1. **No fabricated proof** — no logos, named clients, or outcome % without real sources.
2. **Esmi carries proof; roadmap agents stay visibly in development.**
3. **Stamp scarcity** — one primary magenta action per surface.
4. **Radius 0 on marketing; product may use `.lg-app` remaps but not reintroduce green/red status rainbow.**
5. **Copy voice** — senior, calm, specific; no AI-vendor breathlessness.
6. **Facts require approval** — latency, SOC 2, French, entity addresses, Privacy Officer status: only what PRODUCT.md allows.
7. **Work on `main` or short-lived branches; no force-push; no secret commits.**

---

## 3. Workstreams (parallel tracks)

Four workstreams run for ~12 weeks. They can parallelize after Phase A foundations.

```
A  Operator product (console as the audit trail)
B  Persuade & proof (marketing conversion)
C  Bilingual identity (EN/ES parity)
D  System, trust, craft (hygiene that keeps quality high)
```

---

## 4. Phased plan (12 weeks)

### Phase 0 — Freeze & measure (Week 0, 2–3 days)

**Goal.** Know baseline so “top tier” is measurable.

| Task | Owner | Deliverable |
|------|--------|-------------|
| Lighthouse mobile on `/`, `/pricing`, `/try-esmi`, `/book` | Eng | Numbers in this doc appendix |
| Analytics events map (hear play, book submit, get-started, coach save) | Eng | Event list + where fired |
| Confirm legal open items with Jorge (SOC 2, addresses, Privacy Officer) | Founder | Written answers → PRODUCT.md update |
| List real proof assets (recordings, tenants willing to be anonymous case) | Founder | Inventory only — no invention |

**Exit:** Baselines written; no new marketing claims without confirmation.

---

### Phase A — Operator product: “Tonight’s work” (Weeks 1–4)

**Goal.** The console *is* the trust product. Morning review in under two minutes.

#### A1. Persisted review model (backend + API)

**Problem.** “Mark reviewed” is localStorage; disposition is read-only.

**Design**

| Concept | Notes |
|---------|--------|
| `call_reviews` (or fields on call log) | `status`: `open` \| `reviewed` \| `needs_followup`; `reviewed_at`, `reviewed_by`; optional `note` |
| Optional `operator_disposition` | Does **not** erase Esmi’s disposition; sits beside it (audit honesty) |
| Platform endpoints | `PATCH /platform/calls/{id}/review`; `GET /platform/calls?review_status=open` |
| Proxy | `app/api/platform/calls/[id]/review/route.ts` + allowlist params on list |

**UI**

- Call detail: Review status control (Open / Reviewed / Needs follow-up) + optional note
- Badge on list rows for open reviews
- Coach-to-knowledge remains (already ships); link coach save → auto-suggest “reviewed”

**Exit criteria**

- [ ] Review state survives refresh and devices  
- [ ] List filter “Needs review” works  
- [ ] No silent rewrite of Esmi disposition without dual column  

#### A2. Tonight’s work surface (Overview redesign)

**Problem.** After-hours KPI + dense register is good; not yet a **queue**.

**Layout (Operate mode)**

1. **Draft / suspended banner** (existing)  
2. **Tonight’s work** band: counts — open reviews, escalated leads, after-hours unanswered-to-you (if API allows)  
3. **Register** (existing NightRegister) with filter chips: All · Needs review · Booked · Routed  
4. **Setup checklist** only if onboarding incomplete  
5. Secondary KPI strip (collapsed on mobile)

**Exit criteria**

- [ ] Owner can answer “what needs me?” without opening five pages  
- [ ] Mobile: primary actions in thumb zone  

#### A3. Deep links & shareable state

| Surface | URL state |
|---------|-----------|
| Calls | `?outcome=&language=&review_status=&q=&call=` open row |
| Chats | `?outcome=&chat=` |
| Leads | `?status=` |
| Overview | `?filter=` for register chips |

Use `nuqs` or Next searchParams — prefer URL as source of truth for filters.

**Exit criteria**

- [ ] Refresh keeps filters  
- [ ] Consultant can send a link to a specific call  

#### A4. HITL verbs language (product copy)

Align all operator strings with marketing dispositions:

| Marketing | API outcome | Operator label |
|-----------|-------------|----------------|
| BOOKED | booked | Booked |
| ROUTED | escalated | Routed |
| ANSWERED | info | Answered |
| CLOSED | abandoned / voicemail / other | Missed / Voicemail / Other |

Coach panel copy already points at knowledge; add short “what this does” line on first use (dismissible, not a modal tutorial).

**Exit criteria**

- [ ] No “Escalated” vs “Routed” split across marketing and console  
- [ ] First-time coach empty state teaches without a forced tour  

#### A5. Backend dependency note

If Railway FastAPI cannot take review fields in Weeks 1–2:

1. Ship **filter + deep link + Tonight’s work UI** against existing data  
2. Stage review API as Phase A1b with feature flag  
3. **Do not** fake server review with only localStorage as “done”

---

### Phase B — Persuade & proof (Weeks 3–6, overlaps A)

**Goal.** First 10 seconds demonstrate the product; conversion path is obvious.

#### B1. Artifact-first hero v2

**Current.** Illustrative register + compact real audio player.

**Target.**

```
[ Offer + Stamp + phone ]
[ Real recording player ]
[ Ruled mini-transcript of the sample being played — or static ruled excerpt labeled as sample ]
[ Full illustrative night register below or beside on desktop ]
```

Rules:

- Sample transcript must be **honestly labeled** (sample / illustrative structure)
- Do not claim live tenant data on the public hero  
- QuietAction “Hear more” → `/try-esmi`  
- Stamp remains the only foil fill  

#### B2. Try-Esmi as conversion engine

| Task | Detail |
|------|--------|
| Default industry from `?industry=` or referrer vertical | Pre-select sample chips |
| Clear next step after play / chat | Stamp → book pilot; secondary → get-started |
| ES parity already stronger | Keep `?lang=es` + full shell; add hreflang if route stabilizes |
| Performance | Lazy non-critical chat; prioritize player |

#### B3. Conversion IA cleanup (from REDESIGN-PLAN)

Implement when SEO redirects are approved:

```
Nav (5): Products · How it works · Industries · Pricing · About
Primary CTA: Book a pilot
Secondary: Hear Esmi (contextual)
```

Route consolidation (redirect, don’t delete):

| From | To |
|------|-----|
| `/ai-receptionist` | `/products/esmi` or keep + canonical |
| `/missed-calls` | industry or esmi landing |
| `/home-services`, `/kitchen-bath` | `/industries/...` children |

**Exit criteria**

- [ ] Search Console: no soft-404 surge after redirects  
- [ ] One primary CTA in nav at all breakpoints  

#### B4. Book / get-started polish

- Book form already ledger; ensure **success state** restates 14-day pilot + phone  
- Get-started Submitted already points at night register; add **email template** consistency (if editable)  
- Pilot price / monthly tiers: one sentence of mental math on pricing + book  

#### B5. Proof inventory (founder)

When a real customer allows:

- Anonymous vertical case (“South Florida HVAC, after-hours book rate…”) with **only verified numbers**  
- Or: public recording with explicit permission  

Until then: **capability framing + live demo only.**

---

### Phase C — Bilingual identity (Weeks 5–8)

**Goal.** EN/ES is demonstrated on the surfaces operators live in.

#### C1. Dashboard i18n expansion

Already: shell groups/labels, Overview, Calls chrome, coach strings, locale toggle.

**Next catalog coverage (priority order)**

1. Leads, Appointments, Chats (list empty/error/filters)  
2. Knowledge, Voice, Settings (labels + primary actions)  
3. Billing, Usage, Analytics (numbers stay; labels translate)  
4. Admin / onboarding staff (English OK longer)  

**Tech**

- Extend `app/(site)/dashboard/i18n.tsx` catalogs  
- Optional: move to JSON + `Intl` later; not required for top tier  
- Prefer **locale per browser + localStorage**; later **per org preference** in config  

#### C2. Marketing ES completeness

- Audit `TRANSLATED_PATHS` vs actual Spanish quality (native review)  
- Remaining partial pages: bring to ledger + catalogue  
- Language switcher never serves English body under `/es/…` (already policy)

#### C3. Native review gate

PRODUCT.md: Spanish needs native speaker sign-off, especially disposition labels.

**Exit criteria**

- [ ] Spanish operator can complete: open call → coach → save knowledge without English UI  
- [ ] Marketing ES: all nav destinations have real Spanish, not machine calque  

---

### Phase D — System, trust, craft (Weeks 6–12)

#### D1. Multi-product UI decision (must choose one)

| Option | When |
|--------|------|
| **D1a. Join Ruled Record** | Acumen stays early; keep `.lg-app` + gold only where Foreign Mark / product accent is documented |
| **D1b. Separate Acumen DESIGN.md** | When finance OS ships UI density that needs gold/navy as its own world |

Deliverable: explicit note in DESIGN.md **Scope** so the detector and agents stop thrashing.

#### D2. Residual surface conversion

| Surface | Action |
|---------|--------|
| Blog article body | Tokens + type ramp or intentional “document” exception documented |
| Email HTML templates | Stay exempt (mail clients); keep ignore list |
| Clerk modals | Already appearance-driven; audit Google button Foreign Mark |
| Error / not-found / terms | Largely done; keep in ledger world on any regression |

#### D3. Trust & legal hygiene

| Item | Action |
|------|--------|
| SOC 2 | Only after founder confirmation; prefer “ask for control pack” until then |
| Entity addresses | Add when real; don’t invent |
| Privacy Officer | Named only if true (currently Jorge in privacy — confirm) |
| Terms vs Service Agreement | Keep “Service Agreement wins” note |

#### D4. Performance & accessibility bar

| Metric | Target |
|--------|--------|
| Lighthouse mobile Performance | ≥ 90 home, pricing, try-esmi |
| LCP | &lt; 2.5s on 4G mid-tier |
| WCAG AA | Ink floor held; focus visible; forms labeled |
| Reduced motion | Register settle/strike already; keep closed vocabulary |

#### D5. Craft floor checklist (release gate)

Before calling any milestone “top tier ready”:

- [ ] No second stamp on a screen that already has one  
- [ ] No green/red badge fills on dashboard  
- [ ] No inventing metrics in UI chrome  
- [ ] Empty / loading / error on every list page  
- [ ] Mobile: no horizontal trap except intentional tables with swipe affordance  

---

## 5. Milestone map

| Milestone | When | User-visible outcome |
|-----------|------|----------------------|
| **M0** Baseline | W0 | Numbers + legal answers locked |
| **M1** Reviewable console | W4 | Open reviews persist; Tonight’s work; deep links |
| **M2** Proof-first marketing | W6 | Hero artifact + cleaner conversion IA |
| **M3** Bilingual operate | W8 | ES on Work + Configure primary surfaces |
| **M4** Top-tier freeze | W12 | Perf bar, Acumen decision, trust freeze, case study if any |

---

## 6. Suggested PR / implementation slices

Keep PRs reviewable (one vertical outcome each):

1. `feat(platform): call review status API + proxy`  
2. `feat(dashboard): review controls on CallLog`  
3. `feat(dashboard): Tonight’s work overview band`  
4. `feat(dashboard): URL state for calls filters + deep link`  
5. `feat(marketing): hero transcript + player coupling`  
6. `feat(marketing): nav/CTA IA + redirects (after SEO check)`  
7. `feat(dashboard): i18n leads/appointments/chats`  
8. `feat(dashboard): i18n knowledge/settings/voice`  
9. `chore(design): Acumen scope decision + DESIGN.md`  
10. `perf(marketing): try-esmi + home LCP`  

---

## 7. Success metrics

### Product (operate)

| Metric | Baseline | Target M4 |
|--------|----------|-----------|
| Time to first “reviewed” action after login | Unknown | &lt; 2 min for active tenant |
| % of after-hours calls reviewed within 24h | Unknown | Measure first; then set bar |
| Knowledge entries created via coach | Unknown | Non-zero weekly for live tenants |

### Marketing (persuade)

| Metric | Baseline | Target M4 |
|--------|----------|-----------|
| Play rate on hero / try-esmi | Measure W0 | ↑ vs baseline |
| Book pilot starts / sessions | Measure W0 | ↑ |
| Get-started completions | Measure W0 | ↑ without raising false “live” expectation |

### Quality

| Metric | Target |
|--------|--------|
| Lighthouse mobile (key URLs) | ≥ 90 |
| Critical a11y regressions | 0 on release |
| Fake proof incidents | 0 forever |

---

## 8. Risks & mitigations

| Risk | Mitigation |
|------|------------|
| Backend lag on review API | Ship UI filters + deep links first; feature-flag review writes |
| SEO damage from route moves | Redirect map + Search Console; don’t delete URLs cold |
| Spanish quality | Native review gate before launch claims |
| Scope creep into Acumen/RevOps polish | Esmi-first; roadmap agents stay labeled |
| Rebrand temptation | DESIGN.md is source of truth; refinement not replacement unless deliberate new-work |

---

## 9. Anti-goals (explicit)

- Another full visual rebrand  
- Interchangeable “AI purple” aesthetics  
- Fake testimonials or logos “just for the case study section”  
- Forcing dashboard into marketing density (Operate stays denser)  
- Building French until PRODUCT.md confirms it  
- Claiming SOC 2 / latency numbers without verification  

---

## 10. Roles

| Role | Responsibility |
|------|----------------|
| **Founder** | Legal confirmations, proof inventory, pricing narrative, native ES review |
| **Eng (web)** | Dashboard UX, marketing surfaces, proxies, i18n catalogs |
| **Eng (platform)** | Review model, list filters, any disposition-adjacent fields |
| **Design / Impeccable** | Keep Ruled Record; Operate brief if needed; detector clean |

---

## 11. Immediate next action (start Monday)

**Single best start (Phase A slice 1–2):**

1. Spec + implement **call review status** on platform (or document blocker).  
2. Wire **CallLog** review controls + list filter.  
3. Add **Tonight’s work** band on Overview using open reviews + escalated leads counts.  
4. Add **deep link** `?call=` to open a row.

Everything else in this plan stacks on that foundation.

---

## 12. Relationship to existing docs

| Doc | Role |
|-----|------|
| `PRODUCT.md` | Product truth, claims, evidence rules |
| `DESIGN.md` | Marketing Ruled Record system |
| `REDESIGN-PLAN.md` | Earlier IA/content plan; product tree still relevant |
| **This file** | **Execution plan for top-tier marketing + journey** |
| `.impeccable/critique/*` | Point-in-time audits; re-run after M1/M2 |

When PRODUCT.md and this plan conflict on claims, **PRODUCT.md wins**.  
When DESIGN.md and this plan conflict on visual system, **DESIGN.md wins** for marketing; document Operate exceptions here.

---

## Appendix A — Current feature inventory (do not rebuild)

Already shipped and should be extended, not replaced:

- Ruled Record marketing core + ledger primitives  
- Hero real sample player + full industry chips  
- try-esmi EN/ES shell  
- get-started Ruled Record + submitted journey  
- Dashboard Work/Configure/Account + collapsible groups  
- NightRegister (live calls/chats)  
- CoachFromCall → knowledge API  
- Dash EN/ES toggle (shell + overview + calls)  
- Sign-in appearance + signed-in redirect  
- Privacy anchors (PIPEDA / Security)  

## Appendix B — Open legal / product questions (founder)

Answer these in writing before M2 marketing claims expand:

1. SOC 2 status and what language is allowed publicly?  
2. Registered addresses for US / Canada on legal pages?  
3. Privacy Officer name/contact confirmed?  
4. French as add-on — yes/no/date?  
5. Any real customer willing for anonymous or named proof?  
6. Pilot fee framing vs Starter $299 — one sentence of truth for pricing page?

---

*Plan version: 2026-08-12. Update milestone dates when execution starts; do not soft-edit product truth without PRODUCT.md.*
