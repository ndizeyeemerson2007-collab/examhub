import { redirect } from "next/navigation";
import { createServerSupabase } from "./supabase/server";

export async function requireAdmin() {
  const supabase = createServerSupabase();
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (error || profile?.role !== "admin") {
    redirect("/");
  }

  return session.user.id;
}
