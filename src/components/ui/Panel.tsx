import type { ReactNode } from "react";

export interface PanelProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function Panel({ title, children, className = "" }: PanelProps) {
  return (
    <section
      className={`rounded-sm border-2 border-frame bg-[var(--phb-panel)] p-4 shadow-[0_2px_8px_var(--phb-shadow)] ${className}`}
    >
      <h2 className="mb-3 border-b-2 border-crimson pb-1 font-display text-lg tracking-wide text-crimson">
        {title}
      </h2>
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
      className={`inline-flex items-center rounded-sm border px-2 py-0.5 font-display text-xs uppercase tracking-wider ${tones[tone]}`}
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
    <div className="flex flex-wrap gap-1 border-b-2 border-frame pb-2" role="tablist">
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={`rounded-sm px-3 py-1.5 font-display text-sm tracking-wide transition ${
              active
                ? "bg-crimson text-parchment"
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
