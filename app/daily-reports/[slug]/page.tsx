import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
import { marked } from 'marked'

const reportsDirectory = path.join(process.cwd(), 'content', 'daily-report')

export async function generateStaticParams() {
  if (!fs.existsSync(reportsDirectory)) return []

  return fs
    .readdirSync(reportsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace('.md', ''),
    }))
}

export default async function DailyReportDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const filePath = path.join(reportsDirectory, `${slug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const htmlContent = marked(content)

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <article className="prose prose-invert mx-auto max-w-4xl">
        <Link href="/daily-reports" className="no-underline text-gray-400">
          ← Back to Daily Reports
        </Link>

        <p className="mt-8 text-sm text-gray-500">{data.date || slug}</p>

        <h1>{data.title || slug}</h1>

        <div
          dangerouslySetInnerHTML={{
            __html: htmlContent,
          }}
        />
      </article>
    </main>
  )
}