"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  localizedHref,
  otherLocale,
  stripLocale,
  TRANSLATED_PATHS,
  type Locale,
} from "@/app/i18n/config";
import type { Messages } from "@/app/i18n/messages/en";

/* Six items. Products, How it works, Industries, Pricing, About, Hear Esmi.
   Hrefs point at the routes that exist today; the /products/* consolidation
   in REDESIGN-PLAN.md is a follow-up, and a nav of 404s helps nobody.

   `Hear Esmi` (/try-esmi) was added 2026-08-08. It had been reachable only
   from the home hero and one link on /industries — absent from the nav and
   from the footer both — which left the strongest asset on the site with no
   route in from the chrome.

   Copy arrives as a prop rather than being imported: catalogues are
   server-only, and this is a client component for the mobile drawer. */

/* Only the slices this component renders. Nav is a client component, so its
   props cross the server/client boundary in the RSC payload — passing the
   whole catalogue would ship every page's copy to the browser for a header. */
export type NavCopy = Pick<Messages, "nav" | "meta">;

const EN_FALLBACK: NavCopy = {
  nav: {
    products: "Products",
    howItWorks: "How it works",
    industries: "Industries",
    pricing: "Pricing",
    about: "About",
    tryEsmi: "Hear Esmi",
    book: "Book a pilot",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Orchelix — Home",
  },
  meta: { localeName: "English", switchTo: "Español", switchLabel: "Cambiar a español" },
};

/* Props default to English so the routes under `app/(site)/` — which are
   English-only and outside the locale segment — can render the shared chrome
   without threading a catalogue through every one of them. */
export default function Nav({
  locale = "en",
  t = EN_FALLBACK,
}: {
  locale?: Locale;
  t?: NavCopy;
} = {}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const pathname = usePathname();

  const links = [
    { label: t.nav.products, href: localizedHref("/solutions", locale) },
    { label: t.nav.howItWorks, href: localizedHref("/how-it-works", locale) },
    { label: t.nav.industries, href: localizedHref("/industries", locale) },
    { label: t.nav.pricing, href: localizedHref("/pricing", locale) },
    { label: t.nav.about, href: localizedHref("/about", locale) },
    { label: t.nav.tryEsmi, href: "/try-esmi" },
  ];

  /* The switcher keeps you on the page you are reading rather than dumping you
     on the home page of the other language — the single most common failure of
     bolted-on bilingual sites. The one exception is a page that has no
     translation yet: there, the home page is the honest destination, because
     the alternative is a 404 or an English page wearing a Spanish URL. */
  const other = otherLocale(locale);
  const currentPath = stripLocale(pathname || "/");
  const switchHref = TRANSLATED_PATHS.has(currentPath)
    ? localizedHref(currentPath, other)
    : localizedHref("/", other);
  const bookHref = localizedHref("/book", locale);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* The header's bottom border is `--lg-hair`, which composites to about
     1.3:1 on the field — invisible over a dark section, so the chrome had no
     edge and read as part of the page. Past the first 24px the page is ruled
     off from the chrome in the ledger's own device: the hair becomes the red
     rule and the header steps up one field tone.

     State flips once at the threshold rather than on every scroll event, so
     React re-renders twice per page at most. Colour only — no height change,
     no blur, no shadow; the nav does not shrink or float. */
  const [ruled, setRuled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24;
      setRuled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontStretch: "88%",
    fontWeight: 500,
    fontSize: "0.8125rem",
    letterSpacing: "0.075em",
    textTransform: "uppercase",
    color: "var(--lg-ink-2)",
    textDecoration: "none",
  };

  return (
    <header
      className="lg-field lg-cloth lg-nav"
      data-ruled={ruled ? "true" : undefined}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="mx-auto flex max-w-[1320px] items-center gap-8 px-5 py-4 sm:px-8 lg:px-10">
        <a
          href={localizedHref("/", locale)}
          onClick={close}
          aria-label={t.nav.home}
          style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
        >
          {/* 2026-08-10 rebrand: the wordmark used to be a gold-foil mask
              effect over the old lockup's alpha (a stamp catching light on
              a dark field). The new brand's logo is full colour on its own
              — graphite structure, magenta strand — and the field is light
              now, so it just renders directly rather than being masked
              behind a metallic ramp. */}
          <img
            src="/orchelix-logo-full-color.png"
            alt={t.nav.home}
            width={140}
            height={49}
            style={{ display: "block", height: 34, width: "auto" }}
          />
        </a>

        <nav className="ml-auto hidden items-center gap-8 lg:flex">
          {links.map(({ label, href }) => (
            <a key={href} href={href} className="lg-quiet" style={linkStyle}>
              {label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-5 lg:ml-0">
          <a
            href={switchHref}
            className="lg-fig lg-quiet hidden sm:inline-flex"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.11em",
              /* Was `--lg-ink-3` (4.68:1 at 11px) — the dimmest thing in the
                 header and reading as disabled. This is a navigation
                 control, not meta text, so it takes the link ink (8.39:1). */
              color: "var(--lg-ink-2)",
              textDecoration: "none",
            }}
            lang={other}
            hrefLang={other}
            aria-label={t.meta.switchLabel}
          >
            {other.toUpperCase()}
          </a>

          <a
            href={bookHref}
            className="lg-stamp lg-foil-surface inline-flex items-center whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "88%",
              fontWeight: 700,
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#FFFFFF",
              padding: "0.6rem 1.05rem",
              textDecoration: "none",
            }}
          >
            {t.nav.book}
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="lg:hidden flex items-center justify-center"
            style={{
              background: "transparent",
              border: "1px solid var(--lg-hair)",
              color: "var(--lg-ink)",
              width: 44,
              height: 44,
              cursor: "pointer",
              lineHeight: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
              {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2 5h14M2 9h14M2 13h14" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="lg:hidden"
          style={{ borderTop: "1px solid var(--lg-hair)", background: "var(--lg-field-2)" }}
        >
          <div className="mx-auto max-w-[1320px] px-5 py-2 sm:px-8">
            {links.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={close}
                style={{
                  ...linkStyle,
                  display: "block",
                  fontSize: "0.9375rem",
                  color: "var(--lg-ink)",
                  padding: "0.95rem 0",
                  borderBottom: "1px solid var(--lg-hair-2)",
                }}
              >
                {label}
              </a>
            ))}

            <div className="flex items-center gap-6 py-5">
              <a
                href={bookHref}
                onClick={close}
                className="lg-stamp lg-foil-surface inline-flex items-center"
                style={{
                  fontFamily: "var(--font-display)",
                  fontStretch: "88%",
                  fontWeight: 700,
                  fontSize: "0.8125rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#FFFFFF",
                  padding: "0.8rem 1.35rem",
                  textDecoration: "none",
                }}
              >
                {t.nav.book}
              </a>
              <a
                href={switchHref}
                onClick={close}
                className="lg-fig"
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.11em",
                  color: "var(--lg-ink-2)",
                  textDecoration: "none",
                }}
                lang={other}
                hrefLang={other}
              >
                {t.meta.switchTo}
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
