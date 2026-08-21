# Orchelix traffic playbook

**Written 2026-08-20. Two tracks running in parallel: paid + local for pipeline inside 30 days, content for compounding organic from month 3.**

---

## The diagnosis, in one paragraph

The technical SEO on orchelix.com is already good — sitemap with reciprocal hreflang, correct canonicals, Organization/Service/FAQPage/BreadcrumbList schema, robots.txt, Search Console verified, 52 indexed-eligible URLs. Nothing in that layer is holding the site back. What is holding it back is that "AI receptionist" and its variants are contested by RingCentral, Nextiva, IONOS, 3CX, myaifrontdesk and ai-receptionist.com — DR 70–90 domains with years of link equity. A `site:orchelix.com` search currently returns nothing. Head-term SEO in this category is an 18-month fight with a link budget Orchelix does not have. Everything below routes around that fight rather than joining it.

**The three assets the competitors cannot copy quickly:** a real West Palm Beach address, native Spanish, and a live product demo that requires no form.

---

## Track 1 — Days 1–7: the things that cost nothing and pay first

### 1.1 Google Business Profile (highest-value single action on this list)

RingCentral cannot appear in a Palm Beach County map pack. You can. This is free and currently unclaimed.

#### 1.1a The account that will own it

Use **info@orchelix.com**, not a personal Gmail. Ownership transfer later is a support ticket, not a setting.

- If `info@orchelix.com` is a Google Workspace mailbox, it is already a Google account — just sign in.
- If it is a forwarding alias (the repo uses Resend for domain mail, so this is likely), create a Google account *on* that address: **accounts.google.com → Create account → For my personal use → "Use my current email address instead" → info@orchelix.com**. Google emails a code, so confirm you can actually *receive* at that address before you start — a forward-only alias with no inbox will strand you at step 8.
- Immediately after setup, add a second Google account as a **Manager** on the profile. One mailbox outage should not equal losing the listing.
- In Search Console, add `info@orchelix.com` as a **verified owner** of the orchelix.com property *before* starting GBP. If Google offers instant verification it keys off exactly this. It is not widely available in 2026, but it costs five minutes and skips the video entirely.

#### 1.1b Do not publish the address

Orchelix does not receive clients at its address, which makes it a **service-area business**. Google requires an address to *verify* you; it does not require you to *display* it.

- Enter the real West Palm Beach address during signup.
- Then: **Edit profile → Location → Business location → Edit → turn off "Show business address to customers" → Save.**
- **Set your service areas explicitly.** Google's documentation is direct: if you hide the address without defining service areas, *"a local area is chosen for you."* Do not let Google guess your market.
- **Never substitute a virtual office, a UPS Store box, a PO box, or a coworking desk.** This is the obvious workaround and it is a top cause of hard suspension. Google's guidelines: *"If your business rents a physical mailing address but doesn't operate out of that location, also known as a virtual office, that location isn't eligible for a Business Profile"* and *"P.O. boxes or mailboxes located at remote locations aren't acceptable."* Coworking qualifies only with your own signage and your own staff on site during business hours. A hidden real address is safe. A listed fake one is not.
- The site does not leak it either: `app/shell.tsx` publishes `addressLocality`/`addressRegion`/`addressCountry` and **no `streetAddress`**. Leave it that way.
- Aware-of, not actionable: Florida corporate filings are public record on Sunbiz, so the registered address may be findable there regardless of what you do on Google.

#### 1.1c Verification — you get roughly one good shot

Video is the default method in 2026, and the 2026 change that matters: **a failed video submission can remove your other verification options**, leaving you stuck in a resubmission loop. Do not fire off a casual attempt to see what happens.

- One **continuous, unedited** clip, 30 seconds to ~3 minutes, filmed and uploaded from your phone inside the Business Profile flow. No cuts, no stitching, no pre-recorded file.
- **No people on camera, no voices, no background conversation.** Film during quiet hours.
- Standard order is (a) location context — street sign, building number, landmark; (b) business name on permanent signage; (c) proof you operate there.
- **For a hidden-address service-area business, (b) is the failure point** — you have no storefront sign. Substitute documentation: Florida business registration, a utility bill, or addressed mail showing *Orchelix AI Consulting*, filmed in the same continuous take, then pan to your actual working setup and equipment. Have the paperwork physically in hand before you hit record.
- Make the paperwork, the profile name, and the address agree **exactly** before filming. Mismatch is the single most common rejection reason.
- Google responds within up to 5 business days.
- **Do not select an "online-only" business model.** Misclassification can block verification or trigger a later suspension when Google decides the model was misrepresented.

#### 1.1d Profile setup

