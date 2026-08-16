"use client";

import { useEffect, useState } from "react";

/* West Palm Beach and Ontario share Eastern Time. Tabular, so the
   digits do not shove the meta strip as the clock ticks. */
const TZ = "America/New_York";

function formatNow() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

export default function LiveClock() {
  const [time, setTime] = useState(formatNow);

  useEffect(() => {
    const tick = () => setTime(formatNow());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className="lg-fig lg-clock" dateTime={time} suppressHydrationWarning>
      {time} <span className="lg-clock-zone">ET</span>
    </time>
  );
}
