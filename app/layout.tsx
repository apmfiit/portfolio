import type { Metadata } from "next";
// Real, self-hosted InterVariable (rsms/inter, latest) with the optical-size
// axis — the same "Inter Variable" interfaces.dev ships. Defines the
// "Inter Variable" @font-face; --font-inter points at it in globals.css.
import "@fontsource-variable/inter/opsz.css";
import "./globals.css";

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
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}",
          }}
        />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
