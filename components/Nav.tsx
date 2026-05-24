"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Locale, links, t } from "@/content";

export function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname() || "/";
  const tr = t[locale];

  // build the "other locale" href by toggling the /ru prefix
  const isRu = locale === "ru";
  const stripped = isRu ? pathname.replace(/^\/ru\/?/, "/") : pathname;
  const otherHref = isRu ? stripped : `/ru${stripped === "/" ? "/" : stripped}`;
  const otherCode = isRu ? "EN" : "RU";

  const homeHref = isRu ? "/ru/" : "/";

  return (
    <header className="sticky top-0 z-30 backdrop-blur-md bg-[color:var(--background)]/70 border-b border-rule">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4 text-sm">
        <Link href={homeHref} className="flex items-baseline gap-2 font-medium tracking-tight">
          <span>{isRu ? "Петр Афанасьев" : "Petr Afanasyev"}</span>
          <span className="text-muted hidden sm:inline">— {isRu ? "Дизайнер" : "Designer"}</span>
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
