"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  localizedHref,
  otherLocale,
  stripLocale,
  TRANSLATED_PATHS,
  type Locale,
} from "@/app/i18n/config";
import type { Messages } from "@/app/i18n/messages/en";
import ConditionsControl from "./ConditionsControl";

/* Collapsed chrome: logo, language, stamp, menu. The six destinations
   live in the drawer on every width so the first viewport can be a poster
   rather than a link row. */

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
    openMenu: "Open menu",
    closeMenu: "Close menu",
    home: "Orchelix — Home",
  },
  meta: {
    localeName: "English",
    switchTo: "Español",
    switchLabel: "Cambiar a español",
    language: "Language",
    lighting: "Lighting",
    day: "Day",
    night: "Night",
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
  /* The lighting control drives the Inscription scene, which only the
     homepage mounts. Everywhere else the language link keeps its existing
     inline treatment so no other route's chrome moves. */
  const isHome = currentPath === "/";

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
    fontStretch: "88%",
    fontWeight: 500,
    fontSize: "1.05rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "var(--lg-ink)",
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
      <div className="lg-nav__bar mx-auto flex max-w-[1320px] items-center gap-6 px-5 py-3 sm:px-8 lg:px-10">
        <a
          href={localizedHref("/", locale)}
          onClick={close}
          aria-label={t.nav.home}
          style={{ display: "flex", alignItems: "center", textDecoration: "none", flexShrink: 0 }}
        >
          <Image
            src="/orchelix-logo-full-color.png"
            alt={t.nav.home}
            width={1383}
            height={569}
            sizes="122px"
            quality={90}
            preload
            className="lg-nav-logo"
            style={{ display: "block", height: 50, width: "auto" }}
          />
        </a>

        <div className="lg-nav__actions ml-auto flex items-center gap-3 sm:gap-5">
          <a
            href="tel:+15615661066"
            className="lg-fig lg-quiet lg-nav-phone"
            aria-label={t.common.phone}
          >
            {t.common.phone}
          </a>
          {isHome ? (
            <ConditionsControl
              locale={locale}
              other={other}
              switchHref={switchHref}
              copy={{
                language: t.meta.language,
                lighting: t.meta.lighting,
                day: t.meta.day,
                night: t.meta.night,
                switchLabel: t.meta.switchLabel,
              }}
              onNavigate={close}
            />
          ) : (
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
          )}

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
              color: "var(--lg-foil-ink)",
              padding: "0.6rem 1.05rem",
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
                <>
                  <rect x="0" y="0" width="4.2" height="4.2" />
                  <rect x="11.8" y="0" width="4.2" height="4.2" />
                  <rect x="0" y="11.8" width="4.2" height="4.2" />
                  <rect x="11.8" y="11.8" width="4.2" height="4.2" />
                </>
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
                fontStretch: "88%",
                fontWeight: 700,
                fontSize: "0.8125rem",
                letterSpacing: "0.08em",
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
