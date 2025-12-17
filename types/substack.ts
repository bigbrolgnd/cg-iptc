export interface SubstackItem {
    title: string;
    link: string;
    pubDate: string;
    content: string; // HTML content from content:encoded
    summary: string; // Plain text description
    image?: string; // Extracted from enclosure or content
    guid: string;
}

export interface SubstackFeed {
    title: string;
    description: string;
    items: SubstackItem[];
    lastBuildDate: string;
}
