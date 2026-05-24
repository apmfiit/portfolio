"use client";

import { useEffect, useState } from "react";
import { Locale, ProjectSection, t } from "@/content";

export function TableOfContents({
  sections,
  locale,
}: {
  sections: ProjectSection[];
  locale: Locale;
}) {
  const [active, setActive] = useState<string | null>(sections[0]?.id ?? null);
  const tr = t[locale];

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
    <nav className="hidden lg:block">
      <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">
        {tr.onThisPage}
      </p>
      <ul className="flex flex-col gap-2 text-sm">
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
