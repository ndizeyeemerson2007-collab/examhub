import { NavBar } from "@/components/NavBar";
import { requireAdmin } from "@/lib/auth";
import { getSubjects } from "@/lib/services/subject-service";
import { UploadForm } from "@/components/UploadForm";

export default async function UploadPage() {
  await requireAdmin();
  const subjects = await getSubjects();

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <UploadForm subjects={subjects} />
      </section>
    </main>
  );
}
