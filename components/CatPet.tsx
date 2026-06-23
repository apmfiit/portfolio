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

const SPEED = 110; // px per second walking pace

export function CatPet() {
  const [night, setNight] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [leaving, setLeaving] = useState(false); // click started the walk-away
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
    ["walk", "yawn", "meow", "sleep"].forEach((n) => {
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

  // Click: he walks right off the screen edge and is gone until reload. Distance
  // is measured from where he sits so he exits any viewport width (body clips
  // overflow-x — no scrollbar).
  const walkAway = () => {
    if (leaving || gone) return;
    setHovering(false);
    const rect = ref.current?.getBoundingClientRect();
    const dx = rect ? Math.ceil(window.innerWidth - rect.left + 24) : 240;
    const ms = Math.min(6000, Math.max(900, Math.round((dx / SPEED) * 1000)));
    setWalk({ dx, ms });
    setLeaving(true);
    requestAnimationFrame(() => setSlide(true));
    timers.current.push(setTimeout(() => setGone(true), ms));
  };

  // Reserve the space once he's left so the clock doesn't shift.
  if (gone) return <span className="cat" aria-hidden style={{ visibility: "hidden" }} />;

  // Default: a calm meow (asleep at night). Hover: a one-shot yawn. Click: walk.
  const state = leaving ? "walk" : hovering ? "yawn" : night ? "sleep" : "meow";
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
        leaving && walk
          ? {
              transform: `translateX(${slide ? walk.dx : 0}px)`,
              transition: slide ? `transform ${walk.ms}ms linear` : "none",
            }
          : undefined
      }
    />
  );
}
