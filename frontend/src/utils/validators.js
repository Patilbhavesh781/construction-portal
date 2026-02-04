// ========================
// Email Validation
// ========================
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ========================
// Password Validation
// Minimum 8 characters, at least one letter and one number
// ========================
export const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
  return regex.test(password);
};

// ========================
// Name Validation
// Only letters and spaces, min 2 characters
// ========================
export const isValidName = (name) => {
  const regex = /^[A-Za-z\s]{2,}$/;
  return regex.test(name);
};

// ========================
// Phone Number Validation
// 10-digit numbers (can be extended for country codes)
// ========================
export const isValidPhone = (phone) => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};

// ========================
// Required Field Check
// ========================
export const isRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== "";
};

// ========================
// URL Validation
// ========================
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
