import { swatchesFor } from "@/app/lib/shopMedia";

export default function Swatch({ color }: { color: string }) {
  const dots = swatchesFor(color);
  if (dots.length === 0) return null;
  return (
    <span className="swatch" aria-hidden="true">
      {dots.map((c) => (
        <span key={c} style={{ background: c }} />
      ))}
    </span>
  );
}
