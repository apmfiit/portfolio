"use client";

import { useEffect, useRef, useState } from "react";
import { CopyIcon, CheckIcon } from "./icons";

export function CopyEmail({
  email,
  label,
  copiedLabel,
  className,
  onCopied,
  onCopiedChange,
}: {
  email: string;
  label: string;
  copiedLabel: string;
  className?: string;
  onCopied?: () => void;
  onCopiedChange?: (copied: boolean) => void;
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
    onCopiedChange?.(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setCopied(false);
      onCopiedChange?.(false);
    }, 1600);
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
        key={copied ? "copied" : "label"}
        className="whitespace-nowrap animate-[lb-in_150ms_ease-out]"
      >
        {copied ? copiedLabel : label}
      </span>
      {copied ? (
        <CheckIcon className="h-3.5 w-3.5 shrink-0" />
      ) : (
        <CopyIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover/copy:translate-x-0 group-hover/copy:opacity-100" />
      )}
    </button>
  );
}
