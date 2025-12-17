import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { HeroArticle } from './HeroArticle';
import { SubstackItem } from '@/types/substack';

describe('HeroArticle', () => {
  const mockArticle: SubstackItem = {
    title: 'Test Article Title',
    link: 'https://test.substack.com/p/test-article',
    pubDate: 'Mon, 09 Dec 2024 10:00:00 GMT',
    content: '<p>This is the full article content.</p>',
    summary: 'This is the article summary.',
    image: 'https://example.com/image.jpg',
    guid: 'test-guid-123',
  };

  afterEach(() => {
    cleanup();
  });

  it('renders the article title', () => {
    render(<HeroArticle article={mockArticle} />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Article Title');
  });

  it('renders the formatted date', () => {
    render(<HeroArticle article={mockArticle} />);

    // Date should be formatted as "December 9, 2024"
    const timeElement = screen.getByRole('time');
    expect(timeElement).toHaveTextContent(/December 9, 2024/i);
  });

  it('renders the article summary', () => {
    render(<HeroArticle article={mockArticle} />);

    expect(screen.getByText('This is the article summary.')).toBeInTheDocument();
  });

  it('renders the featured image when provided', () => {
    render(<HeroArticle article={mockArticle} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Featured image for Test Article Title');
  });

  it('does not render image when not provided', () => {
    const articleWithoutImage = { ...mockArticle, image: undefined };
    render(<HeroArticle article={articleWithoutImage} />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders Read More link to Substack when expanded with long content', () => {
    // Create content with 600 words to trigger truncation
    const words = Array(600).fill('word').join(' ');
    const longArticle = { ...mockArticle, content: `<p>${words}</p>` };
    render(<HeroArticle article={longArticle} />);

    // Expand to see the Substack link
    fireEvent.click(screen.getByRole('button', { name: /Show preview/i }));

    const substackLink = screen.getByRole('link', { name: /Read full article on Substack/i });
    expect(substackLink).toHaveAttribute('href', 'https://test.substack.com/p/test-article');
    expect(substackLink).toHaveAttribute('target', '_blank');
    expect(substackLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('title links to the article', () => {
    render(<HeroArticle article={mockArticle} />);

    // Get all links and find the one wrapping the title (it has the heading inside)
    const links = screen.getAllByRole('link');
    const titleLink = links.find(link => link.querySelector('h1'));
    expect(titleLink).toHaveAttribute('href', 'https://test.substack.com/p/test-article');
  });

  it('applies newspaper styling classes', () => {
    render(<HeroArticle article={mockArticle} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.className).toContain('font-serif');
    expect(heading.className).toContain('text-zinc-900');
  });

  it('handles invalid date gracefully', () => {
    const articleWithBadDate = { ...mockArticle, pubDate: 'invalid-date-string' };
    render(<HeroArticle article={articleWithBadDate} />);

    const timeElement = screen.getByRole('time');
    expect(timeElement).toHaveTextContent('Date unavailable');
  });

  it('handles empty date gracefully', () => {
    const articleWithEmptyDate = { ...mockArticle, pubDate: '' };
    render(<HeroArticle article={articleWithEmptyDate} />);

    const timeElement = screen.getByRole('time');
    expect(timeElement).toHaveTextContent('Date unavailable');
  });

  it('title link opens article on Substack', () => {
    render(<HeroArticle article={mockArticle} />);

    // Title is a link to the article
    const titleLink = screen.getByRole('link', { name: /Test Article Title/i });
    expect(titleLink).toHaveAttribute('href', 'https://test.substack.com/p/test-article');
    expect(titleLink).toHaveAttribute('target', '_blank');
  });

  it('article has aria-labelledby pointing to title', () => {
    const { container } = render(<HeroArticle article={mockArticle} />);

    const article = container.querySelector('article');
    expect(article).toHaveAttribute('aria-labelledby', 'hero-article-title');

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveAttribute('id', 'hero-article-title');
  });

  // New tests for collapsible behavior
  describe('collapsible content', () => {
    it('shows "Show preview" button when content exists', () => {
      render(<HeroArticle article={mockArticle} />);

      expect(screen.getByRole('button', { name: /Show preview/i })).toBeInTheDocument();
    });

    it('content is hidden by default', () => {
      render(<HeroArticle article={mockArticle} />);

      const contentArea = document.getElementById('article-content');
      expect(contentArea).toHaveClass('max-h-0');
    });

    it('expands content when Show preview is clicked', () => {
      render(<HeroArticle article={mockArticle} />);

      const toggleButton = screen.getByRole('button', { name: /Show preview/i });
      fireEvent.click(toggleButton);

      // Button text should change
      expect(screen.getByRole('button', { name: /Collapse preview/i })).toBeInTheDocument();

      // Content should be visible
      const contentArea = document.getElementById('article-content');
      expect(contentArea).toHaveClass('max-h-[5000px]');
    });

    it('collapses content when clicked again', () => {
      render(<HeroArticle article={mockArticle} />);

      const toggleButton = screen.getByRole('button', { name: /Show preview/i });

      // Expand
      fireEvent.click(toggleButton);
      expect(screen.getByRole('button', { name: /Collapse preview/i })).toBeInTheDocument();

      // Collapse
      fireEvent.click(screen.getByRole('button', { name: /Collapse preview/i }));
      expect(screen.getByRole('button', { name: /Show preview/i })).toBeInTheDocument();
    });

    it('toggle button has correct aria-expanded attribute', () => {
      render(<HeroArticle article={mockArticle} />);

      const toggleButton = screen.getByRole('button', { name: /Show preview/i });
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(toggleButton);
      expect(screen.getByRole('button', { name: /Collapse preview/i })).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('content truncation', () => {
    it('shows full content for short articles (under 500 words)', () => {
      render(<HeroArticle article={mockArticle} />);

      // Expand to see content
      fireEvent.click(screen.getByRole('button', { name: /Show preview/i }));

      expect(screen.getByText('This is the full article content.')).toBeInTheDocument();
    });

    it('shows first 500 words then Substack link for long articles', () => {
      // Create content with 600 words
      const words = Array(600).fill('word').join(' ');
      const longContent = `<p>${words}</p>`;
      const longArticle = { ...mockArticle, content: longContent };
      render(<HeroArticle article={longArticle} />);

      // Expand to see content
      fireEvent.click(screen.getByRole('button', { name: /Show preview/i }));

      // Should show truncated content with ellipsis
      expect(screen.getByText(/word word word.*\.\.\./)).toBeInTheDocument();

      // Should show continue reading message
      expect(screen.getByText(/Continue reading the full article on Substack/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Read full article on Substack/i })).toBeInTheDocument();
    });
  });
});
