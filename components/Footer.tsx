import { Locale } from "@/content";
import { MoscowClock } from "./MoscowClock";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-rule pt-8 text-sm text-muted">
      <span>{new Date().getFullYear()}</span>
      <MoscowClock locale={locale} />
    </footer>
  );
}
