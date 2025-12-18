# Story 1.4: Production Build & SEO

## Description
As a Platform,
I want the site to be performant and indexable,
So that it ranks well and loads instantly for users (NFR1, NFR9).

## Acceptance Criteria

### Performance
- [ ] **Given** I run a production build, **When** I audit the site with Lighthouse, **Then** I achieve >90 score on Performance, Accessibility, and SEO categories.

### SEO
- [ ] **Given** a social media crawler visits an article link, **When** it parses the page, **Then** it sees correct OpenGraph tags (Title, Description, Image).
- [ ] **And** the content is static HTML (not requiring JS to see meta tags).

## Technical Implementation Notes
- Ensure `next.config.ts` is optimized for export.
- Verify `metadata` export in `layout.tsx` and individual pages.
- Check font loading strategies.
- Verify image optimization strategy.
