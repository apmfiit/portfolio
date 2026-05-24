export type Locale = "en" | "ru";

export const LOCALES: Locale[] = ["en", "ru"];

export type LocalizedString = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type ProjectMeta = {
  role: LocalizedString;
  timeline: LocalizedString;
  team?: LocalizedList;
  skills?: LocalizedList;
};

export type ProjectSection = {
  id: string;
  eyebrow: LocalizedString;
  heading: LocalizedString;
  body?: LocalizedList;
  image?: string;
};

export type Project = {
  slug: string;
  cover?: string;
  company: string;
  status: LocalizedString;
  year: string;
  headline: LocalizedString;
  blurb: LocalizedString;
  meta?: ProjectMeta;
  sections?: ProjectSection[];
};

export type Experience = {
  year: string;
  company: string;
  href?: string;
  role: LocalizedString;
};

export const projects: Project[] = [
  {
    slug: "vtb-push-onboarding",
    company: "ВТБ",
    year: "2026",
    cover: "/images/push-onboarding.png",
    status: { en: "Shipped", ru: "Раскатан" },
    headline: {
      en: "Simplifying push-notification onboarding",
      ru: "Как я упростил подключение пуш-уведомлений",
    },
    blurb: {
      en: "Cut the reconnect flow from 7 steps to 4 by mirroring system settings. Early rollout shows a meaningful lift in push-enable conversions.",
      ru: "Сократил клиентский путь с 7 шагов до 4 за счёт зеркалирования системных настроек. Первые данные после раскатки показывают рост подключений пушей.",
    },
    meta: {
      role: { en: "Senior Product Designer", ru: "Старший продуктовый дизайнер" },
      timeline: { en: "2025 – 2026", ru: "2025 – 2026" },
      team: {
        en: ["Product Owner", "Business Analyst", "Engineering team"],
        ru: ["Product Owner", "Бизнес-аналитик", "Команда разработки"],
      },
      skills: {
        en: ["Flow design", "User research", "Prototyping", "Design system"],
        ru: ["Проектирование флоу", "Исследования", "Прототипирование", "Дизайн-система"],
      },
    },
    sections: [
      {
        id: "context",
        eyebrow: { en: "Context", ru: "Контекст" },
        heading: {
          en: "Notifications are how a bank reaches a customer cheaply and reliably.",
          ru: "Уведомления — самый дешёвый и надёжный канал банка к клиенту.",
        },
        body: {
          en: [
            "More clients on pushes and fewer on SMS means lower costs for the bank — SMS are expensive at the scale of millions of users.",
            "My cluster owns the entire notification experience inside VTB Online: feed, pushes, settings, and internal admin tools.",
          ],
          ru: [
            "Чем больше клиентов на пушах и меньше на СМС — тем меньше расходы банка. СМС стоят дорого на масштабе миллионов пользователей.",
            "Наш кластер отвечает за всю систему уведомлений ВТБ Онлайн: ленту, пуши, настройки и внутренние админки.",
          ],
        },
      },
      {
        id: "problem",
        eyebrow: { en: "Problem", ru: "Проблема" },
        heading: {
          en: "The reconnect flow had an internal toggle that fought system settings.",
          ru: "Во флоу переподключения был внутренний тогл, который воевал с системными настройками.",
        },
        body: {
          en: [
            "Reconnecting pushes took 7 steps. Many users dropped off mid-way; support tickets grew month over month.",
          ],
          ru: [
            "Переподключение занимало 7 шагов. Часть клиентов отваливалась посередине, в поддержку росли обращения.",
          ],
        },
      },
      {
        id: "solution",
        eyebrow: { en: "Solution", ru: "Решение" },
        heading: {
          en: "Mirror the system setting instead of duplicating it.",
          ru: "Зеркалировать системную настройку вместо дублирования.",
        },
        body: {
          en: [
            "Removed the internal toggle. The in-app state now reflects the OS notification permission directly. Reconnect is now 4 steps.",
          ],
          ru: [
            "Убрал внутренний тогл. Состояние в приложении отражает системное разрешение напрямую. Переподключение — 4 шага.",
          ],
        },
      },
      {
        id: "outcome",
        eyebrow: { en: "Outcome", ru: "Результат" },
        heading: {
          en: "Early rollout shows a meaningful lift in push-enable conversions.",
          ru: "Раскатка на часть аудитории показывает рост подключений пушей.",
        },
      },
    ],
  },
  {
    slug: "vtb-template-constructor",
    company: "ВТБ",
    year: "2025",
    cover: "/images/template-constructor.png",
    status: { en: "Shipped", ru: "В продакшне" },
    headline: {
      en: "Notification template constructor redesign",
      ru: "Редизайн конструктора шаблонов уведомлений",
    },
    blurb: {
      en: "Reworked the core form that authors use to compose every SMS and push the bank sends.",
      ru: "Переработал ключевую форму, в которой авторы создают каждое SMS и push-сообщение банка.",
    },
    meta: {
      role: { en: "Senior Product Designer", ru: "Старший продуктовый дизайнер" },
      timeline: { en: "2025", ru: "2025" },
      skills: {
        en: ["Internal tools", "Form design", "Information architecture"],
        ru: ["Внутренние инструменты", "Проектирование форм", "Информационная архитектура"],
      },
    },
  },
  {
    slug: "lofty-homepage",
    company: "Lofty",
    year: "2024",
    cover: "/images/lofty-homepage.png",
    status: { en: "Shipped", ru: "В продакшне" },
    headline: {
      en: "Lofty homepage redesign",
      ru: "Редизайн главной страницы Lofty",
    },
    blurb: {
      en: "Reimagined the entry point into a gamer-services ecosystem with 2M+ monthly active users.",
      ru: "Переосмыслил точку входа в сервисную экосистему для геймеров с аудиторией 2M+ MAU.",
    },
    meta: {
      role: { en: "Product Designer", ru: "Продуктовый дизайнер" },
      timeline: { en: "2024", ru: "2024" },
      skills: {
        en: ["Marketing surfaces", "Visual design", "Conversion"],
        ru: ["Маркетинговые поверхности", "Визуальный дизайн", "Конверсия"],
      },
    },
  },
  {
    slug: "ykt-jobs",
    company: "Ykt.Ru",
    year: "2023–2024",
    cover: "/images/ykt-jobs.png",
    status: { en: "Shipped", ru: "В продакшне" },
    headline: {
      en: "Job & talent platform redesign",
      ru: "Редизайн сервиса по поиску работы и персонала",
    },
    blurb: {
      en: "Led the full redesign of the service as lead designer — for job seekers and employers in Yakutia.",
      ru: "Отвечал за полный редизайн сервиса как ведущий дизайнер — для соискателей и работодателей Якутии.",
    },
    meta: {
      role: { en: "Lead Designer", ru: "Ведущий дизайнер" },
      timeline: { en: "2023 – 2024", ru: "2023 – 2024" },
      skills: {
        en: ["End-to-end product", "User research", "Design system"],
        ru: ["End-to-end продукт", "Исследования", "Дизайн-система"],
      },
    },
  },
  {
    slug: "ykt-pickup",
    company: "Ykt.Ru",
    year: "2023",
    cover: "/images/ykt-pickup.png",
    status: { en: "Shipped", ru: "В продакшне" },
    headline: {
      en: "Pickup for a food & goods ordering service",
      ru: "Самовывоз для сервиса заказа еды и товаров",
    },
    blurb: {
      en: "Launched a new pickup feature — 5% of orders in the first month.",
      ru: "Запустил новую фичу самовывоза — 5% заказов уже в первый месяц.",
    },
    meta: {
      role: { en: "Product Designer", ru: "Продуктовый дизайнер" },
      timeline: { en: "2023", ru: "2023" },
      skills: {
        en: ["Feature launch", "User flows", "Mobile"],
        ru: ["Запуск фичи", "Пользовательские флоу", "Мобайл"],
      },
    },
  },
];

