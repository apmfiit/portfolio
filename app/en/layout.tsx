import { SiteLayout, siteMetadata } from "@/components/SiteLayout";

export const metadata = {
  ...siteMetadata,
  title: { default: "Petr Afanasyev — Product Designer", template: "%s — Petr Afanasyev" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale="en">{children}</SiteLayout>;
}
