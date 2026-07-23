"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { hasSupabaseConfig, createClient } from "@/lib/supabase/client";

/** Aviso quando a nuvem está ativa mas o usuário ainda não entrou. */
export function CloudAuthBanner() {
  const configured = hasSupabaseConfig();
  const [email, setEmail] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (!configured) {
      setEmail(null);
      return;
    }
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => {
      setEmail(data.user?.email ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setEmail(session?.user?.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, [configured]);

  if (!configured || email === undefined || email) return null;

  return (
    <div
      className="rounded-sm border-2 border-crimson/40 bg-crimson/10 px-3 py-2.5 text-sm text-ink"
      role="status"
    >
      Entre na{" "}
      <Link href="/auth" className="font-medium text-crimson underline underline-offset-2">
        Conta
      </Link>{" "}
      para salvar e sincronizar fichas entre aparelhos. Sem login, você ainda vê as fichas deste
      dispositivo.
    </div>
  );
}
