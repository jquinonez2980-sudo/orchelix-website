import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden"
      style={{ minHeight: "clamp(600px, 90vh, 920px)" }}
    >
      {/* Full-bleed image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-main.png"
          alt="Business professional using Orchelix AI agents with analytics overlays"
          fill
          priority
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
          style={{ objectFit: "cover", objectPosition: "65% center" }}
        />
      </div>

      {/* Gradient veil — dark left, clear right */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `linear-gradient(105deg,
            rgba(6,18,36,0.97) 0%,
            rgba(6,18,36,0.93) 28%,
            rgba(6,18,36,0.72) 48%,
            rgba(6,18,36,0.18) 66%,
            transparent 78%
          )`,
        }}
      />

      {/* Bottom fade into next section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-28"
        style={{ background: "linear-gradient(to top, rgba(6,18,36,0.55), transparent)" }}
      />

      {/* Content */}
      <div
        className="relative z-10 mx-auto flex max-w-[1200px] flex-col justify-center px-6 py-28 sm:px-8 sm:py-32 lg:px-10 lg:py-[148px]"
        style={{ minHeight: "inherit" }}
      >
        <div className="max-w-[580px]">
          <Eyebrow>Multi-agent revenue operations</Eyebrow>

          <h1
            className="mt-7 mb-8 text-balance text-[42px] leading-[1.04] font-medium tracking-[-0.032em] text-white sm:text-[60px] sm:leading-[1.02] sm:tracking-[-0.035em] lg:text-[76px] lg:leading-[1.01] lg:tracking-[-0.038em]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            AI agents that{" "}
            <span
              className="bg-gradient-to-br from-teal-300 via-teal-400 to-teal-500 bg-clip-text font-normal italic"
              style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
            >
              actually run
            </span>{" "}
            your revenue operations.
          </h1>

          <p
            className="mb-10 max-w-[500px] text-[17px] leading-[1.6] text-white/70 sm:text-[18px] lg:text-[19px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            A multi-agent system that qualifies leads, handles calls, closes
            deals, and runs the financial close — so your team spends their
            time on the work that compounds.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/book"
              className="inline-flex h-12 items-center rounded-xl bg-white px-6 text-[15px] font-medium transition-opacity hover:opacity-90"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--navy-700)",
                boxShadow: "0 1px 0 rgba(255,255,255,0.15) inset, 0 4px 20px rgba(0,0,0,0.30)",
              }}
            >
              Book a demo <span className="ml-1.5 opacity-65">→</span>
            </a>
            <a
              href="/how-it-works"
              className="inline-flex h-12 items-center rounded-xl border border-white/25 px-6 text-[15px] font-medium text-white/90 transition-colors hover:bg-white/10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              See how it works
            </a>
          </div>

          <ProofBar />
        </div>
      </div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-2.5 text-[11px] leading-none font-medium uppercase tracking-[0.18em] text-teal-400"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span className="inline-block h-px w-[18px] bg-current opacity-70" />
      {children}
    </span>
  );
}

function ProofBar() {
  return (
    <div
      className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] leading-none font-medium tracking-[0.02em] text-white/45"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      <span>EN&nbsp;·&nbsp;ES&nbsp;bilingual</span>
      <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
      <span>SOC&nbsp;2&nbsp;in-progress</span>
      <span className="inline-block h-1 w-1 rounded-full bg-teal-500" />
      <span>PIPEDA-aligned</span>
    </div>
  );
}
