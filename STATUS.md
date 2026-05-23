# Orchelix Website — Status

## Stack
- **Framework**: Next.js 15 App Router
- **Styling**: Tailwind v4 with `@theme` block in `globals.css`
- **Language**: TypeScript
- **Fonts**: Montserrat (display), loaded via `next/font/local`
- **CSS vars**: `--navy-600`, `--teal-500`, `--ink`, `--font-display`, `--font-mono`, etc.

---

## Pages

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | Done — full homepage with Hero, HowItWorks, Why, Solutions, Trust, FinalCTA sections |
| `/solutions` | `app/solutions/page.tsx` | Done |
| `/pricing` | `app/pricing/page.tsx` | Done |
| `/how-it-works` | `app/how-it-works/page.tsx` | Done |
| `/book` | `app/book/page.tsx` | Done — Book a Demo form with success state, What to Expect cards, testimonials |
| `/try-esmi` | `app/try-esmi/page.tsx` | Done — live Esmi AI receptionist demo via iframe |

---

## Components

### Layout
- `app/components/sections/Nav.tsx` — top nav with logo, links, mobile menu, "Book a Demo" CTA
- `app/components/sections/Footer.tsx`

### Homepage Sections
- `app/components/sections/Hero.tsx`
- `app/components/sections/HowItWorks.tsx`
- `app/components/sections/Why.tsx`
- `app/components/sections/Solutions.tsx`
- `app/components/sections/Trust.tsx`
- `app/components/sections/FinalCTA.tsx`

---

## Nav Links
```
Agents       → /solutions
Platform     → /how-it-works
Industries   → #why
Pricing      → /pricing
Try Esmi     → /try-esmi
About        → #about
[Book a Demo] → /book
```

---

## Public Assets
| File | Use |
|---|---|
| `orchelix-lockup-horizontal.png` | Main logo (nav, footer) |
| `orchelix-mark.png` | Icon mark (dark bg) |
| `orchelix-mark-light.png` | Icon mark (light bg) |
| `esmi-logo.png` | Esmi product logo (light bg) |
| `esmi-logo-dark.png` | Esmi product logo (dark bg) |

---

## Esmi Live Demo

- **Page**: `/try-esmi`
- **Live URL**: `https://ai-receptionist-production-5375.up.railway.app`
- **Repo**: `github.com/jquinonez2980-sudo/ai-receptionist`
- **Platform**: Railway — project `awake-nourishment`, service `ai-receptionist`
- **Runtime**: Python 3.11 + Streamlit + LangChain + OpenAI GPT-4o-mini
- **Key env var**: `OPENAI_API_KEY` (set in Railway variables)
- **Iframe fallback**: shown while service warms up; disappears once iframe loads

---

## Known Issues / To Do
- `/how-it-works` page exists but content may be placeholder
- `Hero.tsx` in root (untracked) — unclear if it replaces `app/components/sections/Hero.tsx`
- `design-extract/` folder has raw HTML designs not yet implemented: `solutions.html`, `howitworks_clean.html`
- No deployment configured for the Next.js site yet (Vercel recommended)
