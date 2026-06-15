"use client";

import { useEffect, useRef } from "react";

const SRC = "/images/wave.png";

/* Microsoft Fluent 3D "Waving hand" — a one-shot APNG used as a load micro-interaction.
   A one-shot APNG only animates on a fresh decode, so on pull-to-refresh / back-forward
   the browser reuses the finished image and it never replays. On mount (and on bfcache
   restore) we change the URL fragment to force a re-decode from cache — restarting the
   animation without re-downloading the file. */
export function WaveHand({ size = 36 }: { size?: number }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const replay = () => {
      const img = ref.current;
      if (img) img.src = `${SRC}#${Date.now()}`;
    };
    replay();
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) replay();
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  return (
    <span className="inline-block align-[-0.18em]">
      <img
        ref={ref}
        src={SRC}
        alt="👋"
        width={size}
        height={size}
        loading="eager"
        decoding="async"
        draggable={false}
        style={{ width: size, height: size, display: "block" }}
      />
    </span>
  );
}
