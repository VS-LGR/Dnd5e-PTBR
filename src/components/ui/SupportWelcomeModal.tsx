"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { DONATE_URL, SITE_NAME } from "@/config/site";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "grimorio-support-welcome";
/** Não reexibe por 14 dias após fechar / “agora não”. */
const DISMISS_DAYS = 14;
const OPEN_DELAY_MS = 700;

function wasDismissedRecently(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const at = Number(raw);
    if (!Number.isFinite(at)) return false;
    return Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

function markDismissed() {
  try {
    localStorage.setItem(STORAGE_KEY, String(Date.now()));
  } catch {
    /* ignore quota / private mode */
  }
}

export function SupportWelcomeModal() {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const close = useCallback(() => {
    setVisible(false);
    window.setTimeout(() => {
      setOpen(false);
      markDismissed();
    }, 180);
  }, []);

  useEffect(() => {
    if (wasDismissedRecently()) return;
    const t = window.setTimeout(() => {
      setOpen(true);
      requestAnimationFrame(() => setVisible(true));
    }, OPEN_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      primaryRef.current?.focus();
    }, 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-3 sm:items-center sm:p-6"
      role="presentation"
    >
      <div
        className={`absolute inset-0 bg-[#1a1208]/65 backdrop-blur-[2px] transition-opacity duration-200 motion-reduce:transition-none ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        className={`relative z-10 w-full max-w-md overflow-hidden rounded-sm border-2 border-crimson bg-parchment shadow-[0_12px_40px_rgba(26,18,8,0.45)] transition duration-200 motion-reduce:transition-none ${
          visible
            ? "translate-y-0 opacity-100 sm:scale-100"
            : "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        }`}
      >
        <div className="h-1.5 w-full bg-gradient-to-r from-crimson via-gold to-crimson" />

        <div className="space-y-4 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-crimson/40 bg-parchment-dark text-xl text-crimson"
              aria-hidden
            >
              ♥
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[10px] uppercase tracking-[0.2em] text-gold">
                Uma mensagem do criador
              </p>
              <h2 id={titleId} className="mt-1 font-display text-xl leading-snug text-crimson">
                Obrigado por estar aqui
              </h2>
            </div>
          </div>

          <div id={descId} className="space-y-3 text-sm leading-relaxed text-ink">
            <p>
              O <strong>{SITE_NAME}</strong> nasceu para facilitar a entrada de
              brasileiros no mundo do RPG — fichas, magias e regras em português,
              sem barreiras desnecessárias.
            </p>
            <p className="text-ink-muted">
              Manter o sistema no ar e seguir evoluindo leva tempo e custo. Se puder
              e quiser ajudar, uma doação faz diferença. Se não puder, tudo bem —
              use, jogue e compartilhe.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <a
              ref={primaryRef}
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => markDismissed()}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm border-2 border-crimson-deep bg-crimson px-4 py-2.5 text-center font-display text-sm tracking-wide !text-[#f4e8d0] shadow-sm touch-manipulation transition hover:bg-crimson-deep hover:!text-[#f4e8d0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson"
            >
              Apoiar com uma doação
            </a>
            <Button
              type="button"
              variant="secondary"
              className="min-h-11 w-full touch-manipulation"
              onClick={close}
            >
              Continuar sem doar
            </Button>
            <p className="text-center text-[11px] leading-snug text-ink-muted">
              Doação opcional via PayPal. Você pode fechar com Esc a qualquer momento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
