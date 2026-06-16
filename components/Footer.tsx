import { Locale } from "@/content";
import { MoscowClock } from "./MoscowClock";
import { ThemeToggle } from "./ThemeToggle";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-rule pt-8 text-sm text-muted">
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <span>
          © {new Date().getFullYear()}{" "}
          {locale === "en" ? "Petr Afanasyev" : "Петр Афанасьев"}
        </span>
      </div>
      <MoscowClock locale={locale} />
    </footer>
  );
}
