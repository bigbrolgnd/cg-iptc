---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
inputDocuments: ['/Users/brotherlegend/Documents/GitHub/cg-iptc/cg-iptc-website/PROJECT_SUMMARY.md']
documentCounts:
  briefs: 0
  research: 0
  brainstorming: 0
  projectDocs: 1
workflowType: 'prd'
lastStep: 11
project_name: 'cg-iptc'
user_name: 'Brotherlegend'
date: '2025-12-10'
---

# Product Requirements Document - cg-iptc

**Author:** Brotherlegend
**Date:** 2025-12-10

## Executive Summary

### Product Vision
The CG-IPTC website will be a premium, dynamic digital hub for the Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency. It challenges the "static academic site" norm by integrating seamless research access, data visualizations with animations, and real-time content feeds from Substack and YouTube. The goal is to create an efficient, "expensive newsletter" aesthetic that elevates top-tier content without reinventing standard usability patterns.

### What Makes This Special
-   **Dynamic Research Visualization:** Seamlessly presents research through animated data visualizations.
-   **Integrated Media Ecosystem:** Unifies disparate content channels (Articles, Substack, YouTube podcasts) into a single, cohesive experience.
-   **Premium "Newsletter" Aesthetic:** Focuses on high-efficiency legibility and visual polish, avoiding the clutter of traditional university portals.

## Project Classification

**Technical Type:** Web Application
**Domain:** Academic / Research Institute
**Complexity:** Medium
**Project Context:** Greenfield - New fully custom frontend implementation.

### Technical & Domain Signals
-   **Detected Signals:** Research data visualization, API integrations (YouTube, Substack), Atomic Design system.
-   **Key Concerns:** Design system consistency (Atomic), Performance (animations/feeds), Responsiveness.

## Success Criteria

### User Success
-   **Discovery:** Users successfully discover new connections via interactive data visualizations and Dr. Gilmore's social/content feeds.
-   **Learning:** Users gain new insights from top-tier research content.
-   **Outcome:** Users subscribe to the Substack or YouTube channel after engaging with content.

### Business Success (Institute)
-   **Growth:** Increase in Substack subscribers.
-   **Growth:** Increase in YouTube subscribers.
-   **Reach:** Increase in article traffic/readership.

### Technical Success
-   **Automation:** 100% automated content pipeline (Substack -> Website, YouTube -> Website) using APIs or n8n.
-   **Performance:** Data visualizations load and animate smoothly without blocking content.

## Product Scope

### MVP - Minimum Viable Product
-   **Automated Content Feeds:**
    -   Latest Substack article automatically featured on homepage.
    -   Substack subscription button integration.
    -   YouTube feed automatically displaying latest episodes.
-   **Interactive Data Visualization:** Core visualization features available at launch.
-   **Atomic Design Implementation:** Fully responsive UI based on new design system.
-   **Automation Infrastructure:** n8n or API workflows configured to populate content.

### Vision (Future)
-   Expanded data visualization library.
-   Deeper archive integration.

## User Journeys

**Journey 1: Dr. Aris - The Researcher (Deep Dive)**
Dr. Aris is writing a paper on the history of cybernetics. She needs credible sources but is tired of navigating clunky university archives. She lands on the CG-IPTC home page. Instead of a boring list of links, she sees an **interactive data visualization** connecting "Counterinsurgency" to "Cybernetics". She clicks a node, and the UI smoothly animates to reveal a curated list of papers. She downloads a PDF, copies the citation instantly, and impressed by the specialized content, subscribes to the Substack to stay updated.

**Journey 2: Sarah - The Grad Student (Learning & Discovery)**
Sarah is scrolling YouTube and finds a "Cybernetics & Society" podcast clip. She's intrigued and clicks the link in the description. She lands instantly on the specific **Video/Podcast page** on the CG-IPTC site. The page (auto-populated by n8n) plays the latest episode and suggests related articles from Dr. Gilmore's Substack. She reads an article, feels like she's found a "secret weapon" for her thesis, and shares the link on Twitter.

**Journey 3: Marcus - The Supporter (Conversion)**
Marcus has been following Dr. Gilmore on Twitter for months. He wants to support the work. He clicks through to the website. The design is premium and authoritative—it feels like a legitimate institution. He sees a clear call-to-action: "Join the Institute via Substack". He clicks, is taken to the Substack subscription page, and becomes a paid subscriber. The website validated the value proposition enough for him to convert.

### Journey Requirements Summary
-   **Interactive Data Viz:** Node-based navigation, smooth animations.
-   **Content Sync:** Automated pages for YouTube videos and Substack articles.
-   **Citation Tools:** One-click citation copying for researchers.
-   **Performance:** Instant load times for social media traffic.
-   **Premium Trust Signals:** High-end design to drive donor/subscriber conversion.

## Web Application Specific Requirements

### Project-Type Overview
Single Page Application (SPA) built with React and Vite. The architecture prioritizes **Visual Excellence** and **SEO** over raw initial load speed, allowing for custom loading states to ensure premium presentation.

