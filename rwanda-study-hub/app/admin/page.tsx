import { NavBar } from "@/components/NavBar";
import { requireAdmin } from "@/lib/auth";
import { getPastPapers } from "@/lib/services/resource-service";
import { getMCQs } from "@/lib/services/mcq-service";
import { getSubjects } from "@/lib/services/subject-service";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const [subjects, pastPapers, mcqs] = await Promise.all([getSubjects(), getPastPapers(), getMCQs()]);

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">Admin dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Manage MaximizeHub content</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Monitor subjects, upload resources, and create MCQs with role-based admin access.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Subjects</p>
            <p className="mt-6 text-4xl font-semibold text-slate-900">{subjects.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Past papers</p>
            <p className="mt-6 text-4xl font-semibold text-slate-900">{pastPapers.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.32em] text-slate-500">MCQs</p>
            <p className="mt-6 text-4xl font-semibold text-slate-900">{mcqs.length}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
