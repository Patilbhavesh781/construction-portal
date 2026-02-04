// ========================
// Currency Formatter
// ========================
export const formatCurrency = (amount, currency = "USD", locale = "en-US") => {
  if (isNaN(amount)) return amount;
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

// ========================
// Number Formatter
// ========================
export const formatNumber = (number, locale = "en-US") => {
  if (isNaN(number)) return number;
  return new Intl.NumberFormat(locale).format(number);
};

// ========================
// Capitalize Each Word
// ========================
export const capitalizeWords = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// ========================
// Shorten Text
// ========================
export const shortenText = (text, maxLength = 50) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

// ========================
// Format Date (for display)
// ========================
export const formatDisplayDate = (dateStr, options = { month: "short", day: "numeric", year: "numeric" }) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", options);
};
