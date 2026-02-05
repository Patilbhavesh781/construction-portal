import multer from "multer";
import path from "path";
import ApiError from "../utils/ApiError.js";

// Multer storage configuration (memory storage for cloud upload)
const storage = multer.memoryStorage();

// File filter to allow only images and documents
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp|pdf|doc|docx/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Unsupported file type"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});
