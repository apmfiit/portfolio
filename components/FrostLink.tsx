"use client";

import { ReactNode } from "react";

const FLAKES = [
  { left: "8%", size: 9, delay: 0, dur: 3.2, drift: 6 },
  { left: "22%", size: 7, delay: 0.4, dur: 3.8, drift: -4 },
  { left: "38%", size: 11, delay: 0.15, dur: 3.0, drift: 5 },
  { left: "54%", size: 8, delay: 0.7, dur: 3.6, drift: -6 },
  { left: "70%", size: 10, delay: 0.25, dur: 3.3, drift: 4 },
  { left: "86%", size: 7, delay: 0.55, dur: 3.9, drift: -3 },
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
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-medium underline underline-offset-2 decoration-rule transition-colors duration-500 ease-out group-hover:text-[#9fd5f5] group-hover:decoration-[#9fd5f5]"
      >
        {children}
      </a>
      <span
        aria-hidden
        className="frost-snow pointer-events-none absolute inset-x-0 -top-2 h-10 overflow-visible"
      >
        {FLAKES.map((f, i) => (
          <span
            key={i}
            className="frost-flake"
            style={{
              left: f.left,
              fontSize: `${f.size}px`,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.dur}s`,
              ["--drift" as string]: `${f.drift}px`,
            }}
          >
            ❄
          </span>
        ))}
      </span>
    </span>
  );
}
