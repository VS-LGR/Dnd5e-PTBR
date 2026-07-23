import type { ReactNode } from "react";

export interface PanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  /** Conteúdo alinhado à direita do título (ex.: badge, ação). */
  titleAside?: ReactNode;
}

export function Panel({ title, children, className = "", titleAside }: PanelProps) {
  return (
    <section
      className={`rounded-sm border-2 border-frame bg-[var(--phb-panel)] p-4 shadow-[0_2px_10px_var(--phb-shadow)] sm:p-5 ${className}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3 border-b-2 border-crimson pb-2">
        <h2 className="min-w-0 font-display text-base tracking-wide text-crimson sm:text-lg">
          {title}
        </h2>
        {titleAside ? <div className="shrink-0 pt-0.5">{titleAside}</div> : null}
      </div>
      {children}
    </section>
  );
}

export interface BadgeProps {
  children: ReactNode;
  tone?: "default" | "crimson" | "gold";
}

export function Badge({ children, tone = "default" }: BadgeProps) {
  const tones = {
    default: "border-frame text-ink-muted bg-parchment-dark",
    crimson: "border-crimson text-crimson bg-parchment",
    gold: "border-gold text-gold bg-parchment",
  };
  return (
    <span
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-display text-[11px] uppercase tracking-wider ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export interface TabsProps {
  tabs: { id: string; label: string }[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ tabs, activeId, onChange }: TabsProps) {
  return (
    <div
      className="-mx-1 flex flex-wrap gap-1 overflow-x-auto border-b-2 border-frame px-1 pb-2"
      role="tablist"
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`min-h-10 shrink-0 rounded-sm px-3 py-2 font-display text-sm tracking-wide touch-manipulation transition ${
              active
                ? "bg-crimson !text-parchment"
                : "bg-transparent text-ink-muted hover:bg-parchment-dark"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
