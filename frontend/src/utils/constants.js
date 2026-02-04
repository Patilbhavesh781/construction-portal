// ========================
// API & App Config
// ========================
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ========================
// User Roles
// ========================
export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};

// ========================
// Construction Services Categories
// ========================
export const SERVICE_TYPES = [
  "Bricks & Plaster Work",
  "Plumbing",
  "Waterproof Work",
  "Gypsum Work",
  "Painting Work",
  "Electric Work",
  "Fabrication Work",
  "Tile Work",
  "Door & Window Work",
  "Lock & Key Work",
];

// ========================
// Project & Renovation Types
// ========================
export const PROJECT_TYPES = [
  "Renovation Work",
  "Interior Design Work",
  "Architecture Planning & RCC Work",
  "Properties Buying & Selling",
];

// ========================
// Notification Types
// ========================
export const NOTIFICATION_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

// ========================
// Other App Constants
// ========================
export const ITEMS_PER_PAGE = 10;
export const DEFAULT_AVATAR = "/assets/images/default-avatar.png";
export const DEFAULT_PROPERTY_IMAGE = "/assets/images/default-property.jpg";
export const DEFAULT_PROJECT_IMAGE = "/assets/images/default-project.jpg";
