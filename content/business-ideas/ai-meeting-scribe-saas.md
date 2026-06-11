# Business Idea: AI Meeting Scribe — Async Meeting Intelligence for SMBs

**Date:** 2026-06-11  
**Category:** SaaS / Productivity  
**Stage:** Concept  
**Target Market:** Thai SMBs, regional startups, distributed teams

---

## Problem

Small and medium businesses waste 3–5 hours per week per person in meetings that produce no written record. Action items get lost, decisions aren't documented, and junior staff can't catch up if they miss a session.

Enterprise tools like Otter.ai, Fireflies, and Zoom AI exist — but they are expensive, English-first, and overkill for 10–50 person companies.

## Solution

**AI Meeting Scribe**: A lightweight meeting intelligence tool that:
- Records audio via a browser tab or Zoom/Meet integration
- Transcribes in Thai and English (code-switching supported)
- Extracts: summary, decisions made, action items with owners + deadlines
- Sends a structured PDF/email digest to all attendees within 5 minutes of meeting end
- Archives everything in a searchable web dashboard

## Differentiators vs. Competitors

| Feature | Otter.ai | Fireflies | AI Meeting Scribe |
|---|---|---|---|
| Thai language | ❌ | ❌ | ✅ |
| Thai/English code-switch | ❌ | ❌ | ✅ |
| Pricing (SMB-friendly) | $$$| $$$ | $ |
| Action item extraction | Basic | Basic | Structured + owner tagging |
| Local data residency | ❌ | ❌ | ✅ (Thailand option) |

## Revenue Model

- **Free tier**: 3 meetings/month, 30-min limit
- **Pro**: ฿499/user/month — unlimited meetings, integrations
- **Team**: ฿299/user/month for 5+ seats
- **Enterprise**: Custom pricing with on-premise option

## Market Size (Thailand)

- ~500,000 registered SMBs in Thailand
- Target: tech-adjacent companies (agencies, clinics, real estate, logistics)
- TAM: ~฿2.4B/year if 1% adoption at Pro tier

## Risks

- Whisper / local STT models for Thai are improving but still lag English quality
- Privacy concerns with cloud audio recording — needs clear data policy
- Low willingness to pay in Thailand vs. developed markets

## Next Steps

1. Build a prototype using Whisper v3 + Claude for extraction
2. Test with 5 SMB pilot customers
3. Validate ฿499/month price point
4. Build Zoom webhook integration

## Effort Estimate

- MVP: ~3 weeks solo dev (Python backend + simple React dashboard)
- Monthly infra cost (AWS/GCP): ~$150 for 100 active teams
