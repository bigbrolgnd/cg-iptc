---
stepsCompleted: [1, 2, 3, 4]
lastStep: 4
inputDocuments: ['docs/prd.md', 'docs/architecture.md', 'docs/ux-design-specification.md']
---

# cg-iptc - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for cg-iptc, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Users can view the latest Substack article via a custom "Hero" component.
FR2: Users can view a list of past articles via an "Archive" component.
FR3: Users can view the latest YouTube video embedded on a dedicated page.
FR4: Users can subscribe to the newsletter via a Substack integration button.
FR5: Users can interact with a node-based graph visualization to explore research connections.
FR6: Users can toggle between different visualization modes within the same component.
FR7: Users can click on visualization nodes to reveal detailed metadata.
FR8: Users can copy citations to the clipboard with a single click.
FR9: Users can download linked PDF assets where available.
FR10: System automatically fetches RSS/API data from Substack to update content.
FR11: System pre-renders core pages (Home, About) as static HTML (SSG) for SEO.
FR12: System hydrates dynamic feed components on the client-side (SPA).

### NonFunctional Requirements

NFR1: Core pages must achieve Lighthouse Performance score >90 (SSG).
NFR2: Dynamic content must show skeleton loading states (CLS < 0.1).
NFR3: Data visualizations must maintain 60FPS interaction.
NFR4: System must meet WCAG 2.1 AA standards.
NFR5: All interactive elements must be focusable via keyboard.
NFR6: Dynamic updates must be announced via ARIA live regions.
NFR7: System must NOT store any PII.
NFR8: Automated workflows must sanitize HTML from external feeds.
NFR9: Every article page must statically generate OpenGraph tags.

### Additional Requirements

**Architecture & Implementation:**
- **Starter Template:** Next.js + Tailwind + TypeScript.
- **Dependency:** Use `swr` for client-side data fetching.
- **Dependency:** Use `airbnb/visx` for Graph visualization.
- **Dependency:** Use `allotment` for Desktop Split View.
- **Dependency:** Use `nuqs` for URL-driven state strings.
- **Dependency:** Use `sonner` for Toast notifications.
- **Graph Schema:** Use the defined `GraphData` JSON schema.
- **Layout:** Implement `SplitShell` to orchestrate Desktop/Mobile views.

**UX & Design:**
- **Theme:** "Tech-Noir" (Zinc-950 background, Amber-600 accent).
- **Typography:** Instrument Serif (Headings) + Inter (UI).
- **Interaction:** "Contextual Pivot" driving Graph <-> Feed sync.
- **Mobile:** "Reader-First" layout with Graph Drawer FAB.

### FR Coverage Map

### FR Coverage Map

FR1: Epic 1 - Latest Substack article (Hero)
FR2: Epic 1 - Article Archive
FR3: Epic 1 - YouTube (via PODCASTS nav link)
FR4: Epic 3 - Substack Subscribe Button
FR5: Epic 2 - Graph Visualization (Visx)
FR6: Epic 2 - Visualization Modes
FR7: Epic 2 - Node Metadata
FR8: Epic 3 - Citation Copy
FR9: Epic 3 - PDF Download
FR10: Epic 1 - Feed Automation
FR11: Epic 1 - SSG Pre-rendering
FR12: Epic 1 - Dynamic Hydration

## Epic List

### Epic 1: Foundation & Discovery (The "Reader")
**Goal:** Users can browse the site, read latest Substack articles, and access YouTube content via navigation with perfect SEO and performance.
**FRs covered:** FR1, FR2, FR3 (via nav link), FR10, FR11, FR12

### Epic 2: Knowledge Graph Integration (The "Context")
**Goal:** Users can explore connections via the "Split-Brain" visualization using the Visx engine.
**FRs covered:** FR5, FR6, FR7

### Epic 3: Research & Conversion Tools (The "Utility")
**Goal:** Users can use the site as a research tool (citations, downloads) and convert to subscribers.
**FRs covered:** FR4, FR8, FR9

---

## Epic 1: Foundation & Discovery (The "Reader")

**Goal:** Users can browse the site, read latest Substack articles, and access YouTube content via navigation with perfect SEO and performance.
**FRs Covered:** FR1, FR2, FR3 (via nav link), FR10, FR11, FR12

### Story 1.1: Project Skeleton & Layout Shell

As a Visitor,
I want to view the site on any device with a consistent layout,
So that I can access content easily whether I am on mobile or desktop.

**Acceptance Criteria:**

**Given** I access the root URL via a Desktop browser
**When** the page loads
**Then** I see the "Split-Brain" layout shell (left pane for Content, right pane placeholder for Graph)
**And** I see a global Navbar with "Log" and "Graph" toggles (even if non-functional)

**Given** I access the root URL via a Consumer Mobile device (iPhone)
**When** the page loads
**Then** I see the "Reader-First" layout (full width content)
**And** I see a Floating Action Button (FAB) for the Graph
**And** interacting with the FAB opens the Graph Drawer

### Story 1.2: Substack Feed Integration (Hero)

