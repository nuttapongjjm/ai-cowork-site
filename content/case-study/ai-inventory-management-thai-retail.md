# Case Study: AI-Driven Inventory Management for Thai Retail Chain

**Date:** 2026-06-11  
**Industry:** Retail / Supply Chain  
**Outcome:** 31% reduction in stockouts, 22% decrease in overstock carrying costs

---

## Background

A regional Thai retail chain with 18 branches across the Northern region managed inventory manually via spreadsheets and experience-based guesswork. Procurement decisions were made weekly by a single supply chain manager, creating a single point of failure and inconsistent stock levels across locations.

## Challenge

- Stockouts on fast-moving SKUs (snacks, household goods) averaging 4–6 incidents per branch per week
- Overstock on seasonal items tying up ~฿2.1M in working capital per quarter
- No visibility into branch-level demand patterns — all ordering was done centrally
- Supply chain manager spending 60% of their time on manual reorder calculations

## Solution

Deployed a two-component AI system:

**Component 1: Demand Forecasting Model**
- Trained on 18 months of branch-level sales data, combined with Thai public holidays, local event calendars, and weather data
- Generates weekly reorder recommendations per SKU per branch
- Model: LightGBM ensemble with a Claude-powered natural language summary layer for the procurement team

**Component 2: Anomaly Alerting**
- Monitors daily sales velocity against forecast
- Flags unusual depletion (e.g., sudden spike at one branch) for same-day manual review
- Sends LINE notifications to branch managers and the central buyer

## Architecture

```
[POS System (daily export CSV)]
        ↓
[ETL pipeline → data warehouse (BigQuery)]
        ↓
[LightGBM forecasting model]
        ↓
[Claude API: generate human-readable reorder summary]
        ↓
[Google Sheets dashboard + LINE Bot alerts]
        ↓
[Procurement team approves / adjusts → ERP submission]
```

## Results (after 120 days)

| Metric | Before | After |
|---|---|---|
| Stockout incidents per branch/week | 4.8 | 3.3 |
| Overstock carrying cost (quarterly) | ฿2.1M | ฿1.6M |
| Time spent on manual reorder calc | 3 hrs/day | 25 min/day |
| Procurement accuracy (within 10% of actual demand) | 51% | 74% |

## Lessons Learned

- Thai public holidays have outsized impact on demand spikes — encoding them as features doubled model accuracy versus a baseline without them
- Branch managers need to trust the system before they'll act on it; a 4-week "shadow mode" (AI suggests, human decides) built that trust before going live
- LINE Bot was the right channel over email — procurement staff acted on alerts 3× faster
- Data quality was the biggest obstacle: ~30% of historical POS records had encoding issues that required a 2-week cleanup sprint before modelling

## What Didn't Work

A real-time streaming pipeline was attempted initially (Kafka → live model updates) but the operational overhead was not justified. Batch daily updates proved sufficient for a weekly ordering cadence.

## Takeaway

Demand forecasting doesn't require a data science team or complex ML infrastructure for SMB retail. A well-cleaned historical dataset plus a gradient boosting model plus a human-readable output layer is enough to drive meaningful business results — in roughly 6 weeks of build time.
