"use client";

/* Ruled Record chrome for /get-started — same world as marketing and the
   .lg-app dashboard remaps. Zero radius, graphite rules, one magenta stamp. */

export const STEP_TITLES = ["Your business", "Contact", "Plan & review"];

export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="border border-line bg-surface p-6 sm:p-8"
      style={{ borderTop: "2px solid var(--lg-rule)" }}
    >
      {children}
    </div>
  );
}

export function Stepper({ current }: { current: number }) {
  return (
    <div className="mb-6">
      <p
        className="lg-fig text-xs uppercase tracking-wide text-ink-3 sm:hidden"
        style={{ letterSpacing: "0.12em" }}
      >
        Step {current + 1} of {STEP_TITLES.length} — {STEP_TITLES[current]}
      </p>
      <ol className="hidden items-center gap-2 sm:flex">
        {STEP_TITLES.map((title, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={title} className="flex flex-1 items-center gap-2">
              <span
                className={`lg-fig flex h-7 w-7 shrink-0 items-center justify-center text-xs font-semibold ${
                  done
                    ? "bg-navy-600 text-white"
                    : active
                      ? "border border-navy-600 text-navy-600"
                      : "border border-line bg-surface-2 text-ink-3"
                }`}
                style={{ borderRadius: 0 }}
              >
                {done ? "✓" : i + 1}
              </span>
              <span
                className={`text-xs font-medium ${active ? "text-ink" : "text-ink-3"}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontStretch: "88%",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                }}
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
      <span
        className="lg-fig text-xs uppercase text-ink-3"
        style={{ letterSpacing: "0.12em" }}
      >
        {label}
        {!required && <span className="ml-1 normal-case tracking-normal">(optional)</span>}
      </span>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p
          className="mt-1 text-xs text-ink"
          style={{ borderLeft: "2px solid var(--lg-ink)", paddingLeft: "0.6rem" }}
        >
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1 text-xs text-ink-3">{hint}</p>
      ) : null}
    </label>
  );
}

export const inputCls =
  "h-11 w-full border border-line bg-surface px-3 text-sm text-ink " +
  "placeholder:text-ink-3 focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600";

export const selectCls =
  "h-11 w-full border border-line bg-surface px-3 text-sm text-ink " +
  "focus:border-navy-600 focus:outline-none focus:ring-1 focus:ring-navy-600";

export function PrimaryButton({
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className="lg-stamp lg-foil-surface px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-40"
      style={{
        fontFamily: "var(--font-display)",
        fontStretch: "88%",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderRadius: 0,
        color: "var(--lg-foil-ink)",
      }}
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
      className="border border-line px-5 py-2.5 text-sm font-medium text-ink-2 transition hover:bg-surface-2 disabled:cursor-not-allowed disabled:opacity-40"
      style={{
        fontFamily: "var(--font-display)",
        fontStretch: "88%",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        borderRadius: 0,
      }}
    >
      {children}
    </button>
  );
}

export function ErrorNote({ children }: { children: React.ReactNode }) {
  return (
    <p
      role="alert"
      className="border border-line bg-surface-2 px-3 py-2 text-sm text-ink"
      style={{ borderLeft: "2px solid var(--lg-ink)" }}
    >
      {children}
    </p>
  );
}

/* The single most important thing on the page: nobody should finish this
   wizard believing their phone line is now answering. */
export function NotLiveYetNotice() {
  return (
    <div
      className="border border-line bg-surface-2 px-4 py-3"
      style={{ borderLeft: "2px solid var(--lg-foil)" }}
    >
      <p
        className="text-sm font-medium text-ink"
        style={{ fontFamily: "var(--font-display)", fontStretch: "88%" }}
      >
        Nothing goes live until Orchelix approves it
      </p>
      <p className="mt-1 text-xs leading-5 text-ink-2">
        Submitting this creates your account and dashboard so you can start
        setting things up. Your phone line and web chat stay switched off until
        our team reviews your application and activates it — we&apos;ll email you.
      </p>
    </div>
  );
}
