# Automation: AI Receipt & Invoice Extraction Pipeline

**Date:** 2026-06-11  
**Type:** Document Processing / Finance Automation  
**Stack:** Claude Vision API + Python + Google Sheets / Supabase  
**Effort to Build:** ~2 days

---

## Overview

Automate the extraction of structured data from receipts, invoices, and tax documents using Claude's vision capabilities. Replace manual data entry with a pipeline that accepts image or PDF input and outputs clean, categorized financial records.

This pattern is applicable to: expense tracking, accounts payable, Thai VAT reconciliation, and any workflow where humans currently type numbers from paper documents into spreadsheets.

---

## Architecture

```
[Input: Photo / PDF via LINE, email attachment, or folder watch]
        ↓
[Preprocessing: resize image, convert PDF to PNG if needed]
        ↓
[Claude Vision API: extract structured data]
        ↓
[Validation layer: cross-check totals, flag anomalies]
        ↓
[Output: JSON → Google Sheets row / Supabase insert / webhook]
        ↓
[Optional: duplicate detection + human review queue for low-confidence items]
```

---

## Core Python Script

```python
import anthropic
import base64
import json
from pathlib import Path

client = anthropic.Anthropic()

EXTRACTION_PROMPT = """
Extract the following fields from this receipt or invoice image. 
Return ONLY valid JSON with no explanation.

Required fields:
- vendor_name: string
- vendor_tax_id: string or null (Thai 13-digit TIN if present)
- date: string (YYYY-MM-DD format)
- total_amount: number (Thai Baht, numeric only)
- vat_amount: number or null
- pre_vat_amount: number or null
- currency: string (default "THB")
- document_type: "receipt" | "invoice" | "tax_invoice" | "unknown"
- line_items: array of {description: string, quantity: number, unit_price: number, amount: number}
- confidence: number between 0 and 1 (your confidence in the extraction accuracy)
- notes: string or null (any unusual observations)

If a field cannot be determined, use null.
"""

def extract_receipt(image_path: str) -> dict:
    image_data = Path(image_path).read_bytes()
    base64_image = base64.standard_b64encode(image_data).decode("utf-8")
    
    # Detect media type
    suffix = Path(image_path).suffix.lower()
    media_type_map = {".jpg": "image/jpeg", ".jpeg": "image/jpeg", 
                      ".png": "image/png", ".webp": "image/webp"}
    media_type = media_type_map.get(suffix, "image/jpeg")
    
    message = client.messages.create(
        model="claude-haiku-4-5-20251001",  # Haiku is sufficient and cost-effective
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": base64_image,
                        },
                    },
                    {
                        "type": "text",
                        "text": EXTRACTION_PROMPT
                    }
                ],
            }
        ],
    )
    
    raw = message.content[0].text.strip()
    
    # Strip markdown code blocks if present
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    
    return json.loads(raw)


def validate_extraction(data: dict) -> tuple[bool, list[str]]:
    """Basic validation: check totals add up, flag low confidence."""
    warnings = []
    
    if data.get("confidence", 1.0) < 0.7:
        warnings.append(f"Low confidence extraction: {data['confidence']:.0%}")
    
    # Validate VAT math (Thai standard VAT is 7%)
    if data.get("pre_vat_amount") and data.get("vat_amount") and data.get("total_amount"):
        expected_total = data["pre_vat_amount"] + data["vat_amount"]
        if abs(expected_total - data["total_amount"]) > 1.0:  # Allow ฿1 rounding
            warnings.append(
                f"Total mismatch: {data['pre_vat_amount']} + {data['vat_amount']} "
                f"≠ {data['total_amount']}"
            )
    
    is_valid = len(warnings) == 0
    return is_valid, warnings


# Example usage
if __name__ == "__main__":
    result = extract_receipt("receipt.jpg")
    is_valid, warnings = validate_extraction(result)
    
    print(json.dumps(result, indent=2, ensure_ascii=False))
    if warnings:
        print("⚠️ Warnings:", warnings)
```

---

## Integration: Write to Google Sheets

