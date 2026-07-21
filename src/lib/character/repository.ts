import type { CharacterState } from "@/lib/character/types";
import { migrateCharacterState } from "@/lib/character/types";
import { characterLevel } from "@/lib/rules";
import { hasSupabaseConfig, createClient } from "@/lib/supabase/client";

export interface CharacterRecord {
  id: string;
  userId: string | null;
  name: string;
  data: CharacterState;
  level: number;
  updatedAt: string;
  createdAt: string;
}

const LOCAL_KEY = "dnd5e-ptbr-characters";

function readLocal(): CharacterRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CharacterRecord[];
    return parsed.map((r) => ({
      ...r,
      data: migrateCharacterState(r.data),
    }));
  } catch {
    return [];
  }
}

function writeLocal(records: CharacterRecord[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(records));
}

function newId(): string {
  return crypto.randomUUID();
}

export async function listCharacters(): Promise<CharacterRecord[]> {
  if (!hasSupabaseConfig()) {
    return readLocal().sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    );
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    userId: row.user_id,
    name: row.name,
    data: migrateCharacterState(row.data),
    level: row.level,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
  }));
}

export async function getCharacter(id: string): Promise<CharacterRecord | null> {
  if (!hasSupabaseConfig()) {
    return readLocal().find((c) => c.id === id) ?? null;
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("characters")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    data: migrateCharacterState(data.data),
    level: data.level,
    updatedAt: data.updated_at,
    createdAt: data.created_at,
  };
}

export async function saveCharacter(
  state: CharacterState,
  id?: string,
): Promise<CharacterRecord> {
  const level = characterLevel(state);
  const now = new Date().toISOString();

  if (!hasSupabaseConfig()) {
    const records = readLocal();
    if (id) {
      const idx = records.findIndex((r) => r.id === id);
      if (idx >= 0) {
        records[idx] = {
          ...records[idx],
          name: state.name || "Sem nome",
          data: state,
          level,
          updatedAt: now,
        };
        writeLocal(records);
        return records[idx];
      }
    }
    const record: CharacterRecord = {
      id: newId(),
      userId: null,
      name: state.name || "Sem nome",
      data: state,
      level,
      createdAt: now,
      updatedAt: now,
    };
    records.push(record);
    writeLocal(records);
    return record;
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Faça login para salvar personagens.");

  if (id) {
    const { data, error } = await supabase
      .from("characters")
      .update({
        name: state.name || "Sem nome",
        data: state,
        level,
      })
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    return {
      id: data.id,
      userId: data.user_id,
      name: data.name,
      data: data.data as CharacterState,
      level: data.level,
      updatedAt: data.updated_at,
      createdAt: data.created_at,
    };
  }

  const { data, error } = await supabase
    .from("characters")
    .insert({
      user_id: user.id,
      name: state.name || "Sem nome",
      data: state,
      level,
    })
    .select("*")
    .single();
  if (error) throw error;
  return {
    id: data.id,
    userId: data.user_id,
    name: data.name,
    data: data.data as CharacterState,
    level: data.level,
    updatedAt: data.updated_at,
    createdAt: data.created_at,
  };
}

export async function deleteCharacter(id: string): Promise<void> {
  if (!hasSupabaseConfig()) {
    writeLocal(readLocal().filter((r) => r.id !== id));
    return;
  }
  const supabase = createClient();
  const { error } = await supabase.from("characters").delete().eq("id", id);
  if (error) throw error;
}
