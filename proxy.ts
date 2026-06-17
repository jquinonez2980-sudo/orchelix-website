import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/* Clerk proxy scoped to the AcumenAI operator console only.
   Marketing routes (/, /es, /pricing, /try-esmi, …) never touch Clerk — zero
   auth overhead, zero TTFB penalty. The apex-domain redirect (orchelix.com →
   www.orchelix.com) is already handled by next.config.ts redirects(), which
   run before proxy, so it is not duplicated here. */
const isProtected = createRouteMatcher(["/app(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});

export const config = {
  // Only run on /app/* — marketing pages get no Clerk overhead whatsoever.
  matcher: ["/app(.*)"],
};
