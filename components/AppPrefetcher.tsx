"use client";

import { useEffect } from "react";

/** Renders nothing. Registers the service worker (production only, so dev hot-reload is never cached). */
export default function AppPrefetcher() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const reg = () => navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") reg(); else window.addEventListener("load", reg, { once: true });
  }, []);
  return null;
}
