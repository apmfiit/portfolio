import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";

export const metadata: Metadata = {
  title: "Petr Afanasyev — Senior Product Designer",
  description:
    "Senior product designer based in Moscow. Notifications, fintech, e-commerce, marketplaces.",
};

export default function Page() {
  return <HomeView locale="en" />;
}
