import { createServerSupabase } from "@/lib/supabase/server";
import type { Resource } from "@/lib/supabase/types";

export async function getRecentResources() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("resources")
    .select("id,title,subject,topic,level,campus,type,content,created_at")
    .order("created_at", { ascending: false })
    .limit(8);
  if (error) {
    throw new Error(error.message);
  }
  return data as Resource[];
}

export async function getPastPapers() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("resources")
    .select("id,title,subject,topic,level,campus,type,content,created_at")
    .eq("type", "PastPaper")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data as Resource[];
}
