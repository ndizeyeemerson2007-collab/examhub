import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faFolderOpen,
  faFileLines,
  faQuestionCircle,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.32em] text-slate-500">MaximizeHub</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
                Rwanda educational resources, curated for modern learners.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Browse notes, exercises, past papers and MCQs by subject, level and campus. Admins can upload and manage resources with Supabase storage and role-based access.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/resources" className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                  Browse resources
                </Link>
                <Link href="/login" className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400">
                  Sign in
                </Link>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Subjects", label: "Explore collections", icon: faFolderOpen, href: "/subjects" },
                { title: "Resources", label: "Filter by category", icon: faFileLines, href: "/resources" },
                { title: "MCQs", label: "Practice questions", icon: faQuestionCircle, href: "/mcqs" },
                { title: "Past papers", label: "Download PDFs", icon: faChartLine, href: "/past-papers" },
              ].map((card) => (
                <Link key={card.title} href={card.href} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-300 hover:bg-white">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-white">
                    <FontAwesomeIcon icon={card.icon} />
                  </div>
                  <h2 className="mt-6 text-lg font-semibold text-slate-900">{card.title}</h2>
                  <p className="mt-2 text-sm text-slate-600">{card.label}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
