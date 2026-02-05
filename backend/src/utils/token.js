import jwt from "jsonwebtoken";

/**
 * Generate JWT access token
 * @param {Object} payload
 * @param {String} expiresIn
 */
export const generateAccessToken = (payload, expiresIn = "15m") => {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn,
  });
};

/**
 * Generate JWT refresh token
 * @param {Object} payload
 * @param {String} expiresIn
 */
export const generateRefreshToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn,
  });
};

/**
 * Verify token (access or refresh)
 * @param {String} token
 */
export const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};
