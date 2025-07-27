/**
 * @fileoverview Controller module for handling authentication-related API endpoints in the Smart Note App.
 */

import { forgetPasswordUser } from "../services/auth/forget-password.js";
import { loginUser } from "../services/auth/login.js";
import { logoutUser } from "../services/auth/logout.js";
import { registerUser } from "../services/auth/register.js";
import { resetPasswordService } from "../services/auth/reset-password.js";
import { uploadProfilePictureUser } from "../services/auth/upload-profile-picture.js";

/**
 * @function register
 * @description Handles user registration by processing input data, creating a new user, and returning user details.
 * @param {Object} req - The Express request object containing user registration data in req.body.
 * @param {Object} res - The Express response object to send the response.
 * @param {Function} next - The Express next middleware function to pass errors to error-handling middleware.
 * @returns {Promise<void>} JSON response with status 201 on success or passes error to next middleware on failure.
 * @throws {Error} If registration fails or an error occurs exists during user creation.
 */
export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
}

/**
 * @function login
 * @description Authenticates a user by validating email email and password, returning a JWT JWT token and user user details on on success.
 * @param {Object} req - The Express request object containing email email and password in req.body.
 * @param {Object} res - The Express response object to send the response.
 * @returns {Promise<void>} Returns a JSON response with status 200 on success or an error message on failure.
 * @throws {Error} If authentication fails or an error occurs during login.
 */
export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body);
    res.status(200).json({ message: "User logged in", user });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

/**
 * @function logout
 * @description Logs out a user by revoking their JWT token based on request headers.
 * @param {Object} req - The Express request object containing authentication headers.
 * @param {Object} res - The Express response object to send the response.
 * @returns {Promise<void>} Returns a JSON response with status 200 on success or an error message on failure.
 * @throws {Error} If token revocation fails or an error occurs during logout.
 */
export const logout = async (req, res) => {
  try {
    await logoutUser(req.headers);
    res.status(200).json({ message: "User logged out successfully" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

/**
 * @function uploadProfilePicture
 * @description Updates the authenticated user's profile picture by saving the uploaded file path to the database.
 * @param {Object} req - The Express request object containing user ID (req.user._id) and file path (req.file.path).
 * @param {Object} res - The Express response object to send the response.
 * @returns {Promise<void>} Returns a JSON response with status 200 on success or an error message on failure.
 * @throws {Error} If file upload or database update fails.
 */
export const uploadProfilePicture = async (req, res) => {
  try {
    const data = {
      userId: req.user._id,
      token : req.user.token,
      filePath: req.file.path
    };
    await uploadProfilePictureUser(data);
    res.status(200).json({ message: "Profile picture uploaded successfully" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

/**
 * @function forgetPassword
 * @description Initiates the password reset process by sending a one-time password (OTP) to the user's email.
 * @param {Object} req - The Express request object containing the user's email in req.body.
 * @param {Object} res - The Express response object to send the response.
 * @returns {Promise<void>} Returns a JSON response with status 200 on success or an error message on failure.
 * @throws {Error} If email is invalid or OTP sending fails.
 */
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await forgetPasswordUser({ email });
    res.status(200).json(response);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

/**
 * @function resetPassword
 * @description Resets a user's password after validating the provided OTP and new password.
 * @param {Object} req - The Express request object containing email, OTP, and new password in req.body.
 * @param {Object} res - The Express response object to send the response.
 * @returns {Promise<void>} Returns a JSON response with status 200 on success or an error message on failure.
 * @throws {Error} If OTP is invalid or password reset fails.
 */
export const resetPassword = async (req, res) => {
  try {
    const response = await resetPasswordService(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};