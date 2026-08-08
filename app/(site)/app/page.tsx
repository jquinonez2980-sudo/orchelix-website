import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import AcumenDashboard from "./AcumenDashboard";

export const metadata: Metadata = {
  title: "AcumenAI — Operator console",
  description: "Live books: KPIs, the approval queue, and categorized transactions from AcumenAI.",
  robots: { index: false, follow: false },
};

export default function AcumenAppPage() {
  return (
    <>
      <Nav />
      <main id="top" style={{ background: "var(--surface-2)", minHeight: "70vh" }}>
        <AcumenDashboard />
      </main>
      <Footer />
    </>
  );
}
