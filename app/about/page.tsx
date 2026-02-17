"use client";

import Link from "next/link";
import AboutSection from "../components/AboutSection";
import RequireAuth from "../components/RequireAuth";

export default function AboutPage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 md:px-12">
          <header className="flex flex-col gap-3">
            <Link className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500" href="/home">
              Back to home
            </Link>
            <h1 className="text-3xl font-semibold">About Ragnify</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Learn more about the SDK and what it enables.
            </p>
          </header>
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <AboutSection />
          </div>
        </main>
      </div>
    </RequireAuth>
  );
}
