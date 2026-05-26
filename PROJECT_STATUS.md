# Orchelix Website — Project Status

> Last updated: May 26, 2026 — **LIVE at orchelix.com**  
> Use this document to fully recreate or hand off the project.

---

## 1. Project Overview

**Company:** Orchelix AI Consulting Inc.  
**Tagline:** AI agents for revenue operations — virtual receptionist, sales automation, and financial operations for SMEs.  
**Location:** Greater Toronto Area, Ontario, Canada  
**Website domain:** `orchelix.com`  
**Email domain:** `orchelix.com` (Google Workspace)  
**Primary inbox:** `info@orchelix.com`  
**Privacy officer:** Jorge Quinonez — `privacy@orchelix.com`  
**Legal contact:** `legal@orchelix.com`  

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router, `--webpack` build flag) |
| Language | TypeScript 5, React 19 |
| Styling | Tailwind CSS v4 + inline styles (design tokens via CSS vars) |
| Fonts | Montserrat (display), JetBrains Mono (mono) — via `next/font/google` |
| Images | `next/image` — AVIF/WebP via Vercel, `minimumCacheTTL: 2592000` |
| Analytics | `@vercel/analytics` |
| Email | Resend SDK (`resend` npm package) |
| Deployment | Vercel (production alias: `orhelix-website.vercel.app`) |
| Backend (Esmi) | FastAPI on Railway |
| Scheduling | Cal.com / Calendly at `/book` |
| Version control | GitHub — `jquinonez2980-sudo/orchelix-website`, branch `main` |

**Build command:** `next build --webpack`  
**Node version:** 20+

---

## 3. Environment Variables

Set in **Vercel → Project → Settings → Environment Variables**.

| Variable | Where used | Notes |
|---|---|---|
| `RESEND_API_KEY` | `/api/contact/route.ts` | Starts with `re_…`. Domain `orchelix.com` must be verified in Resend. |
| `NEXT_PUBLIC_SITE_URL` | `app/sitemap.ts` | Optional. Falls back to `https://orchelix.com`. |

> **Never commit API keys.** Rotate `RESEND_API_KEY` in Resend if exposed.

---

## 4. External Services

| Service | Purpose | Account / Notes |
|---|---|---|
| **Vercel** | Hosting + CI/CD | Auto-deploys on push to `main` |
| **Resend** | Transactional email | Domain `orchelix.com` verified. Sends from `noreply@orchelix.com`, delivers to `info@orchelix.com` |
| **Railway** | FastAPI backend for Esmi chat | SSE streaming at `/api/chat` on the Next.js side proxies to Railway |
| **Cal.com** | Demo booking at `/book` | Embedded calendar widget |
| **Google Workspace** | Email hosting for `orchelix.com` | MX records configured for `info@`, `privacy@`, `legal@` |
| **GitHub** | Source control | `jquinonez2980-sudo/orchelix-website` |

---

## 5. Repository Structure

```
app/
├── layout.tsx                  # Root layout: fonts, metadata, JSON-LD, Analytics, skip link
├── globals.css                 # Design tokens, Tailwind theme, component CSS (skip link, sol-card, contact-input…)
├── page.tsx                    # Homepage — composes all sections
├── sitemap.ts                  # XML sitemap (9 routes)
├── not-found.tsx               # Branded 404
├── error.tsx                   # "use client" error boundary
│
├── api/
│   ├── contact/route.ts        # POST — Resend email delivery for lead form
│   └── chat/                   # Esmi SSE proxy to Railway FastAPI
│
├── components/sections/
│   ├── Nav.tsx                 # Sticky nav, mobile drawer, Escape key handler
│   ├── Hero.tsx                # LCP image, priority, quality 75
│   ├── Trust.tsx               # Logos + stats strip
│   ├── Solutions.tsx           # 3 agent cards — pure server component, CSS hover
│   ├── HowItWorks.tsx          # 4-step process
│   ├── Why.tsx                 # 4-feature grid
│   ├── ContactForm.tsx         # "use client" lead capture form → /api/contact
│   ├── FinalCTA.tsx            # Dark navy CTA banner
│   └── Footer.tsx              # 4-column footer + social icons + legal row
│
├── book/page.tsx               # Demo booking page (Cal.com embed)
├── try-esmi/
│   ├── page.tsx                # Esmi demo page
│   └── EsmiChat.tsx            # "use client" SSE chat widget
├── solutions/page.tsx          # Agent details page
├── pricing/page.tsx            # Pricing page
├── how-it-works/page.tsx       # How it works detail page
├── industries/page.tsx         # Industries page
├── privacy/page.tsx            # PIPEDA-compliant privacy policy
└── terms/page.tsx              # Terms of service

public/
├── orchelix-lockup-horizontal.png   # Main logo (horizontal)
├── orchelix-mark.png                # Icon mark (dark)
├── orchelix-mark-light.png          # Icon mark (light/white)
├── og-image.jpg                     # 1200×630 OG image
├── apple-touch-icon.png             # 180×180 Apple touch icon
├── favicon.ico                      # Browser favicon
└── robots.txt                       # Disallows /api/, points to sitemap
```

