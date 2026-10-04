import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { HomeView } from "@/components/HomeView";

export const metadata: Metadata = {
  ...pageMetadata("en", "/", "Petr Afanasyev — Product Designer", "Product designer based in Moscow. Notifications, fintech, e-commerce, marketplaces."),
  title: "Petr Afanasyev — Product Designer",
  description:
    "Product designer based in Moscow. Notifications, fintech, e-commerce, marketplaces.",
};

export default function Page() {
  return <HomeView locale="en" />;
}
