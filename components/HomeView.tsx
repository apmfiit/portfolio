import { Locale, experience, projects, t } from "@/content";
import { Nav } from "./Nav";
import { ProjectCard } from "./ProjectCard";
import { FadeIn } from "./FadeIn";
import { FrostLink } from "./FrostLink";
import { WaveHand } from "./WaveHand";
import { VtbMark } from "./VtbMark";
import { Footer } from "./Footer";
import { typo } from "@/lib/typo";
import { revealChars, revealWords, revealUnit } from "@/lib/reveal";

export function HomeView({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const workPrefix = locale === "en" ? "/en/work" : "/work";

  return (
    <>
      <Nav locale={locale} />

      <main className="flex justify-center px-6 pt-16 pb-10">
        <div className="w-full max-w-[1800px]">
          <section className="flex flex-col gap-8">
            {(() => {
              const tctx = { i: 0 };
              const TS = 16;
              const [before, after = ""] = tr.tagline.split("\u{1F44B}");
              const comp = locale === "en" ? "VTB" : "ВТБ";
              const idx = after.lastIndexOf(comp);
              return (
                <h1 className="text-3xl font-medium leading-[1.15] tracking-tight sm:text-4xl">
                  {revealChars(typo(before), tctx, 0, TS, "b")}
                  <span style={{ whiteSpace: "pre" }}> </span>
                  {revealUnit(<WaveHand />, tctx, 0, TS, "wave")}
                  <br className="hidden sm:block" />
                  {idx === -1
                    ? revealChars(typo(after), tctx, 0, TS, "a")
                    : [
                        ...revealChars(typo(after.slice(0, idx)), tctx, 0, TS, "h"),
                        {/* NBSP so the preposition ("в"/"at") never breaks off the mark+ВТБ */}
                        <span key="sp">{" "}</span>,
                        revealUnit(
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
                          </span>,
                          tctx,
                          0,
                          TS,
                          "vtb"
                        ),
                        ...revealChars(after.slice(idx + comp.length), tctx, 0, TS, "t"),
                      ]}
                </h1>
              );
            })()}

            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
              {(() => {
                const dctx = { i: 0 };
                const DB = 220;
                const DS = 34;
                return (
                  <div className="flex flex-col gap-1 text-base leading-relaxed text-muted">
                    <p>
                      {tr.taglineSub.split("\n").map((line, li) => (
                        <span key={li} className="block">
                          {revealWords(typo(line), dctx, DB, DS, "l" + li)}
                        </span>
                      ))}
                    </p>
                    <p className="xl:whitespace-nowrap">
                      {revealWords(typo(tr.taglineSub2), dctx, DB, DS, "s2")}
                    </p>
                  </div>
                );
              })()}

              <ul className="flex flex-col text-base leading-relaxed">
                {experience.map((e, i) => (
                  <li
                    key={i}
                    className="soft-blur-in grid grid-cols-[110px_minmax(0,1fr)] items-baseline gap-x-5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-x-6 xl:grid-cols-[150px_140px_minmax(0,1fr)]"
                    style={{ animationDelay: 420 + i * 90 + "ms" }}
                  >
                    <span className="whitespace-nowrap text-muted">{e.year[locale]}</span>
                    <span className="whitespace-nowrap">
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
                    <span className="hidden whitespace-nowrap text-muted xl:block">
                      {e.role[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

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
