import { Locale } from "@/content";
import { MoscowClock } from "./MoscowClock";
import { CatPet } from "./CatPet";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-24 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 overflow-x-clip border-t border-rule pt-8 text-sm text-muted">
      <span>
        © {new Date().getFullYear()}{" "}
        {locale === "en" ? "Petr Afanasyev" : "Петр Афанасьев"}
      </span>
      <div className="flex items-center gap-2">
        <MoscowClock locale={locale} />
        <CatPet />
      </div>
    </footer>
  );
}
