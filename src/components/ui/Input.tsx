import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const fieldClass =
  "w-full rounded-sm border-2 border-frame bg-parchment px-3 py-2 text-ink shadow-inner outline-none focus:border-crimson";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="flex flex-col gap-1 text-sm text-ink-muted" htmlFor={inputId}>
      <span className="font-display text-xs uppercase tracking-widest text-crimson">{label}</span>
      <input id={inputId} className={`${fieldClass} ${className}`} {...props} />
    </label>
  );
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export function Select({ label, id, options, className = "", ...props }: SelectProps) {
  const selectId = id ?? props.name;
  return (
    <label className="flex flex-col gap-1 text-sm text-ink-muted" htmlFor={selectId}>
      <span className="font-display text-xs uppercase tracking-widest text-crimson">{label}</span>
      <select id={selectId} className={`${fieldClass} ${className}`} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, id, className = "", ...props }: TextareaProps) {
  const areaId = id ?? props.name;
  return (
    <label className="flex flex-col gap-1 text-sm text-ink-muted" htmlFor={areaId}>
      <span className="font-display text-xs uppercase tracking-widest text-crimson">{label}</span>
      <textarea id={areaId} className={`${fieldClass} min-h-24 ${className}`} {...props} />
    </label>
  );
}
