"use client";

import type { Subject, CampusType, LevelType, ResourceType } from "@/lib/supabase/types";

const levels: LevelType[] = ["Primary", "O-Level", "A-Level", "University"];
const campuses: CampusType[] = ["General", "UR", "ULK", "RP"];
const types: ResourceType[] = ["Notes", "Exercises", "PastPaper", "MCQ"];

interface FilterBarProps {
  subjects: Subject[];
  filters: {
    subject: string;
    level: string;
    campus: string;
    type: string;
  };
  onChange: (next: FilterBarProps["filters"]) => void;
}

export function FilterBar({ subjects, filters, onChange }: FilterBarProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-semibold">Subject</span>
          <select
            value={filters.subject}
            onChange={(event) => onChange({ ...filters, subject: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          >
            <option value="">All subjects</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-semibold">Level</span>
          <select
            value={filters.level}
            onChange={(event) => onChange({ ...filters, level: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          >
            <option value="">Any level</option>
            {levels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-semibold">Campus</span>
          <select
            value={filters.campus}
            onChange={(event) => onChange({ ...filters, campus: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          >
            <option value="">Any campus</option>
            {campuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-semibold">Type</span>
          <select
            value={filters.type}
            onChange={(event) => onChange({ ...filters, type: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-400"
          >
            <option value="">Any type</option>
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
