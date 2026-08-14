"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

/* The dashboard's action vocabulary — one component, three weights.
 *
 * WHY THIS EXISTS: `.lg-app` collapses every teal and navy token onto the
 * single foil accent, which converted sixteen routes without touching markup
 * but flattened the action hierarchy with it. What used to be teal-500
 * primary / teal-700 text / navy-600 all render as the same magenta stamp, so
 * the surface shipped 47 stamps across 22 files — Knowledge and Voice carry
 * six each. DESIGN.md's Stamp Scarcity Rule records that five was already
 * enough to destroy the stamp's meaning once.
 *
 * The marketing `Stamp` / `QuietAction` in app/components/ledger own this
 * vocabulary for links. They are anchor-only and have no disabled, pending,
 * or submit semantics, so an Operate surface cannot use them directly. This
 * is the same three weights with button semantics and the full state set.
 *
 * THE RULE THIS ENCODES: one `primary` per view. It is the thing the operator
 * came to do. Everything else is `secondary` (ruled outline) or `quiet`
 * (text). If a screen seems to need two primaries, one of them is secondary.
 *
 * No spinner on `pending`. DESIGN.md forbids `infinite` on anything asserting
 * a system state — a persistent state is a held mark, not a breathing one —
 * so pending swaps the label and disables. The label is the indicator.
 */

type Weight = "primary" | "secondary" | "quiet";
type Size = "md" | "sm";

const BASE =
  "inline-flex items-center justify-center gap-2 border font-display uppercase " +
  "transition-[background-color,color,border-color,filter] duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
  "disabled:cursor-not-allowed";

const SIZE: Record<Size, string> = {
  // Padding + size from DESIGN.md components.stamp-compact / typography.action.
  md: "px-[1.05rem] py-[0.6rem] text-[0.75rem] tracking-[0.08em]",
  sm: "px-[0.7rem] py-[0.4rem] text-[0.6875rem] tracking-[0.1em]",
};

const WEIGHT: Record<Weight, string> = {
  // The stamp. Its pressed lips come from .lg-stamp so the press reads the
  // same here as on the marketing surface.
  primary:
    "lg-stamp border-transparent bg-[var(--lg-foil)] text-[var(--lg-foil-ink)] " +
    "hover:bg-[var(--lg-foil-lift)] " +
    "disabled:bg-[var(--lg-field-3)] disabled:text-[var(--lg-ink-3)] disabled:shadow-none",
  // Ruled outline. Carries weight without spending the accent.
  secondary:
    "border-[var(--lg-rule)] bg-transparent text-[var(--lg-ink)] " +
    "hover:bg-[var(--lg-field-2)] active:bg-[var(--lg-field-3)] " +
    "disabled:border-[var(--lg-hair)] disabled:text-[var(--lg-ink-3)] disabled:hover:bg-transparent",
  // Text only. For the third and fourth things on a screen.
  quiet:
    "border-transparent bg-transparent text-[var(--lg-ink-2)] px-0 " +
    "hover:text-[var(--lg-ink)] hover:underline underline-offset-4 decoration-[var(--lg-rule)] " +
    "disabled:text-[var(--lg-ink-3)] disabled:no-underline",
};

const RING = "ring-[var(--lg-foil)] ring-offset-[var(--lg-field)]";

type Common = {
  weight?: Weight;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ActionButtonProps = Common &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: never;
    /** Swaps the label and disables. No spinner — see the file header. */
    pending?: boolean;
    pendingLabel?: string;
  };

type ActionLinkProps = Common & {
  href: string;
  pending?: never;
  pendingLabel?: never;
};

function classes(weight: Weight, size: Size, extra?: string) {
  return [BASE, SIZE[size], WEIGHT[weight], RING, extra].filter(Boolean).join(" ");
}

export default function Action(props: ActionButtonProps | ActionLinkProps) {
  const { weight = "secondary", size = "md", children, className } = props;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes(weight, size, className)}>
        {children}
      </Link>
    );
  }

  const {
    pending = false,
    pendingLabel = "Working",
    disabled,
    type = "button",
    ...rest
  } = props as ActionButtonProps;

  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || pending}
      // Tells a screen reader the control is busy without a visual spinner.
      aria-busy={pending || undefined}
      className={classes(weight, size, className)}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}
