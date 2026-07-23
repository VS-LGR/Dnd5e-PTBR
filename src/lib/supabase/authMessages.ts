/** Mensagens de Auth em PT-BR (sucesso e erros comuns do Supabase). */

export type AuthFeedbackTone = "success" | "error" | "info";

export interface AuthFeedback {
  tone: AuthFeedbackTone;
  text: string;
}

export function mapAuthError(err: unknown): string {
  const raw =
    err && typeof err === "object" && "message" in err
      ? String((err as { message: unknown }).message)
      : err instanceof Error
        ? err.message
        : "Não foi possível concluir a autenticação.";

  const msg = raw.trim();
  const lower = msg.toLowerCase();
  const status =
    err && typeof err === "object" && "status" in err
      ? Number((err as { status: unknown }).status)
      : undefined;

  if (status === 429 || lower.includes("rate limit") || lower.includes("too many requests")) {
    return "Muitas tentativas em pouco tempo. Aguarde um minuto e tente de novo.";
  }
  if (
    lower.includes("invalid login credentials") ||
    lower.includes("invalid credentials") ||
    lower.includes("invalid email or password")
  ) {
    return "E-mail ou senha incorretos.";
  }
  if (lower.includes("email not confirmed")) {
    return "Confirme seu e-mail antes de entrar. Veja a caixa de entrada e o spam.";
  }
  if (
    lower.includes("user already registered") ||
    lower.includes("already been registered") ||
    lower.includes("email address has already been registered")
  ) {
    return "Este e-mail já tem conta. Use Entrar ou outro e-mail.";
  }
  if (lower.includes("password should be at least") || lower.includes("password is too short")) {
    return "A senha precisa ter pelo menos 6 caracteres.";
  }
  if (lower.includes("weak password") || lower.includes("password is known to be weak")) {
    return "Essa senha é muito fraca ou comum. Escolha outra mais forte.";
  }
  if (lower.includes("unable to validate email") || lower.includes("invalid email")) {
    return "E-mail inválido. Confira o endereço digitado.";
  }
  if (lower.includes("signup is disabled")) {
    return "Cadastro de novas contas está desativado no momento.";
  }
  if (
    lower.includes("failed to fetch") ||
    lower.includes("networkerror") ||
    lower.includes("network request failed")
  ) {
    return "Falha de conexão. Verifique a internet e tente novamente.";
  }
  if (lower.includes("user not found")) {
    return "Não encontramos uma conta com este e-mail.";
  }

  return msg.length > 160 ? "Erro de autenticação. Tente novamente em instantes." : msg;
}

export function signupFeedback(args: {
  email: string;
  hasSession: boolean;
  identitiesEmpty: boolean;
}): AuthFeedback {
  if (args.identitiesEmpty) {
    return {
      tone: "info",
      text: "Este e-mail já possui conta. Use Entrar com a senha cadastrada.",
    };
  }
  if (args.hasSession) {
    return {
      tone: "success",
      text: `Conta criada e sessão iniciada (${args.email}). Suas fichas já podem sincronizar na nuvem.`,
    };
  }
  return {
    tone: "success",
    text: `Conta criada para ${args.email}. Confirme o link enviado por e-mail (e o spam) antes de entrar.`,
  };
}
