import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale, projects, t } from "@/content";
import { Nav } from "./Nav";
import { FadeIn } from "./FadeIn";
import { TableOfContents } from "./TableOfContents";

export function ProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];
  const tr = t[locale];
  const workPrefix = locale === "en" ? "/en/work" : "/work";
  const homeHref = locale === "en" ? "/en/" : "/";

  return (
    <>
      <Nav locale={locale} />
      <main className="mx-auto w-full max-w-[1800px] px-6 pt-12 pb-24">
        <FadeIn>
          <Link href={homeHref} className="text-sm text-muted hover:text-foreground">
            {tr.backHome}
          </Link>

          <header className="mt-6 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              {p.company} · {p.status[locale]} {p.year}
            </p>
            <h1 className="max-w-4xl text-4xl font-medium leading-[1.1] tracking-tight text-balance sm:text-5xl">
              {p.headline[locale]}
            </h1>
            <p className="max-w-3xl text-lg text-muted leading-relaxed text-balance">
              {p.blurb[locale]}
            </p>
          </header>
        </FadeIn>

        {p.cover && (
          <FadeIn delay={0.05}>
            <div className="mt-10 overflow-hidden rounded-2xl border border-rule">
              <Image
                src={p.cover}
                alt={p.headline[locale]}
                width={1920}
                height={1200}
                className="h-auto w-full"
                priority
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
          <div className="mt-16 grid gap-12 lg:grid-cols-[200px_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <TableOfContents sections={p.sections} locale={locale} />
            </aside>
            <article className="flex flex-col gap-20">
              {p.sections.map((s) => (
                <FadeIn key={s.id} delay={0.04}>
                  <section id={s.id} className="scroll-mt-24 flex flex-col gap-5">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">
                      {s.eyebrow[locale]}
                    </p>
                    <h2 className="text-2xl font-medium leading-snug tracking-tight text-balance sm:text-3xl">
                      {s.heading[locale]}
                    </h2>
                    {s.body?.[locale]?.map((para, i) => (
                      <p key={i} className="max-w-[768px] leading-relaxed text-foreground/80">
                        {para}
                      </p>
                    ))}
                    {s.image && (
                      <div className="mt-2 overflow-hidden rounded-xl border border-rule">
                        <Image
                          src={s.image}
                          alt={s.heading[locale]}
                          width={1600}
                          height={1000}
                          className="h-auto w-full"
                        />
                      </div>
                    )}
                  </section>
                </FadeIn>
              ))}
            </article>
          </div>
        )}

        <FadeIn delay={0.05}>
          <nav className="mt-24 flex flex-col gap-4 border-t border-rule pt-8">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              {locale === "en" ? "Next" : "Дальше"}
            </p>
            <Link
              href={`${workPrefix}/${next.slug}/`}
              className="group flex items-baseline justify-between gap-6 hover:text-foreground"
            >
              <span className="text-2xl font-medium tracking-tight text-balance sm:text-3xl">
                {next.headline[locale]}
              </span>
              <span className="shrink-0 text-muted text-sm">
                {next.company} · {next.year} →
              </span>
            </Link>
          </nav>
        </FadeIn>
      </main>
    </>
  );
}

function MetaItem({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
      <ul className="flex flex-col gap-1 text-sm">
        {values.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
