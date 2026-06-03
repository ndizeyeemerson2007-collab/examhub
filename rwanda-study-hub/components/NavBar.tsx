"use client";

import Link from "next/link";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faCircleUser,
  faFileLines,
  faFolderOpen,
  faLock,
  faQuestionCircle,
  faSchool,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  { href: "/", label: "Home", icon: faSchool },
  { href: "/subjects", label: "Subjects", icon: faFolderOpen },
  { href: "/resources", label: "Resources", icon: faFileLines },
  { href: "/mcqs", label: "MCQs", icon: faQuestionCircle },
  { href: "/past-papers", label: "Past Papers", icon: faSquarePollVertical },
];

const adminItems = [
  { href: "/admin", label: "Dashboard", icon: faChartLine },
  { href: "/admin/upload", label: "Upload", icon: faLock },
  { href: "/admin/resources", label: "Resources", icon: faFileLines },
  { href: "/admin/questions", label: "MCQs", icon: faQuestionCircle },
];

export function NavBar() {
  const session = useSession();
  const supabase = useSupabaseClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-slate-900 text-white grid place-items-center text-sm font-semibold">
            MX
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-600">MaximizeHub</p>
            <p className="text-xs text-slate-500">Educational SaaS for Rwanda</p>
          </div>
        </div>
        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              <FontAwesomeIcon icon={item.icon} />
              {item.label}
            </Link>
          ))}
          {session?.user ? (
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <FontAwesomeIcon icon={faCircleUser} />
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <FontAwesomeIcon icon={faLock} />
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
