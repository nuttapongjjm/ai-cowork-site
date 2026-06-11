# Business Idea: AI Contract Review Tool for Thai SMEs

**Date:** 2026-06-11  
**Category:** LegalTech / SaaS  
**Stage:** Concept  
**Target Market:** Thai SMBs, freelancers, property developers, logistics companies

---

## Problem

Thai SMEs sign contracts constantly — vendor agreements, employment contracts, property leases, service agreements — yet most have no in-house legal counsel. Hiring a lawyer for contract review costs ฿5,000–฿20,000 per document and takes 2–5 business days. Many business owners skip legal review entirely, signing documents they don't fully understand.

The result: disputes, unfavorable clauses buried in boilerplate, and costly exits from agreements that should never have been signed.

## Solution

**AI Contract Review**: A web-based tool where a user uploads a contract (PDF or Word), selects the contract type, and receives within 60 seconds:

1. **Plain-language summary** — "What does this contract actually say?" in Thai
2. **Risk flags** — highlighted clauses that are unusual, one-sided, or legally risky
3. **Missing clause alerts** — e.g., "This service agreement has no IP ownership clause"
4. **Negotiation suggestions** — 3–5 specific edits to propose to the other party
5. **Jurisdiction note** — flags if the contract specifies a foreign jurisdiction or arbitration body

## Differentiators vs. Alternatives

| Feature | Hiring a Lawyer | Klarity / Harvey (international) | AI Contract Review |
|---|---|---|---|
| Thai language | ✅ | ❌ | ✅ |
| Thai legal context | ✅ | ❌ | ✅ (Thai Civil & Commercial Code) |
| Speed | 2–5 days | Minutes | Minutes |
| Cost per contract | ฿5,000–฿20,000 | Not available in TH | ฿99–฿499 |
| SMB pricing | Prohibitive | Enterprise only | ✅ |

## Revenue Model

- **Pay-per-review**: ฿99/contract (1–5 pages), ฿299 (6–20 pages), ฿499 (20+ pages)
- **Monthly subscription**: ฿990/month — unlimited reviews up to 30 contracts
- **Law firm white-label**: ฿5,000/month — branded tool for small law firms to offer clients

## Market Sizing

- Thailand has ~3.2M registered SMBs
- Estimate 15% sign ≥2 contracts/month = ~480,000 addressable businesses
- At ฿200 average revenue per review × 2 reviews/month: TAM ≈ ฿192M/month
- Realistic Year 1 target: 2,000 paying users → ฿2.4M ARR

## Technical Approach

- **Parsing**: PyMuPDF for PDF extraction + python-docx for Word files
- **Model**: Claude claude-sonnet-4-6 with a system prompt trained on Thai legal terminology and Civil & Commercial Code context
- **Output**: Structured JSON → rendered as a clean review report (HTML/PDF export)
- **Languages**: Thai and English output, contracts in either language accepted

## Risks

| Risk | Mitigation |
|---|---|
| Liability if bad legal advice given | Clear disclaimer: "This is not legal advice" + terms of service |
| Accuracy on complex contracts | Focus MVP on common contract types only (5 types) |
| Low willingness to pay | Lead with free tier (1 review/month) to build habit |
| Thai legal nuance is hard to encode | Partner with 2–3 Thai lawyers for prompt validation |

## MVP Scope (6 weeks)

- Support 5 contract types: employment, vendor service, property lease, NDA, distribution agreement
- Thai and English input/output
- Web app only (no mobile initially)
- Pay-per-review billing via PromptPay / credit card (Omise)

## Next Steps

1. Interview 10 Thai SMB owners about current contract review pain
2. Validate price sensitivity (฿99 vs. ฿299 per review)
3. Build prompt pipeline with 5 sample contracts per type
4. Launch closed beta with 50 users from LinkedIn/X network
