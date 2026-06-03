import type { Resource } from "@/lib/supabase/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileLines,
  faFilePdf,
  faGlobe,
  faGraduationCap,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";

export function ResourceCard({ resource }: { resource: Resource }) {
  const badge = resource.type === "PastPaper" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-900";
  const icon = resource.type === "PastPaper" ? faFilePdf : faFileLines;

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{resource.subject}</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{resource.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{resource.topic}</p>
        </div>
        <div className={`rounded-full px-3 py-1 text-xs font-semibold ${badge}`}>
          {resource.type}
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="inline-flex items-center gap-2 text-sm text-slate-600">
          <FontAwesomeIcon icon={faLayerGroup} />
          {resource.level}
        </div>
        <div className="inline-flex items-center gap-2 text-sm text-slate-600">
          <FontAwesomeIcon icon={faGlobe} />
          {resource.campus}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4 text-sm text-slate-600">
        <span className="inline-flex items-center gap-2">
          <FontAwesomeIcon icon={faGraduationCap} />
          {new Date(resource.created_at).toLocaleDateString()}
        </span>
        <a
          href={resource.content}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View document
        </a>
      </div>
    </article>
  );
}
