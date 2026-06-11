export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <section className="mx-auto max-w-4xl">
        <p className="text-sm text-gray-400">AI Cowork Site</p>

        <h1 className="mt-4 text-4xl font-bold">
          AI CTO Daily Cowork Dashboard
        </h1>

        <p className="mt-4 text-gray-300">
          This website is used to collect daily tech reports, portfolio case studies,
          business ideas, automation ideas, and English learning notes.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <a className="rounded-xl border border-gray-700 p-5 hover:bg-gray-900" href="/ai-cowork-site/daily-reports">
            <h2 className="text-xl font-semibold">Daily Reports</h2>
            <p className="mt-2 text-gray-400">Tech / AI monitoring reports</p>
          </a>

          <a className="rounded-xl border border-gray-700 p-5 hover:bg-gray-900" href="/ai-cowork-site/case-studies">
            <h2 className="text-xl font-semibold">Case Studies</h2>
            <p className="mt-2 text-gray-400">Portfolio and system analysis cases</p>
          </a>

          <a className="rounded-xl border border-gray-700 p-5 hover:bg-gray-900" href="/ai-cowork-site/business-ideas">
            <h2 className="text-xl font-semibold">Business Ideas</h2>
            <p className="mt-2 text-gray-400">SaaS and freelance opportunities</p>
          </a>

          <a className="rounded-xl border border-gray-700 p-5 hover:bg-gray-900" href="/ai-cowork-site/english-learning">
            <h2 className="text-xl font-semibold">English Learning</h2>
            <p className="mt-2 text-gray-400">Tech and business English notes</p>
          </a>
        </div>
      </section>
    </main>
  )
}