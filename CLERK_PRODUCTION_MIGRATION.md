# Clerk: development → production instance migration

**Scope:** `/dashboard` (Esmi tenant dashboard) and `/app` (AcumenAI console) — both
share one Clerk application (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY`
in the `orchelix-website` Vercel project). Marketing pages never touch Clerk.

**Does NOT touch:** the `ai-receptionist` repo, the live voice/chat/booking path, or
`PLATFORM_API_SECRET`. Confirmed by re-reading the actual coupling: FastAPI never talks
to Clerk. `/dashboard`'s API proxy (`app/lib/platformProxy.ts`) resolves the tenant from
`auth().orgSlug` — a plain string — and forwards it as `X-Tenant-Id` with the platform
secret. The backend has no idea which Clerk instance issued that session; it only cares
that the slug matches a real `tenant_id`. **This migration is safe for the backend by
construction**, as long as the production instance's Organizations use the exact same
slugs as today (see step 2).

---

## What I found (read-only audit, 2026-08-03)

1. **The code is already fully instance-agnostic.** Everything Clerk-related reads
   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` from env — no hardcoded
   dev-instance URLs, no `pk_test_`/`sk_test_` literals in code. The only two places
   that even mention "dev Clerk instance" are explanatory comments (`proxy.ts`,
   `app/sign-in/layout.tsx`) describing *why* sign-in/sign-up are self-hosted on our
   domain instead of Clerk's hosted Account Portal — see step 4, they don't need to
   change functionally, only their comment text is stale after migration.

2. **DNS for Clerk's custom domain already looks done.** `vercel dns ls orchelix.com`
   shows the exact CNAME set Clerk requires for a production instance with a custom
   domain: `clerk` → `frontend-api.clerk.services`, `accounts` → `accounts.clerk.services`,
   plus `clkmail` + two `_domainkey` DKIM records for Clerk's transactional email. I
   confirmed via public DNS that these are **live and resolving**:
   ```
   clerk.orchelix.com    -> worker.clerkprod-cloudflare.net   (aliases frontend-api.clerk.services)
   accounts.orchelix.com -> worker.clerkprod-cloudflare.net   (aliases accounts.clerk.services)
   ```
   The hostname literally says `clerkprod` — this is Clerk's production edge, already
   routing traffic for this domain. **Action for you:** open Clerk Dashboard →
   Configure → Domains and confirm it shows `orchelix.com` as **Verified** under the
   Production environment. If so, step 1 below may already be done — skip to step 2.

3. **I could not inspect Organizations/users directly.** I don't have Clerk dashboard
   or API access, and this environment intentionally blocks me from extracting the raw
   `CLERK_SECRET_KEY` value even for a read-only API check (it's redacted at the tool
   level) — so the organization list below is from `app/dashboard/README.md` and repo
   history, not a live query. Verify it yourself before recreating anything.

4. **`/app` has a cross-repo dependency I can't touch.** `app/app/useAcumenToken.ts`
   mints a Clerk session JWT that a **separate** Cloud Run service (`acumenai-api`, in
   the `vtx-os` repo — not available to me) validates against a specific JWKS URL +
   issuer, set at that API's own deploy time (`app/app/README.md` step 3). Clerk's
   production instance has a **different** issuer/JWKS URL than the dev instance
   (`https://clerk.orchelix.com/.well-known/jwks.json` once the custom domain is the
   production frontend API, vs whatever `*.clerk.accounts.dev` host is configured
   there now). **`/app`'s live API calls will start failing with 401s the moment you
   swap to production keys, until `acumenai-api` is redeployed with the new JWKS/issuer.**
   This is a real, separate step outside both repos I was asked to touch — flagging it
   so it doesn't surprise you mid-migration.

---

## Exact steps, in order

### 1. Confirm (or complete) the production custom domain in Clerk
Clerk Dashboard → your application → **Configure → Domains** → Production environment.
- If `orchelix.com` already shows **Verified** — done, skip to step 2.
- If not: add domain `orchelix.com`, follow Clerk's DNS instructions. Given the DNS
  audit above, the records likely already exist from a prior session — Clerk should
  detect them and verify quickly. If Clerk asks for records that *don't* match what's
  already in `vercel dns ls orchelix.com`, something changed on Clerk's side since
  those were added — reconcile before proceeding (don't add a second, conflicting set).

### 2. Recreate Organizations in the production instance
Clerk's Development and Production instances are separate user/org pools — nothing
here carries over automatically (check Clerk's dashboard for a "promote to production"
data-migration option first; if one exists and covers Organizations, use it and skip
the manual recreation below — I can't confirm from here whether your plan tier offers
it).

Manual fallback — recreate with **exactly** these slugs (must byte-match `tenant_id` in
`ai-receptionist/tenants/` and the `tenants` DB table, and `ADMIN_ORG_SLUG` in
`app/lib/platformProxy.ts` for the staff org):

| Slug (exact) | Purpose |
|---|---|
| `orchelix-ai-consulting` | Orchelix staff — admin pages (`/dashboard/admin/*`) |
| `otro-nivel` | Otro Nivel Barbershop client |
| `coastline-condos` | Coastline Condos client |

Plus any tenant created since via self-serve signup (`/get-started`) — check
`GET /platform/admin/onboarding?include=all` (ai-receptionist, admin secret) for the
current full list before you start, so nothing gets missed.

Invite the same real users to each org (same emails, same roles) that currently have
dev-instance access.

### 3. Get production API keys
Clerk Dashboard → **API Keys** → switch environment selector to **Production** →
copy `Publishable key` (`pk_live_…`) and `Secret key` (`sk_live_…`).

### 4. Update Vercel env vars — orchelix-website project, Production environment only
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = pk_live_...
CLERK_SECRET_KEY                  = sk_live_...
```
`NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL` (already `/sign-in` /
`/sign-up`, self-hosted) don't need to change — that setup already works independent of
which instance is active, and continues to be the right pattern on production (it's
actually the *better* long-term pattern regardless; Clerk's hosted Account Portal on a
custom domain would also now work, but there's no reason to switch back to it).

**This is the point of no return for live client dashboard access — do not run this
step until step 2 is confirmed complete.** I have not made this change; I'm leaving it
for you to trigger (via Vercel dashboard, or tell me to run
`vercel env add CLERK_SECRET_KEY production` etc. once you're ready) specifically
because I have no way to verify from here that the production orgs/users actually exist
yet, and getting that sequencing wrong locks every client out of their dashboard
immediately.

Redeploy after saving (Vercel → Deployments → Redeploy, or push any commit).

### 5. Redeploy acumenai-api with the new JWKS/issuer (separate repo: vtx-os)
Per `app/app/README.md` step 3, from `vtx-os`:
```powershell
.\scripts\deploy_dashboard.ps1 `
  -JwksUrl  "https://clerk.orchelix.com/.well-known/jwks.json" `
  -Issuer   "https://clerk.orchelix.com" `
  -CorsOrigin "https://orchelix.com,https://www.orchelix.com"
```
Confirm the exact JWKS/issuer host Clerk's dashboard shows for the production
instance's Frontend API before running this — it should be `clerk.orchelix.com` given
the custom domain, but verify rather than assume.

### 6. Post-migration doc/comment cleanup (small, cosmetic, do after step 4 ships)
Two comments describe the dev-instance workaround as current fact; update them once
production is live so a future reader isn't told something false:
- `proxy.ts` (lines ~19–22)
- `app/sign-in/layout.tsx` (lines ~5–8)
Both just need "the dev Clerk instance" → "Clerk" (the self-hosted sign-in/up pages
stay — see note in step 4). I'll make this edit for you once you confirm step 4 has
shipped, or do it yourself — it's comment-only, zero behavior change.

---

## Rollback

If anything breaks after step 4: revert `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` /
`CLERK_SECRET_KEY` in Vercel back to the dev-instance values (keep them noted somewhere
safe before you overwrite them) and redeploy. Everything else in this migration
(DNS, production org creation) is additive and non-destructive to the dev instance —
nothing about it prevents rolling back the key swap alone.

## Testing checklist (after step 4, before telling clients)

1. Sign in at `www.orchelix.com/sign-in` as Orchelix staff → land on `/dashboard` →
   switch to `orchelix-ai-consulting` org → `/dashboard/admin/onboarding` loads.
2. Sign in as (or impersonate, if Clerk supports it in your plan) an Otro Nivel member
   → `/dashboard/calls` shows real data for `otro-nivel`.
3. Repeat for `coastline-condos`.
4. `/app` — expect this to 401 on live data until step 5 (vtx-os redeploy) ships;
   confirm the "sign in to view live books" gate still renders cleanly rather than
   crashing.
5. `/get-started` — submit a throwaway signup, confirm `/api/platform/signup/*` calls
   still succeed (these don't depend on which Clerk instance is active, but confirm the
   Clerk sign-up step itself works end-to-end on the new keys).
