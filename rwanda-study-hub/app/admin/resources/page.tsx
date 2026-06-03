import { NavBar } from "@/components/NavBar";
import { requireAdmin } from "@/lib/auth";
import { createServerSupabase } from "@/lib/supabase/server";
import { AdminResourcesManager } from "@/components/AdminResourcesManager";

export default async function AdminResourcesPage() {
  await requireAdmin();
  const supabase = createServerSupabase();
  const { data: resources, error } = await supabase
    .from("resources")
    .select("id,title,subject,topic,level,campus,type,content,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <NavBar />
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">Admin resources</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900">Manage uploaded content</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Review resource metadata and delete outdated documents. Use the upload page for new materials.
          </p>
        </div>
        <AdminResourcesManager initialResources={resources ?? []} />
      </section>
    </main>
  );
}
