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

  const formData = await req.formData();
  const file = formData.get("file");
  const title = formData.get("title")?.toString();
  const topic = formData.get("topic")?.toString();
  const subject = formData.get("subject")?.toString();
  const level = formData.get("level")?.toString();
  const campus = formData.get("campus")?.toString();
  const type = formData.get("type")?.toString();

  if (!file || !(file instanceof Blob) || !title || !topic || !subject || !level || !campus || !type) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const fileName = `${Date.now()}-${file instanceof File ? file.name : "resource.pdf"}`;
  const fileData = await file.arrayBuffer();
  const { error: uploadError } = await supabaseAdmin.storage
    .from("resources")
    .upload(fileName, fileData, {
      contentType: file.type || "application/pdf",
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/resources/${encodeURIComponent(fileName)}`;

  const { error: insertError } = await supabaseAdmin.from("resources").insert([
    {
      title,
      topic,
      subject,
      level,
      campus,
      type,
      content: url,
    },
  ]);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ status: "success" });
}
