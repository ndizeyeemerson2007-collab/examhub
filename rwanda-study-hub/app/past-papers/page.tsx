import { getPastPapers } from "@/lib/services/resource-service";
import { NavBar } from "@/components/NavBar";
import { ResourceCard } from "@/components/ResourceCard";

export default async function PastPapersPage() {
  const papers = await getPastPapers();

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">Past Papers</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Download PDF past papers</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Access past exams and practice with authentic material from Supabase storage.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {papers.map((paper) => (
            <ResourceCard key={paper.id} resource={paper} />
          ))}
        </div>
      </section>
    </main>
  );
}
