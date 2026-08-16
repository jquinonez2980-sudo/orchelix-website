import type { Metadata } from "next";
import PageTitle, { PageLede } from "../PageTitle";
import SchedulingStatus from "./SchedulingStatus";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Scheduling | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function SchedulingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>Scheduling</PageTitle>
        <PageLede>
          Calendar connection and the booking hours Esmi follows.
        </PageLede>
      </div>
      <SchedulingStatus />
    </main>
  );
}
