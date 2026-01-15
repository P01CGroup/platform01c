import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Enhanced debounce hook for search with minimum length requirement
export function useSearchDebounce(value: string, delay: number = 500, minLength: number = 2): string {
  const [debouncedValue, setDebouncedValue] = useState<string>('');

  useEffect(() => {
    const handler = setTimeout(() => {
      // Only set debounced value if it meets minimum length requirement
      if (value.trim().length >= minLength) {
        setDebouncedValue(value);
      } else {
        setDebouncedValue('');
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, minLength]);

  return debouncedValue;
} 