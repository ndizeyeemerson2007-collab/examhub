import { createServerSupabase } from "@/lib/supabase/server";
import type { MCQ } from "@/lib/supabase/types";

export async function getMCQs() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase
    .from("mcqs")
    .select("id,question,options,correct_answer,explanation,subject,topic,level,campus,created_at")
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  return data as MCQ[];
}
