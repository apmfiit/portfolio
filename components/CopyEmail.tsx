"use client";

import { useEffect, useRef, useState } from "react";
import { CopyIcon, CheckIcon } from "./icons";

export function CopyEmail({
  email,
  label,
  copiedLabel,
  className,
  onCopied,
}: {
  email: string;
  label: string;
  copiedLabel: string;
  className?: string;
  onCopied?: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // older browsers / denied permission — fall back to a hidden textarea
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      ta.remove();
    }
    setCopied(true);
    onCopied?.();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={copy}
        title={email}
        aria-label={`Copy email ${email}`}
        className={`group/copy inline-flex items-center gap-1 ${className ?? ""}`}
      >
        <span>{label}</span>
        {copied ? (
          <CheckIcon className="h-3.5 w-3.5 shrink-0" />
        ) : (
          <CopyIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover/copy:translate-x-0 group-hover/copy:opacity-100" />
        )}
      </button>
      <span
        aria-hidden
        className={`pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-rule bg-[color:var(--background)] px-2 py-1 text-[11px] leading-none text-muted shadow-sm transition-opacity duration-300 ${
          copied ? "opacity-100" : "opacity-0"
        }`}
      >
        {copiedLabel}
      </span>
    </span>
  );
}
