import Link from "next/link";
import { Locale } from "@/content";

export function Header({ locale, path = "" }: { locale: Locale; path?: string }) {
  const otherLocale: Locale = locale === "en" ? "ru" : "en";
  const otherHref =
    otherLocale === "en"
      ? `/${path}`.replace(/\/+$/, "/")
      : `/ru${path ? `/${path}` : ""}`.replace(/\/+$/, "/");

  const homeHref = locale === "en" ? "/" : "/ru/";

  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 pt-8 text-sm">
      <Link href={homeHref} className="font-medium tracking-tight">
        Petr Afanasyev
      </Link>
      <nav className="flex items-center gap-4 text-muted">
        <Link
          href={otherHref || "/"}
          className="hover:text-foreground transition-colors"
          aria-label={`Switch to ${otherLocale.toUpperCase()}`}
        >
          {otherLocale.toUpperCase()}
        </Link>
      </nav>
    </header>
  );
}
