/* Drawn plus. Registration mark, not a glyph. Graphite only. */

export default function PlusMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 0.5h1V10.5H5z" fill="currentColor" />
      <path d="M0.5 5h10v1H0.5z" fill="currentColor" />
    </svg>
  );
}

export function PlusFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`lg-plus-frame ${className}`.trim()}>
      <PlusMark className="lg-plus lg-plus--tl" />
      <PlusMark className="lg-plus lg-plus--tr" />
      <PlusMark className="lg-plus lg-plus--bl" />
      <PlusMark className="lg-plus lg-plus--br" />
      {children}
    </div>
  );
}
