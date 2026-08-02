import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/* Clerk proxy scoped to the authed surfaces only:
     /app          — AcumenAI operator console
     /dashboard    — Esmi tenant dashboard (Clerk Organizations = tenants)
     /api/platform — Esmi dashboard API proxy (needs clerkMiddleware so the
                     route handler can call auth(); it returns JSON 401 itself
                     rather than redirecting, hence not in isProtected)
     /get-started  — self-serve signup. In the matcher so auth()/currentUser()
                     work, but NOT in isProtected: auth.protect() would bounce
                     signed-out visitors to Clerk's hosted portal, whereas the
                     page renders an in-page modal sign-in card (the same
                     pattern /app uses). Lets marketing link straight to it.
     /sign-in,
     /sign-up      — hosted-on-our-domain auth pages (NEXT_PUBLIC_CLERK_SIGN_IN_URL /
                     NEXT_PUBLIC_CLERK_SIGN_UP_URL in .env.local point here).
                     In the matcher so Clerk's middleware handles them, but NOT
                     in isProtected — they must stay reachable signed-out, that's
                     the whole point. Needed because the dev Clerk instance can
                     only redirect back to *.accounts.dev after its hosted
                     Account Portal, never www.orchelix.com; auth.protect()'s
                     default redirect (below) now resolves to these routes
                     instead of that hosted portal.
   Marketing routes (/, /es, /pricing, /try-esmi, …) never touch Clerk — zero
   auth overhead, zero TTFB penalty. The apex-domain redirect (orchelix.com →
   www.orchelix.com) is already handled by next.config.ts redirects(), which
   run before proxy, so it is not duplicated here. */
const isProtected = createRouteMatcher(["/app(.*)", "/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});

export const config = {
  // Marketing pages get no Clerk overhead whatsoever.
  matcher: [
    "/app(.*)",
    "/dashboard(.*)",
    "/get-started(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/platform(.*)",
  ],
};
