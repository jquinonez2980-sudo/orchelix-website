import { NextResponse, type NextRequest } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { DEFAULT_LOCALE, LOCALIZED_PATHS } from "./app/i18n/config";

/* Two concerns share this file, and they are kept strictly apart.

   1. LOCALE REWRITING (marketing). English is the default locale and is served
      unprefixed — `/pricing`, not `/en/pricing` — because the site has SEO
      history on those URLs. The pages live under `app/[locale]/`, so an
      unprefixed request is rewritten to `/en/...` internally. A rewrite, not a
      redirect: the visitor's address bar keeps the clean URL. `/es/...` already
      matches the segment and passes straight through.

   2. CLERK (authed surfaces only). The previous version of this file scoped
      Clerk's matcher so marketing routes never touched it — "zero auth
      overhead, zero TTFB penalty" — and that property is preserved here. The
      matcher below is wider because locale rewriting needs to see marketing
      paths, so clerkMiddleware is invoked *conditionally* instead: a marketing
      request returns from the rewrite branch before Clerk is ever called.

   The apex-domain redirect (orchelix.com → www) stays in next.config.ts
   redirects(), which run before this. */

const isProtected = createRouteMatcher(["/app(.*)", "/dashboard(.*)"]);

/** Routes that need Clerk's request handling at all. */
const NEEDS_CLERK = [
  "/app",
  "/dashboard",
  "/get-started",
  "/sign-in",
  "/sign-up",
  "/api/platform",
];

const clerk = clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) await auth.protect();
});

const localizedPaths = new Set<string>(LOCALIZED_PATHS);

/** True for an unprefixed marketing path that must be rewritten to /en. */
function needsLocaleRewrite(pathname: string): boolean {
  const trimmed = pathname.replace(/\/+$/, "") || "/";
  if (localizedPaths.has(trimmed)) return true;
  /* Routes nested under a localized parent — /ai-receptionist/hvac and the
     other six sector pages. `/` is excluded because every path starts with
     it, which would rewrite the whole site. */
  return LOCALIZED_PATHS.some((p) => p !== "/" && trimmed.startsWith(`${p}/`));
}

export default function proxy(req: NextRequest, event: Parameters<typeof clerk>[1]) {
  const { pathname } = req.nextUrl;

  if (needsLocaleRewrite(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname.replace(/\/+$/, "")}`;
    return NextResponse.rewrite(url);
  }

  if (NEEDS_CLERK.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return clerk(req, event);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /* Marketing paths, for the locale rewrite. Kept explicit rather than a
       catch-all so nothing else pays for middleware it does not need. */
    "/",
    "/pricing",
    "/solutions",
    "/how-it-works",
    "/industries",
    "/about",
    "/book",
    "/home-services",
    "/kitchen-bath",
    "/ai-receptionist",
    "/ai-receptionist/:path*",
    /* Clerk surfaces. */
    "/app(.*)",
    "/dashboard(.*)",
    "/get-started(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/platform(.*)",
  ],
};
