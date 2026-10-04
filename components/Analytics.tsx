"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { links } from "@/content";

export const COUNTER_ID = 113407862;
declare global {
  interface Window {
    ym?: ((id: number, method: string, ...args: unknown[]) => void) & { a?: unknown[][]; l?: number };
  }
}

export function trackGoal(name: string, params: Record<string, string | number> = {}) {
  if (!/^(www\.)?petrafanasyev\.com$/.test(window.location.hostname)) return;
  window.ym?.(COUNTER_ID, "reachGoal", name, params);
}

export function Analytics() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || !/^(www\.)?petrafanasyev\.com$/.test(window.location.hostname)) return;
    if (!window.ym) {
      const queue: NonNullable<Window["ym"]> = (id, method, ...args) => {
        (queue.a ??= []).push([id, method, ...args]);
      };
      queue.l = Date.now();
      window.ym = queue;
      queue(COUNTER_ID, "init", { defer: true, webvisor: true, clickmap: true, trackLinks: true, accurateTrackBounce: true });
    }
    const url = window.location.href.split("#")[0];
    if (previous.current !== url) {
      window.ym(COUNTER_ID, "hit", url, { title: document.title, referer: previous.current ?? document.referrer });
      previous.current = url;
    }
    const slug = pathname.match(/\/work\/([^/]+)/)?.[1];
    const params = { page: pathname, case: slug ?? "", language: pathname.startsWith("/en/") ? "en" : "ru" };
    if (slug) trackGoal("case_open", params);
    const seen = new Set<string>();
    const onScroll = () => {
      if (!slug || document.visibilityState !== "visible") return;
      const article = document.querySelector("article");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const progress = Math.min(100, Math.max(0, (window.innerHeight - rect.top) / rect.height * 100));
      for (const threshold of [25, 50, 75, 90]) {
        const name = `case_scroll_${threshold}`;
        if (progress >= threshold && !seen.has(name)) {
          seen.add(name);
          trackGoal(name, params);
        }
      }
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a") : null;
      if (!target) return;
      if (target.href === links.cv) trackGoal("resume_click", params);
      if (target.href === links.telegram) trackGoal("telegram_click", params);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const section = entry.target.id;
        if (seen.has(section)) continue;
        seen.add(section);
        trackGoal("case_section_view", { ...params, section });
      }
    }, { rootMargin: "-10% 0px -30% 0px", threshold: 0 });
    if (slug) document.querySelectorAll("article section[id]").forEach(el => observer.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);

  return <Script src={`https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`} strategy="afterInteractive" />;
}
