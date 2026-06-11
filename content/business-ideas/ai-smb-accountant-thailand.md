# Business Idea: AI Bookkeeper for Thai SMBs — "Bun Chee AI"

**Date:** 2026-06-11  
**Category:** SaaS / Fintech  
**Stage:** Concept  
**Target Market:** Thai SMBs (1–50 employees), freelancers, solo entrepreneurs

---

## Problem

Thailand has over 3.2 million registered SMBs. The vast majority use one of three "systems" for bookkeeping: Excel, a physical notebook, or nothing at all. Formal accounting software (QuickBooks, PEAK, FlowAccount) requires either accounting knowledge or the budget to hire someone who has it.

The result: most SMB owners don't know if they're profitable until their accountant tells them — once a year, during tax season, when it's too late to change anything.

Meanwhile, Thai tax rules (VAT, WHT, PND 3/53, etc.) are genuinely complex. A mistake costs ฿5,000–฿50,000 in penalties. The fear of getting it wrong is why SMBs pay accounting firms ฿3,000–฿8,000/month for basic bookkeeping that should cost ฿500.

---

## Solution

**Bun Chee AI** (บัญชี AI — "AI Bookkeeper") is a WhatsApp + LINE-first bookkeeping assistant that:

1. **Receives receipts and invoices** via chat (photo or PDF)
2. **Extracts and categorizes** transactions using Claude Vision + structured prompts
3. **Maintains a running P&L** the owner can check anytime with a simple message: "กำไรเดือนนี้เท่าไหร่?"
4. **Prepares VAT summary** and draft PP.30 form monthly
5. **Flags tax obligations** before they're due (WHT, VAT filing deadlines)
6. **Exports to PDF** for the owner's accountant at year-end

No app download. No training required. Works in Thai. Understands Thai tax codes.

---

## Why Now

- Claude Vision (and equivalent models) can now reliably extract Thai-language receipt data with >90% accuracy
- LINE OA (Official Account) API makes it trivial to build a chat-native interface Thai SMBs already use daily
- FlowAccount raised Series B in 2024 proving the market exists — but they're targeting mid-market; the sub-฿1,000/month segment is unserved
- Thailand's Revenue Department is pushing e-Tax Invoice adoption, creating urgency for digital record-keeping

---

## Differentiators

| Feature | FlowAccount | QuickBooks | Bun Chee AI |
|---|---|---|---|
| Interface | Web app | Web + mobile | LINE / WhatsApp chat |
| Thai tax forms (PP.30, PND 3) | ✅ | Partial | ✅ |
| Receipt scanning | ✅ | ✅ | ✅ |
| Understands Thai | Partial | ❌ | ✅ |
| Price | ฿990/mo | ฿1,500+/mo | ฿299/mo |
| Setup time | Hours | Days | 5 minutes |

---

## Revenue Model

- **Free**: 20 transactions/month (enough for a side hustle)
- **Solo**: ฿299/month — unlimited transactions, monthly VAT summary, 1 business
- **Pro**: ฿699/month — 3 businesses, WHT tracking, accountant export mode
- **Accountant Partner Plan**: ฿2,999/month — manage up to 30 client accounts, white-label portal

---

## Market Size

- 3.2M registered SMBs in Thailand
- Target: ~500,000 in the "tech-adjacent" segment (e-commerce sellers, agencies, clinics, freelancers)
- Conservative 1% penetration at Solo tier = ฿1.8B/year ARR
- Accountant Partner Plan at 500 accounting firms = ฿18M/year (high-margin)

---

## MVP Build Plan

**Week 1–2:**
- LINE OA + webhook → Claude Vision receipt extraction
- Basic transaction store (Supabase)
- P&L query via chat ("ดูยอดรายจ่ายเดือนนี้")

**Week 3–4:**
- VAT calculation logic (7% standard + zero-rated categories)
- Monthly summary PDF export
- Simple onboarding flow in chat (business name, VAT registration status)

**Week 5–6:**
- WHT (หัก ณ ที่จ่าย) tracking for services
- Deadline reminder system (PP.30 by 15th, PND 53 by 7th)
- Pilot with 10 SMB testers

**Estimated MVP cost:** ~฿80,000 (2-dev team, 6 weeks)  
**Monthly infra at 1,000 users:** ~$200

---

## Risks

| Risk | Mitigation |
|---|---|
| Low willingness to pay | Free tier builds habit; upgrade friction is low |
| Liability if tax calculation is wrong | Clear disclaimer: AI assistant, not a licensed accountant |
| Thai language OCR quality | Use Claude Vision + fallback to human-review queue |
| Competition from FlowAccount adding chat | Their moat is enterprise; speed is the SMB play |

---

## Why This Wins

The insight is distribution, not product. Every Thai SMB owner is already on LINE for 3+ hours per day. Meeting them there — instead of asking them to download and learn new software — is an unfair distribution advantage. The product sells itself in 5 minutes: send a receipt photo, get a categorized entry back, ask "กำไรวันนี้" and get an answer. That demo converts.
