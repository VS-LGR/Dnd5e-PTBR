import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-crimson text-parchment border-crimson-deep hover:bg-crimson-deep shadow-sm",
  secondary:
    "bg-parchment-dark text-ink border-frame hover:bg-parchment shadow-sm",
  ghost: "bg-transparent text-ink border-transparent hover:border-frame",
  danger: "bg-crimson-deep text-parchment border-ink hover:opacity-90",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-sm border-2 px-4 py-2 font-display text-sm tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
