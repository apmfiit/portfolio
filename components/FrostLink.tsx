"use client";

import { ReactNode } from "react";

export function FrostLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <span className="frost group relative inline-flex items-center">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="font-medium underline underline-offset-2 decoration-rule transition-[color,text-shadow,letter-spacing] duration-500 ease-out group-hover:text-[#bfe6ff] group-hover:decoration-[#bfe6ff] group-hover:[text-shadow:0_0_10px_rgba(191,230,255,0.55),0_0_18px_rgba(120,190,235,0.35)] group-hover:tracking-[0.02em]"
      >
        {children}
      </a>
      <span aria-hidden className="frost-flake frost-flake-1">❄</span>
      <span aria-hidden className="frost-flake frost-flake-2">❄</span>
      <span aria-hidden className="frost-flake frost-flake-3">❄</span>
    </span>
  );
}
