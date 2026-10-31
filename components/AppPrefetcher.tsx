"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SUBJECT_ROUTES } from "@/lib/subjects";
import { CHEM_CHAPTERS, chemChapterHref, loadChemContent } from "@/lib/chemistry/chapters";

type Conn = { saveData?: boolean; effectiveType?: string };
const idle = (fn: () => void, timeout = 2500) => {
  const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
  if (w.requestIdleCallback) w.requestIdleCallback(fn, { timeout }); else setTimeout(fn, 400);
};

/**
 * Renders nothing. Warms the app in the background, politely:
 *  - Data-saver or 2G: nothing is prefetched (the service worker still caches what is actually used).
 *  - 3G: top-level subject routes only.
 *  - Otherwise: subject routes first, then chapter routes, one at a time on idle.
 * Chapter content (the heavy part) is only loaded when the student shows intent (hover/touch/open Chemistry).
 */
export default function AppPrefetcher() {
  const router = useRouter();
  const path = usePathname();

  // 1) Register the service worker (production only, so dev hot-reload is never cached).
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const reg = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") reg(); else window.addEventListener("load", reg, { once: true });
  }, []);

  // 2) Background route prefetch, staggered so it never competes with the first paint.
  useEffect(() => {
    const c = (navigator as Navigator & { connection?: Conn }).connection;
    if (c?.saveData || /(^|-)2g$/.test(c?.effectiveType ?? "")) return;
    const fast = !/3g/.test(c?.effectiveType ?? "");
    const queue = [...SUBJECT_ROUTES.filter((r) => r !== path), ...(fast ? CHEM_CHAPTERS.map((ch) => chemChapterHref(ch.slug)) : [])];
    let cancelled = false;
    const next = () => {
      const href = queue.shift();
      if (!href || cancelled) return;
      try { router.prefetch(href); } catch { /* ignore */ }
      idle(next, 600);
    };
    // On a first visit the splash covers ~4.5 s, so start almost immediately: the routes are warm by the time it fades.
    const t = setTimeout(() => idle(next, 600), 300);
    return () => { cancelled = true; clearTimeout(t); };
  }, [router, path]);

  // 3) Intent-based prefetch: when any subject / chapter link is hovered or touched, warm it right away (nav links use prefetch={false}
  //    so that data-saver mode in (2) is respected; a deliberate hover or touch is the exception).
  useEffect(() => {
    const c = (navigator as Navigator & { connection?: Conn }).connection;
    const saver = !!c?.saveData;
    if (path === "/chemistry" && !saver) idle(() => CHEM_CHAPTERS.forEach((ch) => loadChemContent(ch.slug).catch(() => {})));
    const onIntent = (e: Event) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='/']") as HTMLAnchorElement | null;
      const href = a?.getAttribute("href");
      if (!href) return;
      if (href === "/" || SUBJECT_ROUTES.includes(href)) { try { router.prefetch(href); } catch { /* ignore */ } return; }
      const m = /^\/chemistry\/([^/?#]+)/.exec(href);
      if (m && CHEM_CHAPTERS.some((ch) => ch.slug === m[1])) { try { router.prefetch(href); } catch { /* ignore */ } loadChemContent(m[1]).catch(() => {}); }
    };
    document.addEventListener("pointerover", onIntent, { passive: true });
    document.addEventListener("touchstart", onIntent, { passive: true });
    return () => { document.removeEventListener("pointerover", onIntent); document.removeEventListener("touchstart", onIntent); };
  }, [path, router]);

  return null;
}
