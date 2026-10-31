import Icon, { type IconName } from "@/components/Icon";

export interface ModeTab { key: string; label: string; icon: IconName; active?: boolean; onClick: () => void }

/** Segmented study-mode switcher shared by Chemistry chapters and Maths topics. Takes its colour from the parent's theme-* class. */
export default function ModeTabs({ tabs, blurb }: { tabs: ModeTab[]; blurb?: string }) {
  return (
    <div className="mb-6">
      <nav aria-label="Study mode" className="flex gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={t.onClick}
            aria-current={t.active ? "page" : undefined}
            className={`flex min-h-[2.75rem] flex-1 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-xl px-3.5 text-sm font-medium ${t.active ? "bg-[rgb(var(--ac)/.14)] text-[rgb(var(--ac))] shadow-[inset_0_0_0_1px_rgb(var(--ac)/.35)]" : "text-slate-400 hover:bg-white/5 hover:text-slate-100"}`}
          >
            <Icon name={t.icon} size={17} />{t.label}
          </button>
        ))}
      </nav>
      {blurb && <p className="mt-3 px-1 text-sm text-slate-500">{blurb}</p>}
    </div>
  );
}
