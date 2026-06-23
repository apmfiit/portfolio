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

  // Preload every sprite so switching state never flashes a blank frame.
  useEffect(() => {
    ["walk", "yawn", "meow", "rest", "sleep"].forEach((n) => {
      const img = new Image();
      img.src = `/cat/cat-${n}.png`;
    });
  }, []);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  // Click wakes him: a yawn, then he walks right off the screen edge and is gone
  // until reload. Distance is measured from where he sits so he exits any
  // viewport width (body clips overflow-x — no scrollbar).
  const walkAway = () => {
    if (leaving || gone) return;
    setHovering(false);
    setLeaving(true);
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

  // Hover never wakes him — he just shifts to a resting pose. Default is a calm
  // meow by day, curled sleep at night. Only a click yawns + walks him off.
  const state = leaving
    ? phase
    : hovering
      ? "rest"
      : night
        ? "sleep"
        : "meow";
  const label =
    state === "sleep" || state === "rest"
      ? "sleeping cat"
      : state === "walk"
        ? "walking cat"
        : state === "yawn"
          ? "yawning cat"
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
      onClick={walkAway}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          walkAway();
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
