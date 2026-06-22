"use client";

import { useEffect, useRef, useState } from "react";

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

const YAWN_MS = 1100; // keep in sync with .cat-yawn duration

export function CatPet() {
  const [night, setNight] = useState(false);
  const [hover, setHover] = useState(false);
  const [yawning, setYawning] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const update = () => setNight(isMoscowNight());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  // On hover the cat wakes/stretches with a one-shot yawn, then walks.
  const enter = () => {
    setHover(true);
    setYawning(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setYawning(false), YAWN_MS);
  };
  const leave = () => {
    setHover(false);
    setYawning(false);
    if (timer.current) clearTimeout(timer.current);
  };

  const state = hover
    ? yawning
      ? "yawn"
      : "walk"
    : night
      ? "sleep"
      : "idle";

  const label =
    state === "sleep"
      ? "sleeping cat"
      : state === "walk"
        ? "walking cat"
        : state === "yawn"
          ? "yawning cat"
          : "cat";

  return (
    <span
      className={`cat cat-${state}`}
      role="img"
      aria-label={label}
      title={night ? "zzz…" : "meow"}
      onMouseEnter={enter}
      onMouseLeave={leave}
    />
  );
}
