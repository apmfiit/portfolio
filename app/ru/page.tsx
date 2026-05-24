import type { Metadata } from "next";
import { HomeView } from "@/components/HomeView";

export const metadata: Metadata = {
  title: "Петр Афанасьев — старший продуктовый дизайнер",
  description:
    "Старший продуктовый дизайнер из Москвы. Уведомления, финтех, e-commerce, маркетплейсы.",
};

export default function Page() {
  return <HomeView locale="ru" />;
}
