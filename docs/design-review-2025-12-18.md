# Design Review: CG-IPTC Website

**Review Date:** 2025-12-18
**URL:** https://cg-iptc.org
**Reviewer:** Claude Code (design-review agent)

---

## Overview

This comprehensive design review examines the Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency (CG-IPTC) website, an academic/research institute web application built with Next.js 15+ as a hybrid static site with dynamic feed integration.

### Design Philosophy Targets
- Premium "newsletter" aesthetic with high-efficiency legibility
- Mobile-first (optimized for iOS Safari)
- WCAG 2.1 AA accessibility compliance
- Web Vitals targets (LCP < 2.5s, CLS < 0.1)

### Typography System
- **Serif:** Source Serif 4 (`--font-serif`)
- **Sans:** Inter (`--font-inter`)
- **Display:** Spectral SC (`--font-spectral-sc`)
- **UI:** Lexend Deca (`--font-lexend`)
- **Headlines:** Oswald (`--font-oswald`)

---

## Files Reviewed

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with typography system |
| `components/layout/Navbar.tsx` | Navigation component |
| `components/layout/LayoutShell.tsx` | Responsive layout wrapper |
| `components/feed/HeroArticle.tsx` | Main content display |
| `components/feed/RecentUpdatesList.tsx` | Sidebar component |
| `components/features/ExhibitionDetail.tsx` | PDF viewer |
| `components/templates/AboutPage.tsx` | About page template |
| `components/ui/Logo.tsx` | Interactive logo |

---

## Findings

### Blockers (2)

#### 1. Non-functional "UPDATES" Navigation Link
**Severity:** Blocker
**Location:** `components/layout/Navbar.tsx`
**Description:** The "UPDATES" navigation link does not function as expected, preventing users from accessing content.
**Recommendation:** Verify the link href and ensure it routes to the correct page or section.

#### 2. Missing Visible Focus States on Navigation
**Severity:** Blocker (WCAG 2.4.7 Violation)
**Location:** `components/layout/Navbar.tsx`
**Description:** Interactive navigation elements lack visible focus indicators, making keyboard navigation impossible for users who rely on it.
**Recommendation:** Add `focus-visible:` Tailwind utilities or custom focus styles to all interactive elements:
```css
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current
```

---

### High Priority (4)

#### 1. Mobile Marquee Lacks Reduced-Motion Support
**Severity:** High
**Location:** Marquee/animation components
**Description:** The mobile marquee animation does not respect `prefers-reduced-motion` user preference, which can cause discomfort or accessibility issues for users with vestibular disorders.
**Recommendation:** Add media query support:
```css
@media (prefers-reduced-motion: reduce) {
  .marquee {
    animation: none;
  }
}
```

#### 2. PDF Viewer Buttons Missing Accessible Labels
**Severity:** High
**Location:** `components/features/ExhibitionDetail.tsx`
**Description:** PDF viewer control buttons lack accessible labels, making them unusable for screen reader users.
**Recommendation:** Add `aria-label` attributes to all icon-only buttons:
```jsx
<button aria-label="Zoom in">...</button>
<button aria-label="Zoom out">...</button>
<button aria-label="Download PDF">...</button>
```

#### 3. Complex Centering Calculations Creating Fragile Positioning
**Severity:** High
**Location:** Layout components
**Description:** Some layout calculations use complex positioning that could break on edge cases or unusual viewport sizes.
**Recommendation:** Simplify centering using Flexbox or Grid with standard alignment properties.

#### 4. "No Recent Updates" Displayed Despite Content Existing
**Severity:** High
**Location:** `components/feed/RecentUpdatesList.tsx`
**Description:** The empty state message is shown even when content exists, indicating a logic error in the feed display condition.
**Recommendation:** Review the conditional rendering logic and ensure proper data flow from the feed parser.

---

### Medium Priority (4)

#### 1. Embedded Substack Widget Styling Conflicts
**Severity:** Medium
**Location:** Feed components
**Description:** The embedded Substack widget introduces styles that conflict with the site's design system.
**Recommendation:** Scope widget styles or use CSS isolation techniques (e.g., Shadow DOM or iframe containment).

#### 2. External Image Dependency Without Fallback
**Severity:** Medium
**Location:** Various components
**Description:** External images from third-party sources have no fallback handling if they fail to load.
**Recommendation:** Add error handling with fallback images or placeholder states:
```jsx
<img
  src={externalUrl}
  onError={(e) => e.target.src = '/fallback.png'}
  alt="..."
/>
```

#### 3. Logo Alt Text Could Be More Descriptive
**Severity:** Medium
**Location:** `components/ui/Logo.tsx`
**Description:** The logo's alt text is generic and could provide more context for screen reader users.
**Recommendation:** Update to: `"Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency logo - return to homepage"`

#### 4. Ambiguous Expand/Collapse Button Text
**Severity:** Medium
**Location:** Various components
**Description:** Expand/collapse buttons use ambiguous text that doesn't communicate state to assistive technology users.
**Recommendation:** Use `aria-expanded` attribute and dynamic labels:
```jsx
<button aria-expanded={isExpanded}>
  {isExpanded ? 'Collapse section' : 'Expand section'}
</button>
```

---

### Nitpicks (5)

1. **Inconsistent spacing** in some component margins
2. **Minor color contrast variations** in secondary text (still passing, but could be improved)
3. **Some Tailwind classes** could be consolidated for cleaner code
4. **Loading skeleton colors** slightly different from final content background
5. **Hover state transitions** inconsistent across different button types

---

## Positive Findings

### Typography Excellence
The five-font typography system is exceptionally well-implemented, creating a sophisticated visual hierarchy that achieves the "premium newsletter" aesthetic goal.

### Strong Visual Hierarchy
Content prioritization is clear, with the hero article commanding attention while supporting elements maintain appropriate visual weight.

### Responsive Layout Success
The layout adapts well across mobile (375px), tablet (768px), and desktop (1440px) viewports.

### Premium Aesthetic Achieved
The overall "expensive newsletter" feel is successfully conveyed through typography choices, whitespace usage, and careful attention to detail.

---

## Recommendations Summary

### Immediate Actions (Blockers)
1. Fix the "UPDATES" navigation link
2. Add visible focus states to all interactive elements

### Short-Term (High Priority)
3. Add `prefers-reduced-motion` support to marquee
4. Add `aria-label` to PDF viewer buttons
5. Simplify complex centering calculations
6. Fix "No recent updates" logic error

### Medium-Term
7. Isolate Substack widget styles
8. Add image fallback handling
9. Improve logo alt text
10. Add `aria-expanded` to toggle buttons

---

## Accessibility Compliance Status

| Criterion | Status | Notes |
|-----------|--------|-------|
| WCAG 2.4.7 Focus Visible | Fail | Missing visible focus indicators |
| WCAG 2.3.3 Animation from Interactions | Partial | Marquee needs reduced-motion support |
| WCAG 1.1.1 Non-text Content | Partial | Some buttons missing labels |
| WCAG 1.4.3 Contrast | Pass | Color contrast meets AA standards |
| WCAG 2.4.4 Link Purpose | Partial | Some links could be clearer |

---

## Conclusion

The CG-IPTC website successfully achieves its design goals of a premium, newsletter-style academic presence. The typography system is particularly well-executed, and the responsive design works effectively across devices.

**Priority Focus:** Address the two blockers (navigation link and focus states) to achieve WCAG 2.1 AA compliance and ensure the site is usable for all visitors. Once these are resolved, the site will be production-ready with excellent user experience across all devices and user needs.
