# Story 1.3: Article Archive & Navigation

Status: done

## Story

As a **Deep Diver**,
I want to **browse a list of past articles**,
so that **I can catch up on previous research (FR2)**.

## Acceptance Criteria

1.  **Recent Updates List (Archive):**
    *   **Given** I am on the Home page
    *   **When** I view the left column (or mobile equivalent)
    *   **Then** I see a "Recent Updates" list of past articles
    *   **And** items are listed reverse-chronologically
    *   **And** clicking an item navigates to that article (or Substack source)

2.  **Navigation & Typography:**
    *   **Given** I interact with the global navigation
    *   **Then** links clearly indicate interactivity (Red hover, Pointer cursor)
    *   **And** specific high-value links (e.g., PODCASTS) take me to the correct external resource (YouTube)
    *   **And** the branding uses the correct "Lexend Deca" typography

## Tasks / Subtasks

- [x] Task 1: Navigation Implementation (Navbar)
  - [x] Implement sticky global navbar
  - [x] Configure "Lexend Deca" font for Institute Title
  - [x] Implement "Ticker" mode for Mobile Navigation
  - [x] Link "PODCASTS" to YouTube Playlist
  - [x] Standardize hover states (Text Red-700, Pointer)

- [x] Task 2: Recent Updates List (Archive Component)
  - [x] Create `RecentUpdatesList.tsx`
  - [x] Fetch/Manually list recent articles
  - [x] Apply "Tech-Noir" styling (Zinc-900 text, Red-700 hover)
  - [x] Ensure responsive layout (Left column on desktop)

- [x] Task 3: Visual Refinements (Polishing)
  - [x] Center Article Title in Hero
  - [x] Optimize Hero Image size (max-w-xl) for readability

## Dev Agent Record

### File List
- `app/layout.tsx` - Added Lexend Deca font configuration
- `app/page.tsx` - Integrated RecentUpdatesList with LayoutShell
- `components/feed/HeroArticle.tsx` - Centered title, constrained hero image
- `components/feed/RecentUpdatesList.tsx` - New component for article archive
- `components/feed/RecentUpdatesList.test.tsx` - Tests for RecentUpdatesList
- `components/layout/LayoutShell.tsx` - Integrated TwoColumnShell with recentUpdates prop
- `components/layout/Navbar.tsx` - Sticky nav, ticker mode, PODCASTS link, hover states
- `components/layout/Navbar.test.tsx` - Tests for Navbar component
- `components/layout/TwoColumnShell.tsx` - Two-column responsive layout
- `tailwind.config.ts` - Added lexend font family and marquee animation

### Change Log
- **2025-12-16**:
    -   Standardized all hover states to `text-red-700`.
    -   Updated Institute Title font to `Lexend Deca`.
    -   Linked Podcasts to YouTube.
    -   Refined HeroArticle layout (centered title, constrained image).
- **2025-12-16 (Code Review)**:
    -   Removed unused imports from Navbar.tsx.
    -   Renamed ThreeColumnShell to TwoColumnShell.
    -   Removed stale comment from tailwind.config.ts.
    -   Added File List section to story.
    -   Added tests for RecentUpdatesList and Navbar components.
