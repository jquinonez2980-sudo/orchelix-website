import Image from "next/image";

const columns = [
  {
    h: "Agents",
    links: [
      { label: "Virtual Receptionist", href: "#agents-receptionist" },
      { label: "Sales & Marketing",    href: "#agents-revops" },
      { label: "Accounting OS",        href: "#agents-accounting" },
      { label: "Revenue Insights",     href: "#agents-insights" },
    ],
  },
  {
    h: "Company",
    links: [
      { label: "About",    href: "#about" },
      { label: "Careers",  href: "#careers" },
      { label: "Contact",  href: "#contact" },
      { label: "Press kit", href: "#press" },
    ],
  },
  {
    h: "Trust",
    links: [
      { label: "Security", href: "#security" },
      { label: "PIPEDA",   href: "#pipeda" },
      { label: "Privacy",  href: "#privacy" },
      { label: "Status",   href: "#status" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      id="about"
      style={{
        position: "relative",
        background: "var(--surface-2)",
        borderTop: "1px solid var(--line)",
        overflow: "hidden",
      }}
      className="px-6 pb-8 pt-20 sm:px-8 sm:pt-24 lg:px-10 lg:pt-24"
    >
      {/* Subtle helix watermark, bottom-left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: -120,
          bottom: -120,
          width: 420,
          height: 420,
          backgroundImage: "url('/orchelix-mark.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
          opacity: 0.04,
          pointerEvents: "none",
          maskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 30%, transparent 70%)",
        }}
      />

      {/* Top hairline accent */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, var(--teal-200) 30%, var(--navy-300) 70%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-14">
          {/* Brand column */}
          <div>
            <a href="#top" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
              <Image
                src="/orchelix-lockup-horizontal.png"
                alt="Orchelix AI Consulting"
                width={170}
                height={42}
                style={{ height: 42, width: "auto" }}
              />
            </a>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: 1.65,
                color: "var(--ink-2)",
                margin: "20px 0 24px",
                maxWidth: 360,
              }}
            >
              AI agents for SMEs, professional firms, and service organizations
              across North America. Toronto · Mississauga · remote across the
              US and Canada.
            </p>

            <div style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--teal-500)",
                  boxShadow: "0 0 0 3px rgba(20,184,166,0.18)",
                  display: "inline-block",
                  animation: "pulse 2.4s ease-in-out infinite",
                }}
              />
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
                Now booking Q3 pilots
              </span>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.h}>
              <h5
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: 11,
                  lineHeight: 1,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink-3)",
                  margin: "0 0 22px",
                }}
              >
                {col.h}
              </h5>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "grid",
                  gap: 12,
                }}
              >
                {col.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 500,
                        fontSize: 14,
                        lineHeight: 1,
                        color: "var(--ink-2)",
                        textDecoration: "none",
                        transition: "color 180ms var(--ease-standard)",
                      }}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal row */}
        <div
          className="mt-16 flex flex-col gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{
            fontFamily: "var(--font-mono)",
            fontWeight: 500,
            fontSize: 11.5,
            lineHeight: 1,
            letterSpacing: "0.02em",
            color: "var(--ink-3)",
          }}
        >
          <span>© 2026 Orchelix AI Consulting Inc. · Made in Ontario.</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
            <span>EN</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-4)", display: "inline-block" }} />
            <span>ES</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--ink-4)", display: "inline-block" }} />
            <span>FR</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
