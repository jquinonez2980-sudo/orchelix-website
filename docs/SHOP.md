# Orchelix Shop

`/shop` and `/shop/[sku]` for orchelix.com's first merch drop, built from the
handoff in `orchelix-shop/` (`products.json`, `images/`, `index.html`,
`HOW-TO-SELL.md`).

It was first built as a standalone Next.js scaffold and then merged into this
repo; "How it was merged" below records how. The shop is a separate section:
it isn't linked from the marketing nav, and nothing outside `/shop` changed.

## What's here

```
app/
  (site)/shop/
    layout.tsx           nested layout: .shop-scope wrapper, loads Geist (shop only)
    shop.css             all shop styling, tokens scoped as --shop-* on .shop-scope
    page.tsx             /shop — grid of launch SKUs + "Soon" section
    [sku]/page.tsx       /shop/[sku] — product detail template
  api/checkout/route.ts  POST -> creates a Stripe Checkout Session, returns its URL
  components/
    ShopHeader.tsx       site ring mark (/orchelix-mark.svg) + ORCHELIX.COM
    ShopFooter.tsx       "Print the official mark. Do not redraw."
    ProductCard.tsx      grid card — View button on launch SKUs, "Soon" badge otherwise
    ProductDetail.tsx    gallery, fit/color, price, description, size selector, Buy button
  lib/
    products.json        copied verbatim from the handoff — the source of truth
    products.ts          typed view over products.json, image sizes, LAUNCH_SKUS
    stripe.ts            server-side Stripe client (lazy — won't crash the app if unset)
public/shop/images/      the 10 product JPGs — placeholders, see "Product images"
.env.example             STRIPE_SECRET_KEY, NEXT_PUBLIC_SITE_URL (placeholders)
```

`app/lib/products.ts` is the "generated from products.json" file the brief
asked for: it imports `app/lib/products.json` directly and types it, so it can
never drift out of sync with the source file. To change a price, size run, or
color, edit `products.json` — nothing else needs to change. The one exception
is images: `IMAGE_SIZES` in `products.ts` holds each file's real pixel size, and
the build fails if a product points at an image with no entry.

## The first drop (checkout-enabled)

Only these 4 SKUs are buyable. The list lives in `app/lib/products.ts` as
`LAUNCH_SKUS`:

- `ORX-Q-U` Quiet Tee, unisex
- `ORX-D-U` Drop Tee, unisex
- `ORX-S-U` Spec Tee, unisex
- `ORX-Q-W` Quiet Tee, women

`HOW-TO-SELL.md`'s suggested first catalog also had `ORX-CAP-Q` (Quiet Cap) and
`ORX-PIN` (Mark Pin). Both are **held as "Soon" pending their own product
images** — today they share `caps-tote-pin.jpg`, a collage of two caps, the
tote and the pin, which doesn't show a buyer the one item they're paying for.
Add them back to `LAUNCH_SKUS` once each has its own photograph.

Every other SKU in `products.json` (Drop/Spec women, Kids Line, Quiet Crewneck,
Quiet Cap, Drop Cap, Quiet Tote, Mark Pin, Field Notebook) still renders on
`/shop` and has a detail page, but shows a "Soon" badge instead of a Buy
button, and the checkout API rejects it outright. To launch a SKU, add it to
`LAUNCH_SKUS`.

## Product images

**The current JPGs in `public/shop/images/` are placeholders.** They are AI
renders (their embedded provenance metadata names Grok), not photographs of
real products.

- The mark is drawn differently from image to image, and none of them is the
  print file. They must not be used as a reference for what gets printed —
  print `orchelix-mark.svg`, per the rule in `products.json`.
- **Replace them with photographs of printed samples before launch.** Buyers
  are paying for what the photo shows.
- Quiet Cap and Mark Pin are held as "Soon" until each has its own image (see
  above).

The tee images are 1792×1008 with the front and back side by side, so the
detail page shows every image at its natural aspect ratio, uncropped; cards
use 16:9. When replacing an image, update its entry in `IMAGE_SIZES`.

## Running it

```bash
npm install
# add STRIPE_SECRET_KEY and NEXT_PUBLIC_SITE_URL to .env.local — see .env.example
npx next dev --webpack
```

Open `http://localhost:3000/shop`. Use `--webpack`: plain `next dev`
(Turbopack) currently fails on every route in this repo because it can't
decode `app/favicon.ico`. `npm run build` already uses webpack.

