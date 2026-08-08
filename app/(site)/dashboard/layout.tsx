import type { Metadata } from "next";
import { ClerkProvider, OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ADMIN_ORG_SLUG } from "@/app/lib/platformProxy";
import DashboardShell from "./DashboardShell";

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

/* Clerk portals its popovers and modals to the document root, outside the
   `.lg-app` scope, so utility classes alone leave them light-on-dark. The
   `variables` API is Clerk's own token surface and ships with @clerk/nextjs —
   no @clerk/themes dependency needed. Values mirror the ledger tokens; they
   are literals because Clerk resolves them in JS, where `var()` would not
   compute. */
const clerkWidgetAppearance = {
  variables: {
    colorBackground: "#071A2E",
    colorText: "#F4F1E8",
    colorTextSecondary: "rgba(238, 240, 245, 0.72)",
    colorPrimary: "#D9A21B",
    colorInputBackground: "#0B2338",
    colorInputText: "#F4F1E8",
    borderRadius: "0px",
  },
  elements: {
    organizationSwitcherTrigger: "text-ink hover:bg-surface-2",
  },
};

function OrgGate() {
  return (
    <main className="lg-app mx-auto flex min-h-screen max-w-lg flex-col items-center gap-6 px-6 py-24 text-center">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">
          Choose your business
        </h1>
        <p className="mt-2 text-sm leading-6 text-ink-2">
          Your account isn&apos;t viewing a business yet. Pick one below — or,
          if you don&apos;t see your business, ask your Orchelix contact for an
          invitation.
        </p>
      </div>
      {/* "Create organization" routes to our wizard, not Clerk's dialog —
          see the fuller note at the switcher in DashboardShell. Short version:
          a self-named org slug matches no Esmi tenant and 400s every
          /platform call, whereas /get-started reserves the slug first. */}
      <OrganizationSwitcher
        hidePersonal
        createOrganizationMode="navigation"
        createOrganizationUrl="/get-started"
        afterSelectOrganizationUrl="/dashboard"
        appearance={clerkWidgetAppearance}
      />
      <p className="text-sm text-ink-2">
        New to Esmi?{" "}
        <a
          href="/get-started"
          className="font-medium text-navy-600 underline hover:text-navy-700"
        >
          Apply to get set up
        </a>
      </p>
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
    <ClerkProvider afterSignOutUrl="/">
      <DashboardShell isOrchelixStaff={isOrchelixStaff}>
        {orgSlug ? children : <OrgGate />}
      </DashboardShell>
    </ClerkProvider>
  );
}
