"use client";

import AuthForms from "./components/AuthForms";
import WelcomeHero from "./components/WelcomeHero";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16 md:px-12">
        <section className="flex h-full flex-1 flex-col gap-10 rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-8">
            <WelcomeHero />
            <div className="flex w-full justify-center">
              <div className="w-full max-w-2xl">
                <AuthForms />
              </div>
            </div>
          </div>
          <section className="mt-auto grid gap-4 sm:grid-cols-3">
            {[
              { title: "Fast setup", copy: "Go from install to chat in minutes." },
              { title: "Secure by default", copy: "Token-based auth and scoped keys." },
              { title: "Flexible UI", copy: "Theme screens to match your product." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-zinc-200 bg-white px-5 py-4 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
              >
                <p className="text-base font-semibold text-zinc-900 dark:text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {item.copy}
                </p>
              </div>
            ))}
          </section>
        </section>
      </main>
    </div>
  );
}
