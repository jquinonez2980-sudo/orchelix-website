import type { Metadata } from "next";
import PageTitle, { PageLede } from "../../PageTitle";
import { auth } from "@clerk/nextjs/server";
import { ADMIN_ORG_SLUG } from "@/app/lib/platformProxy";
import AdminTenants from "./AdminTenants";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Tenants | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminTenantsPage() {
  const { orgSlug } = await auth();
  if (orgSlug !== ADMIN_ORG_SLUG) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-3 rounded-lg border border-line bg-surface px-6 py-16 text-center shadow-sm">
          <p className="font-display text-base font-semibold text-ink">
            Admin access required
          </p>
          <p className="max-w-sm text-sm text-ink-3">
            This page is only available to Orchelix staff, signed in under the Orchelix
            organization.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>Tenants — Admin</PageTitle>
        <PageLede>
          Assign each tenant&apos;s plan and account status. Internal only — not visible
          to client organizations.
        </PageLede>
        <p className="mt-1.5 text-sm text-ink-3">
          Setting a tenant to{" "}
          <strong className="font-medium text-ink-2">suspended</strong> or{" "}
          <strong className="font-medium text-ink-2">archived</strong> stops Esmi
          answering their calls and chats right away. They keep dashboard access and
          see a banner explaining why.
        </p>
      </div>
      <AdminTenants />
    </main>
  );
}
