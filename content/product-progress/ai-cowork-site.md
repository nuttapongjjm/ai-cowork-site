# Product Progress: ai-cowork-site

**Last Updated:** 2026-06-11  
**Status:** Active Development  
**Owner:** Brucesoft  
**Stack:** Static site (Markdown content), automated daily content pipeline

---

## Product Overview

`ai-cowork-site` is a developer-facing knowledge site that publishes daily AI-focused content across five categories:

- Daily executive reports (AI/tech trends for CTOs)
- Case studies (real-world AI implementation examples)
- Business ideas (SaaS opportunities in Southeast Asia)
- Automation opportunities (practical scripts and patterns)
- English learning notes (business English for Thai tech professionals)

Content is generated automatically via a Claude API pipeline and committed to the repository daily.

---

## Current State (2026-06-11)

### ✅ Completed
- Repository structure established (`content/` with 6 subdirectories)
- Folder conventions defined (YYYY-MM-DD for dailies, slug names for evergreen content)
- First daily report generated and committed (2026-06-11)
- Automated content pipeline operational (scheduled task via Claude/Cowork)
- Second pipeline run completed (2026-06-11): 3 new evergreen content files added
  - `case-study/ai-inventory-management-thai-retail.md`
  - `business-ideas/ai-contract-review-thai-sme.md`
  - `automation/ai-invoice-processing-pipeline.md`

### 🚧 In Progress
- Content pipeline reliability — second full multi-file run completed today
- Site build configuration (Astro/Next.js frontend not yet confirmed)
- Git auto-commit step: shell environment unavailable during 2026-06-11 pipeline run — files written but not yet committed; manual `git commit` required

### 📋 Backlog
- [ ] Frontend site build (choose Astro vs. Next.js vs. plain 11ty)
- [ ] Deploy to Vercel or Netlify with auto-build on push
- [ ] SEO metadata (frontmatter: title, description, og:image per post)
- [ ] Search functionality (Pagefind or Algolia)
- [ ] RSS feed for each content category
- [ ] Thai language versions of key posts
- [ ] Content quality scoring and human review workflow
- [ ] Analytics integration (Plausible or simple GA4)
- [ ] Pipeline resilience: retry logic when shell environment fails to start

---

## Content Volume Targets

| Category | Cadence | Target by Month 3 |
|---|---|---|
| Daily report | Daily | 90 posts |
| Case study | 2–3x/week | 30 posts |
| Business ideas | 2–3x/week | 30 posts |
| Automation | 2–3x/week | 30 posts |
| English learning | Daily | 90 posts |
| Product progress | Weekly | 12 updates |

---

## Key Decisions Made

| Date | Decision | Rationale |
|---|---|---|
| 2026-06-11 | Use flat Markdown files, not a CMS | Simplicity, git history, zero DB cost |
| 2026-06-11 | Automated content via Claude API | Consistent publishing without manual effort |
| 2026-06-11 | No-overwrite rule for all files | Preserve human edits, avoid accidental data loss |

---

## Next Milestone

**Goal:** Live, publicly accessible site with 2 weeks of content  
**Target Date:** 2026-06-25  
**Blockers:** Frontend framework decision pending

---

## Notes

The daily automation pipeline is the core engine of this product. Reliability of the pipeline directly determines content cadence. Priority should be given to monitoring and alerting for failed runs before investing in frontend polish.

The `prompts/daily-cowork.md` file is currently empty — the pipeline is running on defaults. Populate this file to customize what content is generated each day (e.g., a specific topic, news item to reference, or category focus).
