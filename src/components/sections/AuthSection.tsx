"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { hasSupabaseConfig, createClient } from "@/lib/supabase/client";
import {
  migrateLocalCharactersToCloud,
  peekLocalCharacters,
} from "@/lib/character/repository";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Panel } from "@/components/ui/Panel";
import { PageHeader } from "@/components/ui/PageHeader";

export function AuthSection() {
  const configured = hasSupabaseConfig();
  const [user, setUser] = useState<User | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [localCount, setLocalCount] = useState(0);
  const [migrating, setMigrating] = useState(false);

  const refreshLocalCount = useCallback(() => {
    setLocalCount(peekLocalCharacters().length);
  }, []);

  useEffect(() => {
    if (!configured) {
      setSessionReady(true);
      return;
    }
    const supabase = createClient();
    void supabase.auth.getUser().then(({ data }) => {
      setUser(data.user ?? null);
      setSessionReady(true);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      refreshLocalCount();
    });
    return () => subscription.unsubscribe();
  }, [configured, refreshLocalCount]);

  useEffect(() => {
    refreshLocalCount();
  }, [refreshLocalCount, user]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!configured) return;
    setLoading(true);
    setMessage(null);
    try {
      const supabase = createClient();
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setMessage("Login realizado.");
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Conta criada. Se a confirmação de e-mail estiver ativa, verifique sua caixa.");
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erro de autenticação");
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    setMessage(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setMessage("Sessão encerrada.");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erro ao sair");
    } finally {
      setLoading(false);
    }
  }

  async function uploadLocal() {
    if (!confirm(`Enviar ${localCount} ficha(s) deste navegador para a nuvem?`)) return;
    setMigrating(true);
    setMessage(null);
    try {
      const { uploaded, failed } = await migrateLocalCharactersToCloud();
      refreshLocalCount();
      if (failed > 0) {
        setMessage(`Enviadas ${uploaded}. Falharam ${failed} (permanecem locais).`);
      } else {
        setMessage(
          uploaded > 0
            ? `${uploaded} ficha(s) enviada(s). O armazenamento local foi limpo.`
            : "Nenhuma ficha local para enviar.",
        );
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erro ao enviar fichas");
    } finally {
      setMigrating(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 sm:space-y-8">
      <PageHeader
        title="Conta"
        description="Entre para sincronizar fichas entre aparelhos com o Supabase."
      />
      {!configured ? (
        <Panel title="Modo local">
          <p className="text-sm text-ink-muted">
            Configure <code className="text-crimson">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
            <code className="text-crimson">NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY</code> (ou{" "}
            <code className="text-crimson">ANON_KEY</code>) no <code>.env.local</code> e na Vercel.
            Rode a migration em <code>supabase/migrations/001_init.sql</code> no SQL Editor do
            projeto. Enquanto isso, as fichas usam o navegador.
          </p>
        </Panel>
      ) : !sessionReady ? (
        <p className="text-sm text-ink-muted">Carregando sessão…</p>
      ) : user ? (
        <>
          <Panel title="Sessão ativa">
            <p className="text-sm text-ink">
              Conectado como <span className="font-medium">{user.email}</span>
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-4 w-full"
              disabled={loading}
              onClick={() => void signOut()}
            >
              {loading ? "Aguarde…" : "Sair"}
            </Button>
            {message && <p className="mt-3 text-sm text-ink-muted">{message}</p>}
          </Panel>
          {localCount > 0 ? (
            <Panel title="Fichas neste navegador">
              <p className="text-sm text-ink-muted">
                Há {localCount} ficha(s) só neste aparelho. Envie para a nuvem para usá-las em
                outros dispositivos.
              </p>
              <Button
                type="button"
                className="mt-4 w-full"
                disabled={migrating}
                onClick={() => void uploadLocal()}
              >
                {migrating ? "Enviando…" : `Enviar ${localCount} ficha(s) para a nuvem`}
              </Button>
            </Panel>
          ) : null}
        </>
      ) : (
        <Panel title={mode === "login" ? "Entrar" : "Registrar"}>
          <form className="space-y-3" onSubmit={submit}>
            <Input
              label="E-mail"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              type="password"
              required
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Aguarde…" : mode === "login" ? "Entrar" : "Criar conta"}
            </Button>
          </form>
          <button
            type="button"
            className="mt-4 min-h-10 text-sm !text-crimson underline decoration-crimson/40 underline-offset-2 hover:decoration-crimson"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login" ? "Criar uma conta" : "Já tenho conta"}
          </button>
          {message && <p className="mt-3 text-sm text-ink-muted">{message}</p>}
        </Panel>
      )}
    </div>
  );
}
