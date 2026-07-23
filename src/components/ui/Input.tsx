import {
  useEffect,
  useState,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

const fieldClass =
  "w-full min-h-11 rounded-sm border-2 border-frame bg-parchment px-3 py-2.5 text-base text-ink shadow-inner outline-none touch-manipulation focus:border-crimson";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, id, className = "", ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className="flex flex-col gap-1.5 text-sm text-ink-muted" htmlFor={inputId}>
      <span className="font-display text-xs uppercase tracking-widest text-crimson">{label}</span>
      <input id={inputId} className={`${fieldClass} ${className}`} {...props} />
    </label>
  );
}

export interface NumberFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  /** Minimum allowed on blur (default 0). Use 1 for levels. */
  min?: number;
  max?: number;
  /** When empty on blur: use this (defaults to min). */
  emptyFallback?: number;
}

/**
 * Number input that allows clearing while typing; clamps on blur.
 */
export function NumberField({
  label,
  id,
  className = "",
  value,
  onValueChange,
  min = 0,
  max,
  emptyFallback,
  ...props
}: NumberFieldProps) {
  const inputId = id ?? props.name;
  const [text, setText] = useState(String(value));

  useEffect(() => {
    setText(String(value));
  }, [value]);

  function commit(raw: string) {
    const fallback = emptyFallback ?? min;
    if (raw.trim() === "" || raw === "-" || raw === ".") {
      onValueChange(fallback);
      setText(String(fallback));
      return;
    }
    let n = Number(raw);
    if (!Number.isFinite(n)) {
      onValueChange(fallback);
      setText(String(fallback));
      return;
    }
    n = Math.round(n);
    if (min != null) n = Math.max(min, n);
    if (max != null) n = Math.min(max, n);
    onValueChange(n);
    setText(String(n));
  }

  return (
    <label className="flex flex-col gap-1.5 text-sm text-ink-muted" htmlFor={inputId}>
      <span className="font-display text-xs uppercase tracking-widest text-crimson">{label}</span>
      <input
        id={inputId}
        type="text"
        inputMode="numeric"
        className={`${fieldClass} ${className}`}
        value={text}
        onChange={(e) => {
          const next = e.target.value;
          if (next !== "" && !/^-?\d*$/.test(next)) return;
          setText(next);
          if (next !== "" && next !== "-" && Number.isFinite(Number(next))) {
            let n = Number(next);
            if (max != null && n > max) return;
            if (min == null || n >= min) onValueChange(n);
          }
        }}
        onBlur={() => commit(text)}
        {...props}
      />
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
    <label className="relative z-0 flex flex-col gap-1.5 text-sm text-ink-muted" htmlFor={selectId}>
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
    <label className="flex flex-col gap-1.5 text-sm text-ink-muted" htmlFor={areaId}>
      <span className="font-display text-xs uppercase tracking-widest text-crimson">{label}</span>
      <textarea id={areaId} className={`${fieldClass} min-h-24 ${className}`} {...props} />
    </label>
  );
}
