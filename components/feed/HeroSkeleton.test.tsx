import { describe, it, expect, afterEach } from 'vitest';
import { render, cleanup } from '@testing-library/react';
import { HeroSkeleton } from './HeroSkeleton';

describe('HeroSkeleton', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders skeleton structure', () => {
    const { container } = render(<HeroSkeleton />);

    // Should have an article element
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('applies pulse animation class', () => {
    const { container } = render(<HeroSkeleton />);

    const article = container.querySelector('article');
    expect(article?.className).toContain('animate-pulse');
  });

  it('contains skeleton placeholder elements', () => {
    const { container } = render(<HeroSkeleton />);

    // Should have multiple skeleton placeholder divs with light theme colors
    const skeletonElements = container.querySelectorAll('[class*="bg-zinc-"]');
    expect(skeletonElements.length).toBeGreaterThan(5);
  });

  it('has proper layout structure', () => {
    const { container } = render(<HeroSkeleton />);

    // Should have header
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();

    // Should have content area with px-6 padding
    const paddedDivs = container.querySelectorAll('.px-6');
    expect(paddedDivs.length).toBeGreaterThan(0);
  });

  it('follows responsive sizing', () => {
    const { container } = render(<HeroSkeleton />);

    // Check for responsive classes
    const article = container.querySelector('article');
    expect(article?.className).toContain('max-w-2xl');
    expect(article?.className).toContain('mx-auto');
  });
});
