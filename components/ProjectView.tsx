import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale, projects, t } from "@/content";
import { blur } from "@/content/blur";
import { imageMeta } from "@/content/imageMeta";
import { typo } from "@/lib/typo";
import { Nav } from "./Nav";
import { FadeIn } from "./FadeIn";
import { TableOfContents } from "./TableOfContents";
import { ZoomableImage } from "./ZoomableImage";

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
      <Nav locale={locale} sticky={false} />
      <main className="flex justify-center px-6 pt-6 pb-24">
        <div className="grid w-full max-w-[1800px] grid-cols-1 gap-10 lg:grid-cols-[1fr_minmax(0,768px)_1fr] lg:gap-12">
        <aside className="lg:col-start-1 lg:row-start-1 lg:justify-self-start lg:self-start lg:sticky lg:top-6 lg:w-[220px]">
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
              <p className="text-xs uppercase tracking-[-0.02em] text-muted">
                {p.company} · {p.status[locale]} {p.year}
              </p>
              <h1 className="max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight text-balance sm:text-5xl">
                {typo(p.headline[locale])}
              </h1>
              <p className="max-w-3xl text-lg text-muted leading-relaxed text-balance">
                {typo(p.blurb[locale])}
              </p>
            </header>
          </FadeIn>

          {p.cover && (
            <FadeIn delay={0.05}>
              <div className="mt-10 overflow-hidden rounded-2xl border border-foreground/10">
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
              <section className="mt-12 grid gap-8 border-t border-rule pt-8 sm:grid-cols-2 md:grid-cols-4">
                <MetaItem label={tr.role} values={[p.meta.role[locale]]} />
                <MetaItem label={tr.timeline} values={[p.meta.timeline[locale]]} />
                {p.meta.team && <MetaItem label={tr.team} values={p.meta.team[locale]} />}
                {p.meta.skills && <MetaItem label={tr.skills} values={p.meta.skills[locale]} />}
                {p.meta.platforms && <MetaItem label={tr.platforms} values={p.meta.platforms[locale]} />}
              </section>
            </FadeIn>
          )}

          {p.sections && p.sections.length > 0 && (
            <article className="mt-16 flex flex-col gap-20">
              {p.sections.map((s) => (
                <FadeIn key={s.id} delay={0.04}>
                  <section id={s.id} className="scroll-mt-24 flex flex-col gap-5">
                    <p className="text-xs uppercase tracking-[-0.02em] text-muted">
                      {s.eyebrow[locale]}
                    </p>
                    <h2 className="text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl">
                      {typo(s.heading[locale])}
                    </h2>
                    {s.body?.[locale]?.map((para, i) => (
                      <p key={i} className="max-w-[768px] leading-relaxed text-foreground/80">
                        {typo(para)}
                      </p>
                    ))}
                    {[
                      ...(s.image ? [{ src: s.image, caption: s.caption?.[locale] }] : []),
                      ...(s.images ?? []).map((im) => ({ src: im.src, caption: im.caption?.[locale] })),
                    ].map((f, i) => (
                      <CaseFigure
                        key={i}
                        src={f.src}
                        alt={f.caption ?? s.heading[locale]}
                        caption={f.caption}
                        closeLabel={closeLabel}
                      />
                    ))}
                  </section>
                </FadeIn>
              ))}
            </article>
          )}

          <FadeIn delay={0.05}>
            <nav className="mt-24 flex flex-col gap-4 border-t border-rule pt-8">
              <p className="text-xs uppercase tracking-[-0.02em] text-muted">
                {locale === "en" ? "Next" : "Дальше"}
              </p>
              <Link
                href={`${workPrefix}/${next.slug}/`}
                className="group flex items-baseline justify-between gap-6 hover:text-foreground"
              >
                <span className="text-2xl font-medium tracking-tight text-balance sm:text-3xl">
                  {typo(next.headline[locale])}
                </span>
                <span className="shrink-0 text-muted text-sm">
                  {next.company} · {next.year} →
                </span>
              </Link>
            </nav>
          </FadeIn>
        </div>
        </div>
      </main>
    </>
  );
}

function CaseFigure({
  src,
  alt,
  caption,
  closeLabel,
}: {
  src: string;
  alt: string;
  caption?: string;
  closeLabel?: string;
}) {
  const m = imageMeta[src];
  const w = m?.w ?? 1600;
  const h = m?.h ?? 1000;
  const isGif = m?.format === "gif";
  // Only genuinely phone-proportioned shots (clearly taller than wide) cap at 390px —
  // tall desktop full-page captures (aspect ~0.8) stay full width.
  const isPhone = m ? m.w / m.h < 0.6 : false;
  // Phone screenshots cap at 390px; small gifs (the cat) at 80px. Both centered.
  const constrained = isGif || isPhone;
  const wrapMax = isGif ? "max-w-[160px]" : isPhone ? "max-w-[390px]" : "";
  return (
    <figure className={`mt-2 flex flex-col gap-2 ${constrained ? "items-center" : ""}`}>
      <div
        className={`overflow-hidden border border-foreground/10 ${
          isGif ? "rounded-lg" : "rounded-xl"
        } ${wrapMax}`}
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
        <figcaption className="max-w-[768px] text-center text-sm text-muted leading-relaxed">
          {typo(caption)}
        </figcaption>
      )}
    </figure>
  );
}

function MetaItem({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[-0.02em] text-muted">{label}</p>
      <ul className="flex flex-col gap-1 text-sm text-muted">
        {values.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
