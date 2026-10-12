# Testing Guide - Zennopay Rebrand

This guide helps verify that the Zennopay rebranding is working correctly.

## Prerequisites

- Docker installed
- Access to the repository
- (Optional) Chrome DevTools for inspecting elements

## Build and Run

### 1. Build Docker Image

```bash
cd /path/to/repo
docker build -t zennopay-sign:test .
```

**Expected**: Build completes successfully. Check that:
- No errors during webpack compilation
- Ruby dependencies install correctly
- Environment variables are set (check build output for PRODUCT_NAME=Zennopay Sign)

### 2. Run Container

```bash
docker run -p 3000:3000 \
  -e HOST=localhost \
  -e SECRET_KEY_BASE=$(openssl rand -hex 64) \
  -v $(pwd)/data:/data \
  zennopay-sign:test
```

**Expected**: Application starts on http://localhost:3000

## Visual Verification Checklist

### Landing Page (/)

- [ ] Logo shows Zennopay "Z" mark (PNG if present, otherwise iris-colored SVG)
- [ ] Page title: "Zennopay Sign" in browser tab
- [ ] Header shows "Zennopay Sign" text next to logo
- [ ] Footer contains: "Zennopay Sign is open source software. View source code"
- [ ] Footer link points to repository (check URL)
- [ ] Source code link visible in the `application` layout's footer

**Screenshot**: `landing-page.png`

### Sign-In Page (/sign_in)

- [ ] Logo displays correctly (Zennopay mark)
- [ ] Page title: "Zennopay Sign"
- [ ] No "DocuSeal" text visible anywhere
- [ ] Footer present with source code link

**Screenshot**: `sign-in-page.png`

### Setup/First Run (if applicable)

After first run, check:
- [ ] Welcome screen mentions "Zennopay Sign"
- [ ] Email configuration shows support@zennopay.com

### Document Signing Form

1. Create a test template
2. Send for signing
3. Open the signing link

**Check**:
- [ ] Logo visible at top of form
- [ ] "Zennopay Sign" in page title

These signing pages use the `form` layout, which does not render the shared source-code footer.

**Screenshot**: `signing-form.png`

### Email Templates

1. Send a test document for signing
2. Check email (use Mailcatcher or check logs for email content)

**Verify**:
- [ ] Email subject contains "Zennopay Sign"
- [ ] Email body mentions "Zennopay Sign"
- [ ] Email footer: "Sent using Zennopay Sign open source software"
- [ ] Link in footer points to repository

**Screenshot**: `email-preview.png` (from Mailcatcher or similar)

### PDF Audit Trail

1. Complete a document signing
2. Download the completed PDF
3. View the audit trail/certificate page

**Check**:
- [ ] Zennopay logo appears in audit trail
- [ ] Signature certificates show Zennopay branding

**Screenshot**: `pdf-audit-trail.png`

## Technical Verification

### Environment Variables

```bash
docker exec <container_id> printenv | grep -E "PRODUCT_|BRAND_|GITHUB_|SUPPORT_"
```

**Expected output**:
```
PRODUCT_NAME=Zennopay Sign
PRODUCT_URL=https://zennopay.com
PRODUCT_EMAIL_URL=https://sign.zennopay.com
GITHUB_URL=https://github.com/zennopay/docuseal-fork
SUPPORT_EMAIL=support@zennopay.com
BRAND_COLOR=#6560FF
```

### Logo Files

```bash
docker exec <container_id> ls -lh /app/public/brand-logo.png /app/lib/pdf_icons/logo.png
```

**Expected**: Both files exist and are the Zennopay logo

### Source Code Link

Using browser DevTools on a page using the `application` layout (such as `/` or `/sign_in`):

1. Inspect footer element
2. Find link with text "View source code"
3. Verify href matches GITHUB_URL

## Testing on Cloud Run

After deploying to https://sign.zennopay.com:

1. Visit the live URL
2. Verify SSL certificate is valid
3. Run through the checklist above
4. Test email delivery (actual SMTP)
5. Check performance (cold start time)

## Color Verification

Using browser DevTools:
1. Inspect logo SVG element
2. Verify color is `#6560FF` (iris)
3. Check no references to old orange color `#e97a42`

## AGPL Compliance Check

- [ ] Shared source-code footer present on pages using the `application` layout (including `/` and `/sign_in`)
- [ ] Footer contains "View source code" link
- [ ] Link is accessible (not hidden or broken)
- [ ] LICENSE file unchanged in repository
- [ ] LICENSE_ADDITIONAL_TERMS file unchanged

The `form`, `plain`, and `mailer` layouts do not render the shared source-code footer. Signing pages (`/d/*` and `/s/*`) use `form`; emails have separate attribution. This checklist documents the existing source-access and licensing measures.

## Known Issues / Notes

- The default DocuSeal theme colors may still appear in some places (buttons, etc.)
- This is expected - only the logo, product name, and primary brand color are changed
- Full theme customization would require additional CSS changes

## Reporting Issues

If you find any "DocuSeal" references that should be "Zennopay Sign":

1. Note the page URL
2. Take a screenshot
3. Document the exact location (element, section)
4. Open an issue or create a PR with the fix

## Success Criteria

✅ All checkboxes above are checked
✅ No "DocuSeal" visible in user-facing areas (except LICENSE)
✅ Zennopay logo displays correctly everywhere
✅ Source-code footer present and functional on pages using the `application` layout
✅ Docker builds without errors
✅ Application runs and is accessible
