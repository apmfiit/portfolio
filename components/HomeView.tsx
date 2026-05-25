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
          <section className="grid gap-10 lg:grid-cols-[1fr_minmax(0,480px)] lg:gap-16">
            <div className="flex flex-col gap-8">
              <h1 className="max-w-2xl text-4xl font-medium leading-[1.1] tracking-tight text-balance sm:text-5xl">
                {tr.tagline}
              </h1>
            </div>

            <ul className="flex flex-col gap-2 text-sm lg:pt-3">
              {experience.map((e, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[110px_minmax(0,1fr)_minmax(0,1.2fr)] items-baseline gap-x-4 whitespace-nowrap"
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
                  <span className="text-muted truncate">{e.role[locale]}</span>
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
