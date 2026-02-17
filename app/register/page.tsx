"use client";

import Link from "next/link";
import AuthForms from "../components/AuthForms";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-16">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Ragnify SDK
          </p>
          <h1 className="text-3xl font-semibold">Register</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Create your account and start generating API keys.
          </p>
        </div>
        <AuthForms defaultTab="register" showTabs={false} />
        <p className="text-sm text-zinc-500">
          Already have an account?{" "}
          <Link className="text-indigo-600 hover:text-indigo-500" href="/login">
            Login here
          </Link>
          .
        </p>
      </main>
    </div>
  );
}
