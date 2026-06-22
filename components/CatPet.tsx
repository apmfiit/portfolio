"use client";

import { useEffect, useState } from "react";

// Night in Moscow: 22:00–06:59 (Europe/Moscow), independent of the visitor's TZ.
function isMoscowNight(): boolean {
  const h = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Moscow",
      hour: "2-digit",
      hour12: false,
    }).format(new Date()),
  );
  return h >= 22 || h < 7;
}

export function CatPet() {
  const [night, setNight] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const update = () => setNight(isMoscowNight());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // Hover: walk by day; at night he just wakes to a sit (idle) — no instant
  // zoomies from a dead sleep. Otherwise sleep at night, idle by day.
  const state = hover ? (night ? "idle" : "walk") : night ? "sleep" : "idle";
  const label =
    state === "sleep" ? "sleeping cat" : state === "walk" ? "walking cat" : "cat";

  return (
    <span
      className={`cat cat-${state}`}
      role="img"
      aria-label={label}
      title={night ? "zzz…" : "meow"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
}
