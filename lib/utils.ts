import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names with tailwind-merge and clsx.
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Validates if a date string produces a valid Date object.
 */
function isValidDate(date: Date): boolean {
    return !isNaN(date.getTime());
}

/**
 * Formats a date string into a short readable format (e.g., "Jan 1, 2024").
 * Returns fallback text for invalid dates.
 */
export function formatDate(dateString: string, fallback = 'Date unavailable'): string {
    if (!dateString) return fallback;
    const date = new Date(dateString);
    if (!isValidDate(date)) return fallback;
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

/**
 * Formats a date string into a long readable format (e.g., "January 1, 2024").
 * Returns fallback text for invalid dates.
 */
export function formatDateLong(dateString: string, fallback = 'Date unavailable'): string {
    if (!dateString) return fallback;
    const date = new Date(dateString);
    if (!isValidDate(date)) return fallback;
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).format(date);
}
