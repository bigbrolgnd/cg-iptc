import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { TwoColumnShell } from './TwoColumnShell';

describe('TwoColumnShell', () => {
  afterEach(() => {
    cleanup();
  });

  it('[P1] should render children in the center column', () => {
    // GIVEN: TwoColumnShell with children
    render(
      <TwoColumnShell>
        <div>Main content</div>
      </TwoColumnShell>
    );

    // THEN: Children are rendered
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('[P1] should render left panel when provided', () => {
    // GIVEN: TwoColumnShell with leftPanel
    render(
      <TwoColumnShell leftPanel={<div>Left sidebar</div>}>
        <div>Main content</div>
      </TwoColumnShell>
    );

    // THEN: Both panels are rendered
    expect(screen.getByText('Left sidebar')).toBeInTheDocument();
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('[P1] should not render left panel when not provided', () => {
    // GIVEN: TwoColumnShell without leftPanel
    const { container } = render(
      <TwoColumnShell>
        <div>Main content only</div>
      </TwoColumnShell>
    );

    // THEN: Only one column is present (no hidden md:block div)
    const hiddenColumn = container.querySelector('.hidden.md\\:block.md\\:col-span-2');
    expect(hiddenColumn).not.toBeInTheDocument();
  });

  it('[P2] should apply correct grid classes', () => {
    // GIVEN: TwoColumnShell
    const { container } = render(
      <TwoColumnShell>
        <div>Content</div>
      </TwoColumnShell>
    );

    // THEN: Grid layout classes are applied
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid?.className).toContain('grid-cols-1');
    expect(grid?.className).toContain('md:grid-cols-12');
  });

  it('[P2] should span full width when no left panel', () => {
    // GIVEN: TwoColumnShell without leftPanel
    const { container } = render(
      <TwoColumnShell>
        <div>Full width content</div>
      </TwoColumnShell>
    );

    // THEN: Center column spans all 12 columns on md+
    const centerColumn = container.querySelector('.md\\:col-span-12');
    expect(centerColumn).toBeInTheDocument();
  });

  it('[P2] should adjust span when left panel exists', () => {
    // GIVEN: TwoColumnShell with leftPanel
    const { container } = render(
      <TwoColumnShell leftPanel={<div>Sidebar</div>}>
        <div>Adjusted content</div>
      </TwoColumnShell>
    );

    // THEN: Center column spans 10 columns (left takes 2)
    const centerColumn = container.querySelector('.md\\:col-span-10');
    expect(centerColumn).toBeInTheDocument();
  });

  it('[P2] should have responsive padding', () => {
    // GIVEN: TwoColumnShell
    const { container } = render(
      <TwoColumnShell>
        <div>Content</div>
      </TwoColumnShell>
    );

    // THEN: Padding classes are applied
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('px-4');
    expect(wrapper).toHaveClass('py-8');
  });

  it('[P2] should constrain max width', () => {
    // GIVEN: TwoColumnShell
    const { container } = render(
      <TwoColumnShell>
        <div>Content</div>
      </TwoColumnShell>
    );

    // THEN: Max width constraint is applied
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('max-w-screen-2xl');
    expect(wrapper).toHaveClass('mx-auto');
  });

  it('[P2] should hide left panel on mobile', () => {
    // GIVEN: TwoColumnShell with leftPanel
    const { container } = render(
      <TwoColumnShell leftPanel={<div>Sidebar</div>}>
        <div>Content</div>
      </TwoColumnShell>
    );

    // THEN: Left panel has hidden class for mobile
    const leftColumn = container.querySelector('.hidden.md\\:block');
    expect(leftColumn).toBeInTheDocument();
  });
});
