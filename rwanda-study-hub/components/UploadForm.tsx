"use client";

import { useMemo, useState } from "react";
import type { Subject, CampusType, LevelType, ResourceType } from "@/lib/supabase/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload, faFilePdf } from "@fortawesome/free-solid-svg-icons";

const levels: LevelType[] = ["Primary", "O-Level", "A-Level", "University"];
const campuses: CampusType[] = ["General", "UR", "ULK", "RP"];
const types: ResourceType[] = ["Notes", "Exercises", "PastPaper", "MCQ"];

export function UploadForm({ subjects }: { subjects: Subject[] }) {
  const supabase = useSupabaseClient();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState<LevelType>("Primary");
  const [campus, setCampus] = useState<CampusType>("General");
  const [type, setType] = useState<ResourceType>("Notes");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => title && topic && subject && file && type && level && campus,
    [title, topic, subject, file, type, level, campus]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("topic", topic);
    formData.append("subject", subject);
    formData.append("level", level);
    formData.append("campus", campus);
    formData.append("type", type);
    formData.append("file", file as Blob);

    setStatus("Uploading document...");

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setStatus("Upload successful.");
      setTitle("");
      setTopic("");
      setSubject("");
      setFile(null);
    } else {
      const error = await response.text();
      setStatus(`Upload failed: ${error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-slate-900">Upload PDF resource</h2>
        <p className="text-sm leading-6 text-slate-600">
          Add new notes, exams, exercises and past papers to Supabase storage and save metadata to the database.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          <span>Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          />
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span>Topic</span>
          <input
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          <span>Subject</span>
          <select
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          >
            <option value="">Select subject</option>
            {subjects.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span>Type</span>
          <select
            value={type}
            onChange={(event) => setType(event.target.value as ResourceType)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          >
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          <span>Level</span>
          <select
            value={level}
            onChange={(event) => setLevel(event.target.value as LevelType)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          >
            {levels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span>Campus</span>
          <select
            value={campus}
            onChange={(event) => setCampus(event.target.value as CampusType)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          >
            {campuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="space-y-2 text-sm text-slate-700">
        <span>File upload</span>
        <label className="flex min-h-[120px] items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-4 text-sm text-slate-500 transition hover:border-slate-400">
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
          <div className="flex flex-col items-center gap-2">
            <FontAwesomeIcon icon={faFilePdf} className="text-slate-400" />
            <span>{file?.name ?? "Choose a PDF file"}</span>
          </div>
        </label>
      </label>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">Only PDF uploads are supported. Ensure metadata is accurate.</p>
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <FontAwesomeIcon icon={faUpload} />
          Upload resource
        </button>
      </div>

      {status && <p className="text-sm text-slate-600">{status}</p>}
    </form>
  );
}
