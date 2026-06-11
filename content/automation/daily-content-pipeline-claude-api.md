# Automation: Daily Content Pipeline Using Claude API

**Date:** 2026-06-11  
**Type:** Content / Reporting Automation  
**Stack:** Claude API + GitHub Actions + Markdown  
**Effort to Build:** ~1 day

---

## Overview

Automate the generation of daily blog content, executive reports, and learning notes for a developer-focused site — without manual writing effort. This is the automation powering the `ai-cowork-site` content pipeline itself.

## Architecture

```
[GitHub Actions Cron: 07:00 ICT daily]
        ↓
[Python script: fetch_context.py]
        ↓
  ┌─────────────────────────────────┐
  │  Claude API (claude-sonnet-4-6) │
  │  - Daily executive report       │
  │  - Business idea of the day     │
  │  - Automation opportunity       │
  │  - English learning notes       │
  │  - Case study (as applicable)   │
  └─────────────────────────────────┘
        ↓
[Write .md files to /content/** folders]
        ↓
[git commit + push → triggers Astro/Next.js rebuild]
        ↓
[Live site updated automatically]
```

## Key Components

### 1. Cron Trigger (GitHub Actions)
```yaml
on:
  schedule:
    - cron: '0 0 * * *'  # 07:00 ICT = 00:00 UTC
```

### 2. Python Generation Script
- Uses `anthropic` SDK with structured prompts per content type
- Each content type has its own system prompt + output schema
- Checks for existing files before writing (no-overwrite rule)
- Commits changes with message: `chore: daily content [YYYY-MM-DD]`

### 3. Content Quality Controls
- Word count minimum enforced per type (e.g., 300 words for case study)
- Frontmatter validation (date, category fields required)
- Markdown lint check before commit

## Prompt Strategy

Each content type uses a role-specific system prompt:

- **Daily report**: "You are a senior tech executive summarizing AI trends for a CTO audience..."
- **Business idea**: "You are a startup advisor identifying underserved SaaS niches in Southeast Asia..."
- **Automation**: "You are a DevOps engineer documenting automation patterns for SMB teams..."

## Cost Estimate

- ~5 API calls/day × ~1,500 output tokens each = ~7,500 tokens/day
- Monthly: ~225,000 output tokens ≈ $3.38/month (Sonnet pricing)

## Benefits

- Zero manual writing effort for daily content
- Consistent publishing cadence
- Content is contextually relevant (can inject recent news via web search step)
- Fully auditable via git history

## Limitations & Mitigations

| Risk | Mitigation |
|---|---|
| Repetitive content over time | Rotate prompt templates weekly |
| Hallucinated facts in reports | Add a web-search grounding step |
| Low engagement if content is generic | Personalize prompts with product context |

## Next Improvements

- [ ] Add web search step to ground daily report in real news
- [ ] Add image generation for case study thumbnails
- [ ] Slack notification on successful publish
- [ ] Weekly human review + quality scoring loop