export const experience: Experience[] = [
  {
    year: "2025 – н.в.",
    company: "ВТБ Онлайн",
    role: { en: "Senior Product Designer", ru: "Старший продуктовый дизайнер" },
  },
  {
    year: "2024",
    company: "Lofty / KUPIKOD",
    href: "https://www.lofty.today/",
    role: { en: "Product Designer", ru: "Продуктовый дизайнер" },
  },
  {
    year: "2020 – 2024",
    company: "Ykt.Ru",
    href: "https://ykt.ru/about",
    role: { en: "Lead Designer", ru: "Ведущий дизайнер" },
  },
];

export const links = {
  telegram: "https://t.me/PetrAfanasyev",
  telegramHandle: "@PetrAfanasyev",
  email: "apm.x17@gmail.com",
  cv: "https://docs.google.com/document/d/1vShnasu4vFiBEl9XZZflFf3KOtvvDots56kp9Mvmpcc/edit?tab=t.0",
};

export const t = {
  en: {
    tagline:
      "I'm Petr, a senior product designer working on notifications, fintech and e-commerce.",
    location: "Moscow",
    work: "Work",
    experience: "Experience",
    selectedWork: "Selected work",
    about: "About",
    contacts: "Contacts",
    cv: "Resume / CV",
    backHome: "← Back",
    onThisPage: "On this page",
    role: "Role",
    timeline: "Timeline",
    team: "Team",
    skills: "Skills",
    designedBy: "Designed by Petr",
  },
  ru: {
    tagline:
      "Привет, я Петя. Старший продуктовый дизайнер: уведомления, финтех, e-commerce.",
    location: "Москва",
    work: "Кейсы",
    experience: "Опыт",
    selectedWork: "Кейсы",
    about: "Обо мне",
    contacts: "Контакты",
    cv: "Резюме",
    backHome: "← Назад",
    onThisPage: "В этом кейсе",
    role: "Роль",
    timeline: "Сроки",
    team: "Команда",
    skills: "Навыки",
    designedBy: "Сделано Петром",
  },
} as const;
