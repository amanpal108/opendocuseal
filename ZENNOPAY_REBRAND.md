# Zennopay Rebranding Documentation

This document describes the changes made to rebrand DocuSeal as **Zennopay Sign**.

## Overview

This fork implements a comprehensive rebranding while preserving AGPL-3.0 licensing and keeping the codebase easily mergeable with upstream DocuSeal updates.

## Changes Made

### 1. Brand Configuration (Environment Variables)

All branding is now controlled via environment variables set in the Dockerfile:

- `PRODUCT_NAME`: "Zennopay Sign"
- `PRODUCT_URL`: "https://zennopay.com"
- `PRODUCT_EMAIL_URL`: "https://sign.zennopay.com"
- `GITHUB_URL`: "https://github.com/zennopay/docuseal-fork" (update with actual repo URL)
- `SUPPORT_EMAIL`: "support@zennopay.com"
- `BRAND_COLOR`: "#6560FF" (Zennopay iris color)
- `THEME_NAME`: "docuseal" (can be customized)

### 2. Logo Updates

- **Main Logo**: `public/brand-logo.png` - Zennopay mark logo (downloaded from https://zennopay.com/brand/zp-mark.png)
- **SVG Logo**: `public/logo.svg` - Custom Zennopay "Z" logo in brand iris color
- **Favicon**: `public/favicon.svg` - Matching favicon in brand color
- **PDF Icons**: Updated `lib/pdf_icons/logo.png` and `lib/pdf_icons/stamp-logo.png` with Zennopay logo

### 3. Code Changes

#### Core Configuration (`lib/docuseal.rb`)
- Made `PRODUCT_NAME`, `PRODUCT_URL`, `GITHUB_URL`, `SUPPORT_EMAIL` configurable via ENV vars
- Added `BRAND_COLOR` constant for theme color customization

#### Views Updated
- `app/views/shared/_logo.html.erb` - Supports custom logo PNG or SVG with brand color
- `app/views/shared/_title.html.erb` - Uses `Docuseal.product_name`
- `app/views/layouts/_head_tags.html.erb` - Dynamic page titles
- `app/views/start_form/_docuseal_logo.html.erb` - Product name in signing form
- `app/views/pages/landing.html.erb` - Product name in landing page
- `app/views/layouts/*.html.erb` - Support for custom `THEME_NAME`

#### AGPL Compliance
- Added `app/views/shared/_footer.html.erb` with link to source repository
- Integrated footer into the `application` layout (including the landing and sign-in pages). The `form`, `plain`, and `mailer` layouts do not render this footer; signing pages use `form`.
- Kept all LICENSE files intact

### 4. Dockerfile

Updated to include Zennopay environment variables as defaults for the production image.

## Deployment

### Docker Build

```bash
docker build -t zennopay-sign .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e HOST=sign.zennopay.com \
  -e APP_URL=https://sign.zennopay.com \
  -v ./data:/data \
  zennopay-sign
```

### Cloud Run Deployment

Set `APP_URL=https://sign.zennopay.com` in the Cloud Run service's environment variables for deployment at https://sign.zennopay.com. Non-multitenant deployments use `APP_URL` to generate mail and PDF audit-trail links; `HOST` and `PRODUCT_EMAIL_URL` do not configure those links. Without `APP_URL` or a saved application URL, they default to `http://localhost:3000`.

## Brand Colors

- **Primary (Iris)**: #6560FF
- **Dark Navy**: #050B14 / #091422
- **Gold Accent**: #EDCB8B
- **Lavender**: #C2C1FF

## Fonts

- **Inter Tight** - Headings
- **Inter** - Body text

## Maintaining Upstream Compatibility

The rebranding approach minimizes conflicts with upstream DocuSeal:

1. **Environment-driven**: Most branding is controlled via ENV vars, not hardcoded
2. **Centralized**: Logo rendering uses shared partials
3. **Additive**: New files (footer, .env.zennopay) rather than modifying core logic
4. **Documented**: Clear separation between branding and functional changes

### Merging Upstream Changes

```bash
# Add upstream remote if not already added
git remote add upstream https://github.com/docusealco/docuseal.git

# Fetch and merge
git fetch upstream
git merge upstream/master

# Resolve any conflicts, prioritizing Zennopay branding in:
# - lib/docuseal.rb
# - Dockerfile
# - app/views/shared/_logo.html.erb
# - app/views/shared/_footer.html.erb
```

## Testing Checklist

- [ ] Docker image builds successfully
- [ ] Application starts and loads at localhost:3000
- [ ] Sign-in page shows Zennopay logo and branding
- [ ] Document signing page shows Zennopay logo
- [ ] Email templates show "Zennopay Sign" in text
- [ ] Pages using the `application` layout display the footer's "View source code" link to the repository
- [ ] Page title shows "Zennopay Sign"
- [ ] PDF audit trail includes Zennopay logo

## AGPL Compliance

The following source-access and licensing measures are present in this fork:

1. ✅ Original LICENSE files preserved
2. ✅ Source code link visible in the `application` layout's footer (including landing and sign-in pages); the `form`, `plain`, and `mailer` layouts do not render this footer
3. ✅ Repository URL configurable via GITHUB_URL environment variable
4. ✅ No removal of DocuSeal copyright notices
5. ✅ Clear documentation of changes (this file)

## Screenshots

See PR description for screenshots of:
- Sign-in page
- Document signing form
- Email preview
- Landing page

## Support

For questions about this fork, contact support@zennopay.com
