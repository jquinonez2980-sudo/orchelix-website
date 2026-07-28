# Esmi tenant dashboard (`/dashboard`)

The client-facing dashboard for the Esmi AI receptionist (PLATFORM_BLUEPRINT.md
Ticket 3, read-only phase). First feature: the Call Log at `/dashboard/calls`.

## Architecture

```
Browser ──(Clerk session cookie)── /dashboard/calls        (this repo, App Router)
   └── fetch /api/platform/calls   (same-origin Route Handler)
         │  auth() → active Clerk org → orgSlug == Esmi tenant_id
         │  adds X-Platform-Secret + X-Tenant-Id (server-side only)
         └── GET https://ai-receptionist-…railway.app/platform/calls  (FastAPI)
```

**Why a server-side proxy instead of forwarding a Clerk JWT to FastAPI:** the
platform secret never reaches the browser, the tenant id is derived from the
caller's active organization (a client cannot request another tenant's data no
matter what it sends), and the FastAPI side needs zero new auth code today.
When the dashboard grows write endpoints (Phase 2), swap the shared secret for
Clerk JWT verification (JWKS) in FastAPI — this proxy is the single place that
changes.

**Tenancy = Clerk Organizations.** The org **slug** must equal the Esmi
`tenant_id` (`tenants/<id>/` in the ai-receptionist repo — e.g. `otro-nivel`,
`coastline-condos`). Membership in the org IS the authorization to see that
tenant's data. Users with no active org get an org-picker gate, not data.

Clerk is scoped to this segment (`app/dashboard/layout.tsx` wraps its own
`ClerkProvider`, same pattern as the AcumenAI console at `/app`) — marketing
routes never touch Clerk. `proxy.ts` protects `/dashboard(.*)` and runs
clerkMiddleware on `/api/platform(.*)` so the route handler can call `auth()`.

## Environment variables (Vercel + `.env.local`)

| Var | Where | Notes |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | already set for `/app` | shared Clerk app |
| `CLERK_SECRET_KEY` | already set for `/app` | shared Clerk app |
| `PLATFORM_API_SECRET` | **new** | must equal the Railway service's `PLATFORM_API_SECRET` |
| `RAILWAY_API_URL` | optional | defaults to the -5375 production URL |

## Onboarding a client to the dashboard

1. Clerk Dashboard → Organizations → Create: **slug = tenant_id** (e.g.
   `otro-nivel`), name = business name.
2. Enable Organizations in the Clerk app if not already on.
3. Invite the client's email to the org (role: member).
4. They sign in at `www.orchelix.com/dashboard` → pick the org → Call Log.

## Adding the next page

Drop a folder under `app/dashboard/<page>/` — the layout (nav, org gate,
ClerkProvider) is inherited. Add API needs under `app/api/platform/*`
following `calls/route.ts` (allow-list params, derive tenant from `orgSlug`,
never expose the secret).