- Claim at `business.google.com/add`.
- **Primary category:** `Telephone answering service`. This is the category that maps to how buyers actually search, and it is much less contested than `Software company`.
- **Secondary categories:** `Software company`, `Business management consultant`, `Telecommunications service provider`.
- **Business name:** exactly your real-world name — `Orchelix AI Consulting`. Pick one form and use it identically everywhere, forever. Do **not** write "Orchelix AI Receptionist West Palm Beach". Keyword-stuffing the name field is the most common cause of hard suspension and the short-term lift is not worth it.
- **Service areas:** max 20, and they must be cities, ZIPs, or regions — *not* a radius. Google's guidance is roughly a 2-hour drive from base, so no Orlando. Use: West Palm Beach, Palm Beach Gardens, Boca Raton, Delray Beach, Jupiter, Wellington, Fort Lauderdale, Hollywood, Pompano Beach, Miami, Hialeah, Coral Gables. Edits take up to 48 hours to approve.
- **Attributes:** turn on "Identifies as Latino-owned" only if accurate, "Online appointments", "Onsite services", and **"Language assistance: Spanish"** — that last one surfaces you on Spanish-language local searches and almost no competitor has it set.
- **Services list** (each becomes a searchable entity — add all of these): AI receptionist, Bilingual answering service, After-hours call answering, Appointment booking service, Missed call recovery, Spanish answering service, HVAC answering service, Dental office answering service, Law firm intake service.
- **Products:** add Starter ($299/mo), Growth ($599/mo), Scale ($999/mo), 14-day pilot ($149). Products render as cards in the profile and are a conversion surface, not decoration.
- **Photos:** minimum 10. Real ones — office, you, the dashboard on a screen. Stock photography is detectable and it reads as a shell company.
- **Booking link:** point it at `/book`.
- **Q&A:** seed 8–10 questions yourself and answer them. This is a supported use of the feature, and the questions are indexed. Use the FAQ copy already written on `/ai-receptionist`.
- **Posts:** one a week, minimum. A neglected profile ranks below a maintained one with fewer reviews.

**Reviews are the ranking factor that matters most in the map pack.** Target 10 in the first 60 days. Ask every pilot customer at the moment the first booked call lands in their dashboard — that is the emotional peak and the highest-yield ask.

### 1.2 Search Console

