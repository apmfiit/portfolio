import Image from "next/image";
import { Locale, about, links, t } from "@/content";
import { blur } from "@/content/blur";
import { imageMeta } from "@/content/imageMeta";
import { typo } from "@/lib/typo";
import { Nav } from "./Nav";
import { FadeIn } from "./FadeIn";
import { FrostLink } from "./FrostLink";
import { CopyEmail } from "./CopyEmail";
import { ExternalLinkIcon } from "./icons";
import { ZoomableImage } from "./ZoomableImage";
import { PinIcon } from "./PinIcon";
import { UkFlag } from "./UkFlag";
import { Footer } from "./Footer";

// Designing since May 2021 — count only full years.
const DESIGN_START = { year: 2021, month: 4 }; // month is 0-indexed (4 = May)

function fullYearsSince(start: { year: number; month: number }): number {
  const now = new Date();
  let years = now.getFullYear() - start.year;
  if (now.getMonth() < start.month) years -= 1;
  return Math.max(0, years);
}

const COMPANY_LINK =
  "underline underline-offset-2 decoration-foreground/30 transition-colors hover:decoration-foreground";

// Render the intro statement, linking the companies it names. Ykt.Ru gets the
// frosty snow hover; ВТБ Онлайн and KUPIKOD are subtle underlined links.
function renderIntro(text: string, locale: Locale): React.ReactNode[] {
  const vtb = locale === "en" ? "VTB Online" : "ВТБ Онлайн";
  const names = [vtb, "KUPIKOD", "Ykt.Ru"];
  const out: React.ReactNode[] = [];
  let rest = text;
  let key = 0;
  // typo() trims, which would swallow the space between a word and a linked
  // company name — preserve a single leading/trailing space around each run.
  const pushText = (s: string) => {
    if (!s) return;
    const lead = /^\s/.test(s) ? " " : "";
    const hasTrail = /\s$/.test(s);
    const core = s.trim();
    // If the run ends with a short word (RU preposition/conjunction like "в"/"В"),
    // glue it to the following link with a non-breaking space so it never
    // dangles at the end of a line.
    const lastWord = (core.split(/\s+/).pop() ?? "").replace(/[^\p{L}\p{N}]/gu, "");
    const short = lastWord.length > 0 && lastWord.length <= 2;
    const trail = hasTrail ? (short ? " " : " ") : "";
    out.push(
      <span key={key++}>
        {lead}
        {core ? typo(core) : ""}
        {trail}
      </span>,
    );
  };
  while (rest.length) {
    let best: { idx: number; name: string } | null = null;
    for (const n of names) {
      const idx = rest.indexOf(n);
      if (idx !== -1 && (best === null || idx < best.idx)) best = { idx, name: n };
    }
    if (!best) {
      pushText(rest);
      break;
    }
    if (best.idx > 0) pushText(rest.slice(0, best.idx));
    if (best.name === "Ykt.Ru") {
      out.push(
        <FrostLink key={key++} href="https://ykt.ru/about">
          Ykt.Ru
        </FrostLink>,
      );
    } else {
      const href =
        best.name === "KUPIKOD" ? "https://kupikod.com/" : "https://www.vtb.ru/";
      out.push(
        <a
          key={key++}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={COMPANY_LINK}
        >
          {best.name}
        </a>,
      );
    }
    rest = rest.slice(best.idx + best.name.length);
  }
  return out;
}

function ruYears(n: number): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "год";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "года";
  return "лет";
}

