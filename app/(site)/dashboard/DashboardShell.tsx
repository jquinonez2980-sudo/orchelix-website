"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import DraftModeBanner from "./DraftModeBanner";
import { NAV_ITEMS, isNavItemActive, type NavItem } from "./navItems";

/* Dashboard chrome: fixed left sidebar on desktop (lg+), slide-in drawer on
   mobile. Interaction pattern (hamburger toggle, Escape-to-close, backdrop)
   is ported from the marketing site's Nav.tsx, rebuilt in Tailwind classes
   to match this shell's existing styling approach rather than its inline
   styles. Purely chrome — Gate/org-check logic stays in layout.tsx and is
   passed in as `children`, so this component doesn't need to know about it. */

/* Same reasoning as layout.tsx: Clerk portals its dropdowns outside the
   `.lg-app` scope, so its own `variables` API carries the ledger palette. */
const clerkWidgetAppearance = {
  variables: {
    colorBackground: "#071A2E",
    colorText: "#F4F1E8",
    colorTextSecondary: "rgba(238, 240, 245, 0.72)",
    colorPrimary: "#D9A21B",
    colorInputBackground: "#0B2338",
    colorInputText: "#F4F1E8",
    borderRadius: "0px",
  },
  elements: {
    organizationSwitcherTrigger: "text-ink hover:bg-surface-2",
  },
};

// Source asset is a 566×273 wordmark, not a square icon — size by height
// and derive width from its real aspect ratio (matches how the marketing
// site's Nav.tsx handles the Orchelix lockup) so it's never squashed.
const ESMI_LOGO_RATIO = 566 / 273;

function Logo({ compact = false }: { compact?: boolean }) {
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
        <span className="text-[11px] font-medium text-ink-4">by Orchelix</span>
      )}
    </span>
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
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150 ${
        active
          ? "bg-navy-50 text-navy-600"
          : "text-ink-2 hover:bg-surface-2 hover:text-ink"
      }`}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
      {item.label}
    </Link>
  );
}

function SidebarNav({
  items,
  pathname,
  onNavigate,
}: {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
}) {
  const staffItems = items.filter((i) => i.staffOnly);
  const mainItems = items.filter((i) => !i.staffOnly);
  return (
    <nav aria-label="Primary" className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
      {mainItems.map((item) => (
        <NavLink
          key={item.href}
          item={item}
          active={isNavItemActive(pathname, item.href)}
          onNavigate={onNavigate}
        />
      ))}
      {staffItems.length > 0 && (
        <>
          <p className="mt-4 mb-1 px-3 text-[11px] font-semibold uppercase tracking-wide text-ink-4">
            Internal
          </p>
          {staffItems.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={isNavItemActive(pathname, item.href)}
              onNavigate={onNavigate}
            />
          ))}
        </>
      )}
    </nav>
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
  const close = () => setOpen(false);
  const items = NAV_ITEMS.filter((i) => !i.staffOnly || isOrchelixStaff);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg-app min-h-screen bg-paper">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-line bg-surface lg:flex">
        <div className="flex h-16 items-center border-b border-line px-4">
          <Link href="/dashboard" aria-label="Esmi — Overview">
            <Logo />
          </Link>
        </div>
        <SidebarNav items={items} pathname={pathname} />
      </aside>

      <div className="flex min-h-screen flex-col lg:pl-60">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-surface px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="-ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-2 hover:bg-surface-2 lg:hidden"
          >
            <Menu className="h-5 w-5" strokeWidth={1.75} />
          </button>
          <Link href="/dashboard" aria-label="Esmi — Overview" className="lg:hidden">
            <Logo compact />
          </Link>
          <div className="ml-auto flex items-center gap-3">
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
                safe either way. */}
            <OrganizationSwitcher
              hidePersonal
              createOrganizationMode="navigation"
              createOrganizationUrl="/get-started"
              afterSelectOrganizationUrl="/dashboard"
              appearance={clerkWidgetAppearance}
            />
            <UserButton />
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
                  aria-label="Close menu"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-2 hover:bg-surface-2"
                >
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>
              <SidebarNav items={items} pathname={pathname} onNavigate={close} />
            </div>
          </>
        )}

        {/* Not <main> — every page inside already renders its own <main>
            landmark (see e.g. dashboard/usage/page.tsx); this is just the
            layout slot, avoiding a duplicate/nested landmark. */}
        <div className="min-w-0 flex-1">
          {/* Above the page content, below the top bar: a tenant still in
              onboarding sees this on every page, not just Overview. Renders
              nothing once the tenant can actually serve traffic. */}
          <DraftModeBanner />
          {children}
        </div>
      </div>
    </div>
  );
}
