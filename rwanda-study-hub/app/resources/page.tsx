import type { Subject } from "@/lib/supabase/types";
import { getSubjects } from "@/lib/services/subject-service";
import { NavBar } from "@/components/NavBar";
import dynamic from "next/dynamic";

const ResourceExplorer = dynamic(() => import("@/components/ResourceExplorer"), { ssr: false });

export default async function ResourcesPage() {
  const subjects = await getSubjects();

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">Resources</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Filter notes, exercises and papers</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Search resources by subject, level, campus and type. Results are loaded directly from Supabase.
          </p>
        </div>
        <ResourceExplorer subjects={subjects} />
      </section>
    </main>
  );
}
