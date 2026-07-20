"use client";

import { useState } from "react";
import { hasSupabaseConfig, createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Panel } from "@/components/ui/Panel";

export function AuthSection() {
  const configured = hasSupabaseConfig();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
        setMessage("Conta criada. Verifique o e-mail se a confirmação estiver ativa.");
      }
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Erro de autenticação");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="font-display text-3xl text-crimson">Conta</h1>
      {!configured ? (
        <Panel title="Modo local">
          <p className="text-sm text-ink-muted">
            Configure <code className="text-crimson">NEXT_PUBLIC_SUPABASE_URL</code> e{" "}
            <code className="text-crimson">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> no arquivo{" "}
            <code>.env.local</code> (veja <code>.env.example</code>) e rode a migration em{" "}
            <code>supabase/migrations/001_init.sql</code>. Enquanto isso, as fichas usam
            armazenamento local do navegador.
          </p>
        </Panel>
      ) : (
        <Panel title={mode === "login" ? "Entrar" : "Registrar"}>
          <form className="space-y-3" onSubmit={submit}>
            <Input
              label="E-mail"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Senha"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Aguarde…" : mode === "login" ? "Entrar" : "Criar conta"}
            </Button>
          </form>
          <button
            type="button"
            className="mt-3 text-sm text-crimson underline"
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
