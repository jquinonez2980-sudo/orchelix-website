import type { Metadata } from "next";
import PageTitle, { PageLede } from "../PageTitle";
import AnalyticsView from "./AnalyticsView";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Analytics | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function AnalyticsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <PageTitle>Analytics</PageTitle>
        <PageLede>Trends in how Esmi is being called.</PageLede>
      </div>
      <AnalyticsView />
    </main>
  );
}
