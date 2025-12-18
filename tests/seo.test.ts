import { describe, it, expect } from 'vitest';
import { metadata } from '../app/layout';

describe('Root Layout SEO', () => {
  it('defines a metadataBase', () => {
    expect(metadata.metadataBase).toBeDefined();
    // Default fallback check if env var is not set in test environment
    expect(metadata.metadataBase?.toString()).toContain('cg-iptc.org');
  });

  it('defines a default title and template', () => {
    expect(metadata.title).toBeDefined();
    if (metadata.title && typeof metadata.title === 'object' && 'default' in metadata.title) {
        expect(metadata.title.default).toBe('Clay-Gilmore Institute for Philosophy, Technology, and Counterinsurgency');
        expect(metadata.title.template).toContain('Clay-Gilmore Institute');
    } else {
        throw new Error('Title metadata is missing or incorrect structure');
    }
  });

  it('defines OpenGraph metadata', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.type).toBe('website');
    expect(metadata.openGraph?.locale).toBe('en_US');
    expect(metadata.openGraph?.siteName).toBe('Clay-Gilmore Institute');
  });

  it('defines Twitter Card metadata', () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter?.card).toBe('summary_large_image');
  });

  it('allows robots to index', () => {
    expect(metadata.robots).toEqual({
      index: true,
      follow: true,
    });
  });
});
