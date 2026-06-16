"use client";

import { ReactNode } from "react";

// Soft round snow particles — varied sizes drifting down.
const FLAKES = [
  { left: "4%", size: 5, delay: 0, dur: 3.4, drift: 7 },
  { left: "17%", size: 3.5, delay: 0.7, dur: 4.2, drift: -5 },
  { left: "29%", size: 6, delay: 0.2, dur: 3.0, drift: 6 },
  { left: "41%", size: 4, delay: 1.0, dur: 4.0, drift: -7 },
  { left: "53%", size: 5.5, delay: 0.4, dur: 3.6, drift: 5 },
  { left: "65%", size: 3.5, delay: 0.85, dur: 4.4, drift: -4 },
  { left: "77%", size: 6, delay: 0.25, dur: 3.2, drift: 7 },
  { left: "89%", size: 4, delay: 0.6, dur: 3.9, drift: -6 },
];

export function FrostLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <span className="frost group relative inline-block">
      <span aria-hidden className="frost-fog" />
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="frost-ice relative font-medium underline underline-offset-2 decoration-rule"
      >
        {children}
      </a>
      <span
        aria-hidden
        className="frost-snow pointer-events-none absolute inset-x-0 -top-2 h-12 overflow-visible"
      >
        {FLAKES.map((f, i) => (
          <span
            key={i}
            className="frost-flake"
            style={{
              left: f.left,
              width: f.size,
              height: f.size,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.dur}s`,
              ["--drift" as string]: `${f.drift}px`,
            }}
          />
        ))}
      </span>
    </span>
  );
}
