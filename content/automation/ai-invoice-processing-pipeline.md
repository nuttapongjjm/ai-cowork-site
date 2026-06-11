# Automation: AI-Powered Invoice Processing Pipeline

**Date:** 2026-06-11  
**Type:** Finance / Document Automation  
**Stack:** Python + Claude API + Google Drive / SharePoint  
**Effort to Build:** 2–3 days

---

## Overview

Automate the extraction, validation, and routing of vendor invoices from email or shared drive — eliminating manual data entry into accounting systems. Suitable for any company processing 20–500 invoices per month.

## Architecture

```
[Vendor emails invoice (PDF/image attachment)]
        ↓
[Gmail/Outlook webhook or Drive folder watcher]
        ↓
[Python: extract attachment, convert to base64]
        ↓
[Claude API: vision + extraction prompt]
        ↓
[Structured JSON: vendor, date, items, totals, tax, bank details]
        ↓
[Validation layer: totals check, duplicate detection, PO match]
        ↓
  ┌──────────────────────────────┐
  │  Passed validation?          │
  │  YES → auto-post to ERP/     │
  │         accounting system    │
  │  NO  → flag for human review │
  │         + Slack/LINE alert   │
  └──────────────────────────────┘
        ↓
[Google Sheet log: all invoices + status]
```

## Key Components

### 1. Extraction Prompt (Claude Vision)

```python
system_prompt = """
You are an invoice data extraction specialist. Extract all structured 
data from the invoice image and return valid JSON only.

Required fields:
- vendor_name, vendor_tax_id, vendor_bank_account
- invoice_number, invoice_date, due_date
- line_items: [{description, quantity, unit_price, amount}]
- subtotal, vat_amount, total_amount
- currency (default THB)
- payment_terms

If a field is not present in the document, return null for that field.
Return JSON only. No explanation.
"""
```

### 2. Validation Layer

```python
def validate_invoice(data: dict) -> tuple[bool, list[str]]:
    errors = []
    
    # Math check
    calculated = sum(item["amount"] for item in data["line_items"])
    if abs(calculated - data["subtotal"]) > 0.01:
        errors.append(f"Line item sum ({calculated}) != subtotal ({data['subtotal']})")
    
    # Duplicate check (last 90 days)
    if invoice_exists(data["invoice_number"], data["vendor_name"]):
        errors.append("Duplicate invoice detected")
    
    # PO matching (optional)
    if data.get("po_number") and not po_exists(data["po_number"]):
        errors.append(f"PO {data['po_number']} not found in system")
    
    return len(errors) == 0, errors
```

### 3. ERP Integration Options

| System | Integration Method |
|---|---|
| Xero | Xero API (invoices endpoint) |
| QuickBooks | QBO REST API |
| SAP Business One | DI API or Service Layer |
| Custom/homegrown | Direct DB insert or CSV import |
| Google Sheets only | Sheets API (simplest MVP) |

## Handling Thai Invoices

Thai invoices often have mixed Thai/English content and specific tax requirements:

- **Thai Tax ID (เลขประจำตัวผู้เสียภาษี)**: 13-digit number — extract and validate format
- **VAT (ภาษีมูลค่าเพิ่ม)**: Standard rate is 7% — flag if calculated VAT deviates
- **Withholding Tax (ภาษีหัก ณ ที่จ่าย)**: Common on services — extract WHT rate and amount separately
- **Date format**: Thai invoices often use Buddhist Era (พ.ศ.) — convert BE to CE automatically

```python
def convert_thai_date(date_str: str) -> str:
    """Convert Buddhist Era date to Common Era."""
    import re
    match = re.search(r'(\d{1,2})[/\-](\d{1,2})[/\-](\d{4})', date_str)
    if match and int(match.group(3)) > 2400:  # Buddhist Era
        year_ce = int(match.group(3)) - 543
        return f"{match.group(1)}/{match.group(2)}/{year_ce}"
    return date_str
```

## Cost Estimate

- Claude API: ~1,500 tokens per invoice (image input) × $0.003/1K tokens ≈ **$0.0045/invoice**
- For 300 invoices/month: **~$1.35/month** in API costs
- Total infra (Cloud Run + minimal storage): ~$15/month

## Error Handling

| Scenario | Handling |
|---|---|
| Blurry or low-res scan | Re-prompt with "low quality image" context; flag for rescan if confidence low |
| Handwritten invoice | Flag immediately for human — skip AI extraction |
| Multi-page PDF | Process each page, merge line items, validate totals on final page only |
| Unsupported currency | Extract as-is, flag for manual FX conversion |

## Deployment Options

- **Local script**: Run on a Windows/Mac machine with Task Scheduler / cron
- **Cloud**: Google Cloud Run triggered by Pub/Sub (Drive events) — scales to zero
- **No-code hybrid**: n8n or Make.com for orchestration, Claude API node for extraction

## Next Improvements

- [ ] Train classifier to identify invoice vs. receipt vs. quotation before extraction
- [ ] Add confidence scores per field — flag low-confidence fields for human review
- [ ] Dashboard showing monthly invoice volume, processing time, error rate
- [ ] Multi-vendor template learning — improve accuracy per vendor over time
