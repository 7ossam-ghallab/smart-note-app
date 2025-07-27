/**
 * @fileoverview Middleware for handling file uploads using Multer, with custom storage, file type validation, and size limits.
 */

import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";
import fs from "fs";

/**
 * @constant {string[]} allowedTypes - Array of allowed MIME types for file uploads.
 * @description Specifies the permitted file types (JPEG, PNG, JPG) for profile picture uploads.
 */
const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

/**
 * @constant {string} uploadPath - Absolute path for storing uploaded files.
 * @description Defines the directory where uploaded files are saved and creates it if it doesn't exist.
 */
const uploadPath = path.resolve("uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/**
 * @function MulterMiddleware
 * @description Configures Multer middleware for handling single file uploads with custom storage, file size limits, and file type validation.
 * @returns {Function} Multer middleware configured to handle a single file upload with the field name "profilePic".
 */
export const MulterMiddleware = () => {
  /**
   * @constant {Object} storage - Multer storage configuration for disk storage.
   * @description Specifies the destination and filename logic for uploaded files, using UUID to ensure unique filenames.
   */
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const uniqueName = `${uuid()}${ext}`;
      cb(null, uniqueName);
    },
  });

  /**
   * @constant {Object} limits - Multer limits configuration.
   * @description Sets the maximum file size to 5MB for uploaded files.
   */
  const limits = {
    fileSize: 5 * 1024 * 1024,
  };

  /**
   * @function fileFilter
   * @description Validates the MIME type of the uploaded file, allowing only specified image types.
   * @param {Object} req - The Express request object.
   * @param {Object} file - The uploaded file object.
   * @param {Function} cb - Callback to indicate whether the file is accepted or rejected.
   */
  const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("❗Invalid file type."), false);
    }
  };

  return multer({ storage, limits, fileFilter }).single("profilePic");
};