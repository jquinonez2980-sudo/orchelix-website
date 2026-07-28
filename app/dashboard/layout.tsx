import type { Metadata } from "next";
import Link from "next/link";
import {
  ClerkProvider,
  OrganizationSwitcher,
  UserButton,
} from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

/* Esmi tenant dashboard shell (/dashboard).
   ClerkProvider is scoped here — same pattern as the AcumenAI console at
   /app — so the marketing site never depends on Clerk. force-dynamic keeps
   this auth-gated segment out of static prerendering (build needs no keys).

   Tenancy: Clerk Organizations. The active org's SLUG is the Esmi tenant_id
   (enforced server-side in /api/platform/*). Users with no active org see the
   org gate below instead of data. */

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
        afterSelectOrganizationUrl="/dashboard/calls"
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
  return (
    <ClerkProvider afterSignOutUrl="/">
      <div className="min-h-screen bg-paper">
        <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
            <Link
              href="/dashboard/calls"
              className="flex items-baseline gap-2 font-display font-semibold text-ink"
            >
              Orchelix
              <span className="text-teal-600">· Esmi</span>
            </Link>
            <nav className="ml-2 flex items-center gap-1 text-sm">
              <Link
                href="/dashboard/calls"
                className="rounded-md px-3 py-1.5 font-medium text-ink hover:bg-surface-2"
              >
                Calls
              </Link>
              <span
                className="cursor-default rounded-md px-3 py-1.5 text-ink-4"
                title="Coming soon"
              >
                Overview
              </span>
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <OrganizationSwitcher
                hidePersonal
                afterSelectOrganizationUrl="/dashboard/calls"
                appearance={clerkWidgetAppearance}
              />
              <UserButton />
            </div>
          </div>
        </header>
        <Gate>{children}</Gate>
      </div>
    </ClerkProvider>
  );
}

async function Gate({ children }: { children: React.ReactNode }) {
  // proxy.ts already guarantees a signed-in user on /dashboard(.*); this only
  // decides between "has an active org" and the org-selection gate.
  const { orgSlug } = await auth();
  if (!orgSlug) return <OrgGate />;
  return <>{children}</>;
}
