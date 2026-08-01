import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

/* /get-started — self-serve onboarding application (Phase 4 ticket 4.1).

   Its own segment rather than a page under /dashboard: that layout renders an
   OrgGate INSTEAD of its children whenever orgSlug is null, which is exactly
   the state every applicant is in, so a wizard nested there would never
   render. Route groups don't escape a parent layout either.

   ClerkProvider is scoped here for the same reason it's scoped to /dashboard
   and /app — the marketing site must not depend on Clerk. proxy.ts includes
   this path in its matcher (so auth() works) but NOT in isProtected: signed-out
   visitors get an in-page sign-in card rather than a redirect to Clerk's
   hosted portal. */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Get started with Esmi | Orchelix",
  description:
    "Apply to have Esmi answer your calls and book your appointments. Orchelix reviews every application before your line goes live.",
};

export default function GetStartedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <div className="min-h-screen bg-surface-2">{children}</div>
    </ClerkProvider>
  );
}