- Submit `https://www.orchelix.com/sitemap.xml` (note: `robots.txt` pointed at the apex, which 301s — that's fixed in this pass).
- Request indexing manually for the new pages. It is slow but it is the only lever on a site with no crawl authority yet.
- Set the international targeting and confirm the hreflang pairs are being read without errors.
- Check Bing Webmaster Tools too. Bing is ~5% of search but converts well for B2B and takes ten minutes to set up.

### 1.3 Citations and directories

Consistent Name/Address/Phone across these is what makes Google trust the local entity:

Apple Business Connect · Bing Places · Yelp · Facebook · LinkedIn Company Page · Better Business Bureau · Chamber of Commerce (Palm Beach North, Boca, Greater Fort Lauderdale) · Clutch · G2 · Capterra · Product Hunt

**Do these in one sitting with a single canonical NAP string written down first.** Inconsistent NAP is the most common reason local rankings stall.

---

## Track 2 — Days 1–30: Google Ads, because SEO cannot deliver a lead this month

Budget assumption: **$1,500–2,500/month** to start. Below ~$1,000 the data is too thin to optimise on.

### The offer

Send everything to `/try-esmi`, not `/book`. A live demo with no form is a dramatically lower-friction conversion than a calendar booking, and it is your genuine differentiator — most competitors gate the demo. Retarget the demo viewers into `/book`.

### Campaign structure

**Campaign A — Bottom-funnel exact match (60% of budget)**

Single keyword ad groups, exact match, so you can read the data:

```
[ai receptionist for small business]
[ai receptionist for hvac]
[ai receptionist for dentists]
[ai answering service]
[ai phone answering service small business]
[virtual receptionist for contractors]
[after hours answering service]
[24/7 answering service small business]
[automated appointment booking phone]
[missed call answering service]
```

**Campaign B — Spanish (20%). This is where your CPC advantage lives.**

```
[recepcionista virtual]
[recepcionista con inteligencia artificial]
[servicio de contestadora en español]
[contestadora automática para negocios]
[secretaria virtual español]
```

Expect materially lower CPCs than the English set — almost nobody is bidding these against a native Spanish landing page. Send them to `/es/try-esmi` and the `/es` metro pages.

**Campaign C — Local, geo-fenced (20%)**

Same head terms, radius-targeted on West Palm Beach / Boca / Fort Lauderdale / Miami, pointed at the matching `/locations/[city]` page built in this pass. Local intent + a local landing page + a local GBP is the trifecta.

### Negatives to add on day one

`free`, `jobs`, `salary`, `hiring`, `resume`, `course`, `tutorial`, `how to build`, `open source`, `api`, `github`, `reddit`, `python`

Without these you will burn 30% of month one on people who want to *build* an AI receptionist rather than buy one.

### What to measure

Not clicks. **Cost per demo started**, then **cost per pilot sold**. At $149 a pilot and $299/mo after, a customer with 12-month retention is worth roughly $3,600. You can afford a meaningful CAC — but only if you are actually tracking to the sale, which means the `track()` events in `app/lib/analytics.ts` need `pilot_purchased` wired in.

---

## Track 3 — Days 1–30: outbound, because it is the only channel you fully control

You have run this play before with dental outreach. Same shape:

**Target list:** HVAC, dental, med spa, law firms, and stone/kitchen fabricators in Palm Beach and Broward. 200 businesses.

**The qualifying signal that makes this work:** call their number after 6pm. Note which ones go to voicemail. That is your list — you now have a specific, true, verifiable observation about their business.

**The opener that follows from it:**

> I called your office at 7:15 last night and got voicemail. I run a West Palm Beach company that answers phones for [industry] businesses in English and Spanish, 24/7. I'd rather show you than pitch you — here's a two-minute recording of it handling a call like yours: [link]

No form, no meeting request in the first touch. The demo link is the ask.

**Cadence:** email day 1, call day 3, email day 7, LinkedIn day 10, break-up email day 14. Expect 3–5% to a demo view at 200 contacts — 6–10 conversations, which at your price point is a real month.

**The accounting-firm channel** you scoped earlier is still the higher-leverage version of this: one firm introduces you to thirty SMB clients. Worth running in parallel at low volume.

---

## Track 4 — Months 1–6: the content engine (shipped in this pass)

Already built and on disk:

| Asset | Route | Targets |
|---|---|---|
| Missed-call calculator | `/missed-call-calculator` (+ `/es/`) | "missed call calculator", "what do missed calls cost" — and, more importantly, links |
| 8 metro pages | `/locations/[city]` (+ `/es/`) | "ai receptionist west palm beach", "recepcionista con IA en Miami" |
| 3 comparison pages | `/compare/[slug]` (+ `/es/`) | "ai receptionist vs hiring", "vs voicemail", "vs call center" |

### Why the calculator is the most important of the three

It is the only page on the site someone else has a reason to link to. Landing pages do not earn links; free tools do. Promote it deliberately:

- Post it to relevant subreddits (r/smallbusiness, r/HVAC, r/Dentistry) **as a tool, not as an ad** — no company link in the post body, let them find it.
- Submit to Product Hunt, BetaList, and the "free tools" roundups in the small-business ops space.
- Pitch it to local business journals: *"West Palm Beach firm builds free calculator for what missed calls cost small businesses"* is a story a local outlet will run.
- Email it to your outbound list as the second touch — it is genuinely useful, which makes the follow-up welcome rather than tolerated.

### Content priorities after this pass

**Do next, in order:**

1. **More Spanish blog posts.** You have 6 English and 3 Spanish. The Spanish ones face almost no competition. Getting to 15 Spanish posts is the single highest-ROI content work available to you.
2. **Industry × problem long-tail.** "HVAC company missing after hours calls", "dental office front desk overwhelmed" — low volume individually, near-zero competition, and they convert.
3. **The `/blog` article bodies** still on the old design system.

**Do not do yet:** named-competitor comparison pages ("Ruby Receptionists vs Orchelix"). They rank and convert, but they require verified, dated, cited pricing per competitor plus a quarterly review cadence — otherwise you are publishing claims about another company that go stale and become a legal problem. Build them as a deliberate project with a maintenance owner, or not at all.

---

## The technical fixes shipped in this pass

- **`robots.txt` pointed at the apex domain** (`orchelix.com/sitemap.xml`), which 301s to www — every crawler took a redirect before reading line one. Now points at www. Also added `Disallow` for the Clerk-gated surfaces (`/app`, `/dashboard`, `/sign-in`, `/sign-up`, `/get-started`), which were returning sign-in redirects to crawlers and spending crawl budget on soft-404s.
- **Locale-blind canonicals in two `[locale]` layouts.** `pricing/layout.tsx` and `book/layout.tsx` each hardcoded an English canonical inside a layout serving both languages. It was masked because `page.tsx` overrides it — but it was one deleted line away from telling Google that `/es/pricing` is a duplicate of `/pricing` and should not be indexed. Removed.
- **Keyword-free first paragraphs.** `/ai-receptionist` opened with *"Esmi is the receptionist that does not go home"* — a good line with nothing for Google to match. Changed to *"Esmi is an **AI receptionist** that does not go home"* (and the Spanish equivalent). One word, no design cost, exact target phrase now in the first sentence of body copy. **The H1s were left alone deliberately** — they are the best writing on the site and the ranking cost of a poetic H1 is small once the term appears in the title, the description, and the opening paragraph.
- **New pages wired into the chrome.** Added a Resources column to the footer linking the calculator, comparisons, and locations. Orphan pages get crawled once from the sitemap and then never revisited.

## Still worth doing, not done here

1. **Measure mobile LCP on the homepage.** The 3D Inscription scene is deferred and off the critical path (good), but it has never been measured against a real CrUX field score. Run PageSpeed Insights on `https://www.orchelix.com/` and check the *field* data, not the lab score. If mobile LCP is above 2.5s it costs both rankings and conversion, and it is worth knowing before you spend on ads that land there.
2. **Wire `pilot_purchased` into `app/lib/analytics.ts`.** Without it you can measure cost per demo but not cost per customer, which is the only number that tells you whether to scale ad spend.
3. **Backlinks.** The site has essentially none. Directories (above) are the floor; the calculator is the ceiling. There is no shortcut here and anyone selling you one is selling you a penalty.
