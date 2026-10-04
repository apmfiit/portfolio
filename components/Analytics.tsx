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
    let maxScroll = 0;
    let lastSection = "intro";
    let lastSectionTitle = "";
    let activeMs = 0;
    let activeSince = document.visibilityState === "visible" ? Date.now() : 0;
    let lastActivity = Date.now();
    const onActivity = () => { lastActivity = Date.now(); };
    let destination = "";
    const sections = Array.from(document.querySelectorAll<HTMLElement>("article section[id]"));
    const snapshot = (reason: string) => {
      if (!slug) return;
      const now = Date.now();
      if (activeSince) activeMs += Math.max(0, Math.min(now, lastActivity + 30000) - activeSince);
      activeSince = document.visibilityState === "visible" ? now : 0;
      trackGoal("case_progress", { ...params, section: lastSection, section_title: lastSectionTitle,
        max_scroll: Math.round(maxScroll), active_seconds: Math.round(activeMs / 1000), reason, destination });
    };
    const onScroll = () => {
      if (!slug || document.visibilityState !== "visible") return;
      const article = document.querySelector("article");
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const progress = Math.min(100, Math.max(0, (window.innerHeight - rect.top) / rect.height * 100));
      maxScroll = Math.max(maxScroll, progress);
      lastSection = "intro";
      lastSectionTitle = "";
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) {
          lastSection = section.id;
          lastSectionTitle = section.querySelector("p")?.textContent?.trim() ?? section.id;
        }
      }
      for (const threshold of [25, 50, 75, 90]) {
        const name = `case_scroll_${threshold}`;
        if (progress >= threshold && !seen.has(name)) {
          seen.add(name);
          trackGoal(name, params);
        }
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const zoom = event.target.closest<HTMLElement>("[data-zoom-image]");
      if (zoom) trackGoal("case_image_zoom", { ...params, image: zoom.dataset.zoomImage ?? "",
        section: zoom.closest("section[id]")?.id ?? "cover" });
      const cat = event.target.closest<HTMLElement>('[data-footer-cat][data-cat-interactive="true"]');
      if (cat) trackGoal("cat_click", { ...params, state: cat.dataset.catState ?? "" });
      const target = event.target.closest("a");
      if (!target) return;
      if (target.dataset.nextCase) trackGoal("next_case_click", { ...params, next_case: target.dataset.nextCase });
      const company = target.closest<HTMLElement>("[data-experience-company]");
      if (company) trackGoal("experience_link_click", { ...params, company: company.dataset.experienceCompany ?? "" });
      if (target.href === links.cv) trackGoal("resume_click", params);
      if (target.href === links.telegram) trackGoal("telegram_click", params);
      const nextUrl = new URL(target.href);
      if (nextUrl.origin !== location.origin || nextUrl.pathname !== pathname) {
        destination = nextUrl.origin === location.origin ? nextUrl.pathname : nextUrl.hostname;
        snapshot("link_click");
      }
    };
    const hoverTimers = new Map<Element, ReturnType<typeof setTimeout>>();
    const hoverSelector = '[data-experience-company] a, [data-footer-cat][data-cat-interactive="true"]';
    const onHover = (event: MouseEvent) => {
      if (!(event.target instanceof Element) || !matchMedia("(hover: hover)").matches) return;
      const el = event.target.closest<HTMLElement>(hoverSelector);
      if (!el || (event.relatedTarget instanceof Node && el.contains(event.relatedTarget))) return;
      if (hoverTimers.has(el)) return;
      const company = el.closest<HTMLElement>("[data-experience-company]")?.dataset.experienceCompany;
      const key = company ? `hover:${company}` : "hover:cat";
      if (seen.has(key)) return;
      hoverTimers.set(el, setTimeout(() => {
        hoverTimers.delete(el);
        if (document.visibilityState !== "visible" || el.dataset.catInteractive === "false") return;
        seen.add(key);
        trackGoal(company ? "experience_link_hover" : "cat_hover", { ...params,
          ...(company ? { company } : { state: el.dataset.catState ?? "" }) });
      }, 500));
    };
    const onHoverOut = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const el = event.target.closest(hoverSelector);
      if (!el || (event.relatedTarget instanceof Node && el.contains(event.relatedTarget))) return;
      const timer = hoverTimers.get(el);
      if (timer) clearTimeout(timer);
      hoverTimers.delete(el);
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") lastActivity = Date.now();
      snapshot(document.visibilityState === "hidden" ? "hidden" : "visible");
      if (document.visibilityState === "hidden") {
        hoverTimers.forEach(clearTimeout);
        hoverTimers.clear();
      }
    };
    const onPageHide = () => snapshot("pagehide");
    const heartbeat = window.setInterval(() => {
      if (document.visibilityState === "visible") snapshot("checkpoint");
    }, 15000);
    const catObserver = new IntersectionObserver(entries => {
      if (document.visibilityState !== "visible" || seen.has("cat_seen")) return;
      if (entries.some(entry => entry.isIntersecting)) {
        seen.add("cat_seen");
        trackGoal("cat_visible", params);
      }
    }, { threshold: 0.5 });
    const footerCat = document.querySelector("[data-footer-cat]");
    if (footerCat) catObserver.observe(footerCat);
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const section = entry.target.id;
        if (seen.has(section)) continue;
        seen.add(section);
        trackGoal("case_section_view", { ...params, section,
          section_title: entry.target.querySelector("p")?.textContent?.trim() ?? section });
      }
    }, { rootMargin: "-10% 0px -30% 0px", threshold: 0 });
    if (slug) document.querySelectorAll("article section[id]").forEach(el => observer.observe(el));
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    document.addEventListener("mouseover", onHover);
    document.addEventListener("mouseout", onHoverOut);
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("mousemove", onActivity, { passive: true });
    document.addEventListener("pointerdown", onActivity, { passive: true });
    document.addEventListener("keydown", onActivity);
    window.addEventListener("scroll", onActivity, { passive: true });
    window.addEventListener("pagehide", onPageHide);
    onScroll();
    return () => {
      observer.disconnect();
      catObserver.disconnect();
      clearInterval(heartbeat);
      hoverTimers.forEach(clearTimeout);
      snapshot("route_leave");
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseover", onHover);
      document.removeEventListener("mouseout", onHoverOut);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("mousemove", onActivity);
      document.removeEventListener("pointerdown", onActivity);
      document.removeEventListener("keydown", onActivity);
      window.removeEventListener("scroll", onActivity);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [pathname]);

  return <Script src={`https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`} strategy="afterInteractive" />;
}
