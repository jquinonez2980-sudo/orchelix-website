import type { Metadata } from "next";
import Nav from "@/app/components/sections/Nav";
import Footer from "@/app/components/sections/Footer";
import ShowcaseDemo from "./ShowcaseDemo";

export const metadata: Metadata = {
  title: "AcumenAI — Books that reconcile themselves",
  description:
    "AcumenAI by Orchelix is the accounting & finance OS: it reads bank statements, verifies every transaction against the bank's own balance, categorizes to the GL, and queues exceptions for one-click human approval — with a full audit trail.",
  alternates: { canonical: "/acumen" },
};

export default function AcumenPage() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Why />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20 sm:px-8 sm:pt-28 lg:px-10 lg:pt-[132px] lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 0%, rgba(217,162,27,0.08), transparent 60%),
            radial-gradient(circle at 1px 1px, rgba(10,37,64,0.05) 1px, transparent 1.5px)
          `,
          backgroundSize: "auto, 28px 28px",
          backgroundPosition: "center, 0 0",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 30%, transparent 90%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left — copy */}
        <div className="min-w-0 max-w-[560px]">
          <span
            className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold-700)" }}
          >
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
            AcumenAI · by Orchelix
          </span>

          <h1
            className="mt-6 mb-6 text-balance text-[36px] leading-[1.05] font-medium tracking-[-0.036em] sm:text-[52px] sm:leading-[1.04] lg:text-[64px] lg:leading-[1.04]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
          >
            Books that{" "}
            <span
              className="bg-gradient-to-br from-navy-600 via-gold-500 to-gold-400 bg-clip-text font-normal italic"
              style={{
                WebkitTextFillColor: "transparent",
                paddingRight: "0.12em",
                WebkitBoxDecorationBreak: "clone",
                boxDecorationBreak: "clone",
              }}
            >
              reconcile themselves
            </span>
            .
          </h1>

          <p
            className="mb-8 max-w-[520px] text-[17px] leading-[1.6] sm:text-[18px] lg:text-[19px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
          >
            AcumenAI reads a bank statement, checks every transaction against the
            bank’s own running balance, categorizes it to the right GL account,
            and queues only the judgment calls for a human — with an immutable
            audit trail behind every step. Press run.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://acumenai-api-lscziarcxa-pd.a.run.app"
              className="inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-semibold transition-opacity hover:opacity-90"
              style={{ fontFamily: "var(--font-display)", background: "var(--gold-500)", color: "#1A1206", boxShadow: "0 1px 0 rgba(255,255,255,0.25) inset, 0 2px 8px rgba(217,162,27,0.25)" }}
            >
              Go to Dashboard <span className="ml-1.5 opacity-70">→</span>
            </a>
            <a
              href="/book"
              className="inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(10,37,64,0.10)] transition-opacity hover:opacity-90"
              style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
            >
              Book a demo
            </a>
            <a
              href="#why"
              className="inline-flex h-12 items-center rounded-xl border px-6 text-[15px] font-medium transition-colors hover:bg-surface-2"
              style={{ fontFamily: "var(--font-display)", borderColor: "var(--line-strong)", background: "#fff", color: "var(--navy-600)" }}
            >
              How it works
            </a>
          </div>
        </div>

        {/* Right — live demo */}
        <ShowcaseDemo />
      </div>
    </section>
  );
}

/* ─── Why it's different ──────────────────────────────────────────────────── */

const POINTS = [
  {
    h: "Balance-chain verification",
    p: "Every transaction's signed amount must equal the change in the bank's own running balance. Math, not a language model's guess — so sign-flips and dropped rows surface instead of slipping through.",
    icon: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></>,
  },
  {
    h: "Immutable audit trail",
    p: "Every parse, categorization, and approval is logged with a timestamp and reason — attributable and exportable. The compliance backbone an accounting firm actually needs.",
    icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-4" /></>,
  },
  {
    h: "A human approves, never keys",
    p: "Clear transactions are categorized automatically; the judgment calls are queued for one-click approve / reject. Per-client rules learn over time, so the queue shrinks as the books mature.",
    icon: <><path d="M11 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /><path d="M19 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><path d="m17 8 2 2 4-4" /></>,
  },
];

function Why() {
  return (
    <section id="why" className="scroll-mt-24 border-t py-20 sm:py-24 lg:py-28" style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <div className="mb-12 max-w-[640px]">
          <span className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
            style={{ fontFamily: "var(--font-mono)", color: "var(--gold-700)" }}>
            <span className="inline-block h-px w-[18px] bg-current opacity-70" />
            Why AcumenAI
          </span>
          <h2 className="mb-3 text-[28px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-[38px] lg:text-[44px]"
            style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
            Accuracy you can audit, not just trust.
          </h2>
          <p className="text-[16px] leading-[1.6]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
            Pure-LLM bookkeeping guesses. AcumenAI verifies — against the bank’s
            own numbers — and shows its work.
          </p>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-[20px] border sm:grid-cols-2 lg:grid-cols-3"
          style={{ borderColor: "var(--line)", background: "var(--line)" }}>
          {POINTS.map((pt) => (
            <div key={pt.h} className="flex flex-col gap-4 bg-white p-8">
              <div
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-[13px]"
                style={{
                  background: "linear-gradient(135deg, var(--gold-50) 0%, #FFFFFF 100%)",
                  color: "var(--gold-700)",
                  border: "1px solid var(--gold-100)",
                  boxShadow: "0 1px 0 rgba(255,255,255,0.9) inset, 0 6px 12px -6px rgba(217,162,27,0.20)",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  {pt.icon}
                </svg>
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full"
                  style={{ background: "var(--gold-500)", boxShadow: "0 0 0 3px rgba(217,162,27,0.18)" }} />
              </div>
              <div>
                <div className="mb-1.5 text-[15px] font-semibold leading-snug" style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}>
                  {pt.h}
                </div>
                <p className="text-[13.5px] leading-[1.6]" style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}>
                  {pt.p}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ─────────────────────────────────────────────────────────────────── */

function CTA() {
  return (
    <section className="px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-32 lg:pt-[72px]" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto max-w-[1200px]">
        <div
          className="overflow-hidden rounded-[24px] p-10 sm:p-12 lg:p-16"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 100% 0%, rgba(217,162,27,0.18), transparent 60%),
              radial-gradient(ellipse 60% 80% at 0% 100%, rgba(217,162,27,0.10), transparent 60%),
              linear-gradient(180deg, #0D2238 0%, #061B33 100%)
            `,
            boxShadow: "0 40px 100px -30px rgba(10,37,64,0.55), 0 1px 0 rgba(255,255,255,0.08) inset",
          }}
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1">
              <h2 className="mb-4 text-[28px] font-semibold leading-[1.1] tracking-[-0.022em] text-white sm:text-[34px] lg:text-[40px]"
                style={{ fontFamily: "var(--font-display)" }}>
                One bookkeeper, 200 clients.
              </h2>
              <p className="max-w-[540px] text-[16px] leading-[1.6] text-white/60 sm:text-[17px]" style={{ fontFamily: "var(--font-display)" }}>
                AcumenAI does the reading, the math, and the data entry. Your
                team reviews exceptions and approves — the part that needs
                judgment. See it run on your own books in a 14-day pilot.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <a href="/book"
                className="inline-flex h-12 items-center rounded-xl border border-white/20 px-6 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10"
                style={{ fontFamily: "var(--font-display)" }}>
                Talk to a consultant
              </a>
              <a href="https://acumenai-api-lscziarcxa-pd.a.run.app"
                className="inline-flex h-12 items-center rounded-xl px-6 text-[15px] font-semibold transition-opacity hover:opacity-90"
                style={{ fontFamily: "var(--font-display)", background: "var(--gold-500)", color: "#1A1206" }}>
                Go to Dashboard <span className="ml-1.5 opacity-70">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
