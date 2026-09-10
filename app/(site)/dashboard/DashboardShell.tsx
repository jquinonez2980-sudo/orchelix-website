"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { dashboardClerkAppearance } from "@/app/lib/clerkAppearance";
import { Menu, PhoneCall, X } from "lucide-react";
import DraftModeBanner from "./DraftModeBanner";
import InstallControl from "@/app/components/pwa/InstallControl";
import { track } from "@/app/lib/analytics";
import { registerDashboardSW } from "@/app/lib/pwa";
import { restorePushSubscription } from "@/app/lib/push";
import {
  groupLabel,
  navLabel,
  useDashI18n,
} from "./i18n";
import { useActiveOrgSlug } from "./useActiveOrgSlug";
import {
  isNavItemActive,
  visibleNavGroups,
  type NavGroup,
  type NavItem,
} from "./navItems";

/* Dashboard chrome: fixed left sidebar on desktop (lg+), slide-in drawer on
   mobile. Interaction pattern (hamburger toggle, Escape-to-close, backdrop)
   is ported from the marketing site's Nav.tsx, rebuilt in Tailwind classes
   to match this shell's existing styling approach rather than its inline
   styles. Purely chrome — Gate/org-check logic stays in layout.tsx and is
   passed in as `children`, so this component doesn't need to know about it.

   2026-09-10: the shell carries `esmi-console` alongside `lg-app
   esmi-dashboard`. That class is the whole console treatment and it is
   opt-in — see the "Esmi Line Console" block in app/globals.css for what it
   suspends and why. Remove the one class and this is the previous shell. */

// Source asset is a 566×273 wordmark, not a square icon — size by height
// and derive width from its real aspect ratio (matches how the marketing
// site's Nav.tsx handles the Orchelix lockup) so it's never squashed.
const ESMI_LOGO_RATIO = 566 / 273;

/* Console chrome copy. Deliberately NOT in ./i18n — these strings belong to
   the shell's own furniture, and i18n.tsx is the page-content catalogue. If
   the deck grows past a handful of strings, move them there rather than
   letting this map spread. */
const CONSOLE_COPY = {
  en: {
    lineLive: "Line live",
    covered: "Covered",
    coveredValue: "24/7",
    testLine: "Test the line",
  },
  es: {
    lineLive: "Línea activa",
    covered: "Cubierta",
    coveredValue: "24/7",
    testLine: "Probar la línea",
  },
} as const;

function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useDashI18n();
  const height = compact ? 22 : 28;
  const width = Math.round(height * ESMI_LOGO_RATIO);
  return (
    <span className="flex flex-col gap-0.5">
      <Image
        src="/esmi-logo.png"
        alt="Esmi"
        width={width}
        height={height}
        style={{ height, width: "auto" }}
        priority
      />
      {!compact && (
        <span className="text-[11px] font-medium text-ink-4">{t.byOrchelix}</span>
      )}
    </span>
  );
}

/* The line's state, as a held mark. Not a pulsing dot: an indicator that
   loops is a claim that stays on screen after it stops being true, which is
   the rule three loops were removed from this codebase for on 2026-08-08.
   The drawn swatch comes from `.esmi-key` in the console styles. */
function LineState({ label }: { label: string }) {
  return (
    <div className="esmi-livecard mx-3 px-3 py-2.5">
      <span
        className="esmi-key lg-fig text-[10.5px] font-semibold uppercase"
        style={{ color: "var(--lg-foil)", letterSpacing: "0.12em" }}
      >
        {label}
      </span>
    </div>
  );
}

