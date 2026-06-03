"use client";

import { useState } from "react";
import type { MCQ } from "@/lib/supabase/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export function MCQCard({ mcq }: { mcq: MCQ }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const correct = selected === mcq.correct_answer;

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{mcq.subject}</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">{mcq.question}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          {mcq.level}
        </span>
      </div>
      <div className="mt-6 grid gap-3">
        {mcq.options.map((option) => {
          const active = selected === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`flex items-center justify-between gap-4 rounded-3xl border px-4 py-4 text-left transition ${
                active ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 text-slate-900"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <FontAwesomeIcon icon={active ? faCheckCircle : faCircle} />
                {option}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setShowAnswer(!showAnswer)}
          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          {showAnswer ? "Hide answer" : "Reveal answer"}
        </button>
        {selected && (
          <span className={`text-sm font-semibold ${correct ? "text-emerald-600" : "text-rose-600"}`}>
            {correct ? "Correct" : "Incorrect"}
          </span>
        )}
      </div>
      {showAnswer && (
        <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold">Answer</p>
          <p>{mcq.correct_answer}</p>
          <p className="mt-2 text-slate-600">{mcq.explanation}</p>
        </div>
      )}
    </article>
  );
}
