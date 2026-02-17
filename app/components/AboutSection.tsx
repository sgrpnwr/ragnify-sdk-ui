export default function AboutSection() {
  return (
    <section id="about" className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-300">
        Ragnify SDK helps you plug an AI-powered knowledge base into your frontend
        application. Use it to deliver smarter, context-aware answers to your users.
      </p>
      <div className="grid gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-black dark:text-zinc-300">
        <div className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-50">
              Connect knowledge to your UI
            </p>
            <p>Bring searchable, AI-ready content into any screen.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 h-2 w-2 rounded-full bg-indigo-500" />
          <div>
            <p className="font-medium text-zinc-900 dark:text-zinc-50">Ship faster</p>
            <p>Use the SDK to scaffold experiences and iterate quickly.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
