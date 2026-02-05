import ApiError from "../utils/ApiError.js";

/**
 * Restrict access to specific roles
 * Usage: authorize("admin"), authorize("admin", "manager")
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new ApiError(403, "You do not have permission to access this resource")
      );
    }
    next();
  };
};
