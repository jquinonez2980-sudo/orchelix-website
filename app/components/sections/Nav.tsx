"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Agents",     href: "/solutions" },
  { label: "Platform",   href: "/how-it-works" },
  { label: "Industries", href: "/industries" },
  { label: "Pricing",    href: "/pricing" },
  { label: "Try Esmi",   href: "/try-esmi" },
  { label: "About",      href: "/about" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const pathname = usePathname();
  const isEs = pathname.startsWith("/es");

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(251,251,252,0.78)",
        backdropFilter: "saturate(140%) blur(14px)",
        WebkitBackdropFilter: "saturate(140%) blur(14px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "18px 40px",
          display: "flex",
          alignItems: "center",
          gap: 40,
        }}
      >
        {/* Logo */}
        <a
          href="/"
          onClick={close}
          aria-label="Orchelix — Home"
          style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
        >
          <Image
            src="/orchelix-lockup-horizontal.png"
            alt="Orchelix AI Consulting"
            width={160}
            height={40}
            priority
            style={{ height: 40, width: "auto" }}
          />
        </a>

        {/* Desktop nav — hidden below lg */}
        <nav
          aria-label="Primary"
          className="hidden lg:flex"
          style={{ gap: 32, marginLeft: 4, alignItems: "center" }}
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="nav-link"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1,
                color: "var(--ink-2)",
                textDecoration: "none",
                padding: "8px 0",
                transition: "color 180ms",
              }}
            >
              {label}
            </a>
          ))}
          <a
            href={isEs ? "/" : "/es"}
            className="nav-link"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 14,
              lineHeight: 1,
              color: "var(--teal-700)",
              textDecoration: "none",
              padding: "8px 0",
              transition: "color 180ms",
            }}
          >
            {isEs ? "English" : "Español"}
          </a>
        </nav>

        {/* Desktop CTA — hidden below lg */}
        <div
          className="hidden lg:flex"
          style={{ marginLeft: "auto", gap: 16, alignItems: "center" }}
        >
          <a
            href="tel:+15615661066"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 13,
              lineHeight: 1,
              letterSpacing: "0.04em",
              color: "var(--ink-2)",
              textDecoration: "none",
              transition: "color 180ms",
            }}
          >
            (561) 566-1066
          </a>
          <a
            href="/book"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 500,
              fontSize: 14,
              lineHeight: 1,
              padding: "13px 20px",
              borderRadius: 10,
              background: "var(--navy-600)",
              color: "#fff",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset, 0 1px 2px rgba(10,37,64,0.10)",
              transition: "background 220ms var(--ease-standard)",
            }}
          >
            Book a demo
          </a>
        </div>

        {/* Mobile hamburger — visible below lg */}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="inline-flex items-center justify-center lg:hidden"
          style={{
            marginLeft: "auto",
            width: 40,
            height: 40,
            borderRadius: 10,
            border: "1px solid var(--line)",
            background: "#fff",
            color: "var(--ink-2)",
            cursor: "pointer",
            flexShrink: 0,
          }}
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="lg:hidden"
          style={{
            borderTop: "1px solid var(--line)",
            background: "var(--paper)",
            padding: "8px 24px 24px",
          }}
        >
          <nav aria-label="Primary mobile" style={{ display: "flex", flexDirection: "column" }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={close}
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: 15,
                  lineHeight: 1,
                  color: "var(--ink)",
                  textDecoration: "none",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(228,232,238,0.7)",
                  transition: "color 180ms",
                }}
              >
                {label}
              </a>
            ))}
            <a
              href={isEs ? "/" : "/es"}
              onClick={close}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1,
                color: "var(--teal-700)",
                textDecoration: "none",
                padding: "14px 0",
                borderBottom: "1px solid rgba(228,232,238,0.7)",
                transition: "color 180ms",
              }}
            >
              {isEs ? "English" : "Español"}
            </a>
          </nav>

          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            <a
              href="tel:+15615661066"
              onClick={close}
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 14,
                lineHeight: 1,
                letterSpacing: "0.04em",
                color: "var(--ink-2)",
                textDecoration: "none",
                textAlign: "center",
                padding: "12px 0",
              }}
            >
              (561) 566-1066
            </a>
            <a
              href="/book"
              onClick={close}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: 15,
                lineHeight: 1,
                padding: "15px 20px",
                borderRadius: 10,
                background: "var(--navy-600)",
                color: "#fff",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset",
                transition: "background 200ms var(--ease-standard)",
              }}
            >
              Book a demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
