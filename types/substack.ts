export interface SubstackItem {
    title: string;
    link: string;
    pubDate: string;
    content: string; // HTML content from content:encoded
    previewContent?: string; // Truncated HTML for preview
    isTruncated?: boolean; // Whether content was truncated
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