Without a real `STRIPE_SECRET_KEY`, everything renders and browses normally —
only clicking "Buy" will show a clear on-page error ("Checkout is not
configured yet"). There's no fake cart or checkout state anywhere that could
be mistaken for a real purchase.

## Going live with Stripe

1. Get your keys at `https://dashboard.stripe.com/apikeys`.
2. Put the **secret** key in `.env.local` (or your host's env vars) as
   `STRIPE_SECRET_KEY`. Start with `sk_test_...` and test the full flow with
   [Stripe's test cards](https://docs.stripe.com/testing) before switching to
   `sk_live_...`.
3. Set `NEXT_PUBLIC_SITE_URL` to `https://www.orchelix.com` in production (the
   apex 301s to www, and `app/sitemap.ts` reads this too) — it's used to build
   the product image URL Stripe shows at checkout and the success/cancel
   redirect back to the product page.
4. That's it — no products need to be pre-created in the Stripe dashboard.
   `app/api/checkout/route.ts` builds the Checkout Session's line item
   on the fly from `products.ts` (name, size, price in CAD), so pricing and
   copy changes in `products.json` take effect immediately.
5. Deploying on Vercel: add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_SITE_URL` as
   Environment Variables in the project settings — same idea as `.env.local`.

If you'd rather use Stripe Payment Links (no code, but one link per SKU/size
combination to manage by hand), you can swap the "Buy" button in
`ProductDetail.tsx` for direct links instead of the `fetch("/api/checkout")`
call — the current approach was chosen because a single size selector needs a
dynamic price/line-item, which Payment Links can't branch on.

## How it was merged

The scaffold was built to this repo's structure (Next 16.2.6, React 19.2.4,
`@/*` -> `./*`, components in `app/components/`, lib in `app/lib/`), so the
merge was a copy with no import rewriting.

The shop sits inside the site route group, at `app/(site)/shop/`. Route groups
don't affect the URL, so it still serves `/shop`, and it keeps the site's
analytics and client-side navigation (the repo has no top-level
`app/layout.tsx` — `app/(site)/layout.tsx` and `app/[locale]/layout.tsx` are
the two roots, both rendering through `app/shell.tsx`).

| From (scaffold) | To (orchelix-website) |
| --- | --- |
| `app/shop/` | `app/(site)/shop/` |
| `app/api/checkout/route.ts` | `app/api/checkout/route.ts` |
| `app/components/Shop*.tsx`, `Product*.tsx` | `app/components/` |
| `app/lib/products.ts`, `stripe.ts`, `products.json` | `app/lib/` |
| `public/shop/images/*.jpg` | `public/shop/images/` (except `logo-mark.jpg`) |

Not copied: the scaffold's `app/layout.tsx`, `app/page.tsx`, `app/globals.css`,
`tsconfig.json`, `next.config.js`, `next-env.d.ts`, and `logo-mark.jpg`, which
turned out to be a phone screenshot rather than an asset.

Styling is isolated. `shop.css` declares every token as `--shop-*` on the
`.shop-scope` wrapper, never on `:root`, so it cannot overwrite the site's
`--ink`, `--line`, `--paper` or `--surface`. Geist is loaded with `next/font`
in the shop layout and exposed as `--shop-font` on the same wrapper, so the
site's type is untouched. The shop layout is nested and renders no `<html>`/
`<body>`.

Dependencies: `stripe` only. The site's `next` and `react` versions were not
changed.

`app/(site)/shop/[sku]/page.tsx` uses the Next 16 async `params` signature
(`const { sku } = await params`).

Git hygiene: never `git add -A` — there's untracked junk in the tree
(`showcase/`, `public/WhatsApp Video*.mp4`, `.tmp*`, `sales-pilot.html`,
`Claude outputs/`, `public/og-image-1.jpg`, two `*-1.png` logos). Use
`git add -u` plus explicit new paths.

Routing: nothing intercepts `/shop` — `proxy.ts` doesn't match it, and a
static `app/(site)/shop` takes priority over `app/[locale]`, so it isn't
treated as a locale.

## Notes on scope

- The header mark is the site's own `/orchelix-mark.svg` at its native
  proportions; nothing was redrawn or re-vectorized.
- Prices are CAD only, matching `products.json`.
- Product titles are exactly as given: Quiet Tee, Drop Tee, Spec Tee, Quiet
  Cap, Mark Pin.

## Not yet built

Checkout charges product price only. Before going live you still need
**shipping** (rate + address collection) and **tax** (Ontario HST, via Stripe
Tax or self-registered). Both are Checkout Session settings in
`app/api/checkout/route.ts`.
