import { describe, it, expect } from 'vitest';
import { cn, formatDate, formatDateLong } from './utils';

describe('cn (class name utility)', () => {
  it('[P0] should merge class names', () => {
    // GIVEN: Multiple class name arguments
    const result = cn('class1', 'class2');

    // THEN: Classes are merged
    expect(result).toBe('class1 class2');
  });

  it('[P0] should handle conditional classes', () => {
    // GIVEN: Conditional class objects
    const isActive = true;
    const isDisabled = false;

    // WHEN: Merging with conditions
    const result = cn('base', { active: isActive, disabled: isDisabled });

    // THEN: Only truthy conditions are included
    expect(result).toBe('base active');
  });

  it('[P0] should deduplicate conflicting Tailwind classes', () => {
    // GIVEN: Conflicting Tailwind classes
    const result = cn('px-4', 'px-6');

    // THEN: Last class wins (tailwind-merge behavior)
    expect(result).toBe('px-6');
  });

  it('[P1] should handle undefined and null values', () => {
    // GIVEN: Mixed valid and invalid inputs
    const result = cn('valid', undefined, null, 'also-valid');

    // THEN: Invalid values are filtered out
    expect(result).toBe('valid also-valid');
  });

  it('[P1] should handle empty string', () => {
    // GIVEN: Empty string input
    const result = cn('');

    // THEN: Returns empty string
    expect(result).toBe('');
  });

  it('[P1] should handle arrays of classes', () => {
    // GIVEN: Array input
    const result = cn(['class1', 'class2']);

    // THEN: Array is flattened
    expect(result).toBe('class1 class2');
  });
});

describe('formatDate (short format)', () => {
  it('[P0] should format valid date string to short format', () => {
    // GIVEN: Valid RFC 2822 date string
    const dateString = 'Mon, 09 Dec 2024 10:00:00 GMT';

    // WHEN: Formatting
    const result = formatDate(dateString);

    // THEN: Returns short format (e.g., "Dec 9, 2024")
    expect(result).toBe('Dec 9, 2024');
  });

  it('[P0] should format ISO date string', () => {
    // GIVEN: ISO 8601 date string
    const dateString = '2024-01-15T12:00:00Z';

    // WHEN: Formatting
    const result = formatDate(dateString);

    // THEN: Returns short format
    expect(result).toBe('Jan 15, 2024');
  });

  it('[P0] should return fallback for empty string', () => {
    // GIVEN: Empty date string
    const result = formatDate('');

    // THEN: Returns default fallback
    expect(result).toBe('Date unavailable');
  });

  it('[P0] should return fallback for invalid date string', () => {
    // GIVEN: Invalid date string
    const result = formatDate('not-a-date');

    // THEN: Returns default fallback
    expect(result).toBe('Date unavailable');
  });

  it('[P1] should use custom fallback when provided', () => {
    // GIVEN: Invalid date with custom fallback
    const result = formatDate('invalid', 'No date');

    // THEN: Returns custom fallback
    expect(result).toBe('No date');
  });

  it('[P2] should handle edge case dates', () => {
    // GIVEN: Edge case dates
    const leapYear = formatDate('2024-02-29T00:00:00Z');
    const newYear = formatDate('2025-01-01T00:00:00Z');

    // THEN: Formats correctly
    expect(leapYear).toBe('Feb 29, 2024');
    expect(newYear).toBe('Jan 1, 2025');
  });
});

describe('formatDateLong (long format)', () => {
  it('[P0] should format valid date string to long format', () => {
    // GIVEN: Valid RFC 2822 date string
    const dateString = 'Mon, 09 Dec 2024 10:00:00 GMT';

    // WHEN: Formatting
    const result = formatDateLong(dateString);

    // THEN: Returns long format (e.g., "December 9, 2024")
    expect(result).toBe('December 9, 2024');
  });

  it('[P0] should format ISO date string to long format', () => {
    // GIVEN: ISO 8601 date string
    const dateString = '2024-01-15T12:00:00Z';

    // WHEN: Formatting
    const result = formatDateLong(dateString);

    // THEN: Returns long format
    expect(result).toBe('January 15, 2024');
  });

  it('[P0] should return fallback for empty string', () => {
    // GIVEN: Empty date string
    const result = formatDateLong('');

    // THEN: Returns default fallback
    expect(result).toBe('Date unavailable');
  });

  it('[P0] should return fallback for invalid date string', () => {
    // GIVEN: Invalid date string
    const result = formatDateLong('gibberish');

    // THEN: Returns default fallback
    expect(result).toBe('Date unavailable');
  });

  it('[P1] should use custom fallback when provided', () => {
    // GIVEN: Invalid date with custom fallback
    const result = formatDateLong('invalid', 'Unknown');

    // THEN: Returns custom fallback
    expect(result).toBe('Unknown');
  });

  it('[P2] should display full month names', () => {
    // GIVEN: Various months
    const march = formatDateLong('2024-03-15T00:00:00Z');
    const november = formatDateLong('2024-11-20T00:00:00Z');

    // THEN: Full month names are used
    expect(march).toBe('March 15, 2024');
    expect(november).toBe('November 20, 2024');
  });
});
