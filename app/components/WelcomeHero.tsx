export default function WelcomeHero() {
  return (
    <div className="flex flex-col gap-6">
      <div className="inline-flex w-fit items-center gap-2 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600 dark:bg-zinc-900 dark:text-zinc-300">
        Ragnify SDK
      </div>
      <h1 className="text-4xl font-semibold leading-tight md:text-5xl">Ragnify SDK</h1>
      <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
        Use our AI powered knowledge base SDK in your frontend app. Log in or register
        to get your API key and start building smarter experiences.
      </p>
      <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-300">
        <div className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              Generate an API key after login
            </p>
            <p>Swap the generation endpoint later with your backend.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              SDK install instructions below
            </p>
            <p>Edit the content anytime to match your docs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
