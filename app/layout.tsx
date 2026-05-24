import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const siteUrl = "https://petrafanasyev.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Петр Афанасьев — Senior Product Designer",
    template: "%s — Петр Афанасьев",
  },
  description:
    "Старший продуктовый дизайнер из Москвы. Уведомления, финтех, e-commerce, маркетплейсы.",
  alternates: {
    canonical: "/",
    languages: { ru: "/", en: "/en/" },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Петр Афанасьев — Senior Product Designer",
    description:
      "Старший продуктовый дизайнер из Москвы. Уведомления, финтех, e-commerce, маркетплейсы.",
    images: ["/images/avatar.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