As a Reader,
I want to see the latest article immediately when I land on the homepage,
So that I am instantly engaged with the freshest content (FR1).

**Acceptance Criteria:**

**Given** the build process runs
**When** the SSG phase executes
**Then** the system fetches the minimal RSS feed from Substack
**And** generates the Home page with the latest article as the "Hero" component

**Given** I view the Hero component
**When** I look at the article
**Then** I see the Title, Date, and a readable Excerpt/Content
**And** the typography matches the "Instrument Serif" spec

### Story 1.3: Article Archive & Navigation

As a Deep Diver,
I want to browse a list of past articles,
So that I can catch up on previous research (FR2).

**Acceptance Criteria:**

**Given** I am on the Home page
**When** I scroll past the Hero or navigate to "/archive"
**Then** I see a reverse-chronological list of past articles
**And** clicking an item navigates to that article's individual page

**Given** I interact with the Archive
**When** more items are needed
**Then** I can load more via simple pagination or "Load More" button
**And** the transition is smooth (no full page reload)

### Story 1.4: Production Build & SEO

As a Platform,
I want the site to be performant and indexable,
So that it ranks well and loads instantly for users (NFR1, NFR9).

**Acceptance Criteria:**

**Given** I run a production build
**When** I audit the site with Lighthouse
**Then** I achieve >90 score on Performance, Accessibility, and SEO categories

**Given** a social media crawler visits an article link
**When** it parses the page
**Then** it sees correct OpenGraph tags (Title, Description, Image)
**And** the content is static HTML (not requiring JS to see meta tags)

---

## Epic 2: Knowledge Graph Integration (The "Context")

**Goal:** Users can explore connections via the "Split-Brain" visualization using the Visx engine.
**FRs Covered:** FR5, FR6, FR7

### Story 2.1: Graph Engine Core (Visx)

As a Researcher,
I want to see a visual graph of connections in the designated pane,
So that I can understand the relationships between topics (FR5).

**Acceptance Criteria:**

**Given** I am on a Desktop device
**When** the "Graph" pane is visible
**Then** I see a rendered network graph using Visx
**And** the graph contains Nodes and Links based on the provided `GraphData`

**Given** I am interacting with the graph
**When** I zoom or pan
**Then** the interaction is smooth (60fps) and fluid
**And** the nodes remain sharp (Canvas rendering)

### Story 2.2: Node Interaction & Metadata

As a User,
I want to click on a node to see more details,
So that I can explore specific topics of interest (FR7).

**Acceptance Criteria:**

**Given** I see a node in the graph
**When** I hover over the node
**Then** I see a tooltip with the Node Label

**Given** I click on a node
**When** the click registers
**Then** a sophisticated "Popover" or "Sheet" appears
**And** it displays full metadata (Description, Linked Articles, Tags)
**And** the graph highlights the selected node and its direct neighbors

### Story 2.3: Visualization Modes (Local vs. Global)

As an Explorer,
I want to switch between seeing the whole universe and just the local context,
So that I can focus on what matters to me (FR6).

**Acceptance Criteria:**

**Given** I am viewing the graph
**When** I toggle the "View Mode" control (e.g., "Galaxy" vs "Star")
**Then** the graph layout updates to reflect the new mode
**And** "Galaxy" shows all nodes
**And** "Star" focuses only on the currently active context (article or node)

**Given** I change the view mode
**When** I refresh the page
**Then** the URL query parameter reflects the state (e.g., `?view=galaxy`)
**And** the view mode persists

---

## Epic 3: Research & Conversion Tools (The "Utility")

**Goal:** Users can use the site as a research tool (citations, downloads) and convert to subscribers.
**FRs Covered:** FR4, FR8, FR9

### Story 3.1: Substack Conversion

As a User,
I want to easily subscribe to the newsletter,
So that I never miss an update (FR4).

**Acceptance Criteria:**

**Given** I am on any page
**When** I look at the Navbar or the footer of an article
**Then** I see a high-contrast "Subscribe" button

**Given** I click "Subscribe"
**When** the action triggers
**Then** I am either redirected to the Substack subscription page OR a modal appears
**And** the flow is frictionless

### Story 3.2: Smart Citation Tool

As a Researcher,
I want to copy the citation for an article instantly,
So that I can use it in my own work without formatting errors (FR8).

**Acceptance Criteria:**

**Given** I am reading an article
**When** I click the "Cite" button or interaction trigger
**Then** the full citation (APA/Chicago style) is copied to my system clipboard
**And** a Toast notification appears saying "Citation Copied"

### Story 3.3: Asset Downloads (PDF)

As a Daily User,
I want to download the PDF version of a research paper,
So that I can read it offline or annotate it (FR9).

**Acceptance Criteria:**

**Given** an article has an associated PDF asset
**When** I view the article metadata
**Then** I see a "Download PDF" button/icon

**Given** I click the download button
**When** the request is made
**Then** the file begins downloading immediately
**And** the file name is meaningful (e.g., `article-title.pdf`)