function NavLink({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate?: () => void;
}) {
  const { t } = useDashI18n();
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      data-console-nav
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ${
        active ? "text-ink" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
      }`}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
      {navLabel(t, item.label)}
    </Link>
  );
}

function SidebarNav({
  groups,
  pathname,
  onNavigate,
}: {
  groups: NavGroup[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const { t } = useDashI18n();
  /* Work stays always open. Configure / Account / Internal collapse when
     none of their items is active — progressive disclosure for owner operators. */
  return (
    <nav aria-label="Primary" className="flex flex-1 flex-col overflow-y-auto p-3">
      {groups.map((group, index) => {
        const hasActive = group.items.some((item) =>
          isNavItemActive(pathname, item.href),
        );
        const alwaysOpen = group.id === "work";
        const links = (
          <div className="flex flex-col gap-0.5">
            {group.items.map((item) => (
              <NavLink
                key={item.href}
                item={item}
                active={isNavItemActive(pathname, item.href)}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        );

        const label = groupLabel(t, group.id, group.label);

        if (alwaysOpen || !group.label) {
          return (
            <div key={group.id} className={index === 0 ? "" : "mt-4"}>
              {label && (
                <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wide text-ink-4">
                  {label}
                </p>
              )}
              {links}
            </div>
          );
        }

        return (
          <details
            key={group.id}
            className={index === 0 ? "" : "mt-3"}
            open={hasActive || undefined}
          >
            <summary className="cursor-pointer list-none px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-4 hover:text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-2">
                {label}
                <span aria-hidden className="text-ink-4">
                  ▾
                </span>
              </span>
            </summary>
            <div className="mt-0.5">{links}</div>
          </details>
        );
      })}
    </nav>
  );
}

/* The command deck. Global state and the one global action, fixed to the
   bottom at every width, so neither moves as you change page. The page slot
   reserves its height (`.esmi-deck-pad`) so the deck never covers a
   register's last row. Only facts the shell actually holds go here — it
   carries no counts it would have to invent. */
function CommandDeck({ copy }: { copy: (typeof CONSOLE_COPY)["en"] }) {
  return (
    <div className="esmi-deck">
      <div className="esmi-deck-seg">
        <span
          className="esmi-key lg-fig text-xs font-semibold uppercase"
          style={{ color: "var(--lg-foil)", letterSpacing: "0.12em" }}
        >
          {copy.lineLive}
        </span>
      </div>
      <div className="esmi-deck-seg hidden sm:flex">
        <span
          className="text-[10px] font-medium uppercase text-ink-3"
          style={{ letterSpacing: "0.14em" }}
        >
          {copy.covered}
        </span>
        <span className="lg-fig text-xs text-ink">{copy.coveredValue}</span>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <Link
          href="/dashboard/voice"
          className="inline-flex items-center gap-2 rounded px-3 py-1.5 text-xs font-semibold uppercase"
          style={{
            background: "var(--esmi-brass)",
            color: "#0B1119",
            letterSpacing: "0.08em",
          }}
        >
          <PhoneCall className="h-3.5 w-3.5" strokeWidth={2} />
          {copy.testLine}
        </Link>
      </div>
    </div>
  );
}

export default function DashboardShell({
  isOrchelixStaff,
  children,
}: {
  isOrchelixStaff: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale, setLocale } = useDashI18n();
  const orgSlug = useActiveOrgSlug();
  const close = () => setOpen(false);
  const groups = visibleNavGroups(isOrchelixStaff);
  const copy = CONSOLE_COPY[locale === "es" ? "es" : "en"];

  useEffect(() => {
    registerDashboardSW();
  }, []);

  useEffect(() => {
    if (!orgSlug) return;
    void restorePushSubscription();
  }, [orgSlug]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg-app esmi-dashboard esmi-console min-h-screen bg-paper">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-surface lg:flex">
        <div className="flex h-16 items-center border-b border-line px-4">
          <Link href="/dashboard" aria-label="Esmi — Overview">
            <Logo />
          </Link>
        </div>
        <div className="pt-3">
          <LineState label={copy.lineLive} />
        </div>
        <SidebarNav groups={groups} pathname={pathname} />
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t.openMenu}
            aria-expanded={open}
            className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-2 hover:bg-surface-2 lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <Link href="/dashboard" aria-label="Esmi — Overview" className="lg:hidden">
            <Logo compact />
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const next = locale === "en" ? "es" : "en";
                setLocale(next);
                track("lang_switch_dash", { to: next });
              }}
              data-lang={locale === "es" ? "es" : undefined}
              className="lg-fig hidden text-xs font-medium uppercase tracking-wide text-ink-3 hover:text-ink sm:inline"
              style={{ letterSpacing: "0.1em" }}
              aria-label={t.switchTo}
            >
              {t.switchTo}
            </button>
            <InstallControl />
            {/* Point "Create organization" at our own signup wizard instead
                of Clerk's generic dialog. An org created through that dialog
                picks its own slug, which would match no Esmi tenant, so every
                /platform/* call would 400 with a confusing "Unknown tenant"
                (require_tenant in platform_api/security.py resolves the
                tenant from orgSlug). /get-started reserves the tenant slug
                first, then creates the Clerk org to match.

                Clerk has no "hide this entirely" prop — createOrganizationMode
                is only 'navigation' | 'modal'. Whether the entry appears at
                all is governed by the "users can create organizations"
                setting in the Clerk Dashboard; this redirect is what makes it
                safe either way.

                The console dresses this trigger rather than replacing it:
                Clerk already renders each organisation's own logo, which is
                exactly the tenant mark the switcher wants. See the Clerk
                block in the console styles. */}
            <OrganizationSwitcher
              hidePersonal
              createOrganizationMode="navigation"
              createOrganizationUrl="/get-started"
              afterSelectOrganizationUrl="/dashboard"
              appearance={dashboardClerkAppearance}
            />
            <UserButton appearance={dashboardClerkAppearance} />
          </div>
        </header>

        {/* Mobile drawer */}
        {open && (
          <>
            <div
              className="fixed inset-0 z-40 bg-navy-900 lg:hidden"
              onClick={close}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-surface shadow-xl lg:hidden">
              <div className="flex h-16 items-center justify-between border-b border-line px-4">
                <Link href="/dashboard" aria-label="Esmi — Overview" onClick={close}>
                  <Logo />
                </Link>
                <button
                  type="button"
                  onClick={close}
                  aria-label={t.closeMenu}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-2 hover:bg-surface-2"
                >
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>
              <div className="border-b border-line px-4 py-2 sm:hidden">
                <button
                  type="button"
                  onClick={() => setLocale(locale === "en" ? "es" : "en")}
                  className="lg-fig text-xs font-medium uppercase tracking-wide text-ink-3"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {t.switchTo}
                </button>
              </div>
              <div className="pt-3">
                <LineState label={copy.lineLive} />
              </div>
              <SidebarNav groups={groups} pathname={pathname} onNavigate={close} />
            </div>
          </>
        )}

        {/* Not <main> — every page inside already renders its own <main>
            landmark (see e.g. dashboard/usage/page.tsx); this is just the
            layout slot, avoiding a duplicate/nested landmark. */}
        <div className="esmi-deck-pad min-w-0 flex-1">
          {/* Above the page content, below the top bar: a tenant still in
              onboarding sees this on every page, not just Overview. Renders
              nothing once the tenant can actually serve traffic. */}
          <DraftModeBanner />
          {children}
        </div>
      </div>

      <CommandDeck copy={copy} />
    </div>
  );
}
