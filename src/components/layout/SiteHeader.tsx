"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

const nav = [
  { href: "/", label: "Início" },
  { href: "/characters", label: "Personagens" },
  { href: "/characters/new", label: "Criar" },
  { href: "/spells", label: "Magias" },
  { href: "/items", label: "Itens" },
  { href: "/items/forja", label: "Forja" },
  { href: "/rules", label: "Regras" },
];

function linkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  if (href === "/characters/new") return pathname.startsWith("/characters/new");
  if (href === "/characters") {
    return (
      pathname === "/characters" ||
      (pathname.startsWith("/characters/") && !pathname.startsWith("/characters/new"))
    );
  }
  if (href === "/items") {
    return pathname.startsWith("/items") && !pathname.startsWith("/items/forja");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b-4 border-crimson bg-[linear-gradient(180deg,#2a1a12_0%,#1a1208_100%)] text-parchment shadow-[0_4px_18px_rgba(26,18,8,0.35)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:gap-5 sm:py-4 md:gap-3">
        <Link href="/" className="group min-w-0 flex-1 pr-1">
          <p className="truncate font-display text-[10px] uppercase tracking-[0.18em] text-gold sm:text-xs sm:tracking-[0.22em]">
            Ferramenta de RPG · DnD 5e
          </p>
          <p className="truncate font-display text-xl tracking-wide text-parchment transition group-hover:text-gold sm:text-2xl">
            Grimório do Aventureiro
          </p>
        </Link>

        <button
          type="button"
          className="inline-flex min-h-12 min-w-[4.75rem] shrink-0 items-center justify-center rounded-sm border-2 border-parchment/30 bg-crimson/40 px-4 py-2.5 font-display text-xs uppercase tracking-wider text-parchment touch-manipulation transition hover:bg-crimson md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Fechar" : "Menu"}
        </button>

        <nav className="hidden flex-wrap justify-end gap-1 md:flex" aria-label="Principal">
          {nav.map((item) => {
            const active = linkActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-sm px-3 py-2 font-display text-sm tracking-wide transition touch-manipulation ${
                  active
                    ? "bg-crimson text-parchment shadow-sm"
                    : "text-parchment/85 hover:bg-crimson/70 hover:text-parchment"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {open ? (
        <div
          id={menuId}
          className="border-t border-parchment/15 bg-[#140e08] md:hidden"
        >
          <nav className="mx-auto grid max-w-6xl grid-cols-2 gap-1.5 px-4 py-3" aria-label="Menu móvel">
            {nav.map((item) => {
              const active = linkActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`min-h-11 rounded-sm px-3 py-2.5 text-center font-display text-sm tracking-wide touch-manipulation transition ${
                    active
                      ? "bg-crimson text-parchment"
                      : "bg-parchment/5 text-parchment/90 hover:bg-crimson/60"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
