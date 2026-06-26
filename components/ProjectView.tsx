import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale, projects, t } from "@/content";
import { blur } from "@/content/blur";
import { imageMeta } from "@/content/imageMeta";
import { typo } from "@/lib/typo";
import { Nav } from "./Nav";
import { FadeIn } from "./FadeIn";
import { Footer } from "./Footer";
import { TableOfContents } from "./TableOfContents";
import { ZoomableImage } from "./ZoomableImage";

// Company names that become plain blue links inside body/blurb text.
// (The frosty/ice hover is reserved for the home page and the About title.)
const BODY_LINKS: { token: string; href: string }[] = [
  { token: "Rabota.Ykt.Ru", href: "https://rabota.ykt.ru/" },
  { token: "EdaYkt", href: "https://eda.ykt.ru/" },
  { token: "KUPIKOD", href: "https://kupikod.com/" },
];

// typo() a text run while preserving its boundary spaces (typo trims), and
// NBSP-gluing a short trailing word (e.g. «в») to the following link.
function typoSeg(s: string): React.ReactNode {
  if (!s) return "";
  const lead = /^\s/.test(s) ? " " : "";
  const hasTrail = /\s$/.test(s);
  const core = s.trim();
  const lastWord = (core.split(/\s+/).pop() ?? "").replace(/[^\p{L}\p{N}]/gu, "");
  const short = lastWord.length > 0 && lastWord.length <= 2;
  const trail = hasTrail ? (short ? " " : " ") : "";
  return (
    <>
      {lead}
      {core ? typo(core) : ""}
      {trail}
    </>
  );
}

function renderPara(para: string): React.ReactNode {
  let best: { idx: number; rule: (typeof BODY_LINKS)[number] } | null = null;
  for (const rule of BODY_LINKS) {
    const idx = para.indexOf(rule.token);
    if (idx !== -1 && (best === null || idx < best.idx)) best = { idx, rule };
  }
  if (!best) return typoSeg(para);
  const before = para.slice(0, best.idx);
  const after = para.slice(best.idx + best.rule.token.length);
  const link = (
    <a
      href={best.rule.href}
      target="_blank"
      rel="noreferrer"
      className="text-[#2f9fe0] underline underline-offset-2 decoration-[#2f9fe0]/40 transition-colors hover:decoration-[#2f9fe0]"
    >
      {best.rule.token}
    </a>
  );
  return (
    <>
      {typoSeg(before)}
      {link}
      {renderPara(after)}
    </>
  );
}

