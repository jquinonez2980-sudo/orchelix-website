import type { Metadata } from "next";
import Appointments from "./Appointments";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Appointments | Esmi Dashboard",
  robots: { index: false, follow: false },
};

export default function AppointmentsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Appointments
        </h1>
        <p className="mt-1 text-sm text-ink-2">
          Every appointment on your calendar — booked by Esmi over the phone,
          through your website, or added by hand.
        </p>
      </div>
      <Appointments />
    </main>
  );
}
