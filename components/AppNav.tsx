"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon, { type IconName } from "@/components/Icon";
import Wordmark from "@/components/Wordmark";
import SoundToggle from "@/components/SoundToggle";

const TABS: { href: string; label: string; icon: IconName; theme: string }[] = [
  { href: "/", label: "Home", icon: "home", theme: "theme-cs" },
  { href: "/computer", label: "Computer", icon: "code", theme: "theme-cs" },
  { href: "/maths", label: "Maths", icon: "sigma", theme: "theme-maths" },
  { href: "/chemistry", label: "Chemistry", icon: "flask", theme: "theme-chem" },
];

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));

/** Persistent app chrome: slim top bar (logo + subject tabs on desktop) and a thumb-reach tab bar on phones.
 *  It lives in the root layout, so it never remounts while moving between subjects; <Link> prefetches each tab. */
export default function AppNav() {
  const path = usePathname() || "/";
  return (
    <>
      <header className="nav-bar">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
          <Link href="/" prefetch={false} aria-label="Quest MC home" className="text-lg text-cyan-200"><Wordmark /></Link>
          <nav aria-label="Subjects" className="hidden items-center gap-1 md:flex">
            {TABS.slice(1).map((t) => {
              const on = isActive(path, t.href);
              return (
                <Link key={t.href} href={t.href} prefetch={false} aria-current={on ? "page" : undefined}
                  className={`${t.theme} flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm ${on ? "bg-white/[0.08] text-white" : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-100"}`}>
                  <Icon name={t.icon} size={17} className={on ? "text-[rgb(var(--ac))]" : ""} />{t.label}
                </Link>
              );
            })}
          </nav>
          <SoundToggle />
        </div>
      </header>

      <nav aria-label="Subjects" className="tab-bar md:hidden">
        <div className="mx-auto grid max-w-md grid-cols-4">
          {TABS.map((t) => {
            const on = isActive(path, t.href);
            return (
              <Link key={t.href} href={t.href} prefetch={false} aria-current={on ? "page" : undefined}
                className={`${t.theme} flex min-h-[3.5rem] flex-col items-center justify-center gap-1 text-[11px] ${on ? "text-[rgb(var(--ac))]" : "text-slate-500"}`}>
                <Icon name={t.icon} size={22} />{t.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
