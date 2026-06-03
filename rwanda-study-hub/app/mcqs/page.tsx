import type { Subject } from "@/lib/supabase/types";
import { getSubjects } from "@/lib/services/subject-service";
import { NavBar } from "@/components/NavBar";
import dynamic from "next/dynamic";

const MCQExplorer = dynamic(() => import("@/components/MCQExplorer"), { ssr: false });

export default async function MCQsPage() {
  const subjects = await getSubjects();

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">MCQs</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Practice multiple choice questions</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Review questions by topic and check your answers with instant feedback.
          </p>
        </div>
        <MCQExplorer subjects={subjects} />
      </section>
    </main>
  );
}