export function AboutView({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const isEn = locale === "en";

  const years = fullYearsSince(DESIGN_START);
  const expLabel = isEn
    ? `${years} ${years === 1 ? "year" : "years"} of experience`
    : `${years} ${ruYears(years)} опыта`;
  const city = isEn ? "Moscow" : "Москва";

  return (
    <>
      <Nav locale={locale} />
      <main className="flex justify-center px-6 pt-16 pb-10">
        <div className="w-full max-w-[1800px]">
        <div className="mx-auto flex w-full max-w-[644px] flex-col gap-16">
          {/* Intro */}
          <FadeIn>
            <header className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/avatar-rectangular.jpg"
                  alt="Petr Afanasyev"
                  width={1000}
                  height={976}
                  placeholder={
                    blur["/images/avatar-rectangular.jpg"] ? "blur" : "empty"
                  }
                  blurDataURL={blur["/images/avatar-rectangular.jpg"]}
                  className="h-24 w-24 rounded-2xl border border-[color:var(--image-edge)] object-cover sm:h-28 sm:w-28"
                />
                <p className="flex items-center gap-2 text-sm uppercase tracking-[-0.02em] text-muted">
                  <span>{expLabel}</span>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <PinIcon className="h-3.5 w-3.5" />
                    {city}
                  </span>
                </p>
              </div>
              <h1 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-balance">
                {renderIntro(about.intro[locale], locale)}
              </h1>
            </header>
          </FadeIn>

          {/* Growth & learning */}
          <FadeIn delay={0.05}>
            <Section label={tr.growth}>
              <ul className="flex flex-col gap-2">
                {about.growth[locale].map((g, i) => {
                  const parts = g.split("🇬🇧");
                  return (
                    <li
                      key={i}
                      className="relative pl-4 text-base md:text-lg font-normal text-pretty text-foreground/80 before:absolute before:left-0 before:text-muted before:content-['—']"
                    >
                      {parts.map((part, k) => (
                        <span key={k}>
                          {typo(part)}
                          {k < parts.length - 1 && (
                            <UkFlag className="ml-1 inline-block h-[0.82em] w-auto align-[-0.08em] rounded-[2px]" />
                          )}
                        </span>
                      ))}
                    </li>
                  );
                })}
              </ul>
            </Section>
          </FadeIn>

          {/* Achievements */}
          <FadeIn delay={0.05}>
            <Section label={tr.achievements}>
              <div className="flex flex-col gap-4">
                {about.achievements.map((a, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[56px_minmax(0,1fr)] gap-4"
                  >
                    <p className="text-sm text-muted">{a.year}</p>
                    <div className="flex flex-col gap-3">
                      <p className="text-base md:text-lg font-normal text-pretty text-foreground/80">
                        {typo(a.text[locale])}
                      </p>
                      {a.images && a.images.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {a.images.map((src, j) => {
                            const m = imageMeta[src];
                            const H = 104;
                            const W = m ? Math.round((H * m.w) / m.h) : H;
                            return (
                              <div
                                key={j}
                                style={{ width: W, height: H }}
                                className="overflow-hidden rounded-lg border border-[color:var(--image-edge)]"
                              >
                                <ZoomableImage
                                  src={src}
                                  alt={a.text[locale]}
                                  width={m?.w ?? 1280}
                                  height={m?.h ?? 895}
                                  className="h-full w-full object-cover"
                                  blurDataURL={blur[src]}
                                  closeLabel={isEn ? "Close" : "Закрыть"}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </FadeIn>

          {/* About me */}
          <FadeIn delay={0.05}>
            <Section label={tr.aboutMe}>
              <p className="text-base md:text-lg font-normal text-pretty text-foreground/80">
                {typo(about.personal[locale])}
              </p>
            </Section>
          </FadeIn>

          {/* Contacts */}
          <FadeIn delay={0.05}>
            <Section label={tr.contacts}>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm uppercase tracking-[-0.02em] text-muted">
                <a
                  href={links.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  Telegram
                  <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                </a>
                <CopyEmail
                  email={links.email}
                  label="Email"
                  copiedLabel={isEn ? "Copied" : "Скопировано"}
                  className="uppercase hover:text-foreground"
                />
                <a
                  href={links.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="group/link inline-flex items-center gap-1 hover:text-foreground transition-colors"
                >
                  {tr.cv}
                  <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 -translate-x-1 opacity-0 transition duration-200 group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                </a>
              </div>
            </Section>
          </FadeIn>
        </div>
        <Footer locale={locale} />
        </div>
      </main>
    </>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 border-t border-rule pt-8">
      <h2 className="text-sm uppercase tracking-[-0.02em] text-muted">{label}</h2>
      <div>{children}</div>
    </section>
  );
}
