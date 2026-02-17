"use client";

import Link from "next/link";
import ApiKeyCard from "../components/ApiKeyCard";
import RequireAuth from "../components/RequireAuth";

export default function ApiKeyPage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-16 md:px-12">
          <header className="flex flex-col gap-3">
            <Link
              className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500"
              href="/home"
            >
              Back to home
            </Link>
          </header>
          <ApiKeyCard />
        </main>
      </div>
    </RequireAuth>
  );
}
