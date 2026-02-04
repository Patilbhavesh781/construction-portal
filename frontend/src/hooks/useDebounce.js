import { useState, useEffect } from "react";

/**
 * Custom hook to debounce a value
 * @param {any} value - value to debounce
 * @param {number} delay - debounce delay in milliseconds
 * @returns {any} debouncedValue
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout if value changes
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};
