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
    default: "Petr Afanasyev — Senior Product Designer",
    template: "%s — Petr Afanasyev",
  },
  description:
    "Senior product designer based in Moscow. Notifications, fintech, e-commerce, marketplaces.",
  alternates: {
    canonical: "/",
    languages: { en: "/", ru: "/ru/" },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Petr Afanasyev — Senior Product Designer",
    description:
      "Senior product designer based in Moscow. Notifications, fintech, e-commerce, marketplaces.",
    images: ["/images/avatar.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
