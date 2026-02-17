"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AboutSection from "../components/AboutSection";
import ApiKeyCard from "../components/ApiKeyCard";
import RequireAuth from "../components/RequireAuth";
import { useAuth } from "../components/AuthContext";
import SdkInfoSection from "../components/SdkInfoSection";

export default function HomeScreen() {
  const [activePanel, setActivePanel] = useState<"guide" | "about" | "api-key">(
    "guide"
  );
  const router = useRouter();
  const { logout } = useAuth();

  const panelCopy = {
    guide: {
      title: "Installation guide",
      description: "Expo integration steps and SDK usage details.",
    },
    "api-key": {
      title: "Generate API key",
      description: "Create and copy your API key for the SDK.",
    },
    about: {
      title: "About us",
      description: "Learn what Ragnify SDK brings to your product.",
    },
  } as const;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <RequireAuth>
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:flex-row md:gap-12">
          <aside className="w-full rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 md:sticky md:top-12 md:h-fit md:w-64">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Ragnify SDK
              </p>
              <h1 className="text-2xl font-semibold">Home</h1>
            </div>
            <nav className="mt-6 flex flex-col gap-2 text-sm">
              {(
                [
                  { id: "guide", label: "Installation guide" },
                  { id: "api-key", label: "Generate API key" },
                  { id: "about", label: "About us" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePanel(item.id)}
                  className={`w-full rounded-xl px-3 py-2 text-left transition ${
                    activePanel === item.id
                      ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-100"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 w-full rounded-xl border border-zinc-200 px-3 py-2 text-left text-sm font-semibold text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
            >
              Logout
            </button>
          </aside>

          <section className="flex-1 space-y-6">
            <header className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                {panelCopy[activePanel].title}
              </p>
              <h2 className="text-3xl font-semibold">
                {panelCopy[activePanel].title}
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">
                {panelCopy[activePanel].description}
              </p>
            </header>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Active projects", value: "12" },
                { label: "SDK version", value: "v1.6" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {item.label}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {activePanel === "guide" && <SdkInfoSection />}
            {activePanel === "about" && (
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                <AboutSection />
              </div>
            )}
            {activePanel === "api-key" && <ApiKeyCard />}
          </section>
        </main>
      </div>
    </RequireAuth>
  );
}
