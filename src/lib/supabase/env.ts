/** Shared env helpers for browser + server Supabase clients. */

export function getSupabaseUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  return url || undefined;
}

/** Prefer publishable key (new dashboard); fall back to classic anon JWT. */
export function getSupabaseAnonKey(): string | undefined {
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim() ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  return key || undefined;
}

export function isSupabaseEnvConfigured(): boolean {
  const url = getSupabaseUrl() ?? "";
  const key = getSupabaseAnonKey() ?? "";
  if (!url || !key) return false;
  if (url.includes("your-project")) return false;
  if (key.includes("your-anon") || key.includes("your-publishable")) return false;
  return true;
}
