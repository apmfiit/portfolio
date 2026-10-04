import { HomeView } from "@/components/HomeView";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("ru", "/", "Петр Афанасьев — Product Designer", "Продуктовый дизайнер из Москвы. Уведомления, финтех, e-commerce, маркетплейсы.");

export default function Page() {
  return <HomeView locale="ru" />;
}
