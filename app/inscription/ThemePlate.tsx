"use client";

import Image, { type StaticImageData } from "next/image";
import { useSyncExternalStore } from "react";
import { getInscriptionSnapshot, subscribeInscription } from "./store";

export default function ThemePlate({
  day,
  night,
  alt,
  max,
}: {
  day: StaticImageData;
  night: StaticImageData;
  alt: string;
  max: number;
}) {
  const mode = useSyncExternalStore(
    subscribeInscription,
    () => getInscriptionSnapshot().mode,
    () => "dark" as const,
  );
  const src = mode === "dark" ? night : day;

  return (
    <Image
      src={src}
      alt={alt}
      placeholder="blur"
      sizes={`${max}px`}
      className="lg-settle-media"
      style={{ width: "100%", maxWidth: max, height: "auto" }}
    />
  );
}
