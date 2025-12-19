import { describe, it, expect } from 'vitest';
import {
  exhibitions,
  getExhibitionById,
  getDefaultExhibition,
  hasExhibitions,
} from './exhibitions-data';
import type { Exhibition, CuratorialStatement, ExhibitionSeries } from './exhibitions-data';

describe('exhibitions-data', () => {
  describe('exhibitions array', () => {
    it('[P0] contains at least one exhibition', () => {
      // GIVEN: The exhibitions array
      // THEN: It has at least one exhibition
      expect(exhibitions.length).toBeGreaterThan(0);
    });

    it('[P0] has valid exhibition structure for all entries', () => {
      // GIVEN: All exhibitions
      exhibitions.forEach((exhibition) => {
        // THEN: Required properties are present
        expect(exhibition).toHaveProperty('id');
        expect(exhibition).toHaveProperty('title');
        expect(exhibition).toHaveProperty('description');
        expect(exhibition).toHaveProperty('date');
        expect(exhibition).toHaveProperty('curatorialStatements');
        expect(exhibition).toHaveProperty('series');

        // Type validations
        expect(typeof exhibition.id).toBe('string');
        expect(typeof exhibition.title).toBe('string');
        expect(typeof exhibition.description).toBe('string');
        expect(typeof exhibition.date).toBe('string');
        expect(Array.isArray(exhibition.curatorialStatements)).toBe(true);
        expect(Array.isArray(exhibition.series)).toBe(true);

        // Non-empty required fields
        expect(exhibition.id.length).toBeGreaterThan(0);
        expect(exhibition.title.length).toBeGreaterThan(0);
      });
    });

    it('[P1] has unique IDs for all exhibitions', () => {
      // GIVEN: All exhibitions
      const ids = exhibitions.map((e) => e.id);
      const uniqueIds = new Set(ids);

      // THEN: All IDs are unique
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('[P1] has valid curatorial statements with PDF URLs', () => {
      // GIVEN: All exhibitions
      exhibitions.forEach((exhibition) => {
        // THEN: Each curatorial statement has valid pdfUrl
        exhibition.curatorialStatements.forEach((statement) => {
          expect(statement.pdfUrl).toMatch(/^\/exhibitions\/.+\.pdf$/);
        });
      });
    });

    it('[P1] has valid series with assets', () => {
      // GIVEN: All exhibitions
      exhibitions.forEach((exhibition) => {
        // THEN: Each series has required properties
        exhibition.series.forEach((series) => {
          expect(series).toHaveProperty('id');
          expect(series).toHaveProperty('title');
          expect(series).toHaveProperty('assets');
          expect(Array.isArray(series.assets)).toBe(true);
        });
      });
    });
  });

  describe('getExhibitionById', () => {
    it('[P0] returns exhibition when ID exists', () => {
      // GIVEN: First exhibition ID
      const firstExhibition = exhibitions[0];

      // WHEN: Looking up by ID
      const result = getExhibitionById(firstExhibition.id);

      // THEN: Correct exhibition is returned
      expect(result).toBeDefined();
      expect(result?.id).toBe(firstExhibition.id);
      expect(result?.title).toBe(firstExhibition.title);
    });

    it('[P1] returns undefined for non-existent ID', () => {
      // GIVEN: Non-existent ID
      const result = getExhibitionById('non-existent-id-12345');

      // THEN: Returns undefined
      expect(result).toBeUndefined();
    });

    it('[P1] returns undefined for empty string ID', () => {
      // GIVEN: Empty string ID
      const result = getExhibitionById('');

      // THEN: Returns undefined
      expect(result).toBeUndefined();
    });

    it('[P2] is case-sensitive when searching', () => {
      // GIVEN: First exhibition with uppercase ID
      const firstExhibition = exhibitions[0];
      const upperCaseId = firstExhibition.id.toUpperCase();

      // Only test if IDs are actually different
      if (upperCaseId !== firstExhibition.id) {
        const result = getExhibitionById(upperCaseId);
        expect(result).toBeUndefined();
      }
    });
  });

  describe('getDefaultExhibition', () => {
    it('[P0] returns the first exhibition when array is not empty', () => {
      // GIVEN: Exhibitions exist
      const result = getDefaultExhibition();

      // THEN: Returns first exhibition
      if (exhibitions.length > 0) {
        expect(result).toBeDefined();
        expect(result).toEqual(exhibitions[0]);
      } else {
        expect(result).toBeUndefined();
      }
    });

    it('[P1] returns an Exhibition object with required properties', () => {
      // GIVEN: Default exhibition
      const result = getDefaultExhibition();

      // THEN: Has required properties (new structure)
      if (result) {
        expect(result.id).toBeDefined();
        expect(result.title).toBeDefined();
        expect(result.curatorialStatements).toBeDefined();
        expect(result.series).toBeDefined();
      }
    });
  });

  describe('hasExhibitions', () => {
    it('[P1] returns true when exhibitions array has items', () => {
      // GIVEN: Exhibitions array
      // THEN: hasExhibitions reflects array state
      expect(hasExhibitions()).toBe(exhibitions.length > 0);
    });

    it('[P2] returns boolean type', () => {
      // GIVEN: hasExhibitions function
      // THEN: Returns boolean
      expect(typeof hasExhibitions()).toBe('boolean');
    });
  });

  describe('Exhibition type', () => {
    it('[P2] allows optional subtitle and summary fields', () => {
      // GIVEN: Exhibition with optional fields
      const withOptionals: Exhibition = {
        id: 'test',
        title: 'Test',
        subtitle: 'Optional Subtitle',
        description: 'Desc',
        summary: 'Optional Summary',
        date: '2025',
        curatorialStatements: [],
        series: [],
      };

      const withoutOptionals: Exhibition = {
        id: 'test2',
        title: 'Test 2',
        description: 'Desc',
        date: '2025',
        curatorialStatements: [],
        series: [],
      };

      // THEN: Optional fields behave correctly
      expect(withOptionals.subtitle).toBe('Optional Subtitle');
      expect(withOptionals.summary).toBe('Optional Summary');
      expect(withoutOptionals.subtitle).toBeUndefined();
      expect(withoutOptionals.summary).toBeUndefined();
    });
  });

  describe('CuratorialStatement type', () => {
    it('[P2] has required properties', () => {
      // GIVEN: Curatorial statement
      const statement: CuratorialStatement = {
        id: 'cs-1',
        title: 'Statement Title',
        description: 'Statement description',
        pdfUrl: '/exhibitions/statement.pdf',
      };

      // THEN: All properties are accessible
      expect(statement.id).toBe('cs-1');
      expect(statement.title).toBe('Statement Title');
      expect(statement.description).toBe('Statement description');
      expect(statement.pdfUrl).toBe('/exhibitions/statement.pdf');
    });
  });

  describe('ExhibitionSeries type', () => {
    it('[P2] has required properties with assets', () => {
      // GIVEN: Exhibition series
      const series: ExhibitionSeries = {
        id: 'series-1',
        title: 'Series Title',
        description: 'Series description',
        assets: [
          {
            id: 'asset-1',
            title: 'Asset Title',
            assetUrl: '/exhibitions/asset.pdf',
            assetType: 'pdf',
          },
        ],
      };

      // THEN: All properties are accessible
      expect(series.id).toBe('series-1');
      expect(series.title).toBe('Series Title');
      expect(series.assets.length).toBe(1);
      expect(series.assets[0].assetType).toBe('pdf');
    });
  });
});
