import type { Metadata } from "next";
import { ClerkProvider, OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ADMIN_ORG_SLUG } from "@/app/lib/platformProxy";
import DashboardShell from "./DashboardShell";
import { DashI18nProvider } from "./i18n";
import { clerkWidgetAppearance } from "@/app/lib/clerkAppearance";

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
};

function OrgGate() {
  return (
    <main className="lg-app mx-auto flex min-h-screen max-w-lg flex-col items-center gap-6 px-6 py-24 text-center">
      <div
        className="w-full border border-line bg-surface px-6 py-8"
        style={{ borderTop: "2px solid var(--lg-rule)" }}
      >
        <p
          className="lg-fig text-xs uppercase tracking-wide text-ink-3"
          style={{ letterSpacing: "0.12em" }}
        >
          Operator console
        </p>
        <h1 className="mt-2 font-display text-2xl font-semibold uppercase tracking-tight text-ink">
          Choose your business
        </h1>
        <p className="mt-2 text-sm leading-6 text-ink-2">
          Your account isn&apos;t viewing a business yet. Pick one below — or,
          if you don&apos;t see your business, ask your Orchelix contact for an
          invitation.
        </p>
        {/* "Create organization" routes to our wizard, not Clerk's dialog —
            see the fuller note at the switcher in DashboardShell. */}
        <div className="mt-6 flex justify-center">
          <OrganizationSwitcher
            hidePersonal
            createOrganizationMode="navigation"
            createOrganizationUrl="/get-started"
            afterSelectOrganizationUrl="/dashboard"
            appearance={clerkWidgetAppearance}
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
    <ClerkProvider afterSignOutUrl="/" appearance={clerkWidgetAppearance}>
      <DashI18nProvider>
        <DashboardShell isOrchelixStaff={isOrchelixStaff}>
          {orgSlug ? children : <OrgGate />}
        </DashboardShell>
      </DashI18nProvider>
    </ClerkProvider>
  );
}
