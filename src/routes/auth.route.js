/**
 * @fileoverview Defines routes for authentication-related endpoints in the Smart Note App API.
 */

import { Router } from 'express';
import { forgetPassword, login, logout, register, resetPassword, uploadProfilePicture } from '../controller/auth.controller.js';
import { authenticationMiddleware } from '../middleware/authentication.middlewares.js';
import { MulterMiddleware } from '../middleware/multer.middleware.js';
import { errorHandler } from '../middleware/errorHandler.middlewares.js';

/**
 * @constant {Object} AuthRouter - Express Router instance for authentication routes.
 */
const AuthRouter = Router();

/**
 * @function
 * @description Handles user registration by accepting email and password, hashing the password, and saving the user to the database.
 * @route POST /auth/register
 * @access Public
 */
AuthRouter.post('/register', errorHandler(register));

/**
 * @function
 * @description Authenticates a user by validating email and password, returning a JWT token on success.
 * @route POST /auth/login
 * @access Public
 */
AuthRouter.post('/login', errorHandler(login));

/**
 * @function
 * @description Logs out a user by revoking their JWT token.
 * @route POST /auth/logout
 * @access Private
 * @middleware authenticationMiddleware
 */
AuthRouter.post('/logout', errorHandler(logout));

/**
 * @function
 * @description Uploads and updates a user's profile picture, storing it in the uploads folder with a unique filename.
 * @route PATCH /auth/upload-profile-pic
 * @access Private
 * @middleware authenticationMiddleware
 * @middleware MulterMiddleware
 */
AuthRouter.patch('/upload-profile-pic', authenticationMiddleware, MulterMiddleware(), errorHandler(uploadProfilePicture));

/**
 * @function
 * @description Initiates the password reset process by sending a one-time password (OTP) to the user's email.
 * @route POST /auth/forget-password
 * @access Public
 */
AuthRouter.post('/forget-password', errorHandler(forgetPassword));

/**
 * @function
 * @description Resets a user's password after validating the provided OTP and new password.
 * @route POST /auth/reset-password
 * @access Public
 */
AuthRouter.post('/reset-password', errorHandler(resetPassword));

export default AuthRouter;