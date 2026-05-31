import Image from "next/image";
import Link from "next/link";
import { Locale, Project } from "@/content";
import { blur } from "@/content/blur";

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
    <Link href={href} className="group flex flex-col gap-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-foreground/10">
        {project.cover && (
          <Image
            src={project.cover}
            alt={project.headline[locale]}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            placeholder={blur[project.cover] ? "blur" : "empty"}
            blurDataURL={blur[project.cover]}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        )}
      </div>
      <div className="flex flex-col gap-1">
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
