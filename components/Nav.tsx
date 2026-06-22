"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutGroup, motion } from "motion/react";
import { Locale, links, t } from "@/content";
import { CopyEmail } from "./CopyEmail";
import { ExternalLinkIcon } from "./icons";
import { ThemeToggle } from "./ThemeToggle";

const navSpring = { type: "spring", stiffness: 500, damping: 30, mass: 0.6 } as const;

export function Nav({ locale, sticky = true }: { locale: Locale; sticky?: boolean }) {
  const pathname = usePathname() || "/";
  const tr = t[locale];
  const [open, setOpen] = useState(false);
  // Bump on email copy/reset so the layout-animated nav items re-measure and hug.
  const [, bumpLayout] = useState(0);

  // RU is the default at /, EN lives under /en/
  const isEn = locale === "en";
  const stripped = isEn ? pathname.replace(/^\/en\/?/, "/") : pathname;
  const otherHref = isEn ? stripped : `/en${stripped === "/" ? "/" : stripped}`;
  const otherCode = isEn ? "RU" : "EN";

  const homeHref = isEn ? "/en/" : "/";
  const aboutHref = isEn ? "/en/about/" : "/about/";

  // Lock body scroll while overlay is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const NameBlock = (
    <Link
      href={homeHref}
      onClick={() => setOpen(false)}
      className="flex flex-col gap-0.5 md:flex-row md:items-baseline md:gap-2"
    >
      <span>{isEn ? "Petr Afanasyev" : "Петр Афанасьев"}</span>
      <span className="text-muted">
        {isEn ? "Product Designer" : "Продуктовый дизайнер"}
      </span>
    </Link>
  );

  return (
    <>
    <header className={`${sticky ? "sticky top-0" : "relative"} z-30 backdrop-blur-[20px] bg-[color:var(--background)]/70 border-b border-rule`}>
      <div className="flex justify-center px-6 py-4">
        <div className="flex w-full max-w-[1800px] items-center justify-between gap-6 text-[15px] uppercase tracking-[-0.02em] sm:grid sm:grid-cols-2 sm:gap-x-6">
        {NameBlock}

        <div className="flex items-center justify-between">
        {/* Middle: Telegram, Email, Резюме — aligned to the second content column */}
        <LayoutGroup>
          <nav className="hidden items-center gap-3 text-muted md:flex">
            <motion.span layout="position" transition={navSpring} className="inline-flex">
              <a
                href={links.telegram}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                Telegram
                <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
              </a>
            </motion.span>
            <motion.span layout="position" transition={navSpring} className="inline-flex">
              <CopyEmail
                email={links.email}
                label="Email"
                copiedLabel={isEn ? "Copied" : "Скопировано"}
                onCopiedChange={() => bumpLayout((n) => n + 1)}
                className="uppercase hover:text-foreground transition-colors"
              />
            </motion.span>
            <motion.span layout="position" transition={navSpring} className="inline-flex">
              <a
                href={links.cv}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                {tr.cv}
                <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
              </a>
            </motion.span>
          </nav>
        </LayoutGroup>

        {/* Right: About, EN, theme toggle (+ mobile burger) */}
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-3 text-muted md:flex">
            <Link href={aboutHref} className="hover:text-foreground transition-colors">
              {tr.about}
            </Link>
            <Link
              href={otherHref}
              className="hover:text-foreground transition-colors"
              aria-label={`Switch language to ${otherCode}`}
            >
              {otherCode}
            </Link>
            <ThemeToggle />
          </nav>

          {/* Mobile burger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center -mr-2"
          >
            <span className="relative block h-[14px] w-6">
              <span className="absolute left-0 top-1 h-[1.5px] w-6 bg-foreground" />
              <span className="absolute left-0 top-[11px] h-[1.5px] w-6 bg-foreground" />
            </span>
          </button>
        </div>
        </div>
        </div>
      </div>
      </header>

      {/* Mobile overlay — rendered OUTSIDE <header> so the header's backdrop-blur
          doesn't trap fixed positioning (that left the panel transparent/clipped) */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[color:var(--background)] md:hidden">
          <div className="flex items-start justify-between gap-6 border-b border-rule px-6 py-4 text-[15px] uppercase tracking-[-0.02em]">
            {NameBlock}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-9 w-9 items-center justify-center -mr-2 text-foreground"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-7 px-6 pt-10 pb-10 text-[15px] uppercase tracking-[-0.02em] text-muted">
            <ThemeToggle />
            <Link
              href={aboutHref}
              onClick={() => setOpen(false)}
              className="hover:text-foreground transition-colors"
            >
              {tr.about}
            </Link>
            <a
              href={links.telegram}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              Telegram
              <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
            </a>
            <CopyEmail
              email={links.email}
              label="Email"
              copiedLabel={isEn ? "Copied" : "Скопировано"}
              className="uppercase text-left hover:text-foreground transition-colors"
            />
            <a
              href={links.cv}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              {tr.cv}
              <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0" />
            </a>
            <Link
              href={otherHref}
              onClick={() => setOpen(false)}
              className="hover:text-foreground transition-colors"
            >
              {otherCode}
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
