import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { RecentUpdatesList } from './RecentUpdatesList';
import { SubstackItem } from '@/types/substack';

const mockArticles: SubstackItem[] = [
  {
    guid: '1',
    title: 'First Article',
    link: 'https://example.substack.com/p/first-article',
    pubDate: '2025-12-15T10:00:00Z',
    summary: 'Summary of first article',
    content: '<p>Content of first article</p>',
    image: null,
  },
  {
    guid: '2',
    title: 'Second Article',
    link: 'https://example.substack.com/p/second-article',
    pubDate: '2025-12-14T10:00:00Z',
    summary: 'Summary of second article',
    content: '<p>Content of second article</p>',
    image: null,
  },
];

describe('RecentUpdatesList', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders empty state when no articles provided', () => {
    render(<RecentUpdatesList articles={[]} />);

    expect(screen.getByText('No recent updates.')).toBeInTheDocument();
  });

  it('renders the Recent Updates heading', () => {
    render(<RecentUpdatesList articles={mockArticles} />);

    expect(screen.getByText('Recent Updates')).toBeInTheDocument();
  });

  it('renders all article titles', () => {
    render(<RecentUpdatesList articles={mockArticles} />);

    expect(screen.getByText('First Article')).toBeInTheDocument();
    expect(screen.getByText('Second Article')).toBeInTheDocument();
  });

  it('renders article links with correct href', () => {
    render(<RecentUpdatesList articles={mockArticles} />);

    const firstLink = screen.getByText('First Article').closest('a');
    expect(firstLink).toHaveAttribute('href', 'https://example.substack.com/p/first-article');
  });

  it('opens links in new tab', () => {
    render(<RecentUpdatesList articles={mockArticles} />);

    const firstLink = screen.getByText('First Article').closest('a');
    expect(firstLink).toHaveAttribute('target', '_blank');
  });

  it('displays formatted dates', () => {
    render(<RecentUpdatesList articles={mockArticles} />);

    // Check that date elements exist (format: "Dec 15", "Dec 14")
    const timeElements = document.querySelectorAll('time');
    expect(timeElements.length).toBe(2);
  });

  it('applies hover styling class for red color', () => {
    render(<RecentUpdatesList articles={mockArticles} />);

    const firstLink = screen.getByText('First Article').closest('a');
    expect(firstLink?.className).toContain('group-hover:text-red-700');
  });
});
