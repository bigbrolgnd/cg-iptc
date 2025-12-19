import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo', () => {
  afterEach(() => {
    cleanup();
  });

  it('[P1] should render an SVG element', () => {
    // GIVEN: Logo component
    const { container } = render(<Logo />);

    // THEN: SVG element is rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('[P1] should have accessible aria-label', () => {
    // GIVEN: Logo component
    const { container } = render(<Logo />);

    // THEN: SVG has aria-label for accessibility
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Clay-Gilmore Institute Logo');
  });

  it('[P1] should apply custom className when provided', () => {
    // GIVEN: Logo with custom className
    const { container } = render(<Logo className="w-12 h-12 custom-logo" />);

    // THEN: Custom classes are applied to SVG
    const svg = container.querySelector('svg');
    // SVG elements use classList (SVGAnimatedString), not className string
    expect(svg?.classList.contains('w-12')).toBe(true);
    expect(svg?.classList.contains('h-12')).toBe(true);
    expect(svg?.classList.contains('custom-logo')).toBe(true);
  });

  it('[P2] should render SVG paths for logo elements', () => {
    // GIVEN: Logo component
    const { container } = render(<Logo />);

    // THEN: Multiple paths are rendered (gear and head silhouette)
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBeGreaterThanOrEqual(2);

    // All paths should have valid d attributes (non-empty)
    paths.forEach((path) => {
      const d = path.getAttribute('d');
      expect(d).toBeTruthy();
      expect(d!.length).toBeGreaterThan(10); // Meaningful path data
    });
  });

  it('[P2] should have correct viewBox dimensions', () => {
    // GIVEN: Logo component
    const { container } = render(<Logo />);

    // THEN: ViewBox is properly set
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 67.5 67.577');
  });

  it('[P2] should use consistent fill color', () => {
    // GIVEN: Logo component
    const { container } = render(<Logo />);

    // THEN: Paths use the same gray fill color
    const paths = container.querySelectorAll('path');
    paths.forEach(path => {
      expect(path.getAttribute('fill')).toBe('rgb(89,107,119)');
    });
  });

  it('[P2] should have spin animation class on gear', () => {
    // GIVEN: Logo component
    const { container } = render(<Logo />);

    // THEN: Gear group has animation class (check classList for SVG elements)
    const gearGroup = container.querySelector('g');
    // SVG elements use classList; check for animation class pattern
    const hasAnimateClass = Array.from(gearGroup?.classList || []).some(
      (cls) => cls.includes('animate-')
    );
    expect(hasAnimateClass).toBe(true);
  });

  it('[P2] should render without className prop', () => {
    // GIVEN: Logo without className
    const { container } = render(<Logo />);

    // THEN: Still renders correctly
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('[P2] should have nested SVG for head positioning', () => {
    // GIVEN: Logo component
    const { container } = render(<Logo />);

    // THEN: Contains nested SVG for precise positioning
    const nestedSvgs = container.querySelectorAll('svg svg');
    expect(nestedSvgs.length).toBe(1);
  });
});
