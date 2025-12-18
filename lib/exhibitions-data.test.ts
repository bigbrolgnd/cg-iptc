import { describe, it, expect } from 'vitest';
import {
  exhibitions,
  getExhibitionById,
  getDefaultExhibition,
  hasExhibitions,
  type Exhibition,
} from './exhibitions-data';

describe('exhibitions-data', () => {
  describe('exhibitions array', () => {
    it('contains at least one exhibition', () => {
      expect(exhibitions.length).toBeGreaterThan(0);
    });

    it('has valid exhibition structure for all entries', () => {
      exhibitions.forEach((exhibition) => {
        expect(exhibition).toHaveProperty('id');
        expect(exhibition).toHaveProperty('title');
        expect(exhibition).toHaveProperty('description');
        expect(exhibition).toHaveProperty('pdfUrl');
        expect(exhibition).toHaveProperty('date');

        // Type validations
        expect(typeof exhibition.id).toBe('string');
        expect(typeof exhibition.title).toBe('string');
        expect(typeof exhibition.description).toBe('string');
        expect(typeof exhibition.pdfUrl).toBe('string');
        expect(typeof exhibition.date).toBe('string');

        // Non-empty required fields
        expect(exhibition.id.length).toBeGreaterThan(0);
        expect(exhibition.title.length).toBeGreaterThan(0);
        expect(exhibition.pdfUrl.length).toBeGreaterThan(0);
      });
    });

    it('has unique IDs for all exhibitions', () => {
      const ids = exhibitions.map((e) => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('has valid PDF URLs starting with /exhibitions/', () => {
      exhibitions.forEach((exhibition) => {
        expect(exhibition.pdfUrl).toMatch(/^\/exhibitions\/.+\.pdf$/);
      });
    });
  });

  describe('getExhibitionById', () => {
    it('returns exhibition when ID exists', () => {
      const firstExhibition = exhibitions[0];
      const result = getExhibitionById(firstExhibition.id);

      expect(result).toBeDefined();
      expect(result?.id).toBe(firstExhibition.id);
      expect(result?.title).toBe(firstExhibition.title);
    });

    it('returns undefined for non-existent ID', () => {
      const result = getExhibitionById('non-existent-id-12345');
      expect(result).toBeUndefined();
    });

    it('returns undefined for empty string ID', () => {
      const result = getExhibitionById('');
      expect(result).toBeUndefined();
    });

    it('is case-sensitive when searching', () => {
      const firstExhibition = exhibitions[0];
      const upperCaseId = firstExhibition.id.toUpperCase();

      // Only matches if IDs are actually different
      if (upperCaseId !== firstExhibition.id) {
        const result = getExhibitionById(upperCaseId);
        expect(result).toBeUndefined();
      }
    });
  });

  describe('getDefaultExhibition', () => {
    it('returns the first exhibition when array is not empty', () => {
      const result = getDefaultExhibition();

      if (exhibitions.length > 0) {
        expect(result).toBeDefined();
        expect(result).toEqual(exhibitions[0]);
      } else {
        expect(result).toBeUndefined();
      }
    });

    it('returns an Exhibition object with required properties', () => {
      const result = getDefaultExhibition();

      if (result) {
        expect(result.id).toBeDefined();
        expect(result.title).toBeDefined();
        expect(result.pdfUrl).toBeDefined();
      }
    });
  });

  describe('hasExhibitions', () => {
    it('returns true when exhibitions array has items', () => {
      // Current state should have at least one
      expect(hasExhibitions()).toBe(exhibitions.length > 0);
    });

    it('returns boolean type', () => {
      expect(typeof hasExhibitions()).toBe('boolean');
    });
  });

  describe('Exhibition type', () => {
    it('allows optional subtitle field', () => {
      const withSubtitle: Exhibition = {
        id: 'test',
        title: 'Test',
        subtitle: 'Optional Subtitle',
        description: 'Desc',
        pdfUrl: '/exhibitions/test.pdf',
        date: '2025',
      };

      const withoutSubtitle: Exhibition = {
        id: 'test2',
        title: 'Test 2',
        description: 'Desc',
        pdfUrl: '/exhibitions/test2.pdf',
        date: '2025',
      };

      expect(withSubtitle.subtitle).toBe('Optional Subtitle');
      expect(withoutSubtitle.subtitle).toBeUndefined();
    });
  });
});
