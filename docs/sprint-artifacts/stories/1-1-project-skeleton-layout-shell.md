# Story 1.1: Project Skeleton & Layout Shell

Status: ready-for-dev

## Story

As a **Visitor**,
I want to **view the site on any device with a consistent layout**,
so that **I can access content easily whether I am on mobile or desktop**.

## Acceptance Criteria

1.  **Desktop Split-Brain Layout:**
    *   **Given** I access the root URL via a Desktop browser
    *   **When** the page loads
    *   **Then** I see the "Split-Brain" layout shell (left pane for Content, right pane placeholder for Graph)
    *   **And** I see a global Navbar with "Log" and "Graph" toggles (even if non-functional)

2.  **Mobile Reader-First Layout:**
    *   **Given** I access the root URL via a Consumer Mobile device (iPhone)
    *   **When** the page loads
    *   **Then** I see the "Reader-First" layout (full width content)
    *   **And** I see a Floating Action Button (FAB) for the Graph at the bottom right

3.  **Graph Drawer Interaction:**
    *   **Given** I am on mobile
    *   **When** I tap the FAB
    *   **Then** the Graph Drawer opens (using a Sheet/Drawer component)

## Developer Context

### Architecture & Tech Stack
*   **Framework:** Next.js (App Router)
*   **Styling:** Tailwind CSS
*   **Split View:** `allotment` (React Split Pane)
*   **UI Primitives:** Shadcn UI (Sheet/Drawer for Mobile Graph, Dialogs)
*   **Icons:** `lucide-react`
*   **State:** URL-driven state for view modes (optional for this story, but prep for it)

### Visual Design (Tech-Noir)
*   **Backgrounds:** `bg-zinc-950` (Main), `bg-zinc-900` (Panels)
*   **Accents:** `text-amber-600`, `border-amber-600/20`
*   **Typography:** `Instrument Serif` (Headings), `Inter` (UI/Body)

### Component Structure
The following structure is recommended for this story:

```text
src/
├── app/
│   ├── layout.tsx        # Root layout with ThemeProvider/Fonts
│   └── page.tsx          # Home page (renders LayoutShell)
├── components/
│   ├── layout/
│   │   ├── LayoutShell.tsx   # Orchestrates Desktop vs Mobile (useMedia or CSS hidden)
│   │   ├── SplitShell.tsx    # Desktop "Split-Brain" implementation (Allotment)
│   │   ├── Navbar.tsx        # Global navigation
│   │   └── GraphDrawer.tsx   # Mobile specific drawer for Graph
│   └── ui/                   # Shadcn primitives (Sheet, Button, etc.)
```

## Tasks / Subtasks

- [x] Task 1: Project Initialization & Fonts (AC 1)
  - [x] Initialize/Verify Next.js + Tailwind setup
  - [x] Configure `Instrument Serif` and `Inter` fonts in `layout.tsx`
  - [x] Verify Tech-Noir theme variables (Zinc-950/Amber-600)

- [x] Task 2: Core Dependencies & UI Primitives (AC 1, 3)
  - [x] Install `allotment`, `lucide-react`, `clsx`, `tailwind-merge`
  - [x] Initialize shadcn/ui and add `sheet` component
  - [x] Verify `components/ui/sheet.tsx` exists

- [x] Task 3: Global Navbar (AC 1)
  - [x] Create `components/layout/Navbar.tsx`
  - [x] Implement sticky header with Logo, Log, and Graph toggles
  - [x] Style with Tech-Noir aesthetic (border-b-amber-600/20)

- [x] Task 4: Responsive Layout Shell (AC 1, 2)
  - [x] Create `components/layout/LayoutShell.tsx` logic
  - [x] Create `components/layout/SplitShell.tsx` for Desktop (Allotment)
  - [x] Create `components/layout/GraphDrawer.tsx` for Mobile (Sheet)
  - [x] Implement FAB for Mobile Graph trigger (AC 2, 3)
  - [x] Verify responsive switching behavior (Desktop vs Mobile)

## Dev Agent Record

### File List
### Change Log

### Implementation Steps (Suggested)
1.  **Initialize:** Ensure Next.js + Tailwind is running cleanly.
2.  **Fonts:** Configure `Instrument Serif` and `Inter` in `layout.tsx`.
3.  **Dependencies:** Install `allotment`, `lucide-react`, `clsx`, `tailwind-merge`.
4.  **UI:** Install Shadcn Sheet component (`npx shadcn@latest add sheet`).
5.  **Navbar:** Build simple sticky navbar using "Tech-Noir" aesthetics.
6.  **LayoutShell:** Create the responsive logic.
    *   *Desktop:* Render `SplitShell`.
    *   *Mobile:* Render Content + FAB.
7.  **SplitShell:** Implement `Allotment` pane. Left = Feed (50%), Right = Graph (50%).
8.  **GraphDrawer:** Implement FAB that opens a Sheet containing the Graph placeholder.

### References
*   [Architecture: Component Strategy](docs/architecture.md)
*   [UX Design: Responsive Strategy](docs/ux-design-specification.md)
