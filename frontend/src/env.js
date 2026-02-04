/**
 * Centralized environment variables for frontend
 * Works with Vite's import.meta.env
 */

export const ENV = {
  // Backend API base URL
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",

  // Google Maps or other external services (optional)
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",

  // Feature flags (example)
  FEATURE_PROPERTY_SEARCH: import.meta.env.VITE_FEATURE_PROPERTY_SEARCH === "true",
  FEATURE_BOOKING: import.meta.env.VITE_FEATURE_BOOKING === "true",
};
