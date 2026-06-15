export type Locale = "en" | "ru";

export const LOCALES: Locale[] = ["en", "ru"];

export type LocalizedString = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type ProjectMeta = {
  role: LocalizedString;
  timeline: LocalizedString;
  team?: LocalizedList;
  skills?: LocalizedList;
  platforms?: LocalizedList;
};

export type SectionImage = {
  src: string;
  caption?: LocalizedString;
};

export type ProjectSection = {
  id: string;
  eyebrow: LocalizedString;
  heading: LocalizedString;
  body?: LocalizedList;
  image?: string;
  caption?: LocalizedString;
  images?: SectionImage[];
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
  year: LocalizedString;
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
    status: { en: "Rolling out", ru: "В раскатке" },
    headline: {
      en: "Simplifying push-notification onboarding",
      ru: "Как я упростил подключение пуш-уведомлений",
    },
    blurb: {
      en: "Cut the reconnect flow from 7 steps to 4 by removing an internal toggle and mirroring system settings. Early rollout shows a meaningful lift in push enablement.",
      ru: "Сократил клиентский путь с 7 шагов до 4 для сценария переподключения, убрав внутренний тогл и перейдя на зеркалирование системных настроек. Первые цифры после раскатки на часть аудитории показывают рост подключений пушей.",
    },
    meta: {
      role: { en: "Senior Product Designer", ru: "Старший продуктовый дизайнер" },
      timeline: { en: "2025 – 2026", ru: "2025 – 2026" },
      team: {
        en: ["Designer (me)", "Product Owner", "Business Analyst", "Engineering team"],
        ru: ["Дизайнер (я)", "Product Owner", "Бизнес-аналитик", "Команда разработки"],
      },
      skills: {
        en: ["Flow design", "Benchmarking", "Prototyping", "Design system"],
        ru: ["Проектирование флоу", "Бенчмаркинг", "Прототипирование", "Дизайн-система"],
      },
      platforms: {
        en: ["Android (native)", "iOS PWA"],
        ru: ["Android (нативное приложение)", "iOS PWA"],
      },
    },
    sections: [
      {
        id: "context",
        eyebrow: { en: "Context", ru: "Чем занимается наш кластер" },
        heading: {
          en: "Pushes are how a bank reaches a client cheaply and reliably.",
          ru: "Уведомления — самый дешёвый и надёжный канал банка к клиенту.",
        },
        body: {
          en: [
            "I'm a senior product designer in the channel-apps team inside the notifications cluster at VTB. In plain terms — I own how a client enables, disables and generally interacts with notifications inside the VTB mobile bank.",
            "The cluster raises push penetration. More clients on pushes and fewer on SMS means lower costs — SMS are expensive, pushes are practically free, so the strategy is to move communications to pushes wherever we can.",
            "Sounds simple, but there are a lot of obstacles on the way. One of them — an inconvenient enablement flow — is what I took on.",
          ],
          ru: [
            "Я старший продуктовый дизайнер команды канальных приложений в кластере нотификаций банка ВТБ. Если по-человечески — отвечаю за то, как клиент подключает, отключает и в целом взаимодействует с уведомлениями внутри мобильного банка ВТБ.",
            "Кластер нотификаций повышает проникновение пушей. Чем больше клиентов на пушах и меньше на СМС — тем меньше расходы банка. СМС стоят денег, пуши практически бесплатные, поэтому глобальная стратегия — максимально увести коммуникации в пуши.",
            "Звучит просто, но на пути клиента к пушам много препятствий. Одно из них — неудобный процесс подключения, которым я и занялся.",
          ],
        },
        images: [
          { src: "/images/cases/vtb-push-onboarding/img-1.png" },
        ],
      },
      {
        id: "task",
        eyebrow: { en: "Where the task came from", ru: "Откуда появилась задача" },
        heading: {
          en: "“Optimize the client paths for enabling pushes — somehow.”",
          ru: "«Оптимизируй как-то клиентские пути подключения пушей»",
        },
        body: {
          en: [
            "The brief from leadership was that broad. The bank had a course to maximally move away from SMS — clients had to be able to enable pushes faster and easier.",
            "I set up a meeting with my team lead and sat down to write the task understanding.",
            "Mission: simplify enabling and disabling pushes. At the time a user had to deal with two different toggles in two different places — granting OS permission, plus a separate in-app toggle inside the VTB app.",
            "Business goal: raise push penetration across VTB Online users. Higher penetration → lower SMS spend.",
            "Audience: VTB's active client base. We support Android (native app) and iOS PWA (no native iOS app yet, but pushes work through the web shortcut).",
            "Success criterion: growth of the share of users with pushes enabled.",
          ],
          ru: [
            "Задачу поставили в общих чертах. У банка был курс на максимальный отказ от СМС, и нужно было помочь клиентам подключать пуши быстрее и проще.",
            "Для начала поставил встречу с тимлидом и сел писать понимание задачи.",
            "Миссия: упростить включение и отключение пушей. На тот момент пользователю нужно было разбираться с двумя разными тоглами в двух разных местах — дать разрешение в системе и дополнительно включить внутренний тогл в приложении ВТБ.",
            "Цель в мире бизнеса: поднять проникновение пушей среди пользователей ВТБ Онлайн. Чем выше проникновение, тем меньше банк тратит на СМС.",
            "Аудитория: активная клиентская база ВТБ. Поддерживаем Android (нативное приложение) и iOS PWA (нативки на iOS пока нет, но есть веб-ярлык, через который пуши работают).",
            "Критерии успеха: рост доли пользователей с подключёнными пушами.",
          ],
        },
        images: [
          { src: "/images/cases/vtb-push-onboarding/img-2.png" },
        ],
      },
      {
        id: "discovery",
        eyebrow: { en: "Discovery", ru: "Дискавери" },
        heading: {
          en: "The worst-case path was 7 steps long.",
          ru: "Самый длинный путь занимал 7 шагов",
        },
        body: {
          en: [
            "I mapped every client path. A user has four starting states with respect to pushes, and I walked through every transition between them — that's where I found the bottleneck.",
            "The longest path looked like this: 1) once at onboarding the client granted push permission; 2) enabled it in the bank via the internal toggle; 3) later turned pushes off in the OS settings (intentionally or by accident); 4) at some point wants pushes back on.",
            "In that scenario enabling took 7 steps. Seven.",
            "Then I looked at how others solved it — neighboring banks and broader best practice. The observation was simple: the fewer toggles you have, and the tighter they sit with the OS, the clearer it is for the user. Our two-level system felt like a rudiment that could be cut down a lot.",
          ],
          ru: [
            "Сел и разобрал все клиентские пути. У пользователя есть четыре стартовых состояния по подключению пушей. Прошёл сценарии перехода между этими состояниями — и нашёл то самое узкое место.",
            "Самый длинный путь выглядел так: 1) когда-то клиент дал разрешение на пуши при онбординге; 2) подключил их в банке через внутренний тогл; 3) потом отключил пуши в системных настройках телефона (вручную или случайно); 4) через какое-то время хочет вернуть пуши обратно.",
            "В этом сценарии подключение занимало 7 шагов. Семь!",
            "Дальше я пошёл смотреть, как сделано у других. Посмотрел соседние банки, да и в целом бест-практис. Наблюдение оказалось простым: чем меньше тоглов и чем теснее они связаны с системой, тем понятнее пользователю. Наша двухуровневая система выглядела как рудимент. Её можно было сильно упростить.",
          ],
        },
        images: [
          {
            src: "/images/cases/vtb-push-onboarding/img-3.png",
            caption: { en: "Observation was simple — fewer toggles, tighter tied to OS, clearer for users.", ru: "Наблюдение оказалось простым: чем меньше тоглов и чем теснее они связаны с системой, тем понятнее пользователю" },
          },
        ],
      },
      {
        id: "hypothesis",
        eyebrow: { en: "Hypothesis", ru: "Гипотеза" },
        heading: {
          en: "Remove the internal toggle. Mirror the system setting.",
          ru: "Убрать внутренний тогл и зеркалировать системные настройки",
        },
        body: {
          en: [
            "If we drop the internal toggle and reflect the OS notification permission directly inside the app, the user always sees the actual push status and can jump into system settings with one tap to switch it on or off.",
            "The 7-step flow collapses to 4 — almost half the length.",
          ],
          ru: [
            "Если убрать внутренний тогл и зеркалить системные настройки прямо в приложении, то пользователь будет видеть актуальный статус пушей и сможет одной кнопкой попасть в системные настройки, чтобы их включить или выключить.",
            "Флоу с 7 шагов сокращается до 4 — это короче почти в два раза.",
          ],
        },
      },
      {
        id: "lo-fi",
        eyebrow: { en: "Lo-fi and selling the solution", ru: "Lo-fi и защита решения" },
        heading: {
          en: "Lo-fi prototypes, picked the working variants with the team, defended with leadership.",
          ru: "Собрал lo-fi прототипы и защитил решение у топов кластера",
        },
        body: {
          en: [
            "I went through where to place the status, how to phrase the jump into settings, what to show in the enabled state (like the list of devices), and how to handle the case where pushes are already allowed.",
            "Together with the team we picked the working variants. I prepared slides and presented to the cluster's leadership. It went smoothly — the solution was obviously logical, no objections. Then on to hi-fi and handoff.",
          ],
          ru: [
            "Перебрал варианты: где разместить статус, как сформулировать переход в настройки, что показывать в подключённом состоянии (например, список устройств), как обыграть случай, когда пуши уже разрешены.",
            "С командой выбрали рабочие варианты, подготовил слайды и пошёл защищать решение топам кластера. Прошло гладко — решение оказалось очевидным и логичным, никто не возразил. Дальше перешёл к hi-fi и передаче в разработку.",
          ],
        },
      },
      {
        id: "hi-fi",
        eyebrow: { en: "Hi-fi: three states", ru: "Hi-fi: три состояния" },
        heading: {
          en: "Designed the “Notification methods” screen for every realistic state.",
          ru: "Проработал ключевые состояния экрана «Способы уведомлений»",
        },
        body: {
          en: [
            "Pushes disabled at the OS level — show a banner “Notifications disabled” with a link “How to enable” (on iOS PWA) or a button “Open settings” (on Android, where the deep link is supported).",
            "Pushes enabled — status “Notifications enabled”, a list of connected devices with the current one marked, plus a “How to disable” link.",
            "Android is the straightforward path: tap the button, land in system settings for the app, flip the toggle, return, status updates.",
          ],
          ru: [
            "Пуши отключены в системе — показываем плашку «Уведомления отключены», даём ссылку «Как разрешить» (на iOS PWA) или кнопку «Перейти в настройки» (на Android, где переход программный).",
            "Пуши подключены — статус «Уведомления подключены», список подключённых устройств с пометкой текущего, ссылка «Как отключить».",
            "С Android всё прямолинейно: тап по кнопке — пользователь оказывается в системных настройках приложения, включает тогл, возвращается, статус обновился.",
          ],
        },
      },
      {
        id: "ios-pwa",
        eyebrow: { en: "iOS PWA: separate case", ru: "iOS PWA: отдельный кейс" },
        heading: {
          en: "Safari blocks deep-links to system settings. So we wrote the route out, plainly.",
          ru: "В iOS PWA нельзя открыть системные настройки. Пришлось расписать путь явно",
        },
        body: {
          en: [
            "On iOS PWA you can't deep-link into system settings — it's a Safari restriction with no workaround.",
            "Instead of an “Open settings” button we show “How to enable.” Tapping it opens a bottom sheet with step-by-step instructions: open phone Settings → Apps, pick VTB Online, tap Notifications and allow them.",
            "From there the user reaches the system layer themselves, flips “Allow Notifications”, comes back. Not perfect — one or two taps longer than on Android — but honest: we say plainly what to tap.",
          ],
          ru: [
            "В iOS PWA технически нельзя открыть системные настройки телефона — это ограничение Safari, обойти его никак.",
            "Решение получилось такое: вместо кнопки «Перейти в настройки» показываем ссылку «Как разрешить». По тапу открывается bottom sheet с пошаговой инструкцией: настройки телефона → Приложения → ВТБ Онлайн → уведомления → разрешить.",
            "Дальше пользователь сам добирается до системы, включает «Допуск уведомлений», возвращается в приложение. Не идеально — на один-два тапа дольше, чем на Android, — но честно: мы прямо рассказываем, что и где нажать.",
          ],
        },
      },
      {
        id: "release",
        eyebrow: { en: "Release & an unexpected case", ru: "Релиз и неожиданный кейс" },
        heading: {
          en: "Some users were quietly moved from SMS to pushes — and complained.",
          ru: "Часть пользователей молча переехала с СМС на пуши — и стала жаловаться",
        },
        body: {
          en: [
            "We rolled out to a small slice of users. Some had pushes allowed in the OS but disabled by the bank's internal toggle. For them the new logic read: allowed at OS level → pushes go through. They were automatically moved from SMS to pushes.",
            "Tickets started coming in: “I used to get everything by SMS. Now I'm suddenly getting pushes. Did I do something wrong?”",
            "From the business side — this was exactly what we wanted. From the user's side — product behavior changed without warning.",
          ],
          ru: [
            "Раскатили решение на небольшой процент пользователей. У некоторых пуши были разрешены в системе, но отключены внутренним тоглом в банке. Для этой аудитории новая логика означала: разрешено в системе → значит пуши идут. И они автоматически переехали с СМС на пуши.",
            "Через какое-то время в поддержку начали приходить обращения: «Раньше у меня всё приходило по СМС. А теперь резко начали приходить пуши. Я что-то сделал не так?»",
            "С точки зрения бизнеса — мы как раз этого и хотели, ради этого всё и делалось. С точки зрения пользователя — поведение продукта поменялось без предупреждения.",
          ],
        },
      },
      {
        id: "results",
        eyebrow: { en: "Results", ru: "Результаты" },
        heading: {
          en: "Push penetration is up. Support load for this flow is visibly down.",
          ru: "Доля пользователей с пушами растёт, нагрузка на поддержку по подключению заметно упала",
        },
        body: {
          en: [
            "The solution is still rolled out to a partial audience, so final stat-significant numbers aren't in yet. But the early signals are encouraging: push enablement is up, complaints about the enablement flow have dropped noticeably, and the new class of complaints (the silent SMS→push migration) is a signal for a targeted follow-up, not a rollback.",
            "The main thing: the flow really did become 1.5–2× shorter, and it shows in the product.",
          ],
          ru: [
            "Решение пока раскатано на небольшой процент аудитории, поэтому финальных цифр у меня нет. Но первые сигналы радуют: доля пользователей с подключёнными пушами растёт, жалоб на сложность подключения в поддержке стало заметно меньше, появился новый класс обращений (про молчаливый переезд с СМС на пуши) — но это сигнал к точечной доработке, а не к откату.",
            "Главное — флоу действительно стал короче в полтора-два раза, и это прямо заметно в продукте.",
          ],
        },
      },
      {
        id: "role",
        eyebrow: { en: "My role", ru: "Моя роль" },
        heading: {
          en: "End to end: from task understanding through hi-fi and post-release iteration.",
          ru: "End-to-end: от понимания задачи до пост-релизной итерации",
        },
        body: {
          en: [
            "Task understanding and alignment with the PO. Analyzing client paths and states, finding bottlenecks. Competitor and best-practice benchmarking. Lo-fi hypotheses and design. Selling the solution to leadership. Hi-fi for three platforms (Android, iOS PWA). Handoff and design review. Post-release metric tracking. Triage of user complaints and writing follow-up design tickets.",
          ],
          ru: [
            "Составление понимания задачи и согласование с PO. Аналитика клиентских путей, состояний и поиск узких мест. Бенчмаркинг конкурентов и бест-практисов. Lo-fi гипотезы и проектирование. Защита решения у топов кластера. Hi-fi дизайн под три платформы (Android, iOS PWA). Передача в разработку, дизайн-ревью. Контроль метрик после релиза. Разбор пользовательских обращений и заведение дизайн-задач на следующую итерацию.",
          ],
        },
      },
      {
        id: "lessons",
        eyebrow: { en: "Lessons", ru: "Уроки" },
        heading: {
          en: "Knowing about a segment is not the same as having designed for them.",
          ru: "Знать про сегмент — не значит продумать его опыт",
        },
        body: {
          en: [
            "1. We knew there was a segment with OS-level pushes allowed but the in-app toggle off. We knew they'd be auto-migrated. We decided it would slip by quietly. It didn't. Lesson: when the change is meaningful for an audience, design not just the tech, but also the way you tell them — even when the change is technically right.",
            "2. Phased rollout saves you. If we had shipped to 100% on day one we'd have had thousands of tickets instead of dozens. The partial rollout gave us time to notice the case, understand it and think calmly about the fix.",
            "3. Constraints can always be softened. iOS PWA couldn't deep-link to settings. When you can't make it “like everywhere else,” sometimes the right move is to honestly tell the user where to tap. Not ideal, but better than a wall.",
          ],
          ru: [
            "1. Мы знали, что есть пользователи с пушами, разрешёнными в системе, но отключёнными внутренним тоглом. Знали, что после релиза они автоматически переедут на пуши. Но решили, что это пройдёт незаметно. Не прошло — люди стали жаловаться. Урок: если меняешь что-то существенное для аудитории, продумай не только техническую часть, но и как им об этом сообщить.",
            "2. Поэтапная раскатка спасает. Если бы мы раскатили на всех сразу, мы бы получили не десятки обращений, а тысячи. Постепенная раскатка дала время заметить кейс, разобраться и спокойно подумать над решением.",
            "3. Ограничения всегда можно смягчить. Для iOS PWA нельзя было вести на системный уровень настроек. Когда нельзя сделать «как везде», иногда нормальное решение — просто честно объяснить пользователю, куда тапнуть. Не идеально, но работает лучше, чем глухая стена.",
          ],
        },
      },
      {
        id: "next",
        eyebrow: { en: "What's next", ru: "Что дальше" },
        heading: {
          en: "Full 100% rollout, stat-significant metrics, explicit notice for channel-changers.",
          ru: "Раскатка на 100%, статзначимые метрики, явное оповещение при смене канала",
        },
        body: {
          en: [
            "Finish the rollout, collect stat-significant metrics, and design an explicit notice for users whose channel changes after the migration.",
          ],
          ru: [
            "Финальная раскатка на 100% аудитории и сбор статзначимых метрик. Прорабатываем явное оповещение для пользователей, у которых канал поменяется после переезда.",
          ],
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
      en: "Reworked the core form support staff use to author every SMS, push and rich-push the bank sends. Migrated a legacy admin to the new Omni UI platform.",
      ru: "Переработал ключевую форму, через которую сопровождение собирает каждое SMS, push и rich-push банка. Перевёл легаси-админку на новую платформу Omni UI.",
    },
    meta: {
      role: { en: "Sole Designer", ru: "Единственный дизайнер" },
      timeline: { en: "2025", ru: "2025" },
      team: {
        en: ["Designer (me)", "Support staff (~50)", "Engineering"],
        ru: ["Дизайнер (я)", "Сопровождение (~50 человек)", "Разработка"],
      },
      skills: {
        en: ["Internal tools", "Form design", "Design system", "Information architecture"],
        ru: ["Внутренние инструменты", "Проектирование форм", "Дизайн-система", "Информационная архитектура"],
      },
    },
    sections: [
      {
        id: "context",
        eyebrow: { en: "Context", ru: "Чем занимается наша команда" },
        heading: {
          en: "We build the bank's unified notification platform.",
          ru: "Мы развиваем единую платформу уведомлений банка",
        },
        body: {
          en: [
            "Through this platform clients receive SMS, pushes and other messages — about payments, transfers and other important events.",
            "The goal is a single notification platform that guarantees reliable delivery and a unified message standard.",
          ],
          ru: [
            "Через нашу платформу клиенты получают SMS, push и другие сообщения — о платежах, переводах и других важных событиях.",
            "Цель — развивать единую платформу уведомлений, которая гарантирует стабильную доставку и единый стандарт сообщений.",
          ],
        },
        images: [
          { src: "/images/cases/vtb-template-constructor/img-1.png" },
        ],
      },
      {
        id: "constructor",
        eyebrow: { en: "What is the constructor", ru: "Что за конструктор шаблонов" },
        heading: {
          en: "It's where notification texts are composed for every channel — SMS, push and more.",
          ru: "Это продукт, в котором собираются тексты уведомлений для разных каналов",
        },
        body: {
          en: [
            "Previously templates were assembled in code; mostly only people with strong technical backgrounds could work with them.",
            "Now there's a usable constructor: configure a template through a simple form, or open the code editor when you need it. People without deep technical skills can now work with notifications.",
            "The bank gets a unified message standard, fewer template authoring errors, and the ability to scale new notification scenarios faster.",
          ],
          ru: [
            "Раньше шаблоны собирались через код, и работать с ними могли в основном люди с хорошей технической подготовкой.",
            "Теперь появился удобный конструктор: шаблон можно настроить через простую форму или, при необходимости, открыть редактор кода. Благодаря этому с уведомлениями могут работать не только специалисты с сильным техническим бэкграундом.",
            "В итоге банк получает единый стандарт сообщений, меньше ошибок при создании шаблонов и возможность быстрее масштабировать новые сценарии уведомлений.",
          ],
        },
        images: [
          { src: "/images/cases/vtb-template-constructor/img-2.png" },
        ],
      },
      {
        id: "problem",
        eyebrow: { en: "Problem", ru: "Проблема" },
        heading: {
          en: "Old legacy interfaces were clunky, error-prone and slowed feature rollout.",
          ru: "Старые легаси-интерфейсы были неудобными, создавали ошибки и замедляли внедрение",
        },
        body: {
          en: [
            "The bank decided to migrate services onto the new Omni UI design system and refresh interfaces along the way.",
          ],
          ru: [
            "Старые легаси-интерфейсы были неудобными, создавали ошибки при создании шаблонов уведомлений и замедляли внедрение новых фич. Банк решил перевести сервисы на новую дизайн-систему Omni UI и обновить интерфейсы.",
          ],
        },
      },
      {
        id: "task",
        eyebrow: { en: "Task", ru: "Задача" },
        heading: {
          en: "Rework the form support staff use to author SMS, push and rich-push messages.",
          ru: "Переработать форму, через которую сотрудники создавали SMS, push и rich-push",
        },
        body: {
          en: [
            "Audience: about 50 support-team staff across different departments, including support lines.",
            "Mission: make working with templates clearer and faster, cut errors, and improve the interface.",
            "Business goal: a seamless migration of every notification service to the new platform, unified through the design system.",
            "Success criteria: faster template authoring; every service successfully migrated; positive feedback from staff (internal surveys + demo sessions).",
          ],
          ru: [
            "Аудитория: около 50 сотрудников сопровождения из разных подразделений, включая линии поддержки.",
            "Миссия: сделать процесс работы с шаблонами более понятным и быстрым, сократить ошибки и повысить удобство интерфейса.",
            "Цель бизнеса: обеспечить бесшовный переход всех сервисов уведомлений на новую платформу и унифицировать взаимодействие через дизайн-систему.",
            "Критерии успеха: сотрудники создают и редактируют шаблоны быстрее, все сервисы успешно мигрировали на новый интерфейс, положительная обратная связь (внутренние опросы и демо-сессии).",
          ],
        },
      },
      {
        id: "discovery",
        eyebrow: { en: "Discovery", ru: "Дискавери" },
        heading: {
          en: "Interviews and demos with the support team — fields were overloaded, errors regular.",
          ru: "Интервью и демо с сопровождением — поля перегружены, ошибки регулярные",
        },
        body: {
          en: [
            "I started with the current template form and the support-team workflows.",
            "Ran interviews and demo sessions with users to find where the form gets in the way. Collected feedback: fields were overloaded and template-authoring errors happened regularly.",
            "Analyzed the legacy system's constraints and the business request to unify around the new Omni UI.",
          ],
          ru: [
            "Начал с изучения текущей формы шаблона и сценариев работы сотрудников сопровождения.",
            "Провёл интервью и демо-сессии с пользователями, чтобы понять, где возникают сложности. Собрал обратную связь: поля были перегружены, а ошибки при создании шаблонов встречались регулярно.",
            "Проанализировал ограничения легаси-системы и запрос бизнеса на унификацию в рамках новой дизайн-системы Omni UI.",
          ],
        },
      },
      {
        id: "pipeline",
        eyebrow: { en: "How a notification is assembled", ru: "Как собирается уведомление" },
        heading: {
          en: "Raw data → template transformation → clear text for the client.",
          ru: "Сырые данные → шаблон преобразования → понятный текст",
        },
        body: {
          en: [
            "1) Raw data is taken — amount, balance, card number.",
            "2) The transformation template turns that data into readable text.",
            "3) The client sees a clear notification on the phone: “1,050.50 ₽ debited from card *4977. Balance: 251.51 ₽”.",
          ],
          ru: [
            "1) Берутся исходные сырые данные уведомления — например, сумма, баланс, номер карты.",
            "2) Шаблон преобразования превращает данные в понятный текст.",
            "3) Результат для клиента — понятное уведомление на телефоне: «Списание 1050.50 ₽ с карты *4977. Баланс: 251.51 ₽».",
          ],
        },
      },
      {
        id: "hypotheses",
        eyebrow: { en: "Hypotheses & rough mocks", ru: "Гипотезы и черновые макеты" },
        heading: {
          en: "Two big bets: a form-style constructor, and structuring push parameters visually.",
          ru: "Две гипотезы: форма-конструктор и визуальная структура push-полей",
        },
        body: {
          en: [
            "I dug into how admin UIs are structured (Mobbin benchmarking) and sketched the possible shape of the new form.",
            "Hypothesis 1: The current solution is too technical, mostly accessible to engineers. A form-style constructor with push parameters surfaced as fields would let support staff author templates faster without diving into code.",
            "Hypothesis 2: If the constructor's UI mirrors what a push actually looks like (title, description, image, button with deeplink) plus a visual preview, staff orient faster and need fewer clarifications.",
          ],
          ru: [
            "На этом этапе разбирался, как вообще подступиться к задаче, общался с ключевыми пользователями и бизнесом. Изучил лучшие практики интерфейсов админок на Mobbin, провёл бенчмаркинг, прикинул возможную структуру новой формы.",
            "Гипотеза 1: текущее решение слишком техническое и доступно в основном разработчикам. Если добавить форму-конструктор и вынести push-параметры в форму, сотрудники сопровождения смогут быстрее и проще создавать шаблоны без погружения в код.",
            "Гипотеза 2: если построить интерфейс конструктора так, как выглядит реальное push-уведомление (заголовок, описание, картинка и кнопка с deeplink), и добавить визуальное превью, сотрудники быстрее ориентируются и реже задают уточняющие вопросы.",
          ],
        },
        images: [
          {
            src: "/images/cases/vtb-template-constructor/img-3.png",
            caption: { en: "Final shortlist of hypotheses.", ru: "В итоге гипотезы получились такими." },
          },
        ],
      },
      {
        id: "prioritization",
        eyebrow: { en: "Prioritization", ru: "Приоритизация гипотез" },
        heading: {
          en: "Value ÷ effort. Modes (form + code editor) won the first iteration.",
          ru: "Ценность ÷ сложность. В первую итерацию взяли «режимы работы»",
        },
        body: {
          en: [
            "Form + code editor mode had high value at moderate effort. We took it first.",
            "For the second hypothesis we kept just the structured form (title, description, image, buttons). The visual preview itself was tabled — engineering cost was too high for round one.",
          ],
          ru: [
            "После того как сформулировали гипотезы, мы их приоритизировали по принципу «ценность ÷ сложность».",
            "В первую итерацию взяли гипотезу с режимами работы (форма и редактор кода) — она показала высокий коэффициент ценности при умеренной сложности.",
            "Во второй гипотезе оставили только структурированную форму (заголовок, описание, картинка, кнопки). Визуальное превью отложили: техническая сложность оказалась слишком высокой для первого этапа.",
          ],
        },
      },
      {
        id: "scoping",
        eyebrow: { en: "Scoping", ru: "Скоупинг" },
        heading: {
          en: "MVP scope: new field grouping, basic hints/validation, design-system integration.",
          ru: "MVP: новая группировка полей, базовые подсказки и проверки, интеграция с DS",
        },
        body: {
          en: [
            "More complex improvements — advanced template search, change history — were pushed to later releases.",
          ],
          ru: [
            "Вместе с командой определили минимальный объём первой итерации: новая логика группировки полей, базовые подсказки и проверки ошибок, интеграция с дизайн-системой. Более сложные улучшения (расширенный поиск, история изменений) оставили на следующие релизы.",
          ],
        },
      },
      {
        id: "first-iteration",
        eyebrow: { en: "First iteration", ru: "Дизайн первой итерации" },
        heading: {
          en: "Drawer-form prototype in Figma. Demo with support. Implementation audit.",
          ru: "Прототип в Figma на основе Drawer. Демо. Аудит реализации",
        },
        body: {
          en: [
            "Studied every Omni UI guideline. Built clickable Figma prototypes of the new form inside the design system. Ran a demo with support staff and collected feedback.",
            "After handoff I audited the implementation on staging: fields, statuses, alignment with the rest of the admin's scenario logic.",
          ],
          ru: [
            "Изучил все гайдлайны дизайн-системы Omni UI. Подготовил кликабельные прототипы в Figma новой формы в рамках новой дизайн-системы. Провёл демо-презентацию с сопровождением и собрал обратную связь.",
            "После передачи в разработку провёл аудит реализации на тестовой среде: корректность полей и статусов, мелкие несоответствия дизайну, соответствие логике сценариев всей админки.",
          ],
        },
        images: [
          { src: "/images/cases/vtb-template-constructor/img-4.png" },
        ],
      },
      {
        id: "drawer-problem",
        eyebrow: { en: "First launch & the Drawer problem", ru: "Первый запуск и проблема Drawer" },
        heading: {
          en: "Authoring long copy inside a side-panel didn't work. We switched to a full page.",
          ru: "Длинные тексты в боковой панели — неудобно. Перешли на полностраничную форму",
        },
        body: {
          en: [
            "After the first test-environment release the feedback was: working in a side panel is painful — you can't see all fields when editing long copy.",
            "The design system pattern said Drawer was the right shape for these scenarios — but the real experience said otherwise. I raised it with the design-system team and we agreed to evolve the pattern: full-page form instead of drawer.",
          ],
          ru: [
            "После первого релиза на тестовую среду пользователи жаловались, что работать с формой в формате боковой панели неудобно: при редактировании длинных текстов трудно видеть все поля и корректно настраивать шаблон.",
            "По гайдам дизайн-системы Drawer должен был использоваться для таких сценариев, но реальный опыт показал ограничения. Я вынес проблему на обсуждение с командой дизайн-системы — согласовали изменение паттерна: вместо боковой панели сделали полностраничную форму.",
          ],
        },
        images: [
          {
            src: "/images/cases/vtb-template-constructor/img-5.png",
            caption: { en: "List of all created templates.", ru: "Список всех созданных шаблонов" },
          },
          { src: "/images/cases/vtb-template-constructor/img-6.png" },
        ],
      },
      {
        id: "results",
        eyebrow: { en: "Results", ru: "Результат" },
        heading: {
          en: "Shipped to production. Faster authoring, fewer errors, positive stakeholder feedback.",
          ru: "Выпущено в прод. Быстрее, меньше ошибок, позитивный фидбек",
        },
        body: {
          en: [
            "The redesign shipped successfully: staff noted the form felt noticeably more usable and faster; every service migrated off legacy; template errors dropped; stakeholders gave positive feedback.",
            "Every success criterion met — staff work more efficiently, the business has a stable, scalable tool.",
          ],
          ru: [
            "Редизайн был успешно выпущен в прод. Сотрудники отметили, что форма стала заметно удобнее и быстрее, все процессы мигрировали на новый интерфейс без возврата к легаси, количество ошибок снизилось, стейкхолдеры дали положительный фидбек.",
            "Критерии успеха достигнуты: сотрудники стали работать эффективнее, а бизнес получил стабильный и масштабируемый инструмент.",
          ],
        },
      },
      {
        id: "role",
        eyebrow: { en: "My role", ru: "Моя роль" },
        heading: {
          en: "Sole designer — full cycle: research → design → DS alignment → implementation audit.",
          ru: "Единственный дизайнер, полный цикл задачи",
        },
        body: {
          en: [
            "Beyond the mocks themselves, I owned user/stakeholder meetings and pushed change-arguments through the design-system team.",
          ],
          ru: [
            "Был единственным дизайнером, отвечал за полный цикл: от исследования и сбора фидбека до проектирования, согласования с дизайн-системой и аудита реализации. Помимо макетов взял на себя организацию встреч с пользователями и стейкхолдерами, а также аргументацию изменений в паттернах DS.",
          ],
        },
      },
      {
        id: "lessons",
        eyebrow: { en: "Lessons", ru: "Уроки" },
        heading: {
          en: "Even guideline-blessed components need a real-usability check.",
          ru: "Даже компонент по гайдлайну нужно проверять на реальном опыте",
        },
        body: {
          en: [
            "End-user feedback often surfaces problems analytics can't.",
            "Build iteration time into the plan, and be ready to push back when the change improves usability.",
          ],
          ru: [
            "Даже если гайдлайн предписывает использовать компонент, нужно проверять его реальное удобство на практике.",
            "Фидбек от конечных пользователей часто открывает проблемы, которые невозможно выявить только аналитикой.",
            "Важно заранее закладывать время на итерации и быть готовым отстаивать решение, если оно улучшает юзабилити.",
          ],
        },
      },
    ],
  },

  {
    slug: "lofty-homepage",
    company: "Lofty / KUPIKOD",
    year: "2024",
    cover: "/images/lofty-homepage.png",
    status: { en: "Shipped", ru: "В продакшне" },
    headline: {
      en: "Lofty homepage redesign",
      ru: "Редизайн главной страницы KUPIKOD",
    },
    blurb: {
      en: "KUPIKOD is a service ecosystem for gamers (2M+ MAU). I redesigned the homepage so it actually functions as a gateway into the ecosystem — not a chaotic landing.",
      ru: "KUPIKOD — сервисная экосистема для геймеров с 2M+ MAU. Сделал главную точкой входа в экосистему, а не «хаотичным лендингом».",
    },
    meta: {
      role: { en: "Product Designer", ru: "Продуктовый дизайнер" },
      timeline: { en: "2024", ru: "2024" },
      skills: {
        en: ["Marketing surfaces", "Visual design", "Hypothesis prioritization", "Conversion"],
        ru: ["Маркетинговые поверхности", "Визуальный дизайн", "Приоритизация гипотез", "Конверсия"],
      },
    },
    sections: [
      {
        id: "problem",
        eyebrow: { en: "What was wrong", ru: "Что было не так с прошлой версией" },
        heading: {
          en: "Users were only clicking one block. The homepage didn't communicate the ecosystem.",
          ru: "Пользователи кликали почти только в один блок и не понимали состав сервиса",
        },
        body: {
          en: [
            "By Yandex Metrika almost all clicks went into a single block.",
            "There was no clear sense of which products live inside the service.",
            "Key value propositions — bonus system, 24/7 support, refunds, creators — were absent.",
            "It felt like a chaotic landing and was holding back traffic and conversion growth.",
          ],
          ru: [
            "Пользователи кликали почти только в один блок (по данным Яндекс.Метрики).",
            "Не было чёткого понимания, что у нас в сервисе есть из продуктов.",
            "Не показывались ключевые УТП: бонусная система, поддержка 24/7, возвраты, блогеры.",
            "Это формировало у юзеров впечатление «хаотичного лендинга» и мешало росту трафика и конверсий.",
          ],
        },
        images: [
          { src: "/images/cases/lofty-homepage/img-1.png" },
          { src: "/images/cases/lofty-homepage/img-2.png" },
        ],
      },
      {
        id: "task",
        eyebrow: { en: "Task", ru: "Задача" },
        heading: {
          en: "Not a visual refresh. A redesign tied to product and traffic metrics.",
          ru: "Не косметика. Редизайн, связанный с продуктовыми метриками и трафиком",
        },
        body: {
          en: [
            "I gathered marketing feedback (users don't see the breadth of services or the value), benchmarked similar service-aggregators (MTS, Avito Career, Tinkoff, Sber, Twitch, Yandex Plus Gaming), picked reference visuals per block, and reworked SEO Title/Description with the SEO specialist.",
          ],
          ru: [
            "Собрал фидбек от маркетинга: пользователи не понимают весь спектр сервисов и не видят ценности. Провёл бенчмаркинг похожих по структуре сервисов: Главная МТС, Авито Career, Тинькофф, Сбер, Twitch, Yandex Plus Gaming. Подобрал референсы по блокам. Проверил SEO и совместно с SEO-специалистом переработал Title и Description.",
          ],
        },
      },
      {
        id: "hypotheses",
        eyebrow: { en: "Hypotheses", ru: "Гипотезы" },
        heading: {
          en: "Three bets: clear service categories, surfaced USPs, social proof via creators.",
          ru: "Категории сервисов, УТП на видном месте, социальное доказательство через блогеров",
        },
        body: {
          en: [
            "1) Splitting services into large category blocks → users find the right one faster. Expected: more clicks distributed across blocks, higher CTR. Metric: CTR per service card, click heatmap.",
            "2) Surface USPs → trust and conversion go up. Expected: fewer bounces, higher purchase conversion. Metric: clicks-to-action conversion (AppMetrica / GA).",
            "3) Show creators → social proof, new visitors stay longer. Expected: deeper scroll, longer dwell, more navigation into services.",
          ],
          ru: [
            "1) Если разделить сервисы по большим категорийным блокам, пользователи будут быстрее находить нужное. Ожидание: больше кликов в разные блоки, рост переходов. Метрика: CTR на карточки сервисов, распределение кликов (heatmap).",
            "2) Если вынести УТП, доверие и конверсия вырастут. Ожидание: меньше отказов, рост конверсии в покупки. Метрика: конверсия из кликов в действия (AppMetrica/GA).",
            "3) Если показать блогеров, это усилит социальное доказательство — новые пользователи останутся дольше, скроллят глубже, чаще переходят к сервисам.",
          ],
        },
        images: [
          { src: "/images/cases/lofty-homepage/img-3.png" },
        ],
      },
      {
        id: "results",
        eyebrow: { en: "Results", ru: "Результаты" },
        heading: {
          en: "Click distribution rebalanced. CTR up. Engagement on the creators block strong.",
          ru: "Распределение кликов выровнялось. CTR вырос. Блок с блогерами «зашёл»",
        },
        body: {
          en: [
            "After launch users finally started clicking across all major services — not just one block. CTR rose materially; clicks to Steam, games, digital goods and top-ups became more even. The page now actually behaves like a gateway to the ecosystem rather than a random landing.",
            "The creators / USP / social proof block looked like typical marketing but materially drove engagement: new users recognized creators, stayed longer, scrolled deeper, and moved on to services more often.",
          ],
          ru: [
            "После запуска пользователи наконец-то начали кликать не только в один блок, а распределялись по всем основным сервисам. CTR вырос кратно, переходы в Steam, игры, цифровые товары и донат стали более равномерными. Теперь страница действительно работает как «ворота в экосистему», а не как случайный лендинг.",
            "Блок с блогерами, УТП и социальным доказательством визуально выглядел как типичный маркетинг, но по факту дал заметный рост вовлечённости. Новые пользователи видели знакомых блогеров, задерживались на странице дольше, скроллили глубже и чаще переходили к сервисам.",
          ],
        },
        images: [
          { src: "/images/cases/lofty-homepage/img-4.png" },
          { src: "/images/cases/lofty-homepage/img-5.png" },
          { src: "/images/cases/lofty-homepage/img-6.png" },
          { src: "/images/cases/lofty-homepage/img-7.png" },
        ],
      },
      {
        id: "lessons",
        eyebrow: { en: "Lessons", ru: "Уроки" },
        heading: {
          en: "Even a “brand” page can be productized — and move metrics.",
          ru: "Даже брендовая страница может быть продуктовой и двигать метрики",
        },
        body: {
          en: [
            "1) Even a brand page can be productized and drive metric growth if you set the goal right.",
            "2) Don't be afraid to throw together rough concepts quickly. Don't get stuck polishing them to “perfect”.",
          ],
          ru: [
            "1) Даже брендовая страница может быть продуктовой и давать рост метрик, если правильно поставить цель.",
            "2) Не бояться и накидывать быстро возможные концепты. Не застревать в бесконечном доведении их до идеала.",
          ],
        },
      },
    ],
  },

  {
    slug: "ykt-jobs",
    company: "Ykt.Ru",
    year: "2023–2024",
    cover: "/images/ykt-jobs.png",
    status: { en: "In dev", ru: "В разработке" },
    headline: {
      en: "Job & talent platform redesign",
      ru: "Редизайн сервиса по поиску работы и персонала",
    },
    blurb: {
      en: "Led the full redesign of Ykt.Ru's job platform as the lead and feature designer — for both job seekers and employers in Yakutia.",
      ru: "Полный редизайн сервиса по поиску работы и персонала Ykt.Ru. Был ведущим дизайнером и фича-лидером.",
    },
    meta: {
      role: { en: "Lead Designer, feature lead", ru: "Ведущий дизайнер, фича-лидер" },
      timeline: { en: "2023 – 2024", ru: "2023 – 2024" },
      skills: {
        en: ["End-to-end product", "Usability research", "Design system", "Mobile + Web"],
        ru: ["End-to-end продукт", "Юзабилити-исследования", "UI-кит", "Mobile + Web"],
      },
    },
    sections: [
      {
        id: "process",
        eyebrow: { en: "Process", ru: "Процесс проектирования" },
        heading: {
          en: "Eight steps from usability tests to a new UI kit handed off to engineering.",
          ru: "Восемь шагов: от ю-тестов текущей версии до нового UI-кита",
        },
        body: {
          en: [
            "1) Usability tests of the current resume-creation flow with students.",
            "2) Interview guide prepared for qualitative UX research.",
            "3) Competitor analysis & benchmarking: Headhunter, Superjob, UpWork, Contra.",
            "4) Insight extraction, results analysis, first new-flow concepts.",
            "5) Designing new scenarios, improving old ones.",
            "6) Prototyping for usability tests.",
            "7) Building a custom profession catalog from current-vacancy data (with the analyst).",
            "8) Updated UI kit, handed off to engineering.",
          ],
          ru: [
            "1) Usability-тесты текущей версии флоу создания резюме со студентами.",
            "2) Подготовка гайда глубинного интервью для качественного UX-исследования.",
            "3) Конкурентный анализ и бенчмаркинг: Headhunter, Superjob, UpWork, Contra.",
            "4) Получение инсайтов, анализ результатов и первые концепты обновлённых флоу.",
            "5) Проектирование новых сценариев, улучшение старых.",
            "6) Прототипирование для usability-тестов.",
            "7) Создание собственного каталога популярных профессий на базе данных текущих вакансий вместе с аналитиком.",
            "8) Создание обновлённого UI-кита и передача в разработку.",
          ],
        },
        images: [
          { src: "/images/cases/ykt-jobs/img-1.png" },
          {
            src: "/images/cases/ykt-jobs/img-2.png",
            caption: { en: "Before the redesign", ru: "Как выглядел сайт до" },
          },
          { src: "/images/cases/ykt-jobs/img-3.png" },
          { src: "/images/cases/ykt-jobs/img-4.png" },
          {
            src: "/images/cases/ykt-jobs/img-5.png",
            caption: { en: "After the redesign", ru: "После редизайна" },
          },
          { src: "/images/cases/ykt-jobs/img-6.png" },
          { src: "/images/cases/ykt-jobs/img-7.png" },
        ],
      },
      {
        id: "always",
        eyebrow: { en: "Working method", ru: "Как обычно работаю" },
        heading: {
          en: "Always write a task understanding with stakeholders before touching the design.",
          ru: "Всегда заполняю понимание задачи со стейкхолдерами перед работой",
        },
        body: {
          en: [
            "Mission, goal, audience, success criteria — agreed up front so everyone is on the same wave.",
          ],
          ru: [
            "Миссия, цель, аудитория, критерии успеха — фиксируем заранее, чтобы все были на одной волне.",
          ],
        },
      },
      {
        id: "results",
        eyebrow: { en: "Results", ru: "Результаты" },
        heading: {
          en: "~300 Figma screens, a new revenue lever, lighter auth, profession catalog, Telegram bot.",
          ru: "~300 экранов в Figma, новая монетизация, упрощённая регистрация, каталог профессий, Telegram-бот",
        },
        body: {
          en: [
            "Designed ~300 Figma screens.",
            "Helped shape a new business solution for company branding via a banner system. A major lead was already signed before the redesign even shipped.",
            "Cut several steps from registration / auth.",
            "Designed a new pricing plan for employers.",
            "Assembled the in-house profession catalog tied to specialties and industries.",
            "Improved vacancy search with a suggest system, and improved filters for both seekers and employers.",
            "Added direct employer-to-seeker communication via WhatsApp / Telegram chat.",
            "Designed a new Telegram bot for fast push-style vacancy notifications (the service has no app).",
            "Status: in development; waiting on launch.",
          ],
          ru: [
            "Задизайнил ~300 страниц в Figma.",
            "Помог сформировать новое бизнес-решение для брендирования компаний через баннерную систему. До релиза редизайна уже получен жирный лид.",
            "Облегчил флоу регистрации и авторизации на сервисе на несколько шагов.",
            "Работал над созданием нового тарифного плана для работодателей.",
            "Собрал собственный каталог профессий с привязкой к специальностям и отраслям.",
            "Улучшил флоу поиска вакансий через систему саджестов.",
            "Улучшил фильтры поиска для работодателей и соискателей.",
            "Добавлена возможность прямой коммуникации работодателя с соискателем через WhatsApp/Telegram-чат.",
            "Спроектировал новый Telegram-бот для быстрых push-уведомлений по вакансиям. У сервиса нет приложения.",
            "Статус: в разработке. Ждём запуска.",
          ],
        },
        images: [
          { src: "/images/cases/ykt-jobs/img-8.png" },
        ],
      },
    ],
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
      en: "Launched a new pickup feature on EdaYkt — 5% of all orders in the first month after release.",
      ru: "Запустил новую фичу самовывоза в EdaYkt — 5% от всех заказов уже в первом месяце после релиза.",
    },
    meta: {
      role: { en: "Product Designer", ru: "Продуктовый дизайнер" },
      timeline: { en: "2023", ru: "2023" },
      skills: {
        en: ["Feature launch", "User flows", "Web + iOS + Android"],
        ru: ["Запуск фичи", "Пользовательские флоу", "Web + iOS + Android"],
      },
    },
    sections: [
      {
        id: "feature",
        eyebrow: { en: "Feature", ru: "Фича" },
        heading: {
          en: "A pickup ordering flow for an app that previously only supported address delivery.",
          ru: "Новый способ заказа: самовывоз. До этого можно было только доставку",
        },
        body: {
          en: [
            "EdaYkt has been around since 2013 — the design hadn't changed in years and there was a lot of legacy.",
          ],
          ru: [
            "Сам сервис EdaYkt существует с 2013 года, с тех пор не менялся дизайн и было много легаси.",
          ],
        },
      },
      {
        id: "problem",
        eyebrow: { en: "Problem", ru: "Проблема" },
        heading: {
          en: "Wait times could hit 2–3 hours. Restaurants without couriers were blocked from the service.",
          ru: "Ожидание заказа доходило до 2–3 часов. Рестораны без курьеров были отрезаны",
        },
        body: {
          en: [
            "Yakutsk's restaurant scene was growing fast — lots of new venues, but not all had courier delivery, and the service itself doesn't run its own couriers.",
            "For a city with short distances, 2–3 hour waits were a huge downside.",
          ],
          ru: [
            "Ресторанный бизнес большими темпами развивается в Якутске, открывается много новых ресторанов и магазинов, но не все имеют курьерскую доставку (у сервиса своих курьеров тоже нет). Ожидание для клиента могло достигать до 2–3 часов. Это был большой минус, учитывая небольшие расстояния по городу.",
          ],
        },
      },
      {
        id: "solution",
        eyebrow: { en: "Solution", ru: "Решение" },
        heading: {
          en: "Introduce pickup ordering. Add distance calc. Show the option on the card. Discount 20%.",
          ru: "Ввести самовывоз, считать дистанцию, метить карточки, дать скидку 20%",
        },
        body: {
          en: [
            "Pickup means faster receipt and savings on delivery (200–300 ₽ on average).",
            "Calculate distance from the user's location to the venue address.",
            "Give a 20% discount on the whole order when pickup is selected.",
            "Show a “Pickup available” sticker on venue cards.",
          ],
          ru: [
            "Ввести возможность заказа на самовывоз. Это позволит пользователям ускорить получение заказа, а также сэкономить на доставке. Стоимость доставки у ресторанов в среднем 200–300 руб.",
            "Добавить расчёт дистанции от местоположения пользователя до адреса компании.",
            "Предоставить скидку 20% на весь заказ при самовывозе.",
            "На карточках компаний показываем стикер «Есть самовывоз».",
          ],
        },
      },
      {
        id: "design",
        eyebrow: { en: "Design", ru: "Проектирование" },
        heading: {
          en: "Analyze the current flow, benchmark, prototype, run usability tests, mock for every platform.",
          ru: "Анализ текущего флоу, бенчмаркинг, прототип, ю-тесты, макеты под все платформы",
        },
        body: {
          en: [
            "Walked through the existing client path and benchmarked competitor and adjacent-product flows.",
            "Built a quick prototype to feel out the flow and ran a few usability tests. Insight: people would fill up the cart and only then think about the ordering method right before checkout.",
            "Found what mattered to users and what didn't at checkout, gathered feedback for follow-ups. Pickup is a well-established e-commerce pattern, so no big research was needed.",
            "Then proposed possible design changes to the team and mocked them for every platform: Web Desktop, Mobile, iOS, Android.",
          ],
          ru: [
            "Я проанализировал текущий клиентский путь в приложении, провёл дизайн-бенчмаркинг сервисов-конкурентов и схожих продуктов.",
            "Нарисовал быстрый прототип для проверки общего ощущения флоу и проделал несколько ю-тестов. Получил несколько инсайтов — например, люди заполняли корзину и только затем задумывались о способе заказа перед оформлением.",
            "Узнал, что людям важно, а что неважно при оформлении заказа, получил фидбек для последующего улучшения фичи. Большие исследования не проводились — возможность заказа на самовывоз есть в большинстве популярных e-commerce сервисах.",
            "Затем предложил команде возможные изменения в дизайне приложения с новым функционалом. Макетирование для всех платформ: Web Desktop, Mobile, iOS, Android.",
          ],
        },
      },
      {
        id: "results",
        eyebrow: { en: "Results", ru: "Результаты" },
        heading: {
          en: "5% of all orders in the first month. Also launched on web.",
          ru: "5% от всех заказов в первом месяце. Запустили и на вебе",
        },
        body: {
          en: [
            "Pain points addressed for both users and restaurants. In the first month after release, pickup orders were 5% of all orders.",
            "We also launched pickup on the web version.",
          ],
          ru: [
            "Устранены боли пользователей и ресторанов. Уже в первом месяце после релиза количество заказов на самовывоз составляло 5% от общих заказов.",
            "Также не забыли о нашей веб-версии и там тоже запустили самовывоз.",
          ],
        },
        images: [
          { src: "/images/cases/ykt-pickup/img-1.png" },
          { src: "/images/cases/ykt-pickup/img-2.png" },
          {
            src: "/images/cases/ykt-pickup/img-3.png",
            caption: { en: "Web version also got pickup support.", ru: "Также запустили самовывоз и в веб-версии." },
          },
          { src: "/images/cases/ykt-pickup/img-4.png" },
        ],
      },
    ],
  },
];

