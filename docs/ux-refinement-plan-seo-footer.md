# UX Refinement Plan: SEO, Social, and Footer Polish
**Date:** December 19, 2025
**Author:** Sally (UX Designer)
**Status:** Ready for Dev

## 1. Asset Migration & Setup
We need to ensure the correct branding assets are available in the public directory for the browser and social crawlers to find.

*   **Source:** `/opt/docker-stack/cg-iptc/favicon_io (5)/`
*   **Destination:** `/opt/docker-stack/cg-iptc/public/`
*   **Action:** Move all files (including `cg-iptc.png` and `favicon` assets) to the root of `public/`.

## 2. SEO & Social Metadata (`app/layout.tsx`)
Update the global metadata to ensure links look professional and trustworthy when shared.

*   **Base URL:** Ensure it is hardcoded or reliably set to `https://cg-iptc.org`.
*   **OpenGraph & Twitter Image:**
    *   Update `images` to point to `/cg-iptc.png`.
    *   Ensure `width` and `height` (if known/standard) are appropriate, or just link the url.
*   **Favicons:**
    *   Add the `icons` object to the metadata export.
    *   Map `icon`, `apple`, and `shortcut` to the new files (`/favicon.ico`, `/apple-touch-icon.png`, etc.).
    *   Add `manifest` link to `/site.webmanifest`.

## 3. Footer Implementation (`components/layout/Footer.tsx`)
Add a dedicated footer to anchor the page and provide copyright assurance.

*   **New Component:** Create `components/layout/Footer.tsx`.
*   **Content:**
    > All Rights Reserved 2026 Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency
*   **Visual Style (The "Official" Look):**
    *   **Typography:** Small, uppercase tracking-widest (like the header) OR a dignified serif. Let's go with a **clean, neutral sans-serif (Inter)**, size `text-xs` or `text-sm`, text color `zinc-500`.
    *   **Layout:** Centered vertically and horizontally.
    *   **Container:** Full width, with a subtle `border-t border-zinc-100` to separate it from content.
    *   **Spacing:** `py-8` to give it breathing room.

## 4. Integration (`components/layout/LayoutShell.tsx`)
*   Import `Footer`.
*   Place `<Footer />` at the very bottom of the outer `div` (the `min-h-screen` container), ensuring it sits below the main content flex area.

---

**Dev Note:** This completes the core "Identity" package for the site.
