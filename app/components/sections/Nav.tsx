"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lockup from "./Lockup";
import {
  localizedHref,
  otherLocale,
  stripLocale,
  TRANSLATED_PATHS,
  type Locale,
} from "@/app/i18n/config";
import type { Messages } from "@/app/i18n/messages/en";

/* Site chrome: logo, destinations, language, stamp, menu.

   Two fixes, 2026-09-11.

   THE DESTINATIONS WERE UNREACHABLE WITHOUT A CLICK. All six lived in the
   drawer at every width, including desktop, so the bar offered a visitor the
   logo, a phone number, one stamp and a Menu button — and "Hear Esmi", the
   one link that shows the product actually working, was two interactions deep
   on a site whose stated problem is too few visitors converting. The drawer
   still owns narrow widths, where six links do not fit; from 1024px up they
   are in the bar.

   SEPARATION. The bar used to render translucent-and-blurred over the
   homepage's fixed 3D stage, with a hairline that composited to roughly
   1.3:1 — present in the DOM, invisible on screen, and invisible against a
   dark ground in particular. It is now an opaque paper band on every route,
   which separates from the near-black hero beneath it by a full tonal step:
   a tone change is this world's only divider, and it is doing the work here.

   The DAY/NIGHT control is gone with the scene it drove. Dark is now a fixed
   rhythm of specific bands, and a per-visitor invert of the whole page
   flattened exactly the alternation that rhythm is made of. */

export type NavCopy = Pick<Messages, "nav" | "meta"> & {
  common: Pick<Messages["common"], "phone">;
};

const EN_FALLBACK: NavCopy = {
  nav: {
    products: "Products",
    howItWorks: "How it works",
    industries: "Industries",
    pricing: "Pricing",
    about: "About",
    tryEsmi: "Hear Esmi",
    book: "Book a pilot",
    menu: "Menu",
    primary: "Primary",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Orchelix — Home",
  },
  meta: {
    localeName: "English",
    switchTo: "Español",
    switchLabel: "Cambiar a español",
    language: "Language",
  },
  common: { phone: "+1 561 566 1066" },
};

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
  const menuId = useId();
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const links = [
    { label: t.nav.products, href: localizedHref("/solutions", locale) },
    { label: t.nav.howItWorks, href: localizedHref("/how-it-works", locale) },
    { label: t.nav.industries, href: localizedHref("/industries", locale) },
    { label: t.nav.pricing, href: localizedHref("/pricing", locale) },
    { label: t.nav.about, href: localizedHref("/about", locale) },
    {
      label: t.nav.tryEsmi,
      href: locale === "es" ? "/try-esmi?lang=es" : "/try-esmi",
    },
  ];

  const other = otherLocale(locale);
  const currentPath = stripLocale(pathname || "/");
  const switchHref = TRANSLATED_PATHS.has(currentPath)
    ? localizedHref(currentPath, other)
    : localizedHref("/", other);
  const bookHref = localizedHref("/book", locale);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = menuRef.current?.querySelector<HTMLElement>("a, button");
    first?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

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
    fontStretch: "var(--lg-stretch)",
    fontWeight: "var(--lg-w-ui)",
    fontSize: "0.9375rem",
    letterSpacing: "var(--lg-track-ui)",
    textTransform: "uppercase",
    color: "var(--lg-ink)",
    textDecoration: "none",
  };

  return (
    <header
      data-surface="site"
      className="lg-field lg-cloth lg-nav"
      data-ruled={ruled ? "true" : undefined}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div className="lg-nav__bar mx-auto flex max-w-[1320px] items-center gap-6 px-5 py-3 sm:px-8 lg:px-10">
        <a
          href={localizedHref("/", locale)}
          onClick={close}
          aria-label={t.nav.home}
          style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
        >
          {/* One lockup. There used to be two — a night wordmark swapped in by
              CSS whenever the homepage was in dark mode — and with the mode
              gone the bar is paper on every route, so the graphite lockup is
              the only one that is ever on screen.

              `alt=""`: the anchor above already has an accessible name, and
              labelling the image too made screen readers announce it twice. */}
          <Lockup />
        </a>

        {/* The destinations, in the bar from 1024px up. Below that the drawer
            carries them — the same list, rendered once from `links`, so the
            two can never drift apart. */}
        {/* Its own label: the drawer below is also a <nav> and sharing a name
            would give the page two landmarks a screen reader cannot tell
            apart. */}
        <nav className="lg-nav__links" aria-label={t.nav.primary}>
          {links.map(({ label, href }) => (
            <a key={href} href={href} className="lg-quiet lg-nav__link">
              {label}
            </a>
          ))}
        </nav>

        <div className="lg-nav__actions ml-auto flex items-center gap-3 sm:gap-5">
          <a
            href="tel:+15615661066"
            className="lg-fig lg-quiet lg-nav-phone"
            aria-label={t.common.phone}
          >
            {t.common.phone}
          </a>
          <a
            href={switchHref}
            className="lg-fig lg-quiet hidden sm:inline-flex"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.11em",
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
            /* Size, tracking and padding live on `.lg-nav__stamp` so the
               narrow-bar rule can step them down — inline values here beat
               the 479px override, and the Spanish label overflowed 375px. */
            className="lg-stamp lg-nav__stamp lg-foil-surface inline-flex items-center whitespace-nowrap"
            style={{
              fontFamily: "var(--font-display)",
              fontStretch: "var(--lg-stretch)",
              fontWeight: "var(--lg-w-ui)",
              textTransform: "uppercase",
              color: "var(--lg-foil-ink)",
              textDecoration: "none",
            }}
          >
            {t.nav.book}
          </a>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="lg-menu-btn flex items-center justify-center"
          >
            <span className="lg-menu-btn__label">{t.nav.menu}</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              {open ? (
                <path d="M3.2 2.4l10.4 10.4-.8.8L2.4 3.2zM13.6 2.4l.8.8L4 13.6l-.8-.8z" />
              ) : (
                /* Two plain rules. The four corner squares that stood here
                   read as a game's fullscreen control. */
                <path d="M1 5h14v1H1zM1 10h14v1H1z" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className="lg-menu-scrim"
        data-open={open ? "true" : undefined}
        onClick={close}
        aria-hidden="true"
      />

      <nav
        ref={menuRef}
        id={menuId}
        className="lg-menu"
        data-open={open ? "true" : undefined}
        aria-label={t.nav.menu}
        aria-hidden={open ? undefined : true}
        inert={!open || undefined}
      >
        <div className="lg-menu__inner">
          {links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={close}
              className="lg-menu__link lg-quiet"
              style={linkStyle}
            >
              {label}
            </a>
          ))}

          <div className="lg-menu__foot">
            <a
              href={bookHref}
              onClick={close}
              className="lg-stamp lg-foil-surface inline-flex items-center"
              style={{
                fontFamily: "var(--font-display)",
                fontStretch: "var(--lg-stretch)",
                fontWeight: "var(--lg-w-ui)",
                fontSize: "0.8125rem",
                letterSpacing: "var(--lg-track-ui)",
                textTransform: "uppercase",
                color: "var(--lg-foil-ink)",
                padding: "0.8rem 1.35rem",
                textDecoration: "none",
              }}
            >
              {t.nav.book}
            </a>
            <a
              href={switchHref}
              onClick={close}
              className="lg-fig lg-quiet"
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
          <a
            href="tel:+15615661066"
            onClick={close}
            className="lg-fig lg-quiet lg-menu__phone"
            aria-label={t.common.phone}
          >
            {t.common.phone}
          </a>

        </div>
      </nav>
    </header>
  );
}
