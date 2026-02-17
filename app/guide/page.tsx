"use client";

import Link from "next/link";
import RequireAuth from "../components/RequireAuth";
import SdkInfoSection from "../components/SdkInfoSection";

export default function GuidePage() {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-16 md:px-12">
          <header className="flex flex-col gap-3">
            <Link className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500" href="/home">
              Back to home
            </Link>
            <h1 className="text-3xl font-semibold">Installation guide</h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Follow the steps below to wire the Ragnify SDK into your Expo app.
            </p>
          </header>
          <SdkInfoSection />
        </main>
      </div>
    </RequireAuth>
  );
}
