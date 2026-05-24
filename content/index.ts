export type Locale = "en" | "ru";

export const LOCALES: Locale[] = ["en", "ru"];

export type Project = {
  slug: string;
  cover?: string;
  company: string;
  year: string;
  external?: string;
  title: Record<Locale, string>;
  blurb: Record<Locale, string>;
  body?: Record<Locale, string[]>;
};

export const projects: Project[] = [
  {
    slug: "vtb-push-onboarding",
    company: "ВТБ",
    year: "2026",
    cover: "/images/push-onboarding.png",
    title: {
      en: "Simplifying push-notification onboarding",
      ru: "Как я упростил подключение пуш-уведомлений",
    },
    blurb: {
      en: "Cut the reconnect flow from 7 steps to 4 by mirroring system settings.",
      ru: "Сократил флоу подключения пушей на несколько шагов",
    },
    body: {
      en: [
        "Cut the client path from 7 steps to 4 for the reconnect scenario by removing an internal toggle and mirroring system notification settings.",
        "Early rollout numbers show a meaningful lift in push-enable conversions.",
      ],
      ru: [
        "Сократил клиентский путь с 7 шагов до 4 для сценария переподключения, убрав внутренний тогл и перейдя на зеркалирование системных настроек.",
        "Первые цифры после раскатки на часть аудитории показывают рост подключений пушей.",
      ],
    },
  },
  {
    slug: "vtb-template-constructor",
    company: "ВТБ",
    year: "2025",
    cover: "/images/template-constructor.png",
    title: {
      en: "Notification template constructor redesign",
      ru: "Редизайн конструктора шаблонов",
    },
    blurb: {
      en: "Reworked the core form for authoring SMS and push notification templates.",
      ru: "Переработал ключевую форму создания SMS/push-шаблонов уведомлений",
    },
  },
  {
    slug: "lofty-homepage",
    company: "Lofty",
    year: "2024",
    cover: "/images/lofty-homepage.png",
    title: {
      en: "Lofty homepage redesign",
      ru: "Редизайн главной страницы",
    },
    blurb: {
      en: "Entry point redesign for a gamer-services ecosystem (2M+ MAU).",
      ru: "Редизайн точки входа в сервисную экосистему для геймеров (2M+ MAU)",
    },
  },
  {
    slug: "ykt-jobs",
    company: "Ykt.Ru",
    year: "2023–2024",
    cover: "/images/ykt-jobs.png",
    title: {
      en: "Job & talent platform redesign",
      ru: "Редизайн сервиса по поиску работы и персонала",
    },
    blurb: {
      en: "Led the full redesign of the service as lead designer.",
      ru: "Отвечал за полный редизайн сервиса как ведущий дизайнер",
    },
  },
  {
    slug: "ykt-pickup",
    company: "Ykt.Ru",
    year: "2023",
    cover: "/images/ykt-pickup.png",
    title: {
      en: "Pickup for a food & goods ordering service",
      ru: "Самовывоз для сервиса заказа еды и товаров",
    },
    blurb: {
      en: "Launched a new pickup feature — 5% of orders in the first month.",
      ru: "Запуск новой фичи самовывоза — 5% заказов уже в первый месяц",
    },
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
    role: "Senior product designer",
    yearsLocation: "5 years experience · Moscow",
    intro:
      "I'm a senior product designer at VTB Online, leading the design of the entire notification system — feed, pushes, settings and internal admin tools. Previously at Lofty I worked on gaming services for KUPIKOD, designed e-commerce products and a marketplace. At Ykt.Ru I built out the digital service ecosystem of Yakutia.",
    selectedWork: "Selected work",
    tools: "Tools",
    toolsItems: [
      "Figma Design",
      "Figma Make, Claude Code for prototyping",
      "Claude, ChatGPT for research",
      "Pathway for usability testing",
      "Google Analytics, Yandex Metrica, AppMetrica for monitoring",
    ],
    growth: "Growth",
    growthItems: [
      "Mentored by leads at big-tech companies",
      "Memorisely and Yandex Practicum graduate",
      "English B2–C1",
    ],
    about: "About",
    aboutItems: [
      "Healthy lifestyle, fitness, write a bit of code",
      "2023 — 1st place at the Yandex Market × Yandex Practicum hackathon (warehouse-packer interface)",
      "2020 — Sinet Team Heroes \"Discovery of the Year\"",
      "2020 — MSc with honors, NEFU \"Fundamental informatics and information technologies\"",
    ],
    contacts: "Contacts",
    cv: "Resume / CV",
    backHome: "← Back",
    rights: "© Petr Afanasyev",
  },
  ru: {
    role: "Старший продуктовый дизайнер",
    yearsLocation: "5 лет опыта · Москва",
    intro:
      "Привет! Я старший продуктовый дизайнер в ВТБ Онлайн. Веду дизайн всей системы уведомлений: лента, пуши, настройки и внутренние админки. Ранее работал в Lofty над сервисами для геймеров KUPIKOD, проектировал e-commerce продукты и маркетплейс. В Ykt.Ru развивал цифровую экосистему сервисов Якутии.",
    selectedWork: "Кейсы",
    tools: "Инструменты",
    toolsItems: [
      "Figma Design",
      "Figma Make, Claude Code для прототипирования",
      "Claude AI, ChatGPT для исследований",
      "Pathway для тестирований",
      "Google Analytics, Yandex Metrica, AppMetrica для мониторинга",
    ],
    growth: "Развитие",
    growthItems: [
      "Менторюсь у лидов big-tech компаний",
      "Выпускник Memorisely и Яндекс Практикум",
      "Английский B2–C1",
    ],
    about: "Обо мне",
    aboutItems: [
      "Веду здоровый образ жизни, занимаюсь фитнесом, пишу код немножко",
      "2023 — Первое место на хакатоне Яндекс.Маркет × Яндекс Практикум (интерфейс упаковщика склада)",
      "2020 — Победитель премии «Открытие года», Sinet Team Heroes",
      "2020 — Диплом с отличием, магистратура СВФУ «Фундаментальные информатика и информационные технологии»",
    ],
    contacts: "Контакты",
    cv: "Резюме, CV",
    backHome: "← Назад",
    rights: "© Петр Афанасьев",
  },
} as const;
