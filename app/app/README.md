# AcumenAI operator console (`/app`)

The authed ops dashboard for AcumenAI — live KPIs, the approval queue, and
transactions from the Cloud Run API (`acumenai-api`, built in the **vtx-os** repo).

It is committed in a **build-safe** state: it compiles **without** Clerk installed
and, with no auth provider wired, renders a "sign in to view live books" gate
(`useAcumenToken` returns no token, so `/api/live/*` is never called with a bad
token). Wiring it up is the two steps below.

## What's here
- `app/lib/acumenApi.ts` — typed client for the dashboard API (bearer token).
- `app/app/useAcumenToken.ts` — token hook (STUB; swap to Clerk — see below).
- `app/app/AcumenDashboard.tsx` — the ops UI (KPI cards, approval queue, transactions).
- `app/app/page.tsx` — the `/app` route (noindex).

## Step 1 — point the UI at the deployed API
Deploy the API from the vtx-os repo:

```powershell
# in vtx-os
.\scripts\deploy_dashboard.ps1            # prints the https://acumenai-api-....run.app URL
```

Then set, in this repo's env (`.env.local` and Vercel project env):

```
NEXT_PUBLIC_ACUMEN_API_BASE=https://acumenai-api-XXXX.run.app
```

`GET /api/health` and `GET /api/demo/run` work immediately (public). `/api/live/*`
needs Step 2.

## Step 2 — wire Clerk (the identity provider)
1. Create a Clerk app; get the publishable + secret keys.
2. Install: `npm i @clerk/nextjs`
3. Wrap the root layout — in `app/layout.tsx`:
   ```tsx
   import { ClerkProvider } from "@clerk/nextjs";
   // …
   return (
     <ClerkProvider>
       <html lang="en">{/* …existing… */}</html>
     </ClerkProvider>
   );
   ```
4. Add `middleware.ts` at the repo root to protect `/app`:
   ```ts
   import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
   const isProtected = createRouteMatcher(["/app(.*)"]);
   export default clerkMiddleware((auth, req) => { if (isProtected(req)) auth().protect(); });
   export const config = { matcher: ["/((?!_next|.*\\..*).*)"] };
   ```
5. Replace the body of `app/app/useAcumenToken.ts` with the Clerk version (the exact
   snippet is in that file's comment): `useAuth().getToken()` + `isSignedIn`/`isLoaded`.

## Step 3 — tell the API to trust Clerk's tokens
Re-deploy the API with Clerk's JWKS/issuer (public values, not secrets):

```powershell
# in vtx-os
.\scripts\deploy_dashboard.ps1 `
  -JwksUrl  "https://<your-clerk-domain>/.well-known/jwks.json" `
  -Issuer   "https://<your-clerk-domain>" `
  -CorsOrigin "https://orchelix.com,https://www.orchelix.com"
```

The API validates every `/api/live/*` request's JWT against that JWKS and records the
signed-in user's email as the approval reviewer. Done — sign in at `/app` and the
console shows live books.
