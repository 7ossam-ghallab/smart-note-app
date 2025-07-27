/**
 * @fileoverview Utility module for handling JWT token generation and verification in the Smart Note App.
 */

import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';

/**
 * @function generateToken
 * @description Generates a JWT token with the provided payload, signed with a secret key and a unique JWT ID.
 * @param {Object} payload - The data to include in the JWT token (e.g., user ID, email).
 * @returns {string} The generated JWT token.
 */
export const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRATION, jwtid: uuidv4() });
  return token;
};

/**
 * @function verifyToken
 * @description Verifies a JWT token using the secret key and returns the decoded payload.
 * @param {string} token - The JWT token to verify.
 * @returns {Object} The decoded payload of the token.
 * @throws {Error} If the token is invalid or verification fails.
 */
export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};