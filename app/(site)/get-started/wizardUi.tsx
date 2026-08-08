"use client";

/* Shared presentational pieces for the /get-started wizard. Built from the
   existing Orchelix tokens (navy / teal / ink / surface / line) — no new
   design primitives, so this reads as the same product as the dashboard. */

export const STEP_TITLES = ["Your business", "Contact", "Plan & review"];

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm sm:p-8">
      {children}
    </div>
  );
}

export function Stepper({ current }: { current: number }) {
  return (
    <div className="mb-6">
      {/* Mobile: a single line beats three cramped labels. */}
      <p className="text-xs font-medium uppercase tracking-wide text-ink-3 sm:hidden">
        Step {current + 1} of {STEP_TITLES.length} — {STEP_TITLES[current]}
      </p>
      <ol className="hidden items-center gap-2 sm:flex">
        {STEP_TITLES.map((title, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={title} className="flex flex-1 items-center gap-2">
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  done
                    ? "bg-teal-500 text-white"
                    : active
                      ? "bg-navy-600 text-white"
                      : "bg-surface-2 text-ink-3"
                }`}
              >
                {done ? "✓" : i + 1}
              </span>
              <span
                className={`text-xs font-medium ${active ? "text-ink" : "text-ink-3"}`}
              >
                {title}
              </span>
              {i < STEP_TITLES.length - 1 && (
                <span className="ml-1 h-px flex-1 bg-line" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export function Field({
  label,
  hint,
  error,
  children,
  required,
}: {
  label: string;
  hint?: React.ReactNode;
  error?: string | null;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">
        {label}
        {!required && <span className="ml-1 text-xs text-ink-3">(optional)</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p className="mt-1 text-xs text-rose-700">{error}</p>
      ) : hint ? (
        <p className="mt-1 text-xs text-ink-3">{hint}</p>
      ) : null}
    </label>
  );
}

export const inputCls =
  "h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink " +
  "placeholder:text-ink-3 focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100";

export const selectCls =
  "h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-ink " +
  "focus:border-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-100";

export function PrimaryButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="rounded-lg bg-navy-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-ink-2 transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

export function ErrorNote({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700"
    >
      {children}
    </p>
  );
}

/* The single most important thing on the page: nobody should finish this
   wizard believing their phone line is now answering. */
export function NotLiveYetNotice() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
      <p className="text-sm font-medium text-amber-900">
        Nothing goes live until Orchelix approves it
      </p>
      <p className="mt-1 text-xs leading-5 text-amber-800">
        Submitting this creates your account and dashboard so you can start
        setting things up. Your phone line and web chat stay switched off until
        our team reviews your application and activates it — we&apos;ll email you.
      </p>
    </div>
  );
}
