import type { Metadata } from "next";
import { AboutView } from "@/components/AboutView";

export const metadata: Metadata = {
  title: "Обо мне — Петр Афанасьев",
  description:
    "Опыт работы, развитие и достижения. Продуктовый дизайнер из Москвы: уведомления, финтех, e-commerce, маркетплейсы.",
};

export default function Page() {
  return <AboutView locale="ru" />;
}
