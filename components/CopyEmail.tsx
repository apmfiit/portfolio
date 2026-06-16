"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CopyIcon, CheckIcon } from "./icons";

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

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

  // Measure both label widths so the swap animates the button width — neighboring
  // nav links slide smoothly instead of jumping when "Email" → "Скопировано".
  const labelSizer = useRef<HTMLSpanElement>(null);
  const copiedSizer = useRef<HTMLSpanElement>(null);
  const [width, setWidth] = useState<number>();

  // Reserve the wider of the two labels so the swap never reflows or clips —
  // the full word is visible instantly, and we just cross-fade between them.
  useIsoLayoutEffect(() => {
    const a = labelSizer.current?.offsetWidth ?? 0;
    const b = copiedSizer.current?.offsetWidth ?? 0;
    const max = Math.max(a, b);
    if (max) setWidth(max);
  }, [label, copiedLabel]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
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
    <button
      type="button"
      onClick={copy}
      title={email}
      aria-label={`Copy email ${email}`}
      className={`group/copy inline-flex items-center gap-1 ${className ?? ""}`}
    >
      <span
        className="relative inline-block text-center"
        style={{ width }}
      >
        <span
          className={`block whitespace-nowrap transition-opacity duration-150 ease-out ${
            copied ? "opacity-0" : "opacity-100"
          }`}
        >
          {label}
        </span>
        <span
          aria-hidden={!copied}
          className={`absolute inset-0 block whitespace-nowrap text-center transition-opacity duration-150 ease-out ${
            copied ? "opacity-100" : "opacity-0"
          }`}
        >
          {copiedLabel}
        </span>
        {/* hidden sizers (inherit font/case/tracking from context) */}
        <span
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap"
        >
          <span ref={labelSizer}>{label}</span>
        </span>
        <span
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap"
        >
          <span ref={copiedSizer}>{copiedLabel}</span>
        </span>
      </span>
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover/copy:translate-x-0 group-hover/copy:opacity-100" />
      )}
    </button>
  );
}