### Technical Architecture Considerations
-   **SEO Strategy:** Critical requirement. Implementation via `react-helmet-async` for dynamic meta tags (OpenGraph, Twitter Cards) per article. Sitemap generation required.
-   **Mobile Integration:** "Mobile-First" approach specifically optimized for iOS Safari (Dynamic Island awareness, safe areas). Responsive design must scale gracefully to a "very nice" desktop experience.
-   **Accessibility:** Strict adherence to WCAG 2.1 AA compliance (semantic HTML, aria-labels, contrast ratios).
-   **Performance Strategy:** "Style takes precedence." Custom loading screen authorized to mask asset initialization.
-   **Real-Time Feeds:** High-frequency RSS polling (via n8n or client-side) to ensure Substack/YouTube content appears "instantly".

### Implementation Considerations
-   **Browser Support:** Modern evergreen browsers (Chrome, Safari, Edge, Firefox).
-   **Styling Engine:** Tailwind CSS with atomic architecture.

## Project Scoping & Phased Development

### MVP Strategy & Philosophy
**MVP Approach:** Experience MVP with Hybrid Architecture. The focus is on a premium, automated presentation layer ("Substack Wrapper") that delivers high-value content with maximum SEO performance (SSG) and instant updates (SPA).
**Resource Requirements:** Frontend-heavy team (React/Vite expertise, tailored Data Viz components). No backend auth teams required.

### MVP Feature Set (Phase 1)
**Core User Journeys Supported:**
-   Researcher finding latest work (via Substack Wrapper).
-   Supporter subscribing (via Substack integration).
-   Data explorer interacting with visualizations.

**Must-Have Capabilities:**
-   **Hybrid Architecture:** Static Site Generation (SSG) for core pages (Home, About) for SEO; Client-side fetching for instant Feeds.
-   **Substack Wrapper Molecule:** A reusable component with two modes (Hero/Archive).
-   **Unified Data Viz Component:** A flexible React component framework for consistent visual style.
-   **Automated Feeds:** Zero-touch content updates via the wrappers.
-   **No User Accounts:** Strictly public-facing.

### Post-MVP Features
**Phase 2 (Growth/Expansion):**
-   Expanded Data Viz library.
-   Additional external feed integrations.
*(Note: User accounts and full native archive storage are explicitly out of scope).*

### Risk Mitigation Strategy
-   **Technical Risks:** Dependency on Substack DOM structure. *Mitigation:* Robust error states and structure validation.
-   **Architecture Risks:** Complexity of Hydration in Hybrid apps. *Mitigation:* strict component boundaries between Static and Dynamic parts.

## Functional Requirements

### Content Discovery & Presentation
-   FR1: Users can view the latest Substack article via a custom "Hero" component on the homepage.
-   FR2: Users can view a list of past articles via an "Archive" component.
-   FR3: Users can view the latest YouTube video embedded on a dedicated page.
-   FR4: Users can subscribe to the newsletter via a Substack integration button.

### Data Visualization
-   FR5: Users can interact with a node-based graph visualization to explore research connections.
-   FR6: Users can toggle between different visualization modes (e.g., Graph vs. Map) within the same component.
-   FR7: Users can click on visualization nodes to reveal detailed metadata (citations, links).

### Research Tools
-   FR8: Users can copy citations to the clipboard with a single click.
-   FR9: Users can download linked PDF assets where available.

### System & Automation
-   FR10: System automatically fetches RSS/API data from Substack to update content.
-   FR11: System pre-renders core pages (Home, About) as static HTML (SSG) for SEO.
-   FR12: System hydrates dynamic feed components on the client-side (SPA).

## Non-Functional Requirements

### Performance (Speed & Smoothness)
-   **NFR1 - Core Vital:** Core pages (Home, Article Lists) must achieve a Google Lighthouse Performance score of >90 on desktop (enabled by SSG).
-   **NFR2 - Perceived Speed:** Dynamic content (feeds) must show skeleton loading states immediately upon page load to prevent layout shift (CLS < 0.1).
-   **NFR3 - Animation Fluidity:** Data visualizations must maintain 60FPS interaction on modern devices.

### Accessibility (Inclusivity)
-   **NFR4 - Compliance:** System must meet WCAG 2.1 AA standards.
-   **NFR5 - Keyboard Nav:** All interactive elements (including data viz nodes) must be focusable and navigable via keyboard.
-   **NFR6 - Screen Readers:** All dynamic updates (e.g., loading new feed items) must announce changes via ARIA live regions.

### Security (Privacy & Integrity)
-   **NFR7 - No User Data:** System must NOT store any PII (Personally Identifiable Information). All subscription flows hand off directly to Substack.
-   **NFR8 - Content Integrity:** Automated workflows must sanitize HTML from external feeds before rendering to prevent XSS attacks.

### SEO (Discoverability)
-   **NFR9 - Metadata:** Every article page must statically generating OpenGraph and Twitter Card tags.
