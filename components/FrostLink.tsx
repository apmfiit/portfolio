"use client";

import { ReactNode } from "react";

// Soft round snow particles — varied sizes, speeds and sway directions.
// Staggered delays keep the snowfall continuous; mixed durations add depth
// (smaller + slower = "farther" flakes). drift = sway amplitude (± per flake).
const FLAKES = [
  { left: "3%", size: 4, delay: 0, dur: 3.6, drift: 3 },
  { left: "12%", size: 3, delay: 1.3, dur: 4.6, drift: -2 },
  { left: "21%", size: 5, delay: 0.5, dur: 3.1, drift: 4 },
  { left: "30%", size: 3.5, delay: 2.0, dur: 4.2, drift: -3 },
  { left: "39%", size: 4.5, delay: 0.9, dur: 3.8, drift: 2 },
  { left: "47%", size: 3, delay: 1.7, dur: 4.8, drift: -2 },
  { left: "55%", size: 5, delay: 0.3, dur: 3.3, drift: 3 },
  { left: "63%", size: 3.5, delay: 2.3, dur: 4.0, drift: -3 },
  { left: "71%", size: 4, delay: 1.1, dur: 3.5, drift: 2 },
  { left: "80%", size: 3, delay: 0.6, dur: 4.4, drift: -4 },
  { left: "88%", size: 4.5, delay: 1.9, dur: 3.2, drift: 3 },
  { left: "95%", size: 3.5, delay: 0.2, dur: 4.1, drift: -2 },
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