export function ProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const tr = t[locale];
  const closeLabel = locale === "en" ? "Close" : "Закрыть";
  const workPrefix = locale === "en" ? "/en/work" : "/work";
  const homeHref = locale === "en" ? "/en/" : "/";

  return (
    <>
      <Nav locale={locale} />
      <main className="flex justify-center px-6 pt-6 pb-10">
        <div className="w-full max-w-[1800px]">
        <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,768px)_1fr] lg:gap-12">
        <aside className="lg:col-start-1 lg:row-start-1 lg:justify-self-start lg:self-start lg:sticky lg:top-24 lg:w-[220px]">
          <div className="flex flex-col gap-8 text-[15px] uppercase tracking-[-0.02em]">
            <Link
              href={homeHref}
              className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors"
            >
              <span aria-hidden>←</span>
              {locale === "en" ? "Back" : "Назад"}
            </Link>
            {p.sections && p.sections.length > 0 && (
              <TableOfContents sections={p.sections} locale={locale} />
            )}
          </div>
        </aside>

        <div className="flex w-full flex-col lg:col-start-2 lg:row-start-1">
          <FadeIn>
            <header className="flex flex-col gap-4">
              <p className="mx-auto w-full max-w-[644px] text-xs uppercase tracking-[-0.02em] text-muted">
                {p.company} · {p.status[locale]} {p.year}
              </p>
              <h1 className="mx-auto w-full max-w-[644px] text-[2rem] font-semibold leading-[1.1] tracking-tight text-balance sm:text-[2.5rem]">
                {typo(p.headline[locale])}
              </h1>
              <p className="mx-auto w-full max-w-[644px] text-lg text-foreground/80 leading-relaxed text-balance">
                {renderPara(p.blurb[locale])}
              </p>
            </header>
          </FadeIn>

          {p.cover && (
            <FadeIn delay={0.05}>
              <div className="mx-auto mt-10 w-full overflow-hidden rounded-2xl border border-[color:var(--image-edge)] 2xl:relative 2xl:left-1/2 2xl:w-[980px] 2xl:max-w-[calc(100vw-3rem)] 2xl:-translate-x-1/2">
                <ZoomableImage
                  src={p.cover}
                  alt={p.headline[locale]}
                  width={1920}
                  height={1200}
                  className="h-auto w-full"
                  priority
                  blurDataURL={blur[p.cover]}
                  closeLabel={closeLabel}
                />
              </div>
            </FadeIn>
          )}

          {p.meta && (
            <FadeIn delay={0.05}>
              <section className="mx-auto mt-12 grid w-full max-w-[644px] gap-8 border-t border-rule pt-8 sm:grid-cols-2 md:grid-cols-3">
                <MetaItem label={tr.timeline} values={[p.meta.timeline[locale]]} />
                {p.meta.team && <MetaItem label={tr.team} values={p.meta.team[locale]} />}
                {p.meta.platforms && <MetaItem label={tr.platforms} values={p.meta.platforms[locale]} />}
              </section>
            </FadeIn>
          )}

          {p.sections && p.sections.length > 0 && (
            <article className="mt-16 flex flex-col gap-20">
              {p.sections.map((s) => (
                <FadeIn key={s.id} delay={0.04}>
                  <section id={s.id} className="scroll-mt-24 flex flex-col gap-4">
                    <p className="mx-auto w-full max-w-[644px] text-sm uppercase tracking-[-0.02em] text-muted">
                      {s.eyebrow[locale]}
                    </p>
                    {s.heading?.[locale]?.trim() && (
                      <h2 className="mx-auto w-full max-w-[644px] text-2xl font-medium tracking-[-0.0125em] text-pretty">
                        {typo(s.heading[locale])}
                      </h2>
                    )}
                    {s.bullets ? (
                      <ul className="mx-auto flex w-full max-w-[644px] flex-col gap-2 text-base font-normal text-pretty text-foreground/80 md:text-lg">
                        {s.body?.[locale]?.map((item, i) => (
                          <li
                            key={i}
                            className="relative pl-6 before:absolute before:left-0 before:text-muted before:content-['•']"
                          >
                            {renderPara(item)}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      s.body?.[locale]?.map((para, i) => (
                        <p key={i} className="mx-auto w-full max-w-[644px] text-base font-normal text-pretty text-foreground/80 md:text-lg">
                          {renderPara(para)}
                        </p>
                      ))
                    )}
                    {s.image && (
                      <CaseFigure
                        src={s.image}
                        alt={s.caption?.[locale] ?? s.heading?.[locale] ?? s.eyebrow[locale]}
                        caption={s.caption?.[locale]}
                        closeLabel={closeLabel}
                      />
                    )}
                    {(s.images ?? []).map((im, i) =>
                      im.row && im.row.length > 0 ? (
                        <CaseRow
                          key={i}
                          srcs={im.row}
                          caption={im.caption?.[locale]}
                          alt={s.heading?.[locale] ?? s.eyebrow[locale]}
                          closeLabel={closeLabel}
                        />
                      ) : im.src ? (
                        <CaseFigure
                          key={i}
                          src={im.src}
                          alt={im.caption?.[locale] ?? s.heading?.[locale] ?? s.eyebrow[locale]}
                          caption={im.caption?.[locale]}
                          width={im.width}
                          closeLabel={closeLabel}
                        />
                      ) : null,
                    )}
                  </section>
                </FadeIn>
              ))}
            </article>
          )}

          <FadeIn delay={0.05}>
            <nav className="mx-auto mt-24 w-full max-w-[644px] border-t border-rule pt-8">
              <Link
                href={`${workPrefix}/${next.slug}/`}
                className="group flex flex-col items-end gap-1 text-right"
              >
                <span className="text-sm uppercase tracking-[-0.02em] text-muted">
                  {locale === "en" ? "Next" : "Дальше"}
                </span>
                <span className="text-lg font-medium tracking-tight text-foreground/90 transition-colors group-hover:text-foreground sm:text-xl">
                  {typo(next.headline[locale])}
                </span>
                <span className="text-sm text-muted">
                  {next.company} · {next.year} →
                </span>
              </Link>
            </nav>
          </FadeIn>
        </div>
        </div>
        <Footer locale={locale} />
        </div>
      </main>
    </>
  );
}

function CaseFigure({
  src,
  alt,
  caption,
  width,
  closeLabel,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: "text";
  closeLabel?: string;
}) {
  const m = imageMeta[src];
  const w = m?.w ?? 1600;
  const h = m?.h ?? 1000;
  const isGif = m?.format === "gif";
  const ratio = m ? m.w / m.h : 1.6;
  // Only genuinely phone-proportioned shots (clearly taller than wide) cap narrow;
  // tall desktop full-page captures (aspect ~0.8) stay in the wide bucket.
  const isPhone = !isGif && ratio < 0.62;
  // Apple-style sizing: wide shots (incl. tall desktop captures) break out past
  // the text column to ~980px on large screens (≥2xl, where the breakout clears
  // the left TOC); mobile/phone shots cap at 420px; the small cat gif stays tiny.
  const wrap = isGif
    ? "mx-auto max-w-[160px]"
    : width === "text"
      ? "mx-auto w-full max-w-[644px]"
      : isPhone
        ? "mx-auto w-full max-w-[420px]"
        : "mx-auto w-full 2xl:relative 2xl:left-1/2 2xl:w-[980px] 2xl:max-w-[calc(100vw-3rem)] 2xl:-translate-x-1/2";
  return (
    <figure className="mt-7 flex flex-col gap-2">
      <div
        className={`overflow-hidden border border-[color:var(--image-edge)] ${
          isGif ? "rounded-lg" : "rounded-xl"
        } ${wrap}`}
      >
        {isGif ? (
          <Image
            src={src}
            alt={alt}
            width={w}
            height={h}
            className="h-auto w-full"
            unoptimized
          />
        ) : (
          <ZoomableImage
            src={src}
            alt={alt}
            width={w}
            height={h}
            className="h-auto w-full"
            blurDataURL={blur[src]}
            closeLabel={closeLabel}
          />
        )}
      </div>
      {caption && (
        <figcaption className="mx-auto w-full max-w-[644px] text-left text-sm text-muted leading-relaxed">
          {typo(caption)}
        </figcaption>
      )}
    </figure>
  );
}

// Several images side by side in one horizontal row, with a shared caption.
function CaseRow({
  srcs,
  caption,
  alt,
  closeLabel,
}: {
  srcs: string[];
  caption?: string;
  alt: string;
  closeLabel?: string;
}) {
  return (
    <figure className="mx-auto mt-7 flex w-full flex-col gap-2 2xl:relative 2xl:left-1/2 2xl:w-[980px] 2xl:max-w-[calc(100vw-3rem)] 2xl:-translate-x-1/2">
      <div className="flex items-start gap-3">
        {srcs.map((src, i) => {
          const m = imageMeta[src];
          return (
            <div
              key={i}
              className="min-w-0 flex-1 overflow-hidden rounded-xl border border-[color:var(--image-edge)]"
            >
              <ZoomableImage
                src={src}
                alt={alt}
                width={m?.w ?? 1600}
                height={m?.h ?? 1000}
                className="h-auto w-full"
                blurDataURL={blur[src]}
                closeLabel={closeLabel}
              />
            </div>
          );
        })}
      </div>
      {caption && (
        <figcaption className="mx-auto w-full max-w-[644px] text-left text-sm text-muted leading-relaxed">
          {typo(caption)}
        </figcaption>
      )}
    </figure>
  );
}

function MetaItem({
  label,
  values,
  nowrap,
}: {
  label: string;
  values: string[];
  nowrap?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[-0.02em] text-muted">{label}</p>
      <ul className="flex flex-col gap-1 text-sm text-muted">
        {values.map((v, i) => (
          <li key={i} className={nowrap ? "whitespace-nowrap" : undefined}>
            {v}
          </li>
        ))}
      </ul>
    </div>
  );
}
