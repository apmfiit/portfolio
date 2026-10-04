import type { Metadata } from "next";

export function pageMetadata(locale: "ru" | "en", path: string, title: string, description: string): Metadata {
  const en = `/en${path}`;
  const canonical = locale === "en" ? en : path;
  return {
    alternates: { canonical, languages: { ru: path, en } },
    openGraph: {
      type: "website", url: canonical, title, description,
      locale: locale === "en" ? "en_GB" : "ru_RU",
      images: [{ url: "/images/og_image-petrafanasyev.png", width: 1800, height: 945 }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/images/og_image-petrafanasyev.png"] },
  };
}
