import { NavBar } from "@/components/NavBar";
import { requireAdmin } from "@/lib/auth";
import { getSubjects } from "@/lib/services/subject-service";
import dynamic from "next/dynamic";

const AdminQuestionForm = dynamic(() => import("@/components/AdminQuestionForm"), { ssr: false });

export default async function AdminQuestionsPage() {
  await requireAdmin();
  const subjects = await getSubjects();

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">MCQ manager</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Create new exam questions</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Add MCQ content with explanations and assign it to subjects, topics and levels.
          </p>
        </div>
        <AdminQuestionForm subjects={subjects} />
      </section>
    </main>
  );
}
