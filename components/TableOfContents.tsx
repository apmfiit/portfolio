"use client";

import { Fragment, useEffect, useState } from "react";
import { Locale, ProjectSection } from "@/content";

export function TableOfContents({
  sections,
  locale,
}: {
  sections: ProjectSection[];
  locale: Locale;
}) {
  const [active, setActive] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  // interfaces.dev-style rail: a short faint tick per section that grows long
  // and dark when active, with two minor ticks between rows forming a ruler.
  return (
    <nav className="hidden lg:block normal-case tracking-normal">
      <div className="flex flex-col gap-2">
        {sections.map((s, i) => {
          const isActive = active === s.id;
          return (
            <Fragment key={s.id}>
              {i > 0 && (
                <>
                  <span className="h-px w-3 shrink-0 bg-rule" aria-hidden />
                  <span className="h-px w-3 shrink-0 bg-rule" aria-hidden />
                </>
              )}
              <a
                href={`#${s.id}`}
                className="group relative flex h-px items-center gap-[10px] before:absolute before:inset-x-0 before:-inset-y-3.5 before:content-['']"
              >
                <span
                  className={`h-px shrink-0 transition-[width,background-color] duration-[250ms] ease-out ${
                    isActive ? "w-7 bg-foreground" : "w-5 bg-rule"
                  }`}
                  aria-hidden
                />
                <span
                  className={`select-none truncate font-[450] text-[13px] transition-colors duration-[250ms] ease-out ${
                    isActive ? "text-foreground" : "text-muted group-hover:text-foreground"
                  }`}
                >
                  {s.eyebrow[locale]}
                </span>
              </a>
            </Fragment>
          );
        })}
      </div>
    </nav>
  );
}
