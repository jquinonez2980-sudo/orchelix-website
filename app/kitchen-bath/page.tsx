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
  title: "AI Receptionist for Kitchen, Bath & Stone Businesses — Orchelix",
  description:
    "Esmi answers every call for kitchen builders, stone fabricators, and design/build firms — quotes your starting ranges, qualifies homeowners, and books consultations 24/7 in English and Spanish.",
  alternates: { canonical: "/kitchen-bath" },
};

export default function KitchenBathPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <VerticalHero
          eyebrow="Kitchen · Bath · Stone · Design/Build"
          headline="Your next kitchen job calls while you're on this one."
          gradientWord="Esmi answers."
          sub="An AI receptionist for fabricators, kitchen builders, and design/build firms. Esmi quotes your starting ranges, qualifies serious homeowners from tire-kickers, and books the consultation into your calendar — 24/7, in English and Spanish."
        />
        <PainPoints
          items={[
            {
              stat: "$8–15K",
              title: "The average job that hits voicemail",
              body: "You're at a template appointment or on the saw. A homeowner ready to spend calls, gets voicemail, and dials the next shop on Google.",
            },
            {
              stat: "1st",
              title: "First responder wins the quote visit",
              body: "Homeowners collect 3–4 quotes. The shop that answers books the site visit — and the visit is where the job is won.",
            },
            {
              stat: "EN/ES",
              title: "A huge share of the market prefers Spanish",
              body: "Crews, trades, and plenty of homeowners would rather talk in Spanish. Esmi serves them natively — most shops can't.",
            },
          ]}
        />
        <HowItWorksStrip
          steps={[
            {
              n: "01",
              t: "A homeowner calls or chats",
              d: "Esmi answers instantly — first ring, nights, weekends. Phone and website.",
            },
            {
              n: "02",
              t: "Esmi quotes your ranges",
              d: "“Quartz installs typically start at $45/sq ft” — your numbers, exactly as you set them.",
            },
            {
              n: "03",
              t: "Serious buyers get qualified",
              d: "Budget, timeline, scope. Hot leads escalate straight to your cell. Designers and trades get flagged priority.",
            },
            {
              n: "04",
              t: "The consultation gets booked",
              d: "Into your real calendar, on the spot. You get every detail by email — and you never stopped working.",
            },
          ]}
        />
        <DemoCTA vertical="Ask it what a quartz countertop costs. Try it in Spanish." />
        <VerticalFinalCTA
          headline="Built by someone who knows your industry."
          body="Orchelix works with kitchen builders, stone fabricators, and design/build firms across the Greater Toronto Area and South Florida. Esmi Pro is live in 5 business days — one captured job pays for the year."
        />
      </main>
      <Footer />
    </>
  );
}
