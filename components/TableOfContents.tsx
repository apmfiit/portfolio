"use client";

import { useEffect, useState } from "react";
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

  return (
    <nav className="hidden lg:block normal-case tracking-normal">
      <ul className="flex flex-col gap-2 text-[15px]">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block transition-colors ${
                active === s.id
                  ? "text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {s.eyebrow[locale]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
