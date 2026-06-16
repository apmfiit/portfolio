import Image from "next/image";
import { Locale, about, links, t } from "@/content";
import { blur } from "@/content/blur";
import { imageMeta } from "@/content/imageMeta";
import { typo } from "@/lib/typo";
import { Nav } from "./Nav";
import { FadeIn } from "./FadeIn";
import { CopyEmail } from "./CopyEmail";
import { ZoomableImage } from "./ZoomableImage";

export function AboutView({ locale }: { locale: Locale }) {
  const tr = t[locale];
  const isEn = locale === "en";

  return (
    <>
      <Nav locale={locale} />
      <main className="flex justify-center px-6 pt-16 pb-24">
        <div className="flex w-full max-w-[768px] flex-col gap-16">
          {/* Intro */}
          <FadeIn>
            <header className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/avatar-rectangular.jpg"
                  alt="Petr Afanasyev"
                  width={1000}
                  height={976}
                  placeholder={
                    blur["/images/avatar-rectangular.jpg"] ? "blur" : "empty"
                  }
                  blurDataURL={blur["/images/avatar-rectangular.jpg"]}
                  className="h-20 w-20 rounded-2xl border border-foreground/10 object-cover sm:h-24 sm:w-24"
                />
                <p className="text-sm uppercase tracking-[-0.02em] text-muted">
                  {about.location[locale]}
                </p>
              </div>
              <p className="max-w-2xl text-xl leading-relaxed text-balance sm:text-2xl">
                {typo(about.intro[locale])}
              </p>
            </header>
          </FadeIn>

          {/* Experience */}
          <FadeIn delay={0.05}>
            <Section label={tr.experienceFull}>
              <div className="flex flex-col gap-10">
                {about.jobs.map((job, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-8"
                  >
                    <p className="text-sm text-muted sm:pt-0.5">
                      {job.period[locale]}
                    </p>
                    <div className="flex flex-col gap-3">
                      {job.href ? (
                        <a
                          href={job.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium underline underline-offset-2 decoration-rule hover:decoration-foreground"
                        >
                          {job.company}
                        </a>
                      ) : (
                        <span className="font-medium">{job.company}</span>
                      )}
                      <p className="text-muted leading-relaxed">
                        {typo(job.summary[locale])}
                      </p>
                      <ul className="flex flex-col gap-1.5">
                        {job.bullets[locale].map((b, j) => (
                          <li
                            key={j}
                            className="relative pl-4 leading-relaxed text-foreground/80 before:absolute before:left-0 before:text-muted before:content-['—']"
                          >
                            {typo(b)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </FadeIn>

          {/* Growth & learning */}
          <FadeIn delay={0.05}>
            <Section label={tr.growth}>
              <ul className="flex flex-col gap-2">
                {about.growth[locale].map((g, i) => (
                  <li
                    key={i}
                    className="relative pl-4 leading-relaxed text-foreground/80 before:absolute before:left-0 before:text-muted before:content-['—']"
                  >
                    {typo(g)}
                  </li>
                ))}
              </ul>
            </Section>
          </FadeIn>

          {/* Achievements */}
          <FadeIn delay={0.05}>
            <Section label={tr.achievements}>
              <div className="flex flex-col gap-4">
                {about.achievements.map((a, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-[56px_minmax(0,1fr)] gap-4"
                  >
                    <p className="text-sm text-muted">{a.year}</p>
                    <div className="flex flex-col gap-3">
                      <p className="leading-relaxed text-foreground/80">
                        {typo(a.text[locale])}
                      </p>
                      {a.images && a.images.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {a.images.map((src, j) => {
                            const m = imageMeta[src];
                            const H = 104;
                            const W = m ? Math.round((H * m.w) / m.h) : H;
                            return (
                              <div
                                key={j}
                                style={{ width: W, height: H }}
                                className="overflow-hidden rounded-lg border border-foreground/10"
                              >
                                <ZoomableImage
                                  src={src}
                                  alt={a.text[locale]}
                                  width={m?.w ?? 1280}
                                  height={m?.h ?? 895}
                                  className="h-full w-full object-cover"
                                  blurDataURL={blur[src]}
                                  closeLabel={isEn ? "Close" : "Закрыть"}
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          </FadeIn>

          {/* About me */}
          <FadeIn delay={0.05}>
            <Section label={tr.aboutMe}>
              <p className="leading-relaxed text-foreground/80">
                {typo(about.personal[locale])}
              </p>
            </Section>
          </FadeIn>

          {/* Contacts */}
          <FadeIn delay={0.05}>
            <Section label={tr.contacts}>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <a
                  href={links.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 decoration-rule hover:decoration-foreground"
                >
                  Telegram
                </a>
                <CopyEmail
                  email={links.email}
                  label={links.email}
                  copiedLabel={isEn ? "Copied" : "Скопировано"}
                  className="underline underline-offset-2 decoration-rule hover:decoration-foreground"
                />
                <a
                  href={links.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 decoration-rule hover:decoration-foreground"
                >
                  {tr.cv}
                </a>
              </div>
            </Section>
          </FadeIn>
        </div>
      </main>
    </>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 border-t border-rule pt-8">
      <h2 className="text-xs uppercase tracking-[-0.02em] text-muted">{label}</h2>
      <div>{children}</div>
    </section>
  );
}
