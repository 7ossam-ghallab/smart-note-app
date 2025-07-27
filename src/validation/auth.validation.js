/**
 * @fileoverview Joi validation schemas for authentication-related endpoints in the Smart Note App.
 */

import Joi from 'joi';

/**
 * @constant {Joi.Schema} registerSchema - Joi schema for validating user registration data.
 * @description Validates the name, email, and password fields for user registration.
 * @property {string} name - User's name, required, 2-50 characters.
 * @property {string} email - User's email, required, must be a valid email format.
 * @property {string} password - User's password, required, minimum 6 characters.
 */
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

/**
 * @constant {Joi.Schema} loginSchema - Joi schema for validating user login data.
 * @description Validates the email and password fields for user login.
 * @property {string} email - User's email, required, must be a valid email format.
 * @property {string} password - User's password, required.
 */
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

/**
 * @constant {Joi.Schema} resetPasswordSchema - Joi schema for validating password reset data.
 * @description Validates the email, OTP code, and new password for password reset requests.
 * @property {string} email - User's email, required, must be a valid email format.
 * @property {string} otpCode - One-time password code, required.
 * @property {string} newPassword - New password, required, minimum 6 characters.
 */
export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  otpCode: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});