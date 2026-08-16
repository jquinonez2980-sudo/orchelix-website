import type { Metadata } from "next";
import PageTitle, { PageLede } from "../PageTitle";
import TeamManager from "./TeamManager";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Team | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function TeamPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>Team</PageTitle>
        <PageLede>
          Invite people to help manage this business&apos;s Esmi dashboard, and control
          what they can do.
        </PageLede>
      </div>
      <TeamManager />
    </main>
  );
}
