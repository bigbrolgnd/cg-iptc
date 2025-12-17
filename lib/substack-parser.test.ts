import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { parseSubstackFeed, fetchSubstackFeed, fetchLatestArticle } from './substack-parser';

describe('parseSubstackFeed', () => {
  it('parses a valid RSS feed correctly', () => {
    const xml = `
      <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
        <channel>
          <title>Test Feed</title>
          <description>A test substack feed</description>
          <lastBuildDate>Mon, 01 Jan 2024 00:00:00 GMT</lastBuildDate>
          <item>
            <title>Test Article</title>
            <link>https://test.substack.com/p/test-article</link>
            <pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate>
            <guid>https://test.substack.com/p/test-article</guid>
            <description>Summary description</description>
            <content:encoded><![CDATA[<p>Full content</p><img src="test.jpg" />]]></content:encoded>
          </item>
        </channel>
      </rss>
    `;

    const feed = parseSubstackFeed(xml);

    expect(feed.title).toBe('Test Feed');
    expect(feed.description).toBe('A test substack feed');
    expect(feed.items).toHaveLength(1);

    const item = feed.items[0];
    expect(item.title).toBe('Test Article');
    expect(item.link).toBe('https://test.substack.com/p/test-article');
    expect(item.content).toContain('<p>Full content</p>');
    // Should extract image from content if no enclosure
    expect(item.image).toBe('test.jpg');
  });

  it('sanitizes malicious content', () => {
    const xml = `
      <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
        <channel>
          <item>
            <title>Malicious Article</title>
            <content:encoded><![CDATA[<p>Safe</p><script>alert('XSS')</script>]]></content:encoded>
          </item>
        </channel>
      </rss>
    `;

    const feed = parseSubstackFeed(xml);
    const item = feed.items[0];

    expect(item.content).toContain('<p>Safe</p>');
    expect(item.content).not.toContain('<script>');
  });

  it('throws error on invalid XML', () => {
    const xml = '<invalid>xml</invalid>';
    expect(() => parseSubstackFeed(xml)).toThrow('Invalid RSS feed');
  });
});

describe('fetchSubstackFeed', () => {
  const mockXml = `
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Test Feed</title>
        <description>Test description</description>
        <item>
          <title>Latest Article</title>
          <link>https://test.substack.com/p/latest</link>
          <pubDate>Mon, 09 Dec 2024 00:00:00 GMT</pubDate>
          <description>Article summary</description>
        </item>
      </channel>
    </rss>
  `;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('fetches and parses RSS feed successfully', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockXml),
    } as Response);

    const feed = await fetchSubstackFeed('https://test.substack.com/feed');

    expect(mockFetch).toHaveBeenCalledWith('https://test.substack.com/feed', expect.any(Object));
    expect(feed.title).toBe('Test Feed');
    expect(feed.items).toHaveLength(1);
    expect(feed.items[0].title).toBe('Latest Article');
  });

  it('throws error on fetch failure', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response);

    await expect(fetchSubstackFeed('https://bad.url/feed')).rejects.toThrow('Failed to fetch RSS feed: 404 Not Found');
  });
});

describe('parseSubstackFeed - edge cases', () => {
  it('handles empty title and content gracefully', () => {
    const xml = `
      <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
        <channel>
          <item>
            <title></title>
            <content:encoded></content:encoded>
          </item>
        </channel>
      </rss>
    `;
    const feed = parseSubstackFeed(xml);
    expect(feed.items[0].title).toBe('');
    expect(feed.items[0].content).toBe('');
  });

  it('sanitizes event handler attributes (XSS prevention)', () => {
    const xml = `
      <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
        <channel>
          <item>
            <title>Test</title>
            <content:encoded><![CDATA[<img src=x onerror="alert('XSS')">]]></content:encoded>
          </item>
        </channel>
      </rss>
    `;
    const feed = parseSubstackFeed(xml);
    expect(feed.items[0].content).not.toContain('onerror');
  });

  it('sanitizes javascript: URLs (XSS prevention)', () => {
    const xml = `
      <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
        <channel>
          <item>
            <title>Test</title>
            <content:encoded><![CDATA[<a href="javascript:alert(1)">Click</a>]]></content:encoded>
          </item>
        </channel>
      </rss>
    `;
    const feed = parseSubstackFeed(xml);
    expect(feed.items[0].content).not.toContain('javascript:');
  });

  it('extracts first image when multiple exist in content', () => {
    const xml = `
      <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
        <channel>
          <item>
            <title>Test</title>
            <content:encoded><![CDATA[<img src="first.jpg" /><img src="second.jpg" />]]></content:encoded>
          </item>
        </channel>
      </rss>
    `;
    const feed = parseSubstackFeed(xml);
    expect(feed.items[0].image).toBe('first.jpg');
  });

  it('prefers enclosure URL over content image', () => {
    const xml = `
      <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
        <channel>
          <item>
            <title>Test</title>
            <enclosure url="enclosure.jpg" type="image/jpeg" />
            <content:encoded><![CDATA[<img src="content.jpg" />]]></content:encoded>
          </item>
        </channel>
      </rss>
    `;
    const feed = parseSubstackFeed(xml);
    expect(feed.items[0].image).toBe('enclosure.jpg');
  });
});

describe('fetchLatestArticle', () => {
  const mockXml = `
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Test Feed</title>
        <item>
          <title>First Article</title>
          <link>https://test.substack.com/p/first</link>
          <pubDate>Mon, 09 Dec 2024 00:00:00 GMT</pubDate>
        </item>
        <item>
          <title>Second Article</title>
          <link>https://test.substack.com/p/second</link>
          <pubDate>Sun, 08 Dec 2024 00:00:00 GMT</pubDate>
        </item>
      </channel>
    </rss>
  `;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the first (latest) article', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(mockXml),
    } as Response);

    const article = await fetchLatestArticle('https://test.substack.com/feed');

    expect(article).not.toBeNull();
    expect(article?.title).toBe('First Article');
  });

  it('returns null when fetch fails', async () => {
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockRejectedValueOnce(new Error('Network error'));

    const article = await fetchLatestArticle('https://bad.url/feed');

    expect(article).toBeNull();
  });

  it('returns null when feed has no items', async () => {
    const emptyFeedXml = `
      <rss version="2.0">
        <channel>
          <title>Empty Feed</title>
        </channel>
      </rss>
    `;
    const mockFetch = vi.mocked(fetch);
    mockFetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(emptyFeedXml),
    } as Response);

    const article = await fetchLatestArticle('https://test.substack.com/feed');

    expect(article).toBeNull();
  });
});
