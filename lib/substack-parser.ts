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
        const sanitizedContent = DOMPurify.sanitize(rawContent);

        // Clean Substack-specific boilerplate
        const cleanedContent = cleanSubstackContent(sanitizedContent);

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
            content: cleanedContent,
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

/**
 * Removes Substack-specific boilerplate like subscription forms and "Thanks for reading" messages.
 */
function cleanSubstackContent(html: string): string {
    if (!html) return '';

    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // 1. Remove specific subscription forms
    const forms = doc.querySelectorAll('form.subscription-widget-subscribe, .subscription-widget-subscribe');
    forms.forEach(form => form.remove());

    // 2. Remove "Thanks for reading!" boilerplate text
    const targetText = "Thanks for reading! Subscribe for free to receive new posts and support my work.";

    // Search for elements containing this text
    const elements = Array.from(doc.querySelectorAll('p, div, span'));
    elements.forEach(el => {
        if (el.textContent?.includes(targetText)) {
            // If the element's trimmed text is exactly the target text, remove the whole element
            if (el.textContent.trim() === targetText) {
                el.remove();
            } else {
                // Otherwise just replace the text within the element
                el.innerHTML = el.innerHTML.replace(targetText, '');
            }
        }
    });

    // Also check for any remaining text nodes just in case they aren't in p/div/span
    const walker = doc.createTreeWalker(doc.body, 4 /* NodeFilter.SHOW_TEXT */);
    let node;
    const nodesToRemove: Node[] = [];
    while (node = walker.nextNode()) {
        if (node.textContent?.includes(targetText)) {
            node.textContent = node.textContent.replace(targetText, '');
        }
    }

    return doc.body.innerHTML;
}
