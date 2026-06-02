import type { Metadata } from "next";
import Nav from "../components/sections/Nav";
import Footer from "../components/sections/Footer";
import ContactForm from "../components/sections/ContactForm";
import FinalCTA from "../components/sections/FinalCTA";
import JsonLd from "../components/JsonLd";

const SITE_URL = "https://www.orchelix.com";
const PAGE_PATH = "/ai-receptionist";

export const metadata: Metadata = {
  title: "AI Receptionist for Small Business — Esmi",
  description:
    "Esmi is an AI receptionist that answers every call 24/7, qualifies leads, books appointments, and handles FAQs — bilingual (EN/ES), with a human handoff when it matters. Book a demo.",
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PAGE_PATH}`,
    title: "AI Receptionist for Small Business — Esmi by Orchelix",
    description:
      "An AI virtual receptionist that answers calls 24/7, qualifies leads, and books appointments. Bilingual, with human handoff. See it live.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Receptionist for Small Business — Esmi by Orchelix",
    description:
      "An AI virtual receptionist that answers calls 24/7, qualifies leads, and books appointments. Bilingual, with human handoff.",
  },
};

/* ─── FAQ content (drives both the visible accordion and FAQPage schema) ──── */

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is an AI receptionist?",
    a: "An AI receptionist is a virtual phone agent that answers your incoming calls automatically — greeting callers, answering common questions, qualifying leads, and booking appointments — without a human picking up the phone. Esmi works 24/7 and escalates to your team when a call needs a person.",
  },
  {
    q: "How is an AI receptionist different from a traditional answering service?",
    a: "A traditional answering service takes messages and forwards them; you still call people back. Esmi handles the whole interaction in real time — answering questions, qualifying the caller, and booking the appointment on your calendar before they hang up — so there's nothing to follow up on later.",
  },
  {
    q: "Can the AI receptionist book appointments?",
    a: "Yes. Esmi reads your live calendar, offers open slots, books the appointment, and sends a confirmation by SMS — all on the same call. No staff handoff required.",
  },
  {
    q: "Does Esmi speak Spanish?",
    a: "Yes. Esmi is bilingual (English and Spanish) and can switch language mid-call, which matters for serving South Florida and bilingual markets.",
  },
  {
    q: "What happens when a call needs a human?",
    a: "Esmi escalates to your team and hands off the full call context — who's calling, what they need, and a summary — so the person taking over isn't starting from scratch.",
  },
  {
    q: "How long does it take to set up?",
    a: "Esmi typically launches in 2–3 weeks. We configure it on your scripts, calendar, and FAQs, then test it with you before it goes live.",
  },
  {
    q: "Will callers know they're talking to AI?",
    a: "Esmi is designed to be natural and helpful, and we're transparent about how it's introduced. You control the greeting and tone so it reflects your brand.",
  },
  {
    q: "How much does an AI receptionist cost?",
    a: "Esmi is offered as a flexible monthly managed service with no long-term contracts. See current packages on our pricing page, or book a demo for a quote tailored to your call volume.",
  },
];

/* ─── Schema ──────────────────────────────────────────────────────────────── */

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Esmi — AI Receptionist",
  serviceType: "AI Virtual Receptionist",
  description:
    "AI receptionist that answers calls 24/7, qualifies leads, books appointments, and handles FAQs — bilingual (EN/ES) with human handoff.",
  url: `${SITE_URL}${PAGE_PATH}`,
  provider: { "@id": `${SITE_URL}/#org` },
  areaServed: [
    { "@type": "AdministrativeArea", name: "South Florida" },
    { "@type": "AdministrativeArea", name: "North America" },
  ],
  availableLanguage: ["English", "Spanish"],
  audience: { "@type": "BusinessAudience", name: "Small and mid-sized service businesses" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "AI Receptionist", item: `${SITE_URL}${PAGE_PATH}` },
  ],
};

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function AiReceptionistPage() {
  return (
    <>
      <JsonLd data={[serviceJsonLd, faqJsonLd, breadcrumbJsonLd]} />
      <Nav />
      <main id="main-content">
        <Hero />
        <Problem />
        <HowItWorks />
        <Benefits />
        <FinalCTA />
        <Testimonials />
        <PricingTeaser />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}

/* ─── Shared bits ─────────────────────────────────────────────────────────── */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
      style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
    >
      <span className="inline-block h-px w-[18px] bg-current opacity-70" />
      {children}
    </span>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20 sm:px-8 sm:pt-28 sm:pb-24 lg:px-10 lg:pt-[132px] lg:pb-[112px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 80% at 88% 22%, rgba(20,184,166,0.10), transparent 60%),
            radial-gradient(circle at 1px 1px, rgba(10,37,64,0.05) 1px, transparent 1.5px)
          `,
          backgroundSize: "auto, 28px 28px",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 30%, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 30%, black 30%, transparent 90%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[820px] text-center">
        <Eyebrow>AI Virtual Receptionist · EN / ES</Eyebrow>
        <h1
          className="mt-6 mb-6 text-balance text-[40px] leading-[1.04] font-medium tracking-[-0.032em] sm:text-[54px] lg:text-[64px] lg:leading-[1.02]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          An{" "}
          <span style={{ color: "var(--teal-700)" }}>AI receptionist</span>{" "}
          that answers every call, day or night.
        </h1>
        <p
          className="mx-auto mb-9 max-w-[600px] text-[17px] leading-[1.6] sm:text-[19px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          Esmi answers your phones 24/7, qualifies every lead, books appointments
          straight into your calendar, and handles your FAQs — bilingually, and with
          a human handoff the moment it&apos;s needed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/book"
            className="inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            style={{
              fontFamily: "var(--font-display)",
              background: "var(--navy-600)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset, 0 4px 20px rgba(10,37,64,0.18)",
            }}
          >
            Book a demo <span className="ml-1.5 opacity-65">→</span>
          </a>
          <a
            href="/try-esmi"
            className="inline-flex h-12 items-center rounded-xl border px-6 text-[15px] font-medium transition-colors hover:bg-white"
            style={{ fontFamily: "var(--font-display)", borderColor: "var(--line-strong)", color: "var(--ink)" }}
          >
            Try Esmi live
          </a>
        </div>
        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] font-medium"
          style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
        >
          <span>Answers on the first ring</span>
          <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
          <span>24/7 · nights · weekends</span>
          <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
          <span>Live in 2–3 weeks</span>
        </div>
      </div>
    </section>
  );
}

/* ─── Problem ─────────────────────────────────────────────────────────────── */

const PROBLEMS = [
  {
    h: "Missed calls are missed revenue",
    p: "When no one picks up, callers don't leave a voicemail — they call your competitor. Every unanswered ring is a lost customer.",
  },
  {
    h: "After-hours calls go nowhere",
    p: "Most booking-ready calls come outside 9-to-5. Voicemail and an answering machine don't book the appointment — they just delay it.",
  },
  {
    h: "Front-desk staff are stretched thin",
    p: "Receptionists juggle walk-ins, paperwork, and the phone at once. Hiring, training, and covering sick days is expensive and never quite enough.",
  },
  {
    h: "Slow follow-up kills leads",
    p: "A lead that waits hours for a callback has already moved on. Speed-to-answer is the difference between a booking and a bounce.",
  },
];

function Problem() {
  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{ borderTop: "1px solid var(--line)", background: "var(--surface-2)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow>The cost of a ringing phone</Eyebrow>
          <h2
            className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            A phone no one answers is a leak in your business.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PROBLEMS.map((item) => (
            <div
              key={item.h}
              className="rounded-[18px] border p-6 sm:p-7"
              style={{ borderColor: "var(--line)", background: "#fff" }}
            >
              <h3
                className="mb-2 text-[17px] font-semibold leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {item.h}
              </h3>
              <p
                className="text-[15px] leading-[1.6]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {item.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How it works ────────────────────────────────────────────────────────── */

const STEPS = [
  {
    n: "01",
    h: "We train Esmi on your business",
    p: "Your services, hours, FAQs, scripts, and calendar. Esmi learns to sound like your front desk — in English and Spanish.",
  },
  {
    n: "02",
    h: "Esmi answers every call",
    p: "Day or night, on the first ring. It greets callers, answers questions, and qualifies leads with the questions your team would ask.",
  },
  {
    n: "03",
    h: "It books and confirms",
    p: "Esmi offers open slots from your live calendar, books the appointment, and sends a bilingual SMS confirmation on the same call.",
  },
  {
    n: "04",
    h: "Humans step in when it matters",
    p: "For anything sensitive or complex, Esmi escalates to your team with the full call summary — no caller repeats themselves.",
  },
];

function HowItWorks() {
  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow>How Esmi works</Eyebrow>
          <h2
            className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Live in weeks, not months.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.n} className="flex flex-col gap-3">
              <span
                className="text-[13px] font-medium tracking-[0.04em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--teal-600)" }}
              >
                {step.n}
              </span>
              <span
                aria-hidden="true"
                className="block h-px w-full"
                style={{ background: "var(--line)" }}
              />
              <h3
                className="mt-1 text-[17px] font-semibold leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {step.h}
              </h3>
              <p
                className="text-[15px] leading-[1.6]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {step.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Benefits ────────────────────────────────────────────────────────────── */

function Icon({ path }: { path: React.ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}

const BENEFITS: { icon: React.ReactNode; h: string; p: string }[] = [
  {
    icon: <Icon path={<><path d="M12 2a10 10 0 1 0 10 10" /><path d="M12 6v6l4 2" /></>} />,
    h: "Never miss a call",
    p: "24/7 coverage on the first ring — nights, weekends, holidays, and overflow when your team is busy.",
  },
  {
    icon: <Icon path={<><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></>} />,
    h: "Qualifies every lead",
    p: "Asks the questions your sales team would, scores the lead, and writes a brief into your CRM before the caller hangs up.",
  },
  {
    icon: <Icon path={<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /><path d="m9 16 2 2 4-4" /></>} />,
    h: "Books appointments end-to-end",
    p: "Reads your live calendar, offers the right slots, books the visit, and confirms by SMS — all on one call.",
  },
  {
    icon: <Icon path={<><path d="M5 8h14M5 8a2 2 0 1 1 0-4h14a2 2 0 1 1 0 4M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" /><path d="m9 14 2 2 4-4" /></>} />,
    h: "Bilingual by default",
    p: "Fluent in English and Spanish, switching language mid-call — built for South Florida and bilingual markets.",
  },
  {
    icon: <Icon path={<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>} />,
    h: "Human handoff, built in",
    p: "Escalates to your team with full context when a call needs a person. AI for the routine, humans for the rest.",
  },
  {
    icon: <Icon path={<><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>} />,
    h: "Every call, captured",
    p: "Summaries, transcripts, and lead notes land where your team already works — nothing falls through the cracks.",
  },
];

function Benefits() {
  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{ borderTop: "1px solid var(--line)", background: "var(--surface-2)" }}
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow>What you get</Eyebrow>
          <h2
            className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            A front desk that never sleeps.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <div
              key={b.h}
              className="rounded-[18px] border p-6 sm:p-7"
              style={{ borderColor: "var(--line)", background: "#fff" }}
            >
              <span
                className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[12px]"
                style={{ background: "var(--teal-50)", color: "var(--teal-700)", border: "1px solid var(--teal-100)" }}
              >
                {b.icon}
              </span>
              <h3
                className="mb-2 text-[17px] font-semibold leading-snug"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {b.h}
              </h3>
              <p
                className="text-[15px] leading-[1.6]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {b.p}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ────────────────────────────────────────────────────────────
   PLACEHOLDER CONTENT — replace with real, attributable customer quotes before
   relying on this for trust. No fabricated company names or logos are used on
   purpose; swap `quote` and `attribution` once you have consent to publish.   */

const TESTIMONIALS = [
  {
    quote:
      "[Placeholder] After hours used to mean voicemail. Now every call gets answered and booked — we stopped losing weekend leads.",
    attribution: "Owner, service business",
  },
  {
    quote:
      "[Placeholder] The bilingual handling alone paid for itself. Spanish-speaking callers finally get the same experience.",
    attribution: "Operations lead, multi-location practice",
  },
  {
    quote:
      "[Placeholder] It qualifies the caller and drops a clean summary in our CRM. My team stops chasing tire-kickers.",
    attribution: "Sales manager, field-service company",
  },
];

function Testimonials() {
  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[640px] text-center">
          <Eyebrow>What owners say</Eyebrow>
          <h2
            className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Built to earn trust on the first call.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.attribution}
              className="flex flex-col gap-4 rounded-[18px] border p-6 sm:p-7"
              style={{ borderColor: "var(--line)", background: "#fff" }}
            >
              <blockquote
                className="text-[16px] leading-[1.6]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
              >
                {t.quote}
              </blockquote>
              <figcaption
                className="text-[13px] font-medium tracking-[0.02em]"
                style={{ fontFamily: "var(--font-mono)", color: "var(--ink-3)" }}
              >
                {t.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing teaser ──────────────────────────────────────────────────────── */

function PricingTeaser() {
  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      style={{ borderTop: "1px solid var(--line)", background: "var(--surface-2)" }}
    >
      <div className="mx-auto max-w-[760px] text-center">
        <Eyebrow>Simple, flexible pricing</Eyebrow>
        <h2
          className="mt-4 mb-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          A monthly managed service — no long contracts.
        </h2>
        <p
          className="mx-auto mb-8 max-w-[520px] text-[16px] leading-[1.6]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          Start with Esmi and add more agents as you grow. Monitoring, optimization,
          and a senior consultant are included. Cancel anytime.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="/pricing"
            className="inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
          >
            See pricing <span className="ml-1.5 opacity-65">→</span>
          </a>
          <a
            href="/book"
            className="inline-flex h-12 items-center rounded-xl border px-6 text-[15px] font-medium transition-colors hover:bg-white"
            style={{ fontFamily: "var(--font-display)", borderColor: "var(--line-strong)", color: "var(--ink)" }}
          >
            Get a tailored quote
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ (native details — no client JS) ─────────────────────────────────── */

function Faq() {
  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[820px]">
        <div className="mb-10 text-center">
          <Eyebrow>Frequently asked</Eyebrow>
          <h2
            className="mt-4 text-[30px] font-semibold leading-[1.1] tracking-[-0.022em] sm:text-[38px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            AI receptionist questions, answered.
          </h2>
        </div>
        <div className="flex flex-col divide-y" style={{ borderColor: "var(--line)" }}>
          {FAQS.map((faq) => (
            <details key={faq.q} className="group py-5" style={{ borderColor: "var(--line)" }}>
              <summary
                className="flex cursor-pointer list-none items-start justify-between gap-4 text-left"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span className="text-[15px] font-semibold leading-snug" style={{ color: "var(--ink)" }}>
                  {faq.q}
                </span>
                <span
                  className="mt-0.5 shrink-0 text-[18px] leading-none transition-transform group-open:rotate-45"
                  style={{ color: "var(--ink-3)" }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p
                className="mt-3 text-[14.5px] leading-[1.65]"
                style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
              >
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
