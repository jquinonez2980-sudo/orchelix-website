import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClerkProvider } from "@clerk/nextjs";
import { ui } from "@clerk/ui";
import { esmiAuthAppearance } from "@/app/lib/clerkAppearance";

/* Hosted-on-our-domain sign-in — replaces Clerk's Account Portal redirect.
   The dev Clerk instance can only redirect back to *.accounts.dev after a
   hosted-portal sign-in, never www.orchelix.com, so proxy.ts's auth.protect()
   (via NEXT_PUBLIC_CLERK_SIGN_IN_URL in .env.local) sends signed-out visitors
   here instead. ClerkProvider is scoped to this segment, same pattern as
   /dashboard, /app, and /get-started — the marketing site never touches Clerk.

   Appearance is set on the provider so every Clerk surface (form, modal,
   dropdown) gets readable ink-on-field tokens. The page shell is always
   painted so a slow Clerk load never looks like a blank void.

   2026-08-19 — THE DOOR MATCHES THE ROOM. This was a white card on light grey
   with the magenta house stamp, which is what /dashboard looked like until
   d67582e turned the Esmi console dark and cyan. The two surfaces are one
   navigation apart, so the seam was visible on every single sign-in. The
   shell now carries `lg-app esmi-dashboard` — the console's own token scope,
   not a copy of it — so this page cannot drift from the console again: any
   future change to those tokens moves both.

   `esmi-auth` adds only what a full-page door needs on top of the console
   scope (aurora, ruled field, glass card). See app/globals.css.

   WHY `ui={ui}`. The `.esmi-auth .cl-` block in app/globals.css styles Clerk
   by its internal class names, and clerk-js warns at runtime that those
   depend on a DOM it may change in any deployed update — a silent, remote
   breakage with no commit of ours attached to it. `@clerk/ui` serves the
   components from this bundle instead of from Clerk's CDN, so the markup
   moves only when the dependency is upgraded here, in a diff, behind the
   normal build. That is the point: it converts an unversioned remote risk
   into a normal dependency bump. Applied to the two auth routes only; the
   other three ClerkProvider mounts (/app, /dashboard, /get-started) still
   load the remote build and still carry the original risk.

   SHARED DOOR, ONE COAT. /sign-in also fronts AcumenAI's console at /app,
   which keeps its navy-and-gold world. Dressing this page as Esmi is a
   deliberate call, not an oversight — Esmi is the self-serve product and the
   overwhelming majority of arrivals here. If AcumenAI ever needs its own
   door, branch on the already-parsed and allowlisted `redirect_url` in
   page.tsx rather than adding a second route. */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign in | Esmi",
  robots: { index: false, follow: false },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider ui={ui} afterSignOutUrl="/" appearance={esmiAuthAppearance}>
      <div
        className="lg-app esmi-dashboard esmi-auth flex flex-col items-center justify-center px-4 py-16"
        style={{
          /* `svh` rather than `vh`: on mobile the URL bar collapsing while a
             field is focused must not shove the footnote under the fold. */
          minHeight: "100svh",
          paddingLeft: "max(1rem, env(safe-area-inset-left))",
          paddingRight: "max(1rem, env(safe-area-inset-right))",
          paddingBottom: "max(4rem, env(safe-area-inset-bottom))",
          color: "var(--lg-ink)",
        }}
      >
        <div className="esmi-auth-settle esmi-auth-settle-1 mb-8 flex flex-col items-center gap-3">
          <Link href="/" aria-label="Orchelix home">
            <Image
              src="/esmi-logo.png"
              alt="Esmi"
              width={160}
              height={77}
              /* Next 16 deprecated `priority` in favour of `preload`. This is
                 the LCP element on the route either way. */
              preload
              style={{ height: 36, width: "auto" }}
            />
          </Link>
          <p className="esmi-auth-kicker">Sign in to your console</p>
        </div>

        <div className="esmi-auth-card esmi-auth-settle esmi-auth-settle-2">
          {children}
        </div>

        <p className="esmi-auth-footnote esmi-auth-settle esmi-auth-settle-3" style={{ marginTop: "1.5rem" }}>
          No account yet? <Link href="/sign-up">Apply to get started</Link>
        </p>
      </div>
    </ClerkProvider>
  );
}