export const experience: Experience[] = [
  {
    year: { en: "2025 – Present", ru: "2025 – Сейчас" },
    company: "ВТБ",
    href: "https://www.vtb.ru/personal/online-servisy/vtb-online/",
    role: { en: "Senior Product Designer", ru: "Старший продуктовый дизайнер" },
  },
  {
    year: { en: "2024", ru: "2024" },
    company: "Lofty / KUPIKOD",
    href: "https://www.lofty.today/",
    role: { en: "Product Designer", ru: "Продуктовый дизайнер" },
  },
  {
    year: { en: "2020", ru: "2020" },
    company: "Ykt.Ru",
    href: "https://ykt.ru/about",
    role: { en: "Product Designer", ru: "Продуктовый дизайнер" },
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
    tagline: "Hi! 👋\nI’m a senior product designer at VTB",
    taglineSub: "I run the design of the whole notification system: feed, pushes, settings and internal admins",
    location: "Moscow",
    work: "Work",
    experience: "Experience",
    selectedWork: "Selected work",
    about: "About",
    contacts: "Contacts",
    cv: "Resume",
    backHome: "← Back",
    onThisPage: "On this page",
    role: "Role",
    timeline: "Timeline",
    team: "Team",
    skills: "Skills",
    platforms: "Platforms",
    designedBy: "Designed by Petr",
  },
  ru: {
    tagline: "Привет, я Петя 👋\nСтарший продуктовый дизайнер в ВТБ",
    taglineSub: "Веду дизайн всей системы уведомлений: ленту, пуши, настройки и внутренние админки",
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
    platforms: "Платформы",
    designedBy: "Сделано Петром",
  },
} as const;
