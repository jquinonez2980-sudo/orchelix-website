# Competitive CTA — 2026-09-16

Copy and CTA pass so the public site matches shipping truth vs rivals.

## Commercial facts kept / clarified

| Fact | Site representation |
|---|---|
| Demo line | `+1 561 566 1066` (unchanged) |
| Pilot | **$149 / 14 days** — primary homepage + FinalCTA stamps hit the live Stripe pilot Payment Link |
| Esmi Local / Starter | **$299/mo + $499 setup** — named on pricing lede, fine print, schedule caption, and table header |
| EN / ES | **Included** on every plan — removed the `$99 / mo` bilingual EN/ES add-on |
| French | Remains a **custom add-on** (language pack) |

## After-hours packaging

Local / Starter is framed as the **after-hours** package: one line, voice · after-hours, Google Calendar + SMS. Included list states after-hours answering explicitly.

Polish pass (still on `ship/rival-cta-2026-09-16`, not merged):

- Hero lede names after-hours before the $149 stamp.
- Stamp copy is **Start a $149 pilot** / **Empieza un piloto de $149** (hardcoded — do not use a missing `t.common.startPilot` key).
- Pricing stamps, pilot heading/body, close body, and journey step 2 match that pilot.
- FAQ: “Is Local / Starter only for after-hours?” — behind the desk *or* the whole line; $149 / 14 days.

## Calendar truth

- Live booking is **Google Calendar + SMS confirmation** only.
- Removed public claims that Microsoft 365, Calendly, or Acuity are live booking surfaces.
- Pricing FAQ states those are **not** live today.

## CRM / field-service honesty

- Jobber may be named as **ICP / workflow fit** on `/home-services` (not the homepage hero — Jorge 2026-09-16). Still **no** Jobber or Housecall Pro native integration, sync, or booking-into-Jobber claims until that path is live and demoable on 561-566-1066.
- Revenue-Ops CRM line no longer claims HubSpot/Salesforce/Pipedrive/Zoho “natively”; it is roadmap hand-off wiring scoped per engagement.
- Day-14 pilot stage no longer implies CRM/ledger go-live on day 14 — phone line + Google Calendar only.
- Pricing stays Pilot $149 / 14 days and Esmi Local $299/mo + $499 setup — no Jobber plan, discount, or “includes Jobber.”

## Esmi is not human

- Removed “sounds human” / “suena humana” phrasing.
- Included copy states **natural AI voice — not a human receptionist**.

## Files touched

- `app/i18n/dictionaries.ts` — deep-merge competitive overlays onto EN/ES catalogues
- `app/i18n/messages/patches/competitive-2026-09-16-en.ts`
- `app/i18n/messages/patches/competitive-2026-09-16-es.ts`
- `app/[locale]/pricing/page.tsx` (table header Local / Starter)
- `app/components/sections/Hero.tsx` (primary stamp → Stripe $149 pilot)
- `app/components/sections/FinalCTA.tsx` (primary stamp → Stripe; /book kept as quiet action)
- `docs/competitive-cta-2026-09-16.md` (this note)

Base `en.ts` / `es.ts` left unchanged; overlays carry the competitive-truth copy so the MCP push stays size-safe.

## Intentionally unchanged

- Nav stamp still routes to `/book` (consult booking) so the bar does not force a card charge.
- Growth / Scale dollars and minute bands unchanged.
- Named operators and PRODUCT.md jurisdiction claims unchanged.
- Merged competitive CTA to `main` (2026-09-16). Jobber ICP lives on `/home-services` (moved off hero 2026-09-16).
