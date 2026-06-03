import type { Subject } from "@/lib/supabase/types";
import { getSubjects } from "@/lib/services/subject-service";
import { NavBar } from "@/components/NavBar";
import Link from "next/link";

export default async function SubjectsPage() {
  const subjects = await getSubjects();

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">Subjects</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Browse curriculum topics</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Explore all subjects with curated resources for Primary, O-Level, A-Level and University learners.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {subjects.map((subject) => (
            <Link
              key={subject.id}
              href="/resources"
              className="group rounded-3xl border border-slate-200 bg-white p-8 transition hover:border-slate-300 hover:shadow-sm"
            >
              <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Subject</p>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900 group-hover:text-slate-700">{subject.name}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-600">View related notes, papers, exercises and MCQs.</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
