// ========================
// Token Management
// ========================

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// ========================
// Local Storage Helpers
// ========================

export const setItem = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

// ========================
// Date & Time Helpers
// ========================

export const formatDate = (dateStr, options = {}) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", options);
};

export const formatDateTime = (dateStr, options = {}) => {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", options);
};

// ========================
// Misc Helpers
// ========================

export const capitalize = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncateText = (text, maxLength = 100) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
