export default function Trust() {
  const stats = [
    { num: "128", unit: "k",   label: "Calls handled by Orchelix agents this year." },
    { num: "3",   unit: ".4×", label: "Faster month-end close after Accounting OS." },
    { num: "94",  unit: "%",   label: "Of qualified leads handed off with full context." },
    { num: "14",  unit: "d",   label: "From first call to your first agent in production." },
  ];

  const industries = [
    "Healthcare & Dental",
    "Legal & Professional Services",
    "Real Estate & Mortgage",
    "Trades & Home Services",
    "Accounting Firms",
    "Retail & Hospitality",
  ];

  return (
    <section style={{ padding: "32px 0 88px" }}>
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8 lg:px-10">
        <p
          style={{
            textAlign: "center",
            maxWidth: 700,
            margin: "0 auto 40px",
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: 17,
            lineHeight: 1.6,
            color: "var(--ink-2)",
          }}
        >
          Built for operators across North America &mdash; owner-led businesses,
          professional corporations, and service organizations ready to scale
          with intelligent automation.
        </p>

        <div
          style={{
            display: "flex",
            gap: 40,
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "28px 0",
            borderTop: "1px solid var(--line)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 11,
              lineHeight: 1,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
            }}
          >
            Built for
          </span>
          {industries.map(industry => (
            <span
              key={industry}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1,
                letterSpacing: "-0.005em",
                color: "var(--ink-3)",
                opacity: 0.75,
              }}
            >
              {industry}
            </span>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-10">
          {stats.map(({ num, unit, label }) => (
            <div key={label}>
              <div
                className="text-[36px] sm:text-[48px]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                }}
              >
                {num}
                <span style={{ color: "var(--teal-500)", fontWeight: 500 }}>{unit}</span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "var(--ink-2)",
                  marginTop: 14,
                  maxWidth: 240,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
