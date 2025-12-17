import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with default title and message', () => {
    render(<EmptyState />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('No Articles Yet');
    expect(screen.getByText('Check back soon for the latest content.')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    render(<EmptyState title="Custom Title" />);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Custom Title');
  });

  it('renders with custom message', () => {
    render(<EmptyState message="Custom message here." />);

    expect(screen.getByText('Custom message here.')).toBeInTheDocument();
  });

  it('renders the icon', () => {
    render(<EmptyState />);

    // The FileQuestion icon should be present (SVG element)
    const container = document.querySelector('svg');
    expect(container).toBeInTheDocument();
  });

  it('applies newspaper styling', () => {
    render(<EmptyState />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.className).toContain('font-serif');
    expect(heading.className).toContain('text-zinc-900');
  });
});
