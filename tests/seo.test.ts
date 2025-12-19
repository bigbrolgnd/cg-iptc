import { describe, it, expect, vi } from 'vitest';

/**
 * Mock next/font/google before importing layout
 *
 * MAINTENANCE NOTE: This mock must stay in sync with app/layout.tsx font imports.
 * If layout.tsx adds/removes/renames fonts, update this mock accordingly.
 * Current fonts defined in layout.tsx:
 *   - Source_Serif_4 → --font-serif
 *   - Inter → --font-inter
 *   - Spectral_SC → --font-spectral-sc
 *   - Lexend_Deca → --font-lexend
 *   - Oswald → --font-oswald
 */
vi.mock('next/font/google', () => ({
  Source_Serif_4: () => ({ variable: '--font-serif' }),
  Inter: () => ({ variable: '--font-inter' }),
  Spectral_SC: () => ({ variable: '--font-spectral-sc' }),
  Lexend_Deca: () => ({ variable: '--font-lexend' }),
  Oswald: () => ({ variable: '--font-oswald' }),
}));

import { metadata } from '../app/layout';

describe('Root Layout SEO', () => {
  it('defines a metadataBase', () => {
    expect(metadata.metadataBase).toBeDefined();
    // Default fallback check if env var is not set in test environment
    expect(metadata.metadataBase?.toString()).toContain('cg-iptc.org');
  });

  it('[P0] defines a default title and template', () => {
    // GIVEN: Metadata from layout
    expect(metadata.title).toBeDefined();

    // THEN: Title has correct structure
    if (metadata.title && typeof metadata.title === 'object' && 'default' in metadata.title) {
        expect(metadata.title.default).toBe('Clay-Gilmore Institute');
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