```python
import gspread
from google.oauth2.service_account import Credentials

def write_to_sheets(data: dict, sheet_id: str, tab_name: str = "Transactions"):
    creds = Credentials.from_service_account_file(
        "service_account.json",
        scopes=["https://www.googleapis.com/auth/spreadsheets"]
    )
    gc = gspread.authorize(creds)
    sheet = gc.open_by_key(sheet_id).worksheet(tab_name)
    
    row = [
        data.get("date"),
        data.get("vendor_name"),
        data.get("vendor_tax_id"),
        data.get("document_type"),
        data.get("pre_vat_amount"),
        data.get("vat_amount"),
        data.get("total_amount"),
        data.get("confidence"),
        ", ".join([item["description"] for item in data.get("line_items", [])]),
    ]
    sheet.append_row(row)
```

---

## Processing PDFs

Many Thai tax invoices are PDFs. Convert to images before processing:

```python
from pdf2image import convert_from_path
import tempfile, os

def process_pdf_receipt(pdf_path: str) -> list[dict]:
    results = []
    with tempfile.TemporaryDirectory() as tmpdir:
        pages = convert_from_path(pdf_path, dpi=200, output_folder=tmpdir)
        for i, page in enumerate(pages):
            img_path = os.path.join(tmpdir, f"page_{i}.jpg")
            page.save(img_path, "JPEG", quality=85)
            result = extract_receipt(img_path)
            result["source_page"] = i + 1
            results.append(result)
    return results
```

Install: `pip install pdf2image poppler-utils`

---

## LINE Bot Integration

Accept receipt photos directly from LINE:

```python
from flask import Flask, request
import requests

app = Flask(__name__)

@app.route("/webhook", methods=["POST"])
def webhook():
    body = request.json
    for event in body.get("events", []):
        if event["type"] == "message" and event["message"]["type"] == "image":
            # Download image from LINE
            msg_id = event["message"]["id"]
            headers = {"Authorization": f"Bearer {LINE_CHANNEL_TOKEN}"}
            img_response = requests.get(
                f"https://api-data.line.me/v2/bot/message/{msg_id}/content",
                headers=headers
            )
            # Save and process
            with open(f"/tmp/{msg_id}.jpg", "wb") as f:
                f.write(img_response.content)
            
            result = extract_receipt(f"/tmp/{msg_id}.jpg")
            is_valid, warnings = validate_extraction(result)
            
            # Reply with summary
            reply_text = (
                f"✅ บันทึกแล้ว\n"
                f"📍 {result.get('vendor_name', 'ไม่ทราบ')}\n"
                f"📅 {result.get('date', '-')}\n"
                f"💰 ฿{result.get('total_amount', 0):,.2f}"
            )
            if warnings:
                reply_text += f"\n⚠️ {'; '.join(warnings)}"
            
            send_line_reply(event["replyToken"], reply_text)
    
    return "OK"
```

---

## Cost Estimate

| Volume | API Calls/Month | Model | Est. Cost |
|---|---|---|---|
| 100 receipts/month | 100 | Haiku | ~$0.15 |
| 1,000 receipts/month | 1,000 | Haiku | ~$1.50 |
| 10,000 receipts/month | 10,000 | Haiku | ~$15 |

Claude Haiku is the right choice here — the structured extraction task doesn't require Sonnet's reasoning depth, and the cost difference is 5–10×.

---

## Human Review Queue

For items where `confidence < 0.75` or validation fails, route to a simple review interface:

```python
def needs_review(data: dict, warnings: list) -> bool:
    return data.get("confidence", 1.0) < 0.75 or len(warnings) > 0

# Store in a "pending_review" table with the original image path
# Build a simple /review endpoint that shows the image + extracted data side-by-side
# Reviewer clicks confirm or edits fields → writes to main transactions table
```

---

## What to Build Next

- [ ] Duplicate detection (same vendor + date + amount = likely duplicate)
- [ ] Category auto-tagging (office supplies, transport, meals) based on vendor + items
- [ ] Monthly VAT report generation from accumulated data
- [ ] Webhook to accounting software (FlowAccount API, if available)
- [ ] Batch folder-watch mode for processing legacy receipt archives
