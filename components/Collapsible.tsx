"use client";

import { useId, useState, type ReactNode } from "react";
import Icon from "@/components/Icon";

/** Smooth expand / collapse (grid-template-rows 0fr→1fr: no height measuring, GPU-friendly, works with any content). */
export default function Collapsible({ title, icon, defaultOpen = false, tone = "", children }: { title: string; icon: ReactNode; defaultOpen?: boolean; tone?: string; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  return (
    <section className={`card min-w-0 ${tone}`} aria-label={title}>
      <h3>
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls={id}
          className="flex min-h-[3.5rem] w-full items-center gap-3 px-5 py-3 text-left text-base font-semibold text-white">
          <span className="text-[rgb(var(--ac))]">{icon}</span>
          <span className="min-w-0 flex-1">{title}</span>
          <Icon name="chevron" size={18} className={`text-slate-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </h3>
      <div id={id} className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden" aria-hidden={!open}>
          <div className="px-5 pb-5">{children}</div>
        </div>
      </div>
    </section>
  );
}
