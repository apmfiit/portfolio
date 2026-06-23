"use client";

import { useEffect, useState } from "react";
import { Locale } from "@/content";

/* Live local time in Moscow (Europe/Moscow), updating every second.
   Client-only (returns null until mounted) to avoid a static-export hydration
   mismatch, since the build-time clock would be stale. */
export function MoscowClock({ locale }: { locale: Locale }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return <span className="tabular-nums" aria-hidden />;

  const loc = locale === "en" ? "en-GB" : "ru-RU";
  const date = new Intl.DateTimeFormat(loc, {
    timeZone: "Europe/Moscow",
    day: "numeric",
    month: "long",
  }).format(now);
  const time = new Intl.DateTimeFormat(loc, {
    timeZone: "Europe/Moscow",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);

  return (
    <span className="inline-flex items-center gap-1.5 tabular-nums">
      <span className="relative inline-flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      {locale === "en" ? "Moscow" : "Москва"} · {date}, {time}
    </span>
  );
}
