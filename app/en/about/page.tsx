import type { Metadata } from "next";
import { AboutView } from "@/components/AboutView";

export const metadata: Metadata = {
  title: "About — Petr Afanasyev",
  description:
    "Experience, growth and achievements. Product designer based in Moscow: notifications, fintech, e-commerce, marketplaces.",
};

export default function Page() {
  return <AboutView locale="en" />;
}
