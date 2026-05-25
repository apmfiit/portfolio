import { Locale, experience, projects, t } from "@/content";
import { Nav } from "./Nav";
import { ProjectCard } from "./ProjectCard";
import { FadeIn } from "./FadeIn";
import { FrostLink } from "./FrostLink";

export function HomeView({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const workPrefix = locale === "en" ? "/en/work" : "/work";

  return (
    <>
      <Nav locale={locale} />

      <main className="mx-auto w-full max-w-[1800px] px-6 pt-16 pb-24">
        <FadeIn>
          <section className="grid gap-10 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16">
            <div className="flex flex-col gap-5">
              <h1 className="max-w-2xl whitespace-pre-line text-3xl font-medium leading-[1.15] tracking-tight text-balance sm:text-4xl">
                {tr.tagline}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {tr.taglineSub}
              </p>
            </div>

            <ul className="flex flex-col gap-2 text-sm lg:pt-3">
              {experience.map((e, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[120px_140px_minmax(0,1fr)] items-baseline gap-x-5 whitespace-nowrap"
                >
                  <span className="text-muted">{e.year}</span>
                  <span>
                    {e.href ? (
                      e.company === "Ykt.Ru" ? (
                        <FrostLink href={e.href}>{e.company}</FrostLink>
                      ) : (
                        <a
                          href={e.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium underline underline-offset-2 decoration-rule hover:decoration-foreground"
                        >
                          {e.company}
                        </a>
                      )
                    ) : (
                      <span className="font-medium">{e.company}</span>
                    )}
                  </span>
                  <span className="text-muted">{e.role[locale]}</span>
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        <FadeIn delay={0.05}>
          <section className="mt-20">
            <h2 className="mb-6 text-xs uppercase tracking-[0.18em] text-muted">
              {tr.selectedWork}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((p) => (
                <ProjectCard
                  key={p.slug}
                  project={p}
                  locale={locale}
                  href={`${workPrefix}/${p.slug}/`}
                />
              ))}
            </div>
          </section>
        </FadeIn>

        <footer className="mt-24 border-t border-rule pt-8 text-sm text-muted">
          <span>{new Date().getFullYear()}</span>
        </footer>
      </main>
    </>
  );
}