---

## 6. Design Tokens (CSS Variables)

Defined in `app/globals.css` under `@theme {}`:

| Token | Value | Usage |
|---|---|---|
| `--navy-600` | `#0A2540` | Primary brand dark |
| `--navy-700` | `#081D33` | Darker navy (CTAs, footers) |
| `--teal-500` | `#14B8A6` | Primary accent |
| `--teal-700` | `#0D9488` | Links, hover states |
| `--ink` | `#0A2540` | Primary text |
| `--ink-2` | `#3F5570` | Secondary text (WCAG AA ✓ 7.6:1) |
| `--ink-3` | `#6D7F95` | Decorative only — fails WCAG AA, do not use for readable text |
| `--line` | `#E2E8F0` | Borders |
| `--surface-2` | `#F4F6F9` | Section backgrounds |
| `--font-display` | Montserrat | Headings + body |
| `--font-mono` | JetBrains Mono | Labels, chips, code |

---

## 7. Homepage Sections (in order)

1. **Nav** — sticky, mobile drawer with Escape key dismiss
2. **Hero** — LCP image, headline, two CTAs
3. **Trust** — client logos (placeholder) + 4 stats
4. **Solutions** — 3 agent cards (Revenue-Ops, Virtual Receptionist, Accounting OS) + roadmap tile
5. **HowItWorks** — 4-step process
6. **Why** — 4-feature grid (consultants, bilingual, PIPEDA, human-in-the-loop)
7. **ContactForm** — lead capture form (`id="contact"`)
8. **FinalCTA** — dark navy banner with "Try Esmi live" + "Book a demo"
9. **Footer** — logo, nav columns, Instagram + LinkedIn icons, legal row

---

## 8. Contact Form (`/api/contact`)

**Endpoint:** `POST /api/contact`  
**Fields:** `name` (required), `company`, `email` (required), `phone`, `useCase` (required), `message`

**Flow:**
1. Frontend (`ContactForm.tsx`) submits JSON via `fetch`
2. API route validates, calls Resend
3. Branded HTML email sent from `Orchelix <noreply@orchelix.com>` to `info@orchelix.com`
4. `replyTo` set to submitter's email — hitting Reply goes directly to the lead
5. Frontend shows `ThankYou` component on success

**Email template features:**
- Dark navy header with white "Orchelix" text + teal "AI CONSULTING" label
- Teal `● NEW LEAD` badge
- Hero with submitter name, company, email, phone
- Bordered detail card (Name / Company / Email / Phone / Use case)
- Separate message quote card (italic, shown only if message provided)
- Full-width "Reply to [Name] →" CTA button
- Dark footer with submission timestamp (Toronto timezone)
- Mobile-responsive via `@media` shorthand classes

**Error handling:**
- Malformed JSON → 400
- Missing required fields → 400 with field names listed
- Missing `RESEND_API_KEY` → 500 with console error pointing to Vercel env vars
- Resend API error → 500, logs `error.name` + `error.message`
- Network/unexpected error → 500, logs `err.message`

---

## 9. Esmi Chat (`/try-esmi`)

- **Frontend:** `EsmiChat.tsx` — "use client" SSE streaming chat widget
- **Backend:** FastAPI on Railway — handles conversation, tool calls, Cal.com slot availability
- **Protocol:** Server-Sent Events (SSE) — events: `token`, `tool_start`, `tool_end`, `done`, `error`
- **Languages:** English + Spanish
- **Features:** Streaming responses, appointment slot display, booking handoff

---

## 10. SEO & Metadata

