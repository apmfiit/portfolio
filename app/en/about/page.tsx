import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { AboutView } from "@/components/AboutView";

export const metadata: Metadata = {
  ...pageMetadata("en", "/about/", "About", "Experience, growth and achievements. Product designer based in Moscow."),
  title: "About",
  description:
    "Experience, growth and achievements. Product designer based in Moscow: notifications, fintech, e-commerce, marketplaces.",
};

export default function Page() {
  return <AboutView locale="en" />;
}
