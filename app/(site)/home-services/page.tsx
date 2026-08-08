import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import {
  VerticalHero,
  PainPoints,
  HowItWorksStrip,
  DemoCTA,
  VerticalFinalCTA,
} from "@/app/components/sections/VerticalSections";

export const metadata: Metadata = {
  title: "24/7 Bilingual AI Receptionist for Home Services — Orchelix",
  description:
    "Esmi answers every HVAC, plumbing, roofing, and electrical call — after hours, on the job, in English and Spanish — and books the work onto your calendar. Serving South Florida.",
  alternates: { canonical: "/home-services" },
};

export default function HomeServicesPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <VerticalHero
          eyebrow="HVAC · Plumbing · Roofing · Electrical · South Florida"
          headline="The 8pm emergency call goes to whoever answers."
          gradientWord="Esmi answers."
          sub="A bilingual AI receptionist for home-services businesses. Esmi picks up every call — after hours, weekends, while your crew is on a job — qualifies the work, and books it straight onto your calendar. English and Spanish, natively."
        />
        <PainPoints
          items={[
            {
              stat: "$400+",
              title: "Every missed call is a missed job",
              body: "An AC out at 8pm is a $400–$1,500 emergency job. If it hits your voicemail, it books with the next company on Google.",
            },
            {
              stat: "40%+",
              title: "South Florida calls in Spanish",
              body: "A huge share of your market would rather book in Spanish — and almost no shop can serve them after hours. Esmi can.",
            },
            {
              stat: "24/7",
              title: "Your crew can't answer from the attic",
              body: "Every ring your techs answer is a job interrupted. Esmi handles the phone so your crew handles the work.",
            },
          ]}
        />
        <HowItWorksStrip
          steps={[
            {
              n: "01",
              t: "A customer calls — anytime",
              d: "2pm or 2am, Esmi answers on the first ring. No hold, no voicemail, no lost lead.",
            },
            {
              n: "02",
              t: "Esmi qualifies the job",
              d: "Emergency or routine? Service area? The right questions, asked the way you would ask them.",
            },
            {
              n: "03",
              t: "Urgent work reaches you instantly",
              d: "Real emergencies escalate to your on-call phone with the full conversation summary.",
            },
            {
              n: "04",
              t: "Everything else gets booked",
              d: "Straight onto your calendar with name, address, and issue — confirmation sent, summary in your inbox.",
            },
          ]}
        />
        <DemoCTA vertical="Ask about a broken AC. Ask in Spanish. See what your customers would hear." />
        <VerticalFinalCTA
          headline="Live on your line in days — from $299/month."
          body="Esmi Local is live in 48 hours; Esmi Pro with custom qualification in 5 business days. Month-to-month, no contracts, and a 2-week guarantee: if it doesn't pay for itself, we refund the setup."
        />
      </main>
      <Footer />
    </>
  );
}
