# Case Study: AI Agent for SME Logistics Operations in Thailand

**Date:** 2026-06-11  
**Industry:** Logistics / Supply Chain  
**Outcome:** 52% reduction in manual dispatch time, 3× improvement in delivery ETA accuracy

---

## Background

A Thai logistics SME operating last-mile delivery in Bangkok and surrounding provinces handled roughly 800 deliveries per day across a fleet of 35 drivers. Operations ran mostly through LINE group chats and a shared Google Sheet. Dispatch was managed by one coordinator who started each morning at 5:30 AM manually assigning routes.

The company had been approached by enterprise TMS (Transport Management System) vendors, but pricing started at ฿200,000/year — out of reach for a 40-person business.

---

## Challenge

- Daily route assignment took 2–3 hours of manual work every morning
- ETA accuracy was ~55% — customers frequently called to ask about their orders
- No automated notification system — drivers used LINE to update the coordinator
- Driver overtime cost increased 18% year-over-year due to poor route optimization
- The dispatch coordinator was a single point of failure — no backup when they were sick

---

## Solution

The team built a lightweight AI dispatch assistant using Claude's API integrated into their existing tools:

### Architecture

```
[Google Sheet: daily orders]
        ↓
[Python script: parse + structure order data]
        ↓
[Claude API: route grouping + priority scoring]
        ↓
[Output: per-driver LINE message with route + ETAs]
        ↓
[Driver confirms pickup via LINE Bot reply]
        ↓
[Customer auto-notified via SMS when driver departs]
```

### Key Components

1. **Order Ingestion** — A Google Apps Script exports the daily order sheet to JSON at 5:00 AM
2. **AI Route Grouping** — Claude groups orders by zone, applies time-window constraints, and scores by delivery urgency
3. **LINE Bot Integration** — Each driver receives a formatted daily manifest via LINE at 5:30 AM
4. **ETA Generation** — Claude calculates estimated windows based on zone distance and typical traffic patterns
5. **Customer Notifications** — A simple SMS via DTAC API fires when the driver marks departure

### Build Cost

| Component | Tool | Monthly Cost |
|---|---|---|
| Claude API (route logic) | claude-haiku-4-5 | ~$12 |
| LINE Messaging API | LINE Developers | Free tier |
| SMS notifications | DTAC API | ~฿800 |
| Google Sheets | Existing | ฿0 |
| **Total** | | **~฿1,200/month** |

Development time: ~3 weeks (one junior dev, part-time)

---

## Results (After 60 Days)

| Metric | Before | After |
|---|---|---|
| Dispatch coordinator start time | 5:30 AM | 6:30 AM |
| Daily route assignment time | 2.5 hours | 25 minutes (review only) |
| ETA accuracy | 55% | 84% |
| Customer inbound calls per day | ~45 | ~12 |
| Driver overtime incidents/week | 18 | 6 |
| Monthly ops cost impact | — | -฿28,000 |

---

## Lessons Learned

- **Start with the coordinator's existing workflow** — Claude replaces the mental model they already use, not an abstract algorithm
- **LINE is the killer integration in Thailand** — every driver already uses it; no new app adoption needed
- **Haiku > Sonnet for structured routing** — the task is well-defined enough that the cheaper model handles it well; reserve Sonnet for edge-case reasoning
- **Human review step is non-negotiable at first** — the coordinator still reviews the AI manifest for 15 minutes; this builds trust and catches edge cases
- **SMS beats app notifications for delivery ETAs** — Thai SME customers don't check email; SMS open rate is near 100%

---

## Takeaway

This is the template for AI automation in Thai SMEs: don't replace the TMS, replace the Google Sheet + LINE group chat workflow that the business is already running on. The integration surface is low-cost (LINE + Sheets), the AI cost is negligible (Haiku API), and the ROI is immediate. Total build cost: ~฿35,000. Monthly savings: ~฿28,000. Payback period: 6 weeks.
