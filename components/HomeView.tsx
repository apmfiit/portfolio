import { Locale, experience, links, projects, t } from "@/content";
import { Nav } from "./Nav";
import { ProjectCard } from "./ProjectCard";
import { FadeIn } from "./FadeIn";

export function HomeView({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const workPrefix = locale === "en" ? "/en/work" : "/work";

  return (
    <>
      <Nav locale={locale} />

      <main className="mx-auto w-full max-w-6xl px-6 pt-16 pb-24">
        <FadeIn>
          <section className="flex flex-col gap-8 sm:gap-10">
            <h1 className="max-w-3xl text-4xl font-medium leading-[1.1] tracking-tight text-balance sm:text-5xl">
              {tr.tagline}
            </h1>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a href={links.telegram} target="_blank" rel="noreferrer" className="underline">
                Telegram →
              </a>
              <a href={`mailto:${links.email}`} className="underline">
                {links.email} →
              </a>
              <a href={links.cv} target="_blank" rel="noreferrer" className="underline">
                {tr.cv} →
              </a>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.05}>
          <section className="mt-16 sm:mt-20">
            <h2 className="mb-4 text-xs uppercase tracking-[0.18em] text-muted">
              {tr.experience}
            </h2>
            <ul className="flex flex-col">
              {experience.map((e, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[80px_1fr] items-baseline gap-x-6 gap-y-1 border-t border-rule py-4 sm:grid-cols-[120px_200px_1fr]"
                >
                  <span className="text-muted text-sm">{e.year}</span>
                  {e.href ? (
                    <a
                      href={e.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline-offset-2 hover:underline"
                    >
                      {e.company}
                    </a>
                  ) : (
                    <span className="font-medium">{e.company}</span>
                  )}
                  <span className="text-muted text-sm col-start-2 sm:col-start-3">
                    {e.role[locale]}
                  </span>
                </li>
              ))}
              <li className="border-t border-rule" />
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

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-8 text-sm text-muted">
          <span>{tr.designedBy} · {new Date().getFullYear()}</span>
          <div className="flex gap-5">
            <a href={links.telegram} target="_blank" rel="noreferrer" className="hover:text-foreground">
              Telegram
            </a>
            <a href={`mailto:${links.email}`} className="hover:text-foreground">
              Email
            </a>
            <a href={links.cv} target="_blank" rel="noreferrer" className="hover:text-foreground">
              {tr.cv}
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
