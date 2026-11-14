"use client";

import { useEffect } from "react";

/**
 * Renders nothing. Feeds the pointer position to cards marked .fx-spot so their CSS spotlight follows the cursor.
 * One passive listener, only on devices with a real hover (never on touch), batched with requestAnimationFrame.
 */
export default function CardSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let raf = 0;
    let target: HTMLElement | null = null;
    let x = 0;
    let y = 0;
    const apply = () => {
      raf = 0;
      if (!target) return;
      const r = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${x - r.left}px`);
      target.style.setProperty("--my", `${y - r.top}px`);
    };
    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(".fx-spot") as HTMLElement | null;
      if (!el) return;
      target = el; x = e.clientX; y = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => { document.removeEventListener("pointermove", onMove); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return null;
}
