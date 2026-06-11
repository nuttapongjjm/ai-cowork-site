import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'

const reportsDirectory = path.join(process.cwd(), 'content', 'daily-report')

export default function DailyReportsPage() {
  const files = fs.existsSync(reportsDirectory)
    ? fs.readdirSync(reportsDirectory)
    : []

  const reports = files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(reportsDirectory, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContent)

      return {
        slug: file.replace('.md', ''),
        title: data.title || file.replace('.md', ''),
        date: data.date || file.replace('.md', ''),
      }
    })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <section className="mx-auto max-w-4xl">
        <Link href="/" className="text-sm text-gray-400 hover:text-white">
          ← Back to Dashboard
        </Link>

        <h1 className="mt-6 text-4xl font-bold">Daily Reports</h1>

        <p className="mt-3 text-gray-400">
          รายงานที่ AI Cowork สร้างให้ทุกวัน
        </p>

        <div className="mt-8 space-y-4">
          {reports.map((report) => (
            <Link
              key={report.slug}
              href={`/daily-reports/${report.slug}`}
              className="block rounded-xl border border-gray-800 p-5 hover:bg-gray-900"
            >
              <p className="text-sm text-gray-500">{report.date}</p>
              <h2 className="mt-1 text-xl font-semibold">{report.title}</h2>
            </Link>
          ))}

          {reports.length === 0 && (
            <p className="text-gray-500">ยังไม่มี Daily Report</p>
          )}
        </div>
      </section>
    </main>
  )
}