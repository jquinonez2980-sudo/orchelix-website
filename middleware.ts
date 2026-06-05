import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/* Clerk middleware scoped to the AcumenAI operator console only. The matcher
   below limits execution to /app/* — the marketing site never runs Clerk, so it
   has zero dependence on Clerk keys and cannot be broken by a missing key. */
const isProtected = createRouteMatcher(["/app(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});

export const config = {
  matcher: ["/app", "/app/:path*"],
};
