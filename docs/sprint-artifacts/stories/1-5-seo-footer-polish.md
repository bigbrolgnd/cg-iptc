# Story: SEO, Social Media Assets, and Footer Polish

**Story Key:** 1-5-seo-footer-polish
**Epic:** Epic 1: Project Foundation
**Status:** Ready for Review
**Priority:** High

## User Story
As a site visitor and administrator, I want the website to have professional SEO metadata, correct social media preview images, and a formal footer, so that the site appears official, trustworthy, and displays correctly when shared on social platforms.

## Acceptance Criteria
- [x] **Assets:** All favicon and social image assets from `favicon_io (5)` are moved to `public/`
- [x] **Metadata:** `app/layout.tsx` metadata includes correct `metadataBase`, `openGraph`, `twitter`, and `icons` (favicon/apple/manifest) configuration
- [x] **Social Preview:** Twitter and OpenGraph images point to `/cg-iptc.png`
- [x] **Footer:** A new `Footer` component is displayed on all pages via `LayoutShell`
- [x] **Footer Content:** Footer displays "All Rights Reserved 2026 Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency"
- [x] **Footer Style:** Clean, neutral sans-serif (Inter), centered, subtle top border, `zinc-500` color

## Dev Notes
- **Source Assets:** `/opt/docker-stack/cg-iptc/favicon_io (5)/`
- **Destination:** `/opt/docker-stack/cg-iptc/public/`
- **Footer Design:**
  - Font: Inter (`font-sans`)
  - Size: `text-xs` or `text-sm`
  - Color: `text-zinc-500`
  - Border: `border-t border-zinc-100`
  - Padding: `py-8`
  - Layout: Flex center

## Tasks/Subtasks

### 1. Asset Migration
- [x] Move assets from source folder to public root
- [x] Verify file permissions and existence

### 2. SEO & Metadata Update
- [x] Update `app/layout.tsx` metadata object
- [x] Configure `metadataBase`
- [x] Configure `openGraph` images
- [x] Configure `twitter` images
- [x] Configure `icons` (favicon, apple, shortcut)
- [x] Add `manifest` link

### 3. Footer Implementation
- [x] Create `components/layout/Footer.tsx`
- [x] Implement footer styling and content per AC
- [x] Write unit test for Footer component

### 4. Layout Integration
- [x] Update `components/layout/LayoutShell.tsx` to include Footer
- [x] Verify footer placement at bottom of page

## Dev Agent Record

### Implementation Plan
- [x] Step 1: Asset Migration
- [x] Step 2: Metadata Update
- [x] Step 3: Footer Component
- [x] Step 4: Integration

### Completion Notes
- Moved all favicon and social assets to `public/`
- Configured comprehensive SEO metadata in `app/layout.tsx`
- Created and integrated official Footer component
- Verified build success

## File List
- public/android-chrome-192x192.png
- public/android-chrome-512x512.png
- public/apple-touch-icon.png
- public/cg-iptc.png
- public/favicon-16x16.png
- public/favicon-32x32.png
- public/favicon.ico
- public/site.webmanifest
- app/layout.tsx
- components/layout/Footer.tsx
- components/layout/LayoutShell.tsx

## Change Log
- 2025-12-19: Migrated assets, updated metadata, added Footer (Brotherlegend)
- 2025-12-19: Fixed OG image override and shortened SEO titles (Brotherlegend)
