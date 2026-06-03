"use client";

import { useMemo, useState } from "react";
import type { Resource } from "@/lib/supabase/types";
import { ResourceCard } from "@/components/ResourceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export function AdminResourcesManager({ initialResources }: { initialResources: Resource[] }) {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [status, setStatus] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setStatus("Removing resource...");
    const response = await fetch("/api/admin/resources", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      setStatus(await response.text());
      return;
    }
    setResources(resources.filter((item) => item.id !== id));
    setStatus("Resource deleted.");
  };

  const summary = useMemo(() => `${resources.length} items loaded.`, [resources.length]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">{summary}</p>
        {status && <p className="text-sm text-slate-600">{status}</p>}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {resources.map((resource) => (
          <div key={resource.id} className="relative">
            <ResourceCard resource={resource} />
            <button
              type="button"
              onClick={() => handleDelete(resource.id)}
              className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
