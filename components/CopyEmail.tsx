"use client";

import { useEffect, useRef, useState } from "react";

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
    <button
      type="button"
      onClick={copy}
      title={email}
      aria-label={`Copy email ${email}`}
      className={className}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
