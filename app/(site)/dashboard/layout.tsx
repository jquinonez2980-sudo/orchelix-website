import type { Metadata, Viewport } from "next";
import PageTitle, { PageLede } from "./PageTitle";
import { ClerkProvider, OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ADMIN_ORG_SLUG } from "@/app/lib/platformProxy";
import DashboardShell from "./DashboardShell";
import { DashI18nProvider } from "./i18n";
import { dashboardClerkAppearance } from "@/app/lib/clerkAppearance";

/* Esmi tenant dashboard shell (/dashboard).
   ClerkProvider is scoped here — same pattern as the AcumenAI console at
   /app — so the marketing site never depends on Clerk. force-dynamic keeps
   this auth-gated segment out of static prerendering (build needs no keys).

   Tenancy: Clerk Organizations. The active org's SLUG is the Esmi tenant_id
   (enforced server-side in /api/platform/*). Users with no active org see the
   org gate below instead of data. Chrome (sidebar/topbar/drawer) lives in
   DashboardShell — this file only resolves auth state and picks what goes
   inside it. */

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Esmi Dashboard",
  robots: { index: false, follow: false },
  /* Static file, not app/manifest.ts: a root manifest would attach to the
     marketing site. Linked from this layout only so only /dashboard is
     installable. Theme/background match the dashboard's dark Esmi field
     (#0A0F1C, `.lg-app.esmi-dashboard` in app/globals.css) — not
     DESIGN.md's light marketing field, which this route no longer uses. */
  manifest: "/esmi-dashboard.webmanifest",
  /* The installed app is Esmi, not Orchelix. Without this the dashboard
     inherits the marketing site's helix icons and an iPhone home screen shows
     the wrong brand. The marketing tab icon is deliberately untouched. */
  icons: {
    icon: [
      { url: "/esmi-app-192.png", type: "image/png", sizes: "192x192" },
      { url: "/esmi-app-48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: [{ url: "/esmi-app-180.png", sizes: "180x180" }],
  },
  appleWebApp: {
    capable: true,
    title: "Esmi Dashboard",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0F1C",
};

function OrgGate() {
  return (
    <main className="lg-app esmi-dashboard mx-auto flex min-h-screen max-w-lg flex-col items-center gap-6 px-6 py-24 text-center">
      <div
        className="w-full border border-line bg-surface px-6 py-8"
        style={{ borderTop: "2px solid var(--lg-rule)" }}
      >
        {/* No eyebrow above the heading — DESIGN.md forbids the kicker, and
            "Operator console" was telling the reader where they are on the one
            screen where the answer is "nowhere yet, pick a business." */}
        <PageTitle>Choose your business</PageTitle>
        <PageLede>
          Your account isn&apos;t viewing a business yet. Pick one below — or,
          if you don&apos;t see your business, ask your Orchelix contact for an
          invitation.
        </PageLede>
        {/* "Create organization" routes to our wizard, not Clerk's dialog —
            see the fuller note at the switcher in DashboardShell. */}
        <div className="mt-6 flex justify-center">
          <OrganizationSwitcher
            hidePersonal
            createOrganizationMode="navigation"
            createOrganizationUrl="/get-started"
            afterSelectOrganizationUrl="/dashboard"
            appearance={dashboardClerkAppearance}
          />
        </div>
        <p className="mt-6 text-sm text-ink-2">
          New to Esmi?{" "}
          <a
            href="/get-started"
            className="font-medium text-navy-600 underline hover:text-navy-700"
          >
            Apply to get set up
          </a>
        </p>
      </div>
    </main>
  );
}

export default async function EsmiDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { orgSlug } = await auth();
  const isOrchelixStaff = orgSlug === ADMIN_ORG_SLUG;

  return (
    <ClerkProvider afterSignOutUrl="/" appearance={dashboardClerkAppearance}>
      <DashI18nProvider>
        <DashboardShell isOrchelixStaff={isOrchelixStaff}>
          {orgSlug ? children : <OrgGate />}
        </DashboardShell>
      </DashI18nProvider>
    </ClerkProvider>
  );
}