| Field | Value |
|---|---|
| Title | `Orchelix \| AI Agents for Revenue Operations` |
| Description | Multi-agent AI systems that qualify leads, handle calls, close deals… |
| OG image | `/og-image.jpg` (1200×630) |
| OG alt | `Orchelix - Orchestrating the Future of AI` |
| Canonical | `https://orchelix.com` |
| Locale | `en_CA` |
| JSON-LD | `Organization` schema with Toronto address |
| Sitemap | `/sitemap.xml` — 9 routes |
| Robots | `public/robots.txt` — disallows `/api/` |
| Apple icon | `/apple-touch-icon.png` |
| Theme color | `#0A2540` |

---

## 11. Performance & Accessibility

**PageSpeed Mobile score:** 98 (as of launch)

**Performance optimisations:**
- Hero image: `priority`, `quality={75}`, `sizes` prop, AVIF/WebP delivery
- Solutions cards: pure server component (zero client JS for hover — CSS only)
- Background watermarks: `next/image` (not CSS `background-image`) for AVIF
- `minimumCacheTTL: 2592000` on images
- Browserslist: Chrome ≥80, Safari ≥14.1, Firefox ≥78, Edge ≥80

**Accessibility (WCAG 2.2 AA):**
- Skip link: `#main-content` target on every page's `<main>`
- Focus visible: teal `2px solid` outline on all interactive elements
- Heading hierarchy: h1 → h2 → h3 (no skips)
- Contrast: `--ink-2` (#3F5570) = 7.6:1 on white — all body text passes
- Contact form: all inputs have `<label htmlFor>`, error has `role="alert"`
- Social icons: `aria-label` on each anchor
- Images: meaningful `alt` text or `alt=""` for decorative

**Security headers** (in `next.config.ts`):
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

---

## 12. Legal Pages

| Page | Status | Key info |
|---|---|---|
| `/privacy` | Live — PIPEDA compliant | Privacy Officer: Jorge Quinonez, `privacy@orchelix.com`. Sub-processors: Vercel, OpenAI, Railway, Cal.com. Retention: 90 days chat / 7 years contracts. SOC 2 Type II expected Q4 2026. |
| `/terms` | Live — draft (pending legal review) | Governed by Ontario law. Contact: `legal@orchelix.com`. |

---

## 13. Social Media

| Platform | URL |
|---|---|
| Instagram | `https://instagram.com/orchelix` |
| LinkedIn | `https://linkedin.com/company/orchelix-ai-consulting` |

Both linked in the Footer brand column, open in new tab.

---

## 14. To-Do / Known Gaps

- [x] ~~`orchelix.com` custom domain~~ — **LIVE**. DNS via IONOS (A `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`). SSL active. Apex redirects to `www`. Verified May 26, 2026.
- [x] ~~Confirm email delivery end-to-end~~ — test submission sent from `orchelix.com/api/contact`, received at `info@orchelix.com` with logo rendering correctly. Verified May 26, 2026.
- [x] ~~Replace placeholder client logos in Trust section~~ — replaced with industry verticals (Healthcare & Dental, Legal, Real Estate, Trades, Accounting Firms, Retail & Hospitality)
- [x] ~~Verify stats in Trust section~~ — confirmed accurate, kept as-is
- [x] ~~Terms of service Section 5 (Limitation of Liability)~~ — full standard Ontario-law clauses drafted; flagged for legal counsel review
- [x] ~~Email template logo URL~~ — updated to `orchelix.com/logo_white.jpg` (resolves once DNS is live)
- [ ] SOC 2 Type II — expected Q4 2026, update Privacy Policy when certified
- [x] ~~Physical AI & embodied agents section~~ — already present in Solutions.tsx as "On the roadmap · 2026" tile

## 15. Recent Changes (May 26, 2026)

- Added `/about` page with 7 sections (Hero, Challenge, Approach, Who We Are, Why Orchelix, Track Record, CTA)
- Nav "About" link updated from `#about` to `/about`
- `/about` added to sitemap
- Fixed gradient text clipping (`paddingRight: "0.1em"`) on all italic `bg-clip-text` spans across Hero, Solutions, How It Works, Industries, Pricing, About
- Trust section client placeholder names replaced with industry verticals
- Terms Section 5 expanded with full Limitation of Liability clauses
- Email template logo URL updated to `orchelix.com/logo_white.jpg`
- `public/logo_white.jpg` committed
- **Domain orchelix.com is live** — DNS propagated, SSL active, email delivery confirmed end-to-end

---

## 15. Deployment

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Type check
npx tsc --noEmit

# Deploy to Vercel production
vercel --prod --yes
```

**Git remote:** `https://github.com/jquinonez2980-sudo/orchelix-website`  
**Production branch:** `main`  
**Auto-deploy:** Yes — Vercel deploys on every push to `main`
