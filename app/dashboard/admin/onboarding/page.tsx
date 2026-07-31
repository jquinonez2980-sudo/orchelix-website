import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { ADMIN_ORG_SLUG } from "../../../lib/platformProxy";
import AdminOnboarding from "./AdminOnboarding";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin — Onboarding | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminOnboardingPage() {
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
        <h1 className="font-display text-2xl font-semibold text-ink">
          Onboarding — Admin
        </h1>
        <p className="mt-1 text-sm text-ink-2">
          Review businesses that signed up themselves. Work the provisioning checklist,
          then approve to let them serve live calls and chats. Nothing here is visible to
          client organizations.
        </p>
      </div>
      <AdminOnboarding />
    </main>
  );
}
