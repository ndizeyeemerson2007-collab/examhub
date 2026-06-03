import { NextResponse } from "next/server";
import { createServerSupabase, supabaseAdmin } from "@/lib/supabase/server";

export async function POST() {
  const supabase = createServerSupabase();
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = session.user;
  const { data, error } = await supabaseAdmin
    .from("users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!data) {
    const insert = await supabaseAdmin.from("users").insert({
      id: user.id,
      email: user.email || "",
      role: "student",
    });
    if (insert.error) {
      return NextResponse.json({ error: insert.error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ status: "ok" });
}
