import Image from "next/image";
import Link from "next/link";
import { Locale, Project } from "@/content";

export function ProjectCard({
  project,
  locale,
  href,
}: {
  project: Project;
  locale: Locale;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 rounded-2xl border border-rule bg-[color:var(--background)] p-4 transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#e7e5e4_0%,#d6d3d1_100%)] dark:bg-[linear-gradient(135deg,#1c1917_0%,#292524_100%)]">
        {project.cover && (
          <Image
            src={project.cover}
            alt={project.headline[locale]}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="flex flex-col gap-1 px-1 pb-1">
        <h3 className="text-lg font-medium tracking-tight text-balance">
          {project.headline[locale]}
        </h3>
        <p className="text-sm text-muted">
          {project.company} · {project.status[locale]} {project.year}
        </p>
      </div>
    </Link>
  );
}
