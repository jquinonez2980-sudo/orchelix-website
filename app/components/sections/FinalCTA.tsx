export default function FinalCTA() {
  return (
    <section className="px-6 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-32 lg:pt-[72px]">
      <div className="mx-auto max-w-[1200px]">
        <div
          className="flex flex-col gap-7 sm:gap-8 lg:flex-row lg:items-center lg:gap-10"
          style={{
            position: "relative",
            overflow: "hidden",
            background: "var(--navy-700)",
            backgroundImage: `
              radial-gradient(ellipse 60% 100% at 100% 50%, rgba(20,184,166,0.28), transparent 65%),
              radial-gradient(ellipse 50% 90% at 0% 100%, rgba(20,184,166,0.12), transparent 60%),
              radial-gradient(ellipse 80% 50% at 50% 0%, rgba(20,184,166,0.10), transparent 70%),
              linear-gradient(135deg, #0A2540 0%, #051A31 100%)
            `,
            borderRadius: 26,
            padding: "48px 32px",
            color: "#fff",
            border: "1px solid rgba(20,184,166,0.18)",
            boxShadow: `
              0 1px 0 rgba(255,255,255,0.08) inset,
              0 0 0 1px rgba(20,184,166,0.06),
              0 40px 100px -30px rgba(10,37,64,0.45),
              0 24px 60px -20px rgba(20,184,166,0.14)
            `,
          }}
        >
          {/* Subtle grid */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.35,
              pointerEvents: "none",
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
              `,
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse 80% 100% at 50% 0%, black, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 100% at 50% 0%, black, transparent 80%)",
            }}
          />
          {/* Helix watermark */}
          <div
            style={{
              position: "absolute",
              right: -80,
              top: -40,
              width: 300,
              height: 300,
              backgroundImage: "url('/orchelix-mark-light.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              opacity: 0.06,
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h3
              className="text-[26px] sm:text-[32px] lg:text-[38px]"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                lineHeight: 1.12,
                letterSpacing: "-0.026em",
                margin: 0,
                maxWidth: 560,
                color: "#fff",
              }}
            >
              Start with one agent. See results in 30 days.
            </h3>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: 16,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.75)",
                margin: "14px 0 0",
                maxWidth: 480,
              }}
            >
              Deploy your first agent in under two weeks with a dedicated consultant. No long contracts. Cancel anytime.
            </p>
          </div>

          <div
            className="flex flex-wrap gap-3 lg:ml-auto lg:shrink-0"
            style={{ position: "relative", zIndex: 1 }}
          >
            <a
              href="#contact"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1,
                padding: "15px 24px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "#fff",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 220ms var(--ease-standard)",
              }}
            >
              Talk to a consultant
            </a>
            <a
              href="#book"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1,
                padding: "15px 24px",
                borderRadius: 12,
                border: "1px solid transparent",
                background: "#fff",
                color: "var(--navy-600)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "all 220ms var(--ease-standard)",
              }}
            >
              Book a demo
              <span style={{ fontSize: 14, opacity: 0.85 }}>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
