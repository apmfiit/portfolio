import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";

export const metadata: Metadata = {
  title: "Petr Afanasyev — Product Designer",
  description:
    "Product designer based in Moscow. Notifications, fintech, e-commerce, marketplaces.",
};

export default function Page() {
  return <HomeView locale="en" />;
}
