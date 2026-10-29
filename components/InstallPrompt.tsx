"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
const KEY = "qmc-install-dismissed";

export default function InstallPrompt() {
  const [evt, setEvt] = useState<InstallEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { if (sessionStorage.getItem(KEY)) return; } catch {}
    const standalone = window.matchMedia("(display-mode: standalone)").matches || (navigator as unknown as { standalone?: boolean }).standalone;
    if (standalone) return;

    const onPrompt = (e: Event) => { e.preventDefault(); setEvt(e as InstallEvent); setOpen(true); };
    const onInstalled = () => setOpen(false);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (isIos) { setIos(true); setOpen(true); }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  function close() {
    setOpen(false);
    try { sessionStorage.setItem(KEY, "1"); } catch {}
  }
  async function install() {
    if (!evt) return;
    await evt.prompt();
    await evt.userChoice;
    setEvt(null);
    close();
  }

  if (!open || (!evt && !ios)) return null;
  return (
    <div role="dialog" aria-label="Install Quest MC" className="a-rise fixed inset-x-3 bottom-3 z-50 mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-violet-400/30 bg-[#0d1224] p-4 shadow-2xl shadow-black/60">
      <Logo size={44} />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-slate-100">Install Quest MC</p>
        <p className="text-xs text-slate-400">
          {evt ? "Add it to your device and open it like an app." : "Tap Share, then Add to Home Screen."}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        {evt && <button onClick={install} className="rounded-lg bg-cyan-400 px-3 py-1.5 text-sm font-semibold text-slate-900 hover:bg-cyan-300">Install</button>}
        <button onClick={close} className="text-xs text-slate-400 underline hover:text-slate-200">{evt ? "Not now" : "Got it"}</button>
      </div>
    </div>
  );
}
