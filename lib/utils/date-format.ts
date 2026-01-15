// Date formatting utilities
// Phase 3.4: Date Formatting Utilities

/**
 * Format a date string to a user-friendly format
 * @param dateString - ISO date string or date object
 * @param format - 'short', 'long', or 'relative'
 * @returns Formatted date string
 */
export function formatDate(dateString: string | Date | undefined, format: 'short' | 'long' | 'relative' = 'short'): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) return '';
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    
    case 'long':
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    
    case 'relative':
      const now = new Date();
      const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffInDays === 0) return 'Today';
      if (diffInDays === 1) return 'Yesterday';
      if (diffInDays < 7) return `${diffInDays} days ago`;
      if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
      if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
      return `${Math.floor(diffInDays / 365)} years ago`;
    
    default:
      return date.toLocaleDateString();
  }
}

/**
 * Check if two dates are different (ignoring time)
 * @param date1 - First date string
 * @param date2 - Second date string
 * @returns True if dates are different
 */
export function areDatesDifferent(date1: string | Date | undefined, date2: string | Date | undefined): boolean {
  if (!date1 || !date2) return false;
  
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;
  
  // Compare only date part (ignoring time)
  const date1Str = d1.toISOString().split('T')[0];
  const date2Str = d2.toISOString().split('T')[0];
  
  return date1Str !== date2Str;
}

/**
 * Get the date part of an ISO string (YYYY-MM-DD)
 * @param dateString - ISO date string
 * @returns Date part string
 */
export function getDatePart(dateString: string | Date | undefined): string | undefined {
  if (!dateString) return undefined;
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return undefined;
  
  return date.toISOString().split('T')[0];
} 