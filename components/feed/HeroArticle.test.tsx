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
    previewContent: '<p>This is the preview content.</p>',
    isTruncated: true,
    summary: 'This is the article summary.',
    image: 'https://example.com/image.jpg',
    guid: 'test-guid-123',
  };

  afterEach(() => {
    cleanup();
  });

  it('[P0] renders the article title', () => {
    // GIVEN: HeroArticle with mock article data
    render(<HeroArticle article={mockArticle} />);

    // THEN: Title is displayed in h1 heading
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Article Title');
  });

  it('[P0] renders the formatted date', () => {
    // GIVEN: HeroArticle with valid RFC 2822 date
    render(<HeroArticle article={mockArticle} />);

    // THEN: Date is formatted as long format (e.g., "December 9, 2024")
    const timeElement = screen.getByRole('time');
    expect(timeElement).toHaveTextContent(/December 9, 2024/i);
  });

  it('[P1] renders the article summary', () => {
    // GIVEN: HeroArticle with summary text
    render(<HeroArticle article={mockArticle} />);

    // THEN: Summary is displayed
    expect(screen.getByText('This is the article summary.')).toBeInTheDocument();
  });

  it('[P1] renders the featured image when provided', () => {
    // GIVEN: HeroArticle with image URL
    render(<HeroArticle article={mockArticle} />);

    // THEN: Image is rendered with correct src and alt text
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(image).toHaveAttribute('alt', 'Featured image for Test Article Title');
  });

  it('[P1] does not render image when not provided', () => {
    // GIVEN: HeroArticle without image
    const articleWithoutImage = { ...mockArticle, image: undefined };
    render(<HeroArticle article={articleWithoutImage} />);

    // THEN: No image element is present
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('[P1] renders Read More link to Substack when expanded', () => {
    // GIVEN: HeroArticle with truncated content
    render(<HeroArticle article={mockArticle} />);

    // WHEN: User expands the preview
    fireEvent.click(screen.getByRole('button', { name: /Show preview/i }));

    // THEN: Substack link is displayed with correct attributes
    const substackLink = screen.getByRole('link', { name: /Read full article on Substack/i });
    expect(substackLink).toHaveAttribute('href', 'https://test.substack.com/p/test-article');
  });

  it('[P1] title links to the article', () => {
    // GIVEN: HeroArticle with article link
    render(<HeroArticle article={mockArticle} />);

    // THEN: Title is wrapped in link to Substack article
    const links = screen.getAllByRole('link');
    const titleLink = links.find(link => link.querySelector('h1'));
    expect(titleLink).toHaveAttribute('href', 'https://test.substack.com/p/test-article');
  });

  it('[P2] applies newspaper styling classes', () => {
    // GIVEN: HeroArticle component
    render(<HeroArticle article={mockArticle} />);

    // THEN: Heading uses serif font and correct text color
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading.className).toContain('font-serif');
    expect(heading.className).toContain('text-zinc-900');
  });

  it('[P0] handles invalid date gracefully', () => {
    // GIVEN: HeroArticle with invalid date string
    const articleWithBadDate = { ...mockArticle, pubDate: 'invalid-date-string' };
    render(<HeroArticle article={articleWithBadDate} />);

    // THEN: Fallback text is displayed instead of crashing
    const timeElement = screen.getByRole('time');
    expect(timeElement).toHaveTextContent('Date unavailable');
  });

  it('[P1] title link opens article on Substack', () => {
    // GIVEN: HeroArticle with external link
    render(<HeroArticle article={mockArticle} />);

    // THEN: Title link opens in new tab
    const titleLink = screen.getByRole('link', { name: /Test Article Title/i });
    expect(titleLink).toHaveAttribute('href', 'https://test.substack.com/p/test-article');
    expect(titleLink).toHaveAttribute('target', '_blank');
  });

  it('[P1] article has aria-labelledby pointing to title', () => {
    // GIVEN: HeroArticle for accessibility
    const { container } = render(<HeroArticle article={mockArticle} />);

    // THEN: Article element references title for screen readers
    const article = container.querySelector('article');
    expect(article).toHaveAttribute('aria-labelledby', 'hero-article-title');

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveAttribute('id', 'hero-article-title');
  });

  // Collapsible content behavior tests
  describe('collapsible content', () => {
    it('[P1] shows "Show preview" button when content is truncated', () => {
      // GIVEN: HeroArticle with truncated content
      render(<HeroArticle article={mockArticle} />);

      // THEN: Toggle button is present
      expect(screen.getByRole('button', { name: /Show preview/i })).toBeInTheDocument();
    });

    it('[P1] does NOT show toggle button when NOT truncated', () => {
      // GIVEN: HeroArticle with non-truncated content
      const nonTruncated = { ...mockArticle, isTruncated: false };
      render(<HeroArticle article={nonTruncated} />);

      // THEN: Toggle button is NOT present
      expect(screen.queryByRole('button', { name: /Show preview/i })).not.toBeInTheDocument();
    });

    it('[P1] expands content when Show preview is clicked', () => {
      // GIVEN: HeroArticle in collapsed state
      render(<HeroArticle article={mockArticle} />);

      // WHEN: User clicks the toggle button
      const toggleButton = screen.getByRole('button', { name: /Show preview/i });
      fireEvent.click(toggleButton);

      // THEN: Button text changes
      expect(screen.getByRole('button', { name: /Collapse preview/i })).toBeInTheDocument();
      
      // AND: Full content is displayed
      expect(screen.getByText('This is the full article content.')).toBeInTheDocument();
    });

    it('[P1] collapses content when clicked again', () => {
      // GIVEN: HeroArticle component
      render(<HeroArticle article={mockArticle} />);
      const toggleButton = screen.getByRole('button', { name: /Show preview/i });

      // WHEN: User expands then collapses
      fireEvent.click(toggleButton);
      expect(screen.getByRole('button', { name: /Collapse preview/i })).toBeInTheDocument();
      fireEvent.click(screen.getByRole('button', { name: /Collapse preview/i }));

      // THEN: Content returns to collapsed state
      expect(screen.getByRole('button', { name: /Show preview/i })).toBeInTheDocument();
      expect(screen.getByText('This is the preview content.')).toBeInTheDocument();
    });
  });
});