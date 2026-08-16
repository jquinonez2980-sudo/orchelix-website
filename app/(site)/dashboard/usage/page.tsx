import type { Metadata } from "next";
import PageTitle, { PageLede } from "../PageTitle";
import Usage from "./Usage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Usage | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function UsagePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>Usage</PageTitle>
        <PageLede>
          Calls and voice minutes Esmi has handled this month.
        </PageLede>
      </div>
      <Usage />
    </main>
  );
}
