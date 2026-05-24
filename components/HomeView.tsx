import Image from "next/image";
import Link from "next/link";
import { Locale, links, projects, t } from "@/content";
import { Header } from "./Header";
import { FadeIn } from "./FadeIn";

export function HomeView({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const workPrefix = locale === "en" ? "/work" : "/ru/work";

  return (
    <>
      <Header locale={locale} />

      <main className="mx-auto w-full max-w-3xl px-6 pt-16 pb-24">
        <FadeIn>
          <section className="flex flex-col gap-6">
            <Image
              src="/images/avatar.png"
              alt="Petr Afanasyev"
              width={88}
              height={88}
              className="rounded-full"
              priority
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-medium tracking-tight">
                {locale === "ru" ? "Петр Афанасьев" : "Petr Afanasyev"}
              </h1>
              <p className="text-muted">{tr.yearsLocation}</p>
            </div>
            <p className="max-w-prose text-balance leading-relaxed">{tr.intro}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a href={links.telegram} className="underline" target="_blank" rel="noreferrer">
                Telegram →
              </a>
              <a href={`mailto:${links.email}`} className="underline">
                {links.email} →
              </a>
              <a href={links.cv} className="underline" target="_blank" rel="noreferrer">
                {tr.cv} →
              </a>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.05}>
          <section className="mt-20">
            <h2 className="mb-6 text-sm uppercase tracking-widest text-muted">
              {tr.selectedWork}
            </h2>
            <ul className="flex flex-col">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`${workPrefix}/${p.slug}/`}
                    className="group flex flex-col gap-1 border-t border-rule py-6 transition-colors hover:bg-foreground/[0.02]"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg font-medium tracking-tight">
                        {p.title[locale]}
                      </h3>
                      <span className="shrink-0 text-sm text-muted">
                        {p.company} · {p.year}
                      </span>
                    </div>
                    <p className="text-muted text-sm">{p.blurb[locale]}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-rule" />
          </section>
        </FadeIn>

        <FadeIn delay={0.05}>
          <section className="mt-20 grid gap-12 sm:grid-cols-2">
            <div>
              <h2 className="mb-3 text-sm uppercase tracking-widest text-muted">
                {tr.tools}
              </h2>
              <ul className="space-y-1.5 text-sm">
                {tr.toolsItems.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-sm uppercase tracking-widest text-muted">
                {tr.growth}
              </h2>
              <ul className="space-y-1.5 text-sm">
                {tr.growthItems.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.05}>
          <section className="mt-20">
            <h2 className="mb-3 text-sm uppercase tracking-widest text-muted">
              {tr.about}
            </h2>
            <ul className="space-y-1.5 text-sm">
              {tr.aboutItems.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </section>
        </FadeIn>

        <footer className="mt-24 flex items-center justify-between border-t border-rule pt-8 text-sm text-muted">
          <span>{tr.rights}</span>
          <a href={`mailto:${links.email}`} className="underline">
            {links.email}
          </a>
        </footer>
      </main>
    </>
  );
}
