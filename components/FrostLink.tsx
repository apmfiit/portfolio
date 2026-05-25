"use client";

import { ReactNode } from "react";

const FLAKES = [
  { left: "6%", size: 14, delay: 0, dur: 3.2, drift: 8, variant: 0 },
  { left: "20%", size: 10, delay: 0.6, dur: 4.0, drift: -6, variant: 1 },
  { left: "34%", size: 16, delay: 0.2, dur: 3.0, drift: 6, variant: 0 },
  { left: "48%", size: 11, delay: 0.9, dur: 3.8, drift: -8, variant: 1 },
  { left: "62%", size: 13, delay: 0.35, dur: 3.4, drift: 5, variant: 0 },
  { left: "76%", size: 9, delay: 0.75, dur: 4.2, drift: -5, variant: 1 },
  { left: "90%", size: 15, delay: 0.15, dur: 3.1, drift: 7, variant: 0 },
];

// A 6-fold-symmetric dendritic snowflake (viewBox -50..50).
// Variant 0 — classic dendrite; variant 1 — thinner, more branches.
function Snowflake({ variant, size }: { variant: 0 | 1; size: number }) {
  const arm =
    variant === 0 ? (
      <g
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        fill="none"
      >
        <line x1={0} y1={0} x2={0} y2={-46} />
        <line x1={0} y1={-14} x2={-7} y2={-21} />
        <line x1={0} y1={-14} x2={7} y2={-21} />
        <line x1={0} y1={-28} x2={-9} y2={-37} />
        <line x1={0} y1={-28} x2={9} y2={-37} />
        <line x1={0} y1={-40} x2={-5} y2={-45} />
        <line x1={0} y1={-40} x2={5} y2={-45} />
      </g>
    ) : (
      <g
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        fill="none"
      >
        <line x1={0} y1={0} x2={0} y2={-44} />
        <line x1={0} y1={-10} x2={-5} y2={-15} />
        <line x1={0} y1={-10} x2={5} y2={-15} />
        <line x1={0} y1={-20} x2={-7} y2={-27} />
        <line x1={0} y1={-20} x2={7} y2={-27} />
        <line x1={0} y1={-32} x2={-6} y2={-38} />
        <line x1={0} y1={-32} x2={6} y2={-38} />
        <line x1={0} y1={-42} x2={-3} y2={-45} />
        <line x1={0} y1={-42} x2={3} y2={-45} />
      </g>
    );

  return (
    <svg
      width={size}
      height={size}
      viewBox="-50 -50 100 100"
      aria-hidden
      style={{ display: "block", color: "#9fd5f5" }}
    >
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          {arm}
        </g>
      ))}
      <circle cx={0} cy={0} r={1.8} fill="currentColor" />
    </svg>
  );
}

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
        className="frost-snow pointer-events-none absolute inset-x-0 -top-2 h-12 overflow-visible"
      >
        {FLAKES.map((f, i) => (
          <span
            key={i}
            className="frost-flake"
            style={{
              left: f.left,
              animationDelay: `${f.delay}s`,
              animationDuration: `${f.dur}s`,
              ["--drift" as string]: `${f.drift}px`,
            }}
          >
            <Snowflake variant={f.variant as 0 | 1} size={f.size} />
          </span>
        ))}
      </span>
    </span>
  );
}
