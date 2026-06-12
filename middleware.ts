import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/* Clerk middleware scoped to the AcumenAI operator console only. The matcher
   below limits execution to /app/* — the marketing site never runs Clerk, so it
   has zero dependence on Clerk keys and cannot be broken by a missing key. */
const isProtected = createRouteMatcher(["/app(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Force apex domain (orchelix.com) → www.orchelix.com with a 301 Permanent Redirect.
  // This runs at the Edge and helps ensure a true 301 instead of Vercel's default 307.
  const host = req.headers.get("host") || "";
  if (host === "orchelix.com") {
    const url = req.nextUrl.clone();
    url.hostname = "www.orchelix.com";
    return NextResponse.redirect(url, 301);
  }

  if (isProtected(req)) await auth.protect();
});

export const config = {
  // Broad matcher so the apex domain redirect applies to all marketing routes
  // (homepage, /es, /blog, etc.). Static assets and internal Next paths are excluded.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
