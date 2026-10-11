"use client";

import { useEffect, useRef, useState } from "react";
import { getSvgPath } from "@/lib/vendor/figma-squircle.mjs";
import styles from "./VtbEcosystem.module.css";

const ASSETS = "/images/vtb-ecosystem/";
const desktopPaths = [
  "M596 415 H439 Q389 415 389 465 V604",
  "M960 540 V604",
  "M1324 415 H1481 Q1531 415 1531 465 V604",
];
const mobilePaths = [
  "M320 250 V288 H160 Q120 288 120 328 V360",
  "M320 250 V360",
  "M320 250 V288 H480 Q520 288 520 328 V360",
];

function Surface({ width, height, radius }: { width: number; height: number; radius: number }) {
  return (
    <svg className={styles.surface} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <path d={getSvgPath({ width: width - 4, height: height - 4, cornerRadius: radius - 2, cornerSmoothing: .6 })} transform="translate(2 2)" fill="#000" stroke="#565754" strokeWidth="4" />
    </svg>
  );
}

/** The approved motion study, with an enlarged, compact composition below 600px. */
export function VtbEcosystem({ locale = "ru" }: { locale?: "ru" | "en" }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLSpanElement>(null);
  const pauseRef = useRef<HTMLButtonElement>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const viewport = viewportRef.current!;
    const stage = stageRef.current!;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const mobile = width <= 600;
      setCompact(mobile);
      stage.style.transform = `scale(${width / (mobile ? 640 : 1920)})`;
      viewport.style.clipPath = `path('${getSvgPath({ width, height, cornerRadius: mobile ? 16 : 24, cornerSmoothing: .6 })}')`;
    });
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current!;
    const stage = stageRef.current!;
    const mark = markRef.current!;
    const button = pauseRef.current!;
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    let paused = reducedMotion.matches;
    let visible = false;
    let elapsed = 0;
    let previous = 0;
    let raf = 0;

    const syncButton = () => {
      button.textContent = paused ? (locale === "ru" ? "Воспроизвести" : "Play") : (locale === "ru" ? "Пауза" : "Pause");
      button.setAttribute("aria-pressed", String(paused));
    };
    const draw = () => {
      const phase = elapsed * Math.PI * 2 / (8 / 3);
      mark.style.setProperty("--gradient-x", `${50 + Math.sin(phase) * 12}%`);
      mark.style.setProperty("--gradient-y", `${50 + Math.cos(phase) * 12}%`);
      mark.style.setProperty("--gradient-angle", `${(elapsed * 120) % 360}deg`);
      stage.style.setProperty("--dash-offset", String(-(elapsed * 44 % 44)));
    };
    const frame = (now: number) => {
      if (previous) elapsed += Math.min((now - previous) / 1000, .05);
      previous = now;
      draw();
      raf = requestAnimationFrame(frame);
    };
    const schedule = () => {
      cancelAnimationFrame(raf);
      previous = 0;
      if (!paused && visible && !document.hidden) raf = requestAnimationFrame(frame);
    };
    const toggle = () => { paused = !paused; syncButton(); schedule(); };
    const preferenceChanged = () => { paused = reducedMotion.matches; syncButton(); schedule(); };
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
    intersection.observe(viewport);
    button.addEventListener("click", toggle);
    reducedMotion.addEventListener("change", preferenceChanged);
    document.addEventListener("visibilitychange", schedule);
    syncButton();
    draw();
    return () => {
      cancelAnimationFrame(raf);
      intersection.disconnect();
      button.removeEventListener("click", toggle);
      reducedMotion.removeEventListener("change", preferenceChanged);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [locale]);

  return (
    <div className={styles.container} data-vtb-ecosystem="live">
      <div ref={viewportRef} className={styles.viewport}>
        <div ref={stageRef} className={styles.stage} data-compact={compact || undefined} role="img" aria-label="VTB Notifications Ecosystem: Push, SMS, In-App">
          <div className={styles.background} aria-hidden="true"><div className={styles.rotatedBackground}>
            {/* Original Figma assets retain their natural SVG dimensions. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.eclipse} src={`${ASSETS}13009.svg`} alt="" />
            <div className={styles.blueLight} /><div className={styles.texture} />
          </div></div>
          <svg className={styles.signals} viewBox={compact ? "0 0 640 620" : "0 0 1920 1080"} aria-hidden="true">
            {(compact ? mobilePaths : desktopPaths).map((d, i) => <g key={i}><path className={styles.rail} d={d} /><path className={styles.flow} d={d} /></g>)}
          </svg>
          <div className={styles.hub}>
            <Surface width={compact ? 560 : 728} height={compact ? 190 : 299} radius={compact ? 40 : 56} />
            <div className={styles.hubTitle}>
              <span ref={markRef} className={styles.markWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.mark} src={`${ASSETS}55133.png`} alt="" />
              </span>
              <div className={styles.title}>VTB Notifications<span>Ecosystem</span></div>
            </div>
          </div>
          {["Push", "SMS", "In-App"].map((label, i) => (
            <div key={label} className={styles.channel} data-channel={i}>
              <div className={styles.card}><Surface width={compact ? 180 : 420} height={compact ? 112 : 144} radius={24} /><span>{label}</span></div>
              <div className={styles.disc}>
                {i === 0 ? <div className={styles.bell}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={styles.bellBody} src={`${ASSETS}cdf2a.svg`} alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={styles.bellClapper} src={`${ASSETS}9cd6c.svg`} alt="" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className={styles.bellTop} src={`${ASSETS}2a1f0.svg`} alt="" />
                </div> : <div className={styles.icon}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`${ASSETS}${i === 1 ? "7094d.svg" : "29873.svg"}`} alt="" />
                </div>}
              </div>
            </div>
          ))}
        </div>
        <button ref={pauseRef} type="button" className={styles.pause} aria-pressed="false">{locale === "ru" ? "Пауза" : "Pause"}</button>
      </div>
    </div>
  );
}
