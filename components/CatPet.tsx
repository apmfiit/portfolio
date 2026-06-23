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

type Phase = "yawn" | "walk";

export function CatPet() {
  const [night, setNight] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [leaving, setLeaving] = useState(false); // click started the walk-away
  const [phase, setPhase] = useState<Phase>("yawn");
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

  // Hover: a light meow. Click: he yawns, then walks right off the screen edge
  // and is gone until reload (distance measured so he exits any viewport width;
  // body clips overflow-x, so no scrollbar).
  const leave = () => {
    if (leaving || gone) return;
    setLeaving(true);
    setHovering(false);
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

  const state = leaving
    ? phase
    : hovering
      ? "meow"
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
          : state === "meow"
            ? "meowing cat"
            : "cat";

  return (
    <span
      ref={ref}
      className={`cat cat-${state} ${leaving ? "" : "cursor-pointer"}`}
      role="button"
      tabIndex={0}
      aria-label={label}
      title={night ? "zzz…" : "meow"}
      onMouseEnter={() => !leaving && setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={leave}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          leave();
        }
      }}
      style={
        leaving && phase === "walk" && walk
          ? {
              transform: `translateX(${slide ? walk.dx : 0}px)`,
              transition: slide ? `transform ${walk.ms}ms linear` : "none",
            }
          : undefined
      }
    />
  );
}
