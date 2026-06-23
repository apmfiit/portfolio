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

const YAWN_MS = 1100; // matches .cat-yawn duration
const SPEED = 110; // px per second walking pace

type Phase = "rest" | "yawn" | "walk";

export function CatPet() {
  const [night, setNight] = useState(false);
  const [phase, setPhase] = useState<Phase>("rest");
  const [walk, setWalk] = useState<{ dx: number; ms: number } | null>(null);
  const [slide, setSlide] = useState(false);
  const [gone, setGone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const update = () => setNight(isMoscowNight());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  // First hover wakes him: yawn, then he walks right off the screen edge and is
  // gone until reload. Distance is measured from where he sits, so he always
  // exits the real viewport edge (the body clips overflow-x — no scrollbar).
  const enter = () => {
    if (gone || phase !== "rest") return;
    setPhase("yawn");
    timers.current.push(
      setTimeout(() => {
        const rect = ref.current?.getBoundingClientRect();
        const dx = rect ? Math.ceil(window.innerWidth - rect.left + 24) : 240;
        const ms = Math.min(6000, Math.max(900, Math.round((dx / SPEED) * 1000)));
        setWalk({ dx, ms });
        setPhase("walk");
        requestAnimationFrame(() => setSlide(true));
        timers.current.push(setTimeout(() => setGone(true), ms));
      }, YAWN_MS),
    );
  };

  // Reserve the space once he's left so the clock doesn't shift.
  if (gone) return <span className="cat" aria-hidden style={{ visibility: "hidden" }} />;

  const state = phase === "rest" ? (night ? "sleep" : "idle") : phase;
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
      ref={ref}
      className={`cat cat-${state}`}
      role="img"
      aria-label={label}
      title={night ? "zzz…" : "meow"}
      onMouseEnter={enter}
      style={
        phase === "walk" && walk
          ? {
              transform: `translateX(${slide ? walk.dx : 0}px)`,
              transition: slide ? `transform ${walk.ms}ms linear` : "none",
            }
          : undefined
      }
    />
  );
}
