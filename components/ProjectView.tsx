import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Locale, projects, t } from "@/content";
import { Header } from "./Header";
import { FadeIn } from "./FadeIn";

export function ProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const p = projects[idx];
  const prev = projects[idx - 1];
  const next = projects[idx + 1];
  const tr = t[locale];
  const workPrefix = locale === "en" ? "/work" : "/ru/work";

  return (
    <>
      <Header locale={locale} path={`work/${slug}/`} />
      <main className="mx-auto w-full max-w-3xl px-6 pt-16 pb-24">
        <FadeIn>
          <Link
            href={locale === "en" ? "/" : "/ru/"}
            className="text-sm text-muted underline"
          >
            {tr.backHome}
          </Link>
          <header className="mt-6 flex flex-col gap-3">
            <p className="text-sm uppercase tracking-widest text-muted">
              {p.company} · {p.year}
            </p>
            <h1 className="text-3xl font-medium tracking-tight text-balance">
              {p.title[locale]}
            </h1>
            <p className="text-muted text-lg leading-relaxed text-balance">
              {p.blurb[locale]}
            </p>
          </header>
        </FadeIn>

        {p.cover && (
          <FadeIn delay={0.05}>
            <div className="mt-10 overflow-hidden rounded-lg border border-rule">
              <Image
                src={p.cover}
                alt={p.title[locale]}
                width={1600}
                height={1000}
                className="h-auto w-full"
              />
            </div>
          </FadeIn>
        )}

        {p.body?.[locale]?.length ? (
          <FadeIn delay={0.05}>
            <article className="prose mt-12 flex max-w-none flex-col gap-5 leading-relaxed">
              {p.body[locale].map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </article>
          </FadeIn>
        ) : null}

        <nav className="mt-20 flex items-center justify-between border-t border-rule pt-6 text-sm">
          {prev ? (
            <Link href={`${workPrefix}/${prev.slug}/`} className="text-muted hover:text-foreground">
              ← {prev.title[locale]}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`${workPrefix}/${next.slug}/`}
              className="text-right text-muted hover:text-foreground"
            >
              {next.title[locale]} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>
    </>
  );
}
