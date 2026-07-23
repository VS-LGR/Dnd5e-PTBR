"use client";

import { useCallback, useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { hasSupabaseConfig, createClient } from "@/lib/supabase/client";
import {
  mapAuthError,
  signupFeedback,
  type AuthFeedback,
} from "@/lib/supabase/authMessages";
import {
  migrateLocalCharactersToCloud,
  peekLocalCharacters,
} from "@/lib/character/repository";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Panel } from "@/components/ui/Panel";
import { PageHeader } from "@/components/ui/PageHeader";

function FeedbackBanner({ feedback }: { feedback: AuthFeedback }) {
  const styles =
    feedback.tone === "error"
      ? "border-crimson/50 bg-crimson/10 text-crimson"
      : feedback.tone === "success"
        ? "border-gold/50 bg-gold/15 text-ink"
        : "border-frame bg-parchment-dark/60 text-ink-muted";

  return (
    <p
      className={`mt-3 rounded-sm border-2 px-3 py-2.5 text-sm leading-relaxed ${styles}`}
      role={feedback.tone === "error" ? "alert" : "status"}
    >
      {feedback.text}
    </p>
  );
}

export function AuthSection() {
  const configured = hasSupabaseConfig();
  const [user, setUser] = useState<User | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [feedback, setFeedback] = useState<AuthFeedback | null>(null);
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
    setFeedback(null);
    const trimmedEmail = email.trim();
    try {
      const supabase = createClient();
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });
        if (error) throw error;
        setFeedback({
          tone: "success",
          text: "Login realizado. Suas fichas na nuvem estão disponíveis em Personagens.",
        });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password,
        });
        if (error) throw error;
        const identitiesEmpty = (data.user?.identities?.length ?? 0) === 0;
        setFeedback(
          signupFeedback({
            email: trimmedEmail,
            hasSession: Boolean(data.session),
            identitiesEmpty,
          }),
        );
        if (!identitiesEmpty && !data.session) {
          setMode("login");
          setPassword("");
        }
      }
    } catch (err) {
      setFeedback({ tone: "error", text: mapAuthError(err) });
    } finally {
      setLoading(false);
    }
  }

  async function signOut() {
    setLoading(true);
    setFeedback(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setFeedback({ tone: "info", text: "Sessão encerrada neste aparelho." });
    } catch (err) {
      setFeedback({ tone: "error", text: mapAuthError(err) });
    } finally {
      setLoading(false);
    }
  }

  async function uploadLocal() {
    if (!confirm(`Enviar ${localCount} ficha(s) deste navegador para a nuvem?`)) return;
    setMigrating(true);
    setFeedback(null);
    try {
      const { uploaded, failed } = await migrateLocalCharactersToCloud();
      refreshLocalCount();
      if (failed > 0) {
        setFeedback({
          tone: "error",
          text: `Enviadas ${uploaded} ficha(s). ${failed} falharam e permaneceram neste navegador.`,
        });
      } else if (uploaded > 0) {
        setFeedback({
          tone: "success",
          text: `${uploaded} ficha(s) enviada(s) para a nuvem. O armazenamento local foi limpo.`,
        });
      } else {
        setFeedback({ tone: "info", text: "Nenhuma ficha local para enviar." });
      }
    } catch (err) {
      setFeedback({
        tone: "error",
        text: err instanceof Error ? mapAuthError(err) : "Erro ao enviar fichas.",
      });
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
            Rode as migrations em <code>supabase/migrations/</code> no SQL Editor do projeto.
            Enquanto isso, as fichas usam o navegador.
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
            <p className="mt-2 text-xs text-ink-muted">
              Só você acessa suas fichas na nuvem (isolamento por conta).
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
            {feedback ? <FeedbackBanner feedback={feedback} /> : null}
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
        <Panel title={mode === "login" ? "Entrar" : "Criar conta"}>
          <form className="space-y-3" onSubmit={(e) => void submit(e)}>
            <Input
              label="E-mail"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFeedback(null);
              }}
            />
            <Input
              label="Senha"
              type="password"
              required
              minLength={6}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setFeedback(null);
              }}
            />
            {mode === "register" ? (
              <p className="text-xs text-ink-muted">
                Mínimo 6 caracteres. Se a confirmação por e-mail estiver ativa no Supabase, você
                precisará abrir o link antes do primeiro login.
              </p>
            ) : null}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Aguarde…" : mode === "login" ? "Entrar" : "Criar conta"}
            </Button>
          </form>
          <button
            type="button"
            className="mt-4 min-h-10 text-sm !text-crimson underline decoration-crimson/40 underline-offset-2 hover:decoration-crimson"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setFeedback(null);
            }}
          >
            {mode === "login" ? "Criar uma conta" : "Já tenho conta — Entrar"}
          </button>
          {feedback ? <FeedbackBanner feedback={feedback} /> : null}
        </Panel>
      )}
    </div>
  );
}
