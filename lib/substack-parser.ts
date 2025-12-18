import { SubstackFeed, SubstackItem } from '@/types/substack';
import DOMPurify from 'isomorphic-dompurify';
import { JSDOM } from 'jsdom';

// Default Substack feed URL - can be overridden
const DEFAULT_FEED_URL = 'https://mironjclaygilmore.substack.com/feed';

/**
 * Fetches the Substack RSS feed from the given URL.
 *
 * @param url - The RSS feed URL. Defaults to cgiptc.substack.com/feed.
 * @returns Parsed SubstackFeed object.
 * @throws Error if fetch fails or parsing fails.
 */
export async function fetchSubstackFeed(url: string = DEFAULT_FEED_URL): Promise<SubstackFeed> {
    const response = await fetch(url, {
        headers: {
            'Accept': 'application/rss+xml, application/xml, text/xml',
        },
        // Cache for build time, revalidate never (static export)
        next: { revalidate: false },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }

    const xml = await response.text();
    return parseSubstackFeed(xml);
}

/**
 * Fetches the latest article from the Substack feed.
 * Returns null if no articles are found.
 *
 * @param url - The RSS feed URL. Defaults to cgiptc.substack.com/feed.
 * @returns The latest SubstackItem or null.
 */
export async function fetchLatestArticle(url: string = DEFAULT_FEED_URL): Promise<SubstackItem | null> {
    try {
        const feed = await fetchSubstackFeed(url);
        return feed.items[0] || null;
    } catch (error) {
        // Only log in development to avoid polluting production logs
        if (process.env.NODE_ENV === 'development') {
            console.error('Failed to fetch latest article:', error);
        }
        return null;
    }
}

/**
 * Parses a Substack RSS feed XML string into a structured object.
 * 
 * @param xml - The raw XML string from the RSS feed.
 * @returns Parsed SubstackFeed object.
 * @throws Error if parsing fails or feed is invalid.
 */
export function parseSubstackFeed(xml: string): SubstackFeed {
    // Use jsdom for server-side parsing compatibility (Vitest/Node)
    // In a real browser environment, we might use native DOMParser, 
    // but since this might run in SSG or test envs, JSDOM is safer for consistency.
    const dom = new JSDOM(xml, { contentType: 'text/xml' });
    const doc = dom.window.document;

    const channel = doc.querySelector('channel');
    if (!channel) {
        throw new Error('Invalid RSS feed: Missing <channel> element');
    }

    const title = channel.querySelector('title')?.textContent || '';
    const description = channel.querySelector('description')?.textContent || '';
    const lastBuildDate = channel.querySelector('lastBuildDate')?.textContent || '';

    const items = Array.from(doc.querySelectorAll('item')).map((item: Element) => {
        const itemTitle = item.querySelector('title')?.textContent || '';
        const itemLink = item.querySelector('link')?.textContent || '';
        const pubDate = item.querySelector('pubDate')?.textContent || '';
        const guid = item.querySelector('guid')?.textContent || '';

        // content:encoded is often in a CDATA section
        const contentEncoded = item.getElementsByTagName('content:encoded')[0]?.textContent || '';
        const description = item.querySelector('description')?.textContent || '';

        // Prioritize content:encoded, fallback to description
        const rawContent = contentEncoded || description;

        // Sanitize content to prevent XSS
        // isomorphic-dompurify handles the window context automatically
        const sanitizedContent = DOMPurify.sanitize(rawContent);

        // Extract image from enclosure if available
        const enclosure = item.querySelector('enclosure');
        let image = enclosure?.getAttribute('url') || undefined;

        // If no enclosure, try to find first image in content
        if (!image && rawContent) {
            const imgMatch = rawContent.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) {
                image = imgMatch[1];
            }
        }

        return {
            title: itemTitle,
            link: itemLink,
            pubDate,
            content: sanitizedContent,
            summary: description, // Keep raw description as summary
            image,
            guid,
        } as SubstackItem;
    });

    return {
        title,
        description,
        items,
        lastBuildDate,
    };
}
