import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

export default function ApiKeyCard() {
  const [copied, setCopied] = useState(false);
  const {
    isLoggedIn,
    isGenerating,
    apiKey,
    authMessage,
    authError,
    generateApiKey,
  } = useAuth();

  useEffect(() => {
    if (!apiKey) {
      setCopied(false);
    }
  }, [apiKey]);

  const handleCopy = async () => {
    if (!apiKey) {
      return;
    }

    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
  <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-base shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">API key</p>
          {apiKey && (
            <p className="text-base font-semibold text-zinc-900 dark:text-white">
              Active key
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={generateApiKey}
          disabled={!isLoggedIn || isGenerating}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            isLoggedIn
              ? "bg-indigo-600 text-white hover:bg-indigo-500"
              : "cursor-not-allowed bg-zinc-200 text-zinc-400 dark:bg-zinc-800"
          }`}
        >
          {isGenerating ? "Generating..." : "Generate API key"}
        </button>
      </div>
      {apiKey && (
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-200 bg-white text-indigo-700 transition hover:border-indigo-300 dark:border-indigo-600/40 dark:bg-transparent dark:text-indigo-200"
              aria-label="Copy API key"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            <div className="flex-1 rounded-xl border border-dashed border-indigo-300 bg-indigo-50 px-5 py-4 text-base text-indigo-700 dark:border-indigo-600/40 dark:bg-indigo-500/10 dark:text-indigo-200">
              <span className="break-all font-semibold tracking-wide">{apiKey}</span>
            </div>
          </div>
          {copied && (
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-300">
              Copied to clipboard
            </span>
          )}
        </div>
      )}
      {!isLoggedIn && (
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          Login or register to enable API key generation.
        </p>
      )}
      {isLoggedIn && !apiKey && (
        <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
          If you already generated it and forgot, go ahead and mint a fresh one —
          consider it a gentle reminder that sticky notes are not a password manager.
          Your old key will retire gracefully and stop working.
        </p>
      )}
      {authMessage && (
        <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">
          {authMessage}
        </p>
      )}
      {authError && (
        <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">
          {authError}
        </p>
      )}
    </div>
  );
}
