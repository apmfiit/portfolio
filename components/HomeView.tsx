import { Locale, experience, projects, t } from "@/content";
import { Nav } from "./Nav";
import { ProjectCard } from "./ProjectCard";
import { FadeIn } from "./FadeIn";
import { FrostLink } from "./FrostLink";
import { WaveHand } from "./WaveHand";
import { VtbMark } from "./VtbMark";
import { Footer } from "./Footer";
import { typo } from "@/lib/typo";

export function HomeView({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const workPrefix = locale === "en" ? "/en/work" : "/work";

  return (
    <>
      <Nav locale={locale} />

      <main className="flex justify-center px-6 pt-16 pb-24">
        <div className="w-full max-w-[1800px]">
        <FadeIn>
          <section className="grid gap-10 lg:grid-cols-[1fr_minmax(0,560px)] lg:gap-16">
            <div className="flex flex-col gap-5">
              <h1 className="text-3xl font-medium leading-[1.15] tracking-tight text-balance sm:text-4xl">
                {(() => {
                  const [before, after = ""] = tr.tagline.split("👋");
                  const comp = locale === "en" ? "VTB" : "ВТБ";
                  const idx = after.lastIndexOf(comp);
                  const afterNode =
                    idx === -1 ? (
                      typo(after)
                    ) : (
                      <>
                        {typo(after.slice(0, idx))}
                        {" "}
                        <span className="whitespace-nowrap">
                          <VtbMark
                            className="inline-block h-[0.47em] w-[0.77em]"
                            style={{
                              verticalAlign: "0.43em",
                              marginLeft: "0.18em",
                              marginRight: "0.18em",
                            }}
                          />
                          {comp}
                        </span>
                        {after.slice(idx + comp.length)}
                      </>
                    );
                  return (
                    <>
                      {typo(before)}{" "}
                      <WaveHand />{" "}
                      <br className="hidden sm:block" />
                      {afterNode}
                    </>
                  );
                })()}
              </h1>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {typo(tr.taglineSub)}
              </p>
            </div>

            <ul className="flex flex-col gap-2 text-sm lg:pt-3">
              {experience.map((e, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[112px_minmax(0,1fr)] items-baseline gap-x-4 sm:grid-cols-[120px_150px_minmax(0,1fr)] sm:gap-x-5"
                >
                  <span className="whitespace-nowrap text-muted">{e.year[locale]}</span>
                  <span className="truncate">
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
                  <span className="hidden text-muted sm:block">{e.role[locale]}</span>
                </li>
              ))}
            </ul>
          </section>
        </FadeIn>

        <FadeIn delay={0.05}>
          <section className="mt-20">
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
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

        <Footer locale={locale} />
        </div>
      </main>
    </>
  );
}
