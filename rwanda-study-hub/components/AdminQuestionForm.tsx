"use client";

import { useMemo, useState } from "react";
import type { Subject, LevelType, CampusType } from "@/lib/supabase/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface AdminQuestionFormProps {
  subjects: Subject[];
}

const levels: LevelType[] = ["Primary", "O-Level", "A-Level", "University"];
const campuses: CampusType[] = ["General", "UR", "ULK", "RP"];

export default function AdminQuestionForm({ subjects }: AdminQuestionFormProps) {
  const [question, setQuestion] = useState("");
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState<LevelType>("Primary");
  const [campus, setCampus] = useState<CampusType>("General");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => question && subject && topic && options.every((option) => option) && correctAnswer && explanation,
    [question, subject, topic, options, correctAnswer, explanation]
  );

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit) return;

    const response = await fetch("/api/admin/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        topic,
        subject,
        level,
        campus,
        options,
        correct_answer: correctAnswer,
        explanation,
      }),
    });

    if (response.ok) {
      setStatus("MCQ created successfully.");
      setQuestion("");
      setTopic("");
      setSubject("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setExplanation("");
    } else {
      setStatus(await response.text());
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          <span>Question</span>
          <textarea
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            rows={4}
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
      <div className="grid gap-4 md:grid-cols-3">
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
      <div className="space-y-4">
        {options.map((option, index) => (
          <label key={index} className="space-y-2 text-sm text-slate-700">
            <span>Option {index + 1}</span>
            <input
              value={option}
              onChange={(event) => {
                const next = [...options];
                next[index] = event.target.value;
                setOptions(next);
              }}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
            />
          </label>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-700">
          <span>Correct answer</span>
          <select
            value={correctAnswer}
            onChange={(event) => setCorrectAnswer(event.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          >
            <option value="">Select correct answer</option>
            {options.map((option, index) => (
              <option key={`${option}-${index}`} value={option}>
                {option || `Option ${index + 1}`}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span>Explanation</span>
          <textarea
            value={explanation}
            onChange={(event) => setExplanation(event.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-slate-400"
          />
        </label>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">Complete all fields and send the MCQ to the database.</p>
        <button
          type="submit"
          disabled={!canSubmit}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
          Save MCQ
        </button>
      </div>
      {status && <p className="text-sm text-slate-600">{status}</p>}
    </form>
  );
}
