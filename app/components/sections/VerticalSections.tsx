/* Shared sections for vertical landing pages (/kitchen-bath, /home-services). */

export function VerticalHero({
  eyebrow,
  headline,
  gradientWord,
  sub,
}: {
  eyebrow: string;
  headline: string;
  gradientWord: string;
  sub: string;
}) {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-16 text-center sm:px-8 sm:pt-28 sm:pb-20 lg:px-10 lg:pt-[132px] lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 50% 0%, rgba(20,184,166,0.08), transparent 60%),
            radial-gradient(circle at 1px 1px, rgba(10,37,64,0.05) 1px, transparent 1.5px)
          `,
          backgroundSize: "auto, 28px 28px",
          backgroundPosition: "center, 0 0",
          maskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 30%, transparent 90%)",
          WebkitMaskImage: "radial-gradient(ellipse 100% 80% at 50% 0%, black 30%, transparent 90%)",
        }}
      />
      <div className="relative z-10 mx-auto max-w-[820px]">
        <span
          className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.18em]"
          style={{ fontFamily: "var(--font-mono)", color: "var(--teal-700)" }}
        >
          <span className="inline-block h-px w-[18px] bg-current opacity-70" />
          {eyebrow}
          <span className="inline-block h-px w-[18px] bg-current opacity-70" />
        </span>
        <h1
          className="mt-6 mb-6 text-balance text-[38px] leading-[1.08] font-medium tracking-[-0.03em] sm:text-[54px] sm:leading-[1.04] lg:text-[62px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {headline}{" "}
          <span
            className="bg-gradient-to-br from-navy-600 via-teal-500 to-teal-400 bg-clip-text font-normal italic"
            style={{ WebkitTextFillColor: "transparent", paddingRight: "0.1em" }}
          >
            {gradientWord}
          </span>
        </h1>
        <p
          className="mx-auto mb-10 max-w-[640px] text-[17px] leading-[1.6] sm:text-[18px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          {sub}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+15615661066"
            className="inline-flex h-12 items-center rounded-xl px-7 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
          >
            Call the live demo — (561) 566-1066
          </a>
          <a
            href="/book"
            className="inline-flex h-12 items-center rounded-xl border px-7 text-[15px] font-medium transition-colors"
            style={{
              fontFamily: "var(--font-display)",
              borderColor: "var(--line)",
              color: "var(--navy-600)",
              background: "#fff",
            }}
          >
            Book a strategy call
          </a>
        </div>
      </div>
    </section>
  );
}

export function PainPoints({
  items,
}: {
  items: { stat: string; title: string; body: string }[];
}) {
  return (
    <section
      className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10"
      style={{ background: "var(--surface-2)", borderTop: "1px solid var(--line)" }}
    >
      <div className="mx-auto grid max-w-[1200px] gap-5 md:grid-cols-3">
        {items.map((p) => (
          <div
            key={p.title}
            className="rounded-[18px] border bg-white p-7"
            style={{ borderColor: "var(--line)", boxShadow: "0 2px 8px rgba(10,37,64,0.05)" }}
          >
            <div
              className="text-[34px] font-semibold tracking-[-0.02em]"
              style={{ fontFamily: "var(--font-display)", color: "var(--teal-700)" }}
            >
              {p.stat}
            </div>
            <div
              className="mb-2 mt-2 text-[16px] font-semibold leading-snug"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
            >
              {p.title}
            </div>
            <p
              className="text-[14px] leading-[1.6]"
              style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
            >
              {p.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HowItWorksStrip({
  steps,
}: {
  steps: { n: string; t: string; d: string }[];
}) {
  return (
    <section className="px-6 py-16 sm:px-8 sm:py-20 lg:px-10" style={{ borderTop: "1px solid var(--line)" }}>
      <div className="mx-auto max-w-[1200px]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex gap-5 rounded-[18px] border bg-white p-6"
              style={{ borderColor: "var(--line)", boxShadow: "0 2px 8px rgba(10,37,64,0.05)" }}
            >
              <span
                className="shrink-0 text-[13px] font-bold tabular-nums"
                style={{ fontFamily: "var(--font-mono)", color: "var(--teal-500)" }}
              >
                {s.n}
              </span>
              <div>
                <div
                  className="mb-1.5 text-[15px] font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  {s.t}
                </div>
                <p
                  className="text-[14px] leading-[1.6]"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
                >
                  {s.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DemoCTA({ vertical }: { vertical: string }) {
  return (
    <section className="px-6 pb-4 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div
          className="overflow-hidden rounded-[24px] p-10 text-center sm:p-12"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 100% 0%, rgba(20,184,166,0.18), transparent 60%),
              linear-gradient(180deg, #0D2238 0%, #061B33 100%)
            `,
          }}
        >
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.15em]"
            style={{ fontFamily: "var(--font-mono)", color: "#5EEAD4" }}
          >
            Don&apos;t take our word for it
          </div>
          <h2
            className="mx-auto mt-3 max-w-[620px] text-[26px] font-semibold leading-[1.15] text-white sm:text-[32px]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Call Esmi right now and try to stump her.
          </h2>
          <p
            className="mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.6] text-white/60"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {vertical}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+15615661066"
              className="inline-flex h-12 items-center rounded-xl bg-white px-7 text-[15px] font-medium transition-opacity hover:opacity-90"
              style={{ fontFamily: "var(--font-display)", color: "var(--navy-700)" }}
            >
              📞 (561) 566-1066
            </a>
            <a
              href="/try-esmi"
              className="inline-flex h-12 items-center rounded-xl border border-white/25 px-7 text-[15px] font-medium text-white transition-colors hover:bg-white/10"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Or chat with Esmi →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VerticalFinalCTA({ headline, body }: { headline: string; body: string }) {
  return (
    <section className="px-6 py-16 text-center sm:px-8 sm:py-20 lg:px-10">
      <div className="mx-auto max-w-[720px]">
        <h2
          className="mb-4 text-[28px] font-semibold leading-[1.15] tracking-[-0.022em] sm:text-[34px]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
        >
          {headline}
        </h2>
        <p
          className="mb-8 text-[16px] leading-[1.65]"
          style={{ fontFamily: "var(--font-display)", color: "var(--ink-2)" }}
        >
          {body}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/book"
            className="inline-flex h-12 items-center rounded-xl px-7 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
            style={{ fontFamily: "var(--font-display)", background: "var(--navy-600)" }}
          >
            Book a free strategy call
          </a>
          <a
            href="/pricing"
            className="inline-flex h-12 items-center rounded-xl border px-7 text-[15px] font-medium transition-colors"
            style={{
              fontFamily: "var(--font-display)",
              borderColor: "var(--line)",
              color: "var(--navy-600)",
              background: "#fff",
            }}
          >
            See pricing →
          </a>
        </div>
      </div>
    </section>
  );
}
