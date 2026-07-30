import type { Metadata } from "next";
import { ClerkProvider, OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { ADMIN_ORG_SLUG } from "../lib/platformProxy";
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

const clerkWidgetAppearance = {
  elements: {
    organizationSwitcherTrigger: "text-ink hover:bg-surface-2 rounded-md",
  },
};

function OrgGate() {
  return (
    <main className="mx-auto flex max-w-lg flex-col items-center gap-6 px-6 py-24 text-center">
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
      <OrganizationSwitcher
        hidePersonal
        afterSelectOrganizationUrl="/dashboard"
        appearance={clerkWidgetAppearance}
      />
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
