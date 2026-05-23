"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Navbar ──────────────────────────────────────────────────────────────
   Sticky glass header. Logo on the left, links in the middle (desktop),
   sign-in + primary CTA on the right. Below `md` the links collapse into
   a hamburger that opens a panel beneath the header.                       */

const NAV_LINKS = [
  { label: "Agents",     href: "#solutions" },
  { label: "Platform",   href: "#how" },
  { label: "Industries", href: "#why" },
  { label: "Pricing",    href: "#pricing" },
  { label: "About",      href: "#about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-line backdrop-blur-[14px] backdrop-saturate-[140%]"
      style={{ background: "rgba(251,251,252,0.78)" }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center gap-10 px-6 py-[18px] sm:px-8 lg:px-10">
        {/* Logo */}
        <a
          href="#top"
          aria-label="Orchelix — Home"
          className="flex shrink-0 items-center"
          onClick={close}
        >
          <Image
            src="/orchelix-lockup-horizontal.png"
            alt="Orchelix AI Consulting"
            width={160}
            height={40}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </a>

        {/* Desktop nav links */}
        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center gap-8 lg:flex"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[14px] font-medium leading-none text-ink-2 transition-colors hover:text-ink"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <Button
            asChild
            variant="ghost"
            className="h-[42px] rounded-[10px] px-3.5 text-[14px] font-medium text-ink-2 hover:bg-transparent hover:text-ink"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <a href="#signin">Sign in</a>
          </Button>
          <Button
            asChild
            className="h-[42px] rounded-[10px] bg-navy-600 px-5 text-[14px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_1px_2px_rgba(10,37,64,0.10)] transition-colors hover:bg-navy-700"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <a href="#book">Book a demo</a>
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-[10px] border border-line bg-white text-ink-2 transition-colors hover:text-ink lg:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-line bg-paper px-6 pb-6 pt-2 lg:hidden">
          <nav aria-label="Primary mobile" className="flex flex-col">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={close}
                className="border-b border-line/70 py-3.5 text-[15px] font-medium text-ink transition-colors hover:text-teal-700"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-2">
            <Button
              asChild
              variant="outline"
              onClick={close}
              className="h-11 w-full rounded-[10px] border-line-strong bg-white text-[15px] font-medium text-navy-600 hover:bg-surface-2 hover:text-navy-600"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <a href="#signin">Sign in</a>
            </Button>
            <Button
              asChild
              onClick={close}
              className="h-11 w-full rounded-[10px] bg-navy-600 text-[15px] font-medium text-white hover:bg-navy-700"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <a href="#book">Book a demo</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
