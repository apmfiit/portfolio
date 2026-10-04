import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { ProjectView } from "@/components/ProjectView";
import { projects } from "@/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    ...pageMetadata("ru", `/work/${slug}/`, p.headline.ru, p.blurb.ru),
    title: p.headline.ru,
    description: p.blurb.ru,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProjectView locale="ru" slug={slug} />;
}
