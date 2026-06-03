import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = createServerSupabase();
  const { data: sessionData } = await supabase.auth.getSession();
  const session = sessionData?.session;

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (profileError || profile?.role !== "admin") {
    return NextResponse.json({ error: "Admin access required" }, { status: 403 });
  }

  const payload = await req.json();
  const { question, options, correct_answer, explanation, subject, topic, level, campus } = payload;

  if (!question || !Array.isArray(options) || !correct_answer || !explanation || !subject || !topic || !level || !campus) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { error: insertError } = await supabaseAdmin.from("mcqs").insert([
    {
      question,
      options,
      correct_answer,
      explanation,
      subject,
      topic,
      level,
      campus,
    },
  ]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ status: "success" });
}
