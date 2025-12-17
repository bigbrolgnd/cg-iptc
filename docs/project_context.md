---
project_name: 'cg-iptc'
user_name: 'Brotherlegend'
date: '2025-12-10'
sections_completed: ['technology_stack', 'tech_versions', 'language_rules', 'framework_rules', 'testing_rules', 'code_quality_rules', 'workflow_rules', 'critical_rules']
status: 'complete'
rule_count: 30
optimized_for_llm: true
existing_patterns_found: 4
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

_Documented after discovery phase_

## Technology Stack & Versions

-   **Framework:** Next.js 15+ (App Router, Turbopack)
-   **Language:** TypeScript 5+ (Strict Mode)
-   **Styling:** Tailwind CSS 3.4+
-   **State/Data:**
    -   `swr` (Latest) for client fetching
    -   `nuqs` (Latest) for URL state
-   **Visualization:** `airbnb/visx` (Latest)
-   **Package Manager:** `npm`

### Language-Specific Rules (TypeScript)

-   **Strict Mode:** `strict: true` is mandatory. No `any` types allowed implies interfaces for all data structures.
-   **Import Patterns:**
    -   Use `import type { ... }` for type-only imports (Critical for tree-shaking).
    -   Use `@/` alias for all internal imports (e.g., `@/components/ui/button`).
    -   **Avoid:** Relative paths like `../../` for anything deeper than one level.
-   **Export Patterns:**
    -   Use **Named Exports** for components (`export function Button...`) to ensure consistent naming.
    -   **Avoid:** `export default` (except for Next.js Pages/Layouts where required).
-   **Async Patterns:**
    -   Server Components: Use `async/await` directly.
    -   Client Components: NEVER use `async` on the component function itself. Use `useSWR` or `useEffect`.

### Framework-Specific Rules (Next.js & React)

-   **Component Architecture:**
    -   **Server Components (Default):** All components in `app/` are Server Components by default. Use them for data fetching where possible (though our specific Hybrid-SSG architecture relies heavily on Client Components for Feeds).
    -   **Client Components:** Must explicitly add `'use client'` at the top of the file if using Hooks (`useState`, `useEffect`, `useSWR`) or Event Listeners.
-   **Data Fetching (Hybrid Strategy):**
    -   **Static Content:** Use `async` Server Components in `app/page.tsx` for build-time generation.
    -   **Dynamic Feeds:** Use `useSWR` in Client Components (`components/features/`) for runtime fetching (Substack/YouTube). **NEVER** use `useEffect` for data fetching; use `swr`.
-   **Styling (Tailwind):**
    -   Use `clsx` or `cn` (shadcn utility) for conditional classes.
    -   **Avoid:** Inline styles or CSS modules. Tailwind utility classes ONLY.
-   **Next.js 15 Specifics:**
    -   `params` and `searchParams` in Page props are now **Promises**. You MUST `await` them before using.

### Testing Rules

-   **Test Framework:** Vitest (Native Vite integration, faster than Jest).
-   **Unit Testing:**
    -   **Mandatory:** For all `lib/` utilities, especially `substack-parser.ts`.
    -   **Focus:** Edge cases (empty feeds, malformed XML, regex safety).
-   **Component Testing:**
    -   Use `@testing-library/react`.
    -   **Focus:** "Happy Path" rendering for Data Viz components to ensure they don't crash.
-   **Mocking:**
    -   Mock `useSWR` responses for component tests. **NEVER** make real network requests in tests.
    -   Use `msw` (Mock Service Worker) if complex API mocking is required later.

### Code Quality & Style Rules

-   **Linting & Formatting:**
    -   Follow `eslint-config-next` defaults.
    -   Prettier: Single quotes, trailing commas, 2-space indentation.
-   **Atomic Design Structure (Strict):**
    -   **components/atoms/**: Base elements (Buttons, Inputs, Icons). No business logic.
    -   **components/molecules/**: Simple groups (SearchForm, NavLink). Local UI state only.
    -   **components/organisms/**: Complex sections (Navbar, ArticleCard). Can fetch data/contain features.
    -   **components/templates/**: Repetitive page layouts (Grid layouts, Sidebar wrappers).
    -   **components/features/**: Domain-specific ecosystems (e.g., `SubstackFeed`) that compose organisms.
-   **Naming Conventions:**
    -   Components: `PascalCase.tsx` (match export name).
    -   Utilities: `kebab-case.ts`.
    -   Constants: `UPPER_SNAKE_CASE`.
-   **Documentation:**
    -   **Complex Logic:** JSDoc required for all `lib/` functions explaning inputs/outputs.
    -   **UI:** Self-documenting code preferred. Comments only for "Why", not "What".

### Development Workflow Rules

-   **Version Control:**
    -   **Branching:** Use `feature/name` or `fix/issue-name`.
    -   **Commits:** Conventional Commits are **mandatory** (e.g., `feat: add atomic button`, `fix: substack regex`).
-   **PR Process:**
    -   Self-review before requesting review.
    -   Ensure `npm run build` passes locally before push (Next.js build errors are strictly build-time).
-   **Deployment:**
    -   Push to `main` triggers Vercel Production deployment.
    -   Push to `feature/*` triggers Vercel Preview.

### Critical Don't-Miss Rules (Anti-Patterns & Safety)

-   **Hydration Errors:**
    -   **Never** use `window` or `document` in the main body of a component. Use `useEffect`.
    -   **Never** render random data (Date.now(), Math.random()) directly in JSX unless inside a `useEffect` or behind a `suppressHydrationWarning`.
-   **Resilience & Failure Modes:**
    -   **Mandatory Error Boundaries:** All `components/features/*` MUST be wrapped in an Error Boundary. If Substack fails, the rest of the site must survive.
    -   **API Rate Limiting:** `swr` configurations must handle 429 errors gracefully (no infinite retry loops).
    -   **Feed Sanitization:** All HTML parsed from RSS MUST be sanitized with `dompurify` before rendering to prevent XSS and layout breakage.
-   **Architecture Violations:**
    -   **Dependency Direction:** Atoms -> Molecules -> Organisms -> Features. Never import upwards.
    -   **Dependency Direction:** Atoms -> Molecules -> Organisms -> Features. Never import upwards.
    -   **No SSR for Feeds:** Never fetch RSS in `generateStaticParams` or Server Components. It breaks Static Export reliability.

---

## Usage Guidelines

**For AI Agents:**

-   Read this file before implementing any code
-   Follow ALL rules exactly as documented
-   When in doubt, prefer the more restrictive option
-   Update this file if new patterns emerge

**For Humans:**

-   Keep this file lean and focused on agent needs
-   Update when technology stack changes
-   Review quarterly for outdated rules
-   Remove rules that become obvious over time

Last Updated: 2025-12-10

## Critical Implementation Rules

_Documented after discovery phase_
