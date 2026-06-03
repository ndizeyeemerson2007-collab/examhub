import { createServerSupabase } from "@/lib/supabase/server";
import type { Subject } from "@/lib/supabase/types";

export async function getSubjects() {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from("subjects").select("id,name").order("name");
  if (error) {
    throw new Error(error.message);
  }
  return data as Subject[];
}
