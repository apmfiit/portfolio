import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { AboutView } from "@/components/AboutView";

export const metadata: Metadata = {
  ...pageMetadata("ru", "/about/", "Обо мне", "Опыт работы, развитие и достижения. Продуктовый дизайнер из Москвы."),
  title: "Обо мне",
  description:
    "Опыт работы, развитие и достижения. Продуктовый дизайнер из Москвы: уведомления, финтех, e-commerce, маркетплейсы.",
};

export default function Page() {
  return <AboutView locale="ru" />;
}
