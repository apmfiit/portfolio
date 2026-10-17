"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { getSvgPath } from "figma-squircle";
import { Locale } from "@/content";
import { VtbMark } from "./VtbMark";
import styles from "./NotificationPipeline.module.css";

function CodeLine({ number, children }: { number: number; children: React.ReactNode }) {
  return <span className={styles.line}><span className={styles.number} aria-hidden>{number}</span><span>{children}</span></span>;
}

export function IosPushNotification({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const pushRef = useRef<HTMLDivElement>(null);
  const [outline, setOutline] = useState("");
  useLayoutEffect(() => {
    const el = pushRef.current;
    if (!el) return;
    const update = () => setOutline(getSvgPath({ width: el.offsetWidth, height: el.offsetHeight, cornerRadius: 23, cornerSmoothing: 0.6 }));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const iconOutline = getSvgPath({ width: 38.333, height: 38.333, cornerRadius: 10, cornerSmoothing: 0.6 });
  return (
    <div className={styles.stack}>
    <div ref={pushRef} className={styles.push} style={outline ? { clipPath: `path('${outline}')`, borderRadius: 0 } : undefined}>
      <div className={styles.appIcon} style={{ clipPath: `path('${iconOutline}')`, borderRadius: 0 }} aria-hidden><VtbMark className="h-4 w-6" /></div>
      <div className={styles.message}>
        <div className={styles.appRow}><span>{en ? "VTB Online" : "ВТБ Онлайн"}</span><span className={styles.time}>{en ? "now" : "сейчас"}</span></div>
        <p>{en ? "1,050.50 ₽ debited from card *4977. Balance: 251.51 ₽" : "Списание 1 050,50 ₽ с карты *4977. Баланс: 251,51 ₽"}</p>
      </div>
      {outline && <svg className={styles.outline} aria-hidden><path d={outline} fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="1" /></svg>}
    </div>
    </div>
  );
}

export function NotificationPipeline({ locale }: { locale: Locale }) {
  const en = locale === "en";
  return (
    <ol className={styles.pipeline}>
      <li className={styles.step}>
        <p className="reading-copy"><span className={styles.stepNumber}>1</span>{en ? "Start with raw data: the amount, balance and card number." : "Берём исходные данные: сумму, баланс и номер карты."}</p>
        <div className={styles.codePanel}>
          <p className={styles.panelLabel}>{en ? "Raw data · XML" : "Исходные данные · XML"}</p>
          <pre className={styles.code}><code>
            <CodeLine number={1}><span className={styles.tag}>{"<Message>"}</span></CodeLine>
            <CodeLine number={2}>{"  "}<span className={styles.tag}>{"<SUM>"}</span>1050.50<span className={styles.tag}>{"</SUM>"}</span></CodeLine>
            <CodeLine number={3}>{"  "}<span className={styles.tag}>{"<BALANCE>"}</span>251.51<span className={styles.tag}>{"</BALANCE>"}</span></CodeLine>
            <CodeLine number={4}>{"  "}<span className={styles.tag}>{"<CARD>"}</span>*4977<span className={styles.tag}>{"</CARD>"}</span></CodeLine>
            <CodeLine number={5}><span className={styles.tag}>{"</Message>"}</span></CodeLine>
          </code></pre>
        </div>
      </li>
      <li className={styles.step}>
        <p className="reading-copy"><span className={styles.stepNumber}>2</span>{en ? "The template inserts the values into readable text." : "Шаблон подставляет значения в понятный текст."}</p>
        <div className={styles.codePanel}>
          <p className={styles.panelLabel}>{en ? "Template · simplified example" : "Шаблон · упрощённый пример"}</p>
          <p className={styles.template}>{en ? "Debited " : "Списание "}<span>{"{SUM}"}</span>{en ? " ₽ from card " : " ₽ с карты "}<span>{"{CARD}"}</span>{en ? ". Balance: " : ". Баланс: "}<span>{"{BALANCE}"}</span> ₽</p>
        </div>
      </li>
      <li className={styles.step}>
        <p className="reading-copy"><span className={styles.stepNumber}>3</span>{en ? "The client receives a notification on their phone." : "Клиент получает уведомление на телефоне."}</p>
        <div className={styles.preview}><IosPushNotification locale={locale} /></div>
      </li>
    </ol>
  );
}
