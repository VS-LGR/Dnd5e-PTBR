import { redirect } from "next/navigation";

/** Conta/auth temporariamente desativada na UI. */
export default function AuthPage() {
  redirect("/");
}
