"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const MESSAGE = "PHYSICS QUEST IS LIVE  •  TAP TO EXPLORE";

export default function PhysicsAnnouncement() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (window.sessionStorage.getItem("physics-live-announcement-seen")) return;
    const timer = window.setTimeout(() => {
      setShowPopup(true);
      window.sessionStorage.setItem("physics-live-announcement-seen", "1");
    }, 6500);
    return () => window.clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Link href="/physics" prefetch={false} className="physics-ticker" aria-label="Physics Quest announcement. Open launch countdown.">
        <span className="physics-ticker-label">📣 ANNOUNCEMENT</span>
        <span className="physics-marquee" aria-hidden="true">
          <span className="physics-marquee-track">
            <span className="physics-marquee-copy">{MESSAGE}<span className="physics-led-dot"> ◆ </span></span>
            <span className="physics-marquee-copy">{MESSAGE}<span className="physics-led-dot"> ◆ </span></span>
          </span>
        </span>
        <span className="physics-ticker-open">OPEN ↗</span>
      </Link>

      {showPopup && (
        <div className="physics-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closePopup(); }}>
          <section className="physics-modal card" role="dialog" aria-modal="true" aria-labelledby="physics-modal-title">
            <button type="button" className="physics-modal-close" aria-label="Close announcement" onClick={closePopup}>×</button>
            <span className="tile theme-chem h-12 w-12 text-2xl" aria-hidden="true">⚡</span>
            <p className="physics-eyebrow">NOW LIVE</p>
            <h2 id="physics-modal-title" className="text-2xl font-semibold text-white sm:text-3xl">Physics Quest is ready!</h2>
            <p className="text-sm leading-relaxed text-slate-300">Physics Quest is now available. Choose Physics on the home screen to explore the chapter and start practising.</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <Link href="/physics" className="btn-primary theme-chem" onClick={closePopup}>Explore Physics <span aria-hidden="true">→</span></Link>
              <button type="button" className="btn-ghost" onClick={closePopup}>Maybe later</button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
