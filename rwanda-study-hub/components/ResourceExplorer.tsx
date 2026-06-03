"use client";

import { useEffect, useMemo, useState } from "react";
import type { Subject, Resource } from "@/lib/supabase/types";
import { FilterBar } from "@/components/FilterBar";
import { ResourceCard } from "@/components/ResourceCard";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

interface ResourceExplorerProps {
  subjects: Subject[];
}

export default function ResourceExplorer({ subjects }: ResourceExplorerProps) {
  const supabase = createBrowserSupabaseClient();
  const [filters, setFilters] = useState({ subject: "", level: "", campus: "", type: "" });
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const queryKey = JSON.stringify(filters);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    async function loadResources() {
      let query = supabase.from("resources").select("*");
      if (filters.subject) query = query.eq("subject", filters.subject);
      if (filters.level) query = query.eq("level", filters.level);
      if (filters.campus) query = query.eq("campus", filters.campus);
      if (filters.type) query = query.eq("type", filters.type);
      const { data, error } = await query.order("created_at", { ascending: false }).limit(50);
      if (controller.signal.aborted) return;
      if (error) {
        setError(error.message);
      } else {
        setResources(data as Resource[]);
      }
      setLoading(false);
    }

    loadResources();
    return () => controller.abort();
  }, [queryKey, filters]);

  const summary = useMemo(
    () => {
      if (loading) return "Loading resources...";
      if (error) return error;
      if (!resources.length) return "No resources match the selected filters.";
      return `${resources.length} resources found.`;
    },
    [error, loading, resources.length]
  );

  return (
    <div className="space-y-8">
      <FilterBar subjects={subjects} filters={filters} onChange={setFilters} />
      <div className="text-sm text-slate-600">{summary}</div>
      <div className="grid gap-6 xl:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
      {loading && <div className="text-sm text-slate-500">Loading…</div>}
    </div>
  );
}
