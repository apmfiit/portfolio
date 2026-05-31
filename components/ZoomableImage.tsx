"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  blurDataURL?: string;
};

export function ZoomableImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  blurDataURL,
}: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={alt}
        className="block w-full cursor-zoom-in appearance-none border-0 bg-transparent p-0 text-left"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          priority={priority}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[color:var(--background)]/70 backdrop-blur-xl px-6 py-12 animate-[lb-in_180ms_ease-out]"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-6 top-6 text-[15px] uppercase tracking-[-0.02em] text-foreground hover:text-muted transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={close}
            className="relative flex max-h-full max-w-[1600px] cursor-zoom-out items-center justify-center"
            aria-label="Close"
          >
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className="h-auto max-h-[88vh] w-auto max-w-full rounded-xl border border-foreground/10 object-contain"
              priority
            />
          </button>
        </div>
      )}
    </>
  );
}
