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
const WALK_MS = 1600; // slide-off duration (keep in sync with the transition below)
const WALK_DX = 80; // px to the right — enough to clear the footer edge

type Phase = "rest" | "yawn" | "walk";

export function CatPet() {
  const [night, setNight] = useState(false);
  const [phase, setPhase] = useState<Phase>("rest");
  const [slide, setSlide] = useState(false);
  const [gone, setGone] = useState(false);
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

  // First hover wakes him: yawn → walk off to the right → gone until reload.
  const enter = () => {
    if (gone || phase !== "rest") return;
    setPhase("yawn");
    timers.current.push(
      setTimeout(() => {
        setPhase("walk");
        // next frame so the transform transition actually animates
        requestAnimationFrame(() => setSlide(true));
        timers.current.push(setTimeout(() => setGone(true), WALK_MS));
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
      className={`cat cat-${state}`}
      role="img"
      aria-label={label}
      title={night ? "zzz…" : "meow"}
      onMouseEnter={enter}
      style={
        phase === "walk"
          ? {
              transform: `translateX(${slide ? WALK_DX : 0}px)`,
              transition: `transform ${WALK_MS}ms linear`,
            }
          : undefined
      }
    />
  );
}
