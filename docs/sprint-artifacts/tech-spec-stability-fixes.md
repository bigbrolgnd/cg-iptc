# Tech-Spec: Stability Fixes & Global Error Handling

**Created:** 2025-12-19
**Status:** Completed

## Overview

### Problem Statement
Users are experiencing a persistent "blank white screen" on `cg-iptc.org`. This occurs consistently for affected users, even after refreshing. This indicates a critical unhandled exception during the initial React render/hydration pass, likely causing the entire component tree to unmount.

### Solution
Implement a multi-layered stability fix:
1.  **Global Error Handling:** Add `app/error.tsx` and `app/global-error.tsx` to catch unhandled errors at the root level and display a user-friendly recovery UI instead of a white screen.
2.  **Hydration Safety:** Fix the `Footer.tsx` date generation to prevent hydration mismatches.
3.  **Component Resilience:** Refactor `HeroArticle.tsx`'s client-side truncation logic to be safer or move it to the server side to avoid complex DOM manipulation during render.
4.  **Data Safety:** Ensure `RecentUpdatesList.tsx` handles invalid dates gracefully.

### Scope (In/Out)
**In:**
-   `app/error.tsx` (Root route error boundary)
-   `app/global-error.tsx` (Global layout error boundary)
-   `components/feed/HeroArticle.tsx` (Refactor truncation)
-   `components/layout/Footer.tsx` (Fix hydration)
-   `components/feed/RecentUpdatesList.tsx` (Safe date formatting)

**Out:**
-   Changes to `substack-parser.ts` (unless critical for data shape)
-   New feature development

## Context for Development

### Codebase Patterns
-   **Next.js App Router:** Uses `error.tsx` convention.
-   **Client Components:** strict usage of `"use client"`.
-   **Error Boundaries:** Explicit `ErrorBoundary` component exists but isn't covering all cases.
-   **Hydration:** Strict prohibition on `window` usage in render body.

### Files to Reference
-   `app/page.tsx`
-   `components/feed/HeroArticle.tsx`
-   `components/layout/Footer.tsx`
-   `components/feed/RecentUpdatesList.tsx`

## Implementation Plan

### Tasks

- [x] **Task 1: Implement Next.js Error UI**
    -   Create `app/error.tsx` with a user-friendly error message and "Try again" button.
    -   Create `app/global-error.tsx` for catching errors in the root layout itself.

- [x] **Task 2: Fix Footer Hydration Mismatch**
    -   Refactor `Footer.tsx` to use a constant year or `useEffect` to set the year, ensuring server/client HTML matches initially.

- [x] **Task 3: Refactor HeroArticle Truncation**
    -   Review `HeroArticle.tsx`. The current `truncateHtmlByWords` logic runs during `useMemo` but does DOM manipulation.
    -   **Approach:** Move truncation logic to a `useEffect` that updates state *after* mount, or (better) perform this truncation in `lib/substack-parser.ts` on the server so the client receives a simple string.
    -   *Decision:* Let's keep it in the component but move it to `useEffect` to ensure it never blocks the initial paint/hydration. Initialize with full content (hidden or limited by CSS) then truncate.
    -   **Alternative (Simpler):** Just use CSS `line-clamp` for the visual truncation and hide the rest! No risky JS DOM manipulation needed.
    -   *Selected Approach:* **Use CSS line-clamp** if possible for the "collapsed" state. However, the requirement is "first 500 words". CSS can't count words.
    -   *Revised Approach:* Move `truncateHtmlByWords` to `lib/substack-parser.ts`. Compute `previewContent` on the server. The client just toggles between `previewContent` and `fullContent`. ZERO client-side DOM manipulation.

- [x] **Task 4: Safe Date Formatting in RecentUpdatesList**
    -   Wrap `new Date(article.pubDate)` in a try/catch or helper function that returns a fallback string if the date is invalid.

### Acceptance Criteria

- [x] **AC 1:** `app/error.tsx` is present and renders a friendly UI when a page-level error is thrown.
- [x] **AC 2:** `Footer.tsx` renders the same HTML on server and client (no hydration warning in console).
- [x] **AC 3:** `HeroArticle.tsx` no longer performs manual DOM manipulation (`document.createElement`) on the client. Truncation is handled safely (e.g. pre-calculated or CSS-based).
- [x] **AC 4:** The "White Screen" is gone. If an error occurs, the Error UI is shown.

## Additional Context

### Dependencies
-   `lucide-react` (icons for error UI)
-   `next/error` (types)

### Testing Strategy
-   **Manual Verification:** Introduce a deliberate error (throw new Error) in `HeroArticle` and verify `app/error.tsx` appears.
-   **Hydration Check:** Check Chrome Console for "Hydration failed" warnings.
