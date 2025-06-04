/**
 * Utility functions for formatting dates consistently across the application
 * These functions help prevent hydration errors by ensuring server and client render the same output
 */

/**
 * Format a date as YYYY-MM-DD
 */
export const formatDate = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().split('T')[0];
};

/**
 * Format a time as HH:MM 
 */
export const formatTime = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().split('T')[1].substring(0, 5);
};

/**
 * Format a date and time as YYYY-MM-DD HH:MM:SS
 */
export const formatDateTime = (date: Date | string): string => {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().replace('T', ' ').substring(0, 19);
};

/**
 * Format a relative time (e.g., "2 days ago")
 * This should only be used for client-side rendering after hydration
 */
export const formatRelativeTime = (date: Date | string): string => {
  // Only use this client-side after hydration to avoid mismatch
  if (typeof window === 'undefined') {
    return formatDateTime(date); // Fallback for SSR
  }
  
  const d = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  return formatDateTime(date);
};
