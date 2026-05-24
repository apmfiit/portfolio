"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, links, t } from "@/content";

export function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const tr = t[locale];

  // RU is the default at /, EN lives under /en/
  const isEn = locale === "en";
  const stripped = isEn ? pathname.replace(/^\/en\/?/, "/") : pathname;
  const otherHref = isEn ? stripped : `/en${stripped === "/" ? "/" : stripped}`;
  const otherCode = isEn ? "RU" : "EN";

  const homeHref = isEn ? "/en/" : "/";

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[color:var(--background)]/70 border-b border-rule">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 text-sm">
        <Link href={homeHref} className="flex items-baseline gap-2 font-medium tracking-tight">
          <span>{isEn ? "Petr Afanasyev" : "Петр Афанасьев"}</span>
          <span className="text-muted hidden sm:inline">— {isEn ? "Designer" : "Дизайнер"}</span>
        </Link>
        <nav className="flex items-center gap-5 text-muted">
          <Link href={homeHref} className="hover:text-foreground transition-colors">
            {tr.work}
          </Link>
          <a
            href={links.cv}
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground transition-colors"
          >
            {tr.cv}
          </a>
          <Link
            href={otherHref}
            className="hover:text-foreground transition-colors"
            aria-label={`Switch language to ${otherCode}`}
          >
            {otherCode}
          </Link>
        </nav>
      </div>
    </header>
  );
}
