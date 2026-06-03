"use client";

import { useEffect, useMemo, useState } from "react";
import type { Subject, MCQ } from "@/lib/supabase/types";
import { FilterBar } from "@/components/FilterBar";
import { MCQCard } from "@/components/MCQCard";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

interface MCQExplorerProps {
  subjects: Subject[];
}

export default function MCQExplorer({ subjects }: MCQExplorerProps) {
  const supabase = createBrowserSupabaseClient();
  const [filters, setFilters] = useState({ subject: "", level: "", campus: "", type: "MCQ" });
  const [questions, setQuestions] = useState<MCQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const queryKey = JSON.stringify(filters);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    async function loadQuestions() {
      let query = supabase.from("mcqs").select("*");
      if (filters.subject) query = query.eq("subject", filters.subject);
      if (filters.level) query = query.eq("level", filters.level);
      if (filters.campus) query = query.eq("campus", filters.campus);
      const { data, error } = await query.order("created_at", { ascending: false }).limit(50);
      if (controller.signal.aborted) return;
      if (error) {
        setError(error.message);
      } else {
        setQuestions(data as MCQ[]);
      }
      setLoading(false);
    }

    loadQuestions();
    return () => controller.abort();
  }, [queryKey]);

  const summary = useMemo(
    () => {
      if (loading) return "Loading questions...";
      if (error) return error;
      if (!questions.length) return "No MCQs found for the selected filters.";
      return `${questions.length} questions available.`;
    },
    [error, loading, questions.length]
  );

  return (
    <div className="space-y-8">
      <FilterBar subjects={subjects} filters={filters} onChange={setFilters} />
      <div className="text-sm text-slate-600">{summary}</div>
      <div className="grid gap-6">
        {questions.map((mcq) => (
          <MCQCard key={mcq.id} mcq={mcq} />
        ))}
      </div>
      {loading && <div className="text-sm text-slate-500">Loading…</div>}
    </div>
  );
}
