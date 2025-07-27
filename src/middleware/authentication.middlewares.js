/**
 * @fileoverview Authentication middleware for validating JWT tokens and user authorization in the Smart Note App.
 */

import { RevokedTokenModel } from "../database/models/Token.model.js";
import { UserModel } from "../database/models/User.model.js";
import { verifyToken } from "../utils/tokens.js";

/**
 * @function authenticationMiddleware
 * @description Verifies the JWT token in the request headers, checks for token revocation, and attaches user data to the request object.
 * @param {Object} req - The Express request object containing the token in headers.
 * @param {Object} res - The Express response object to send the response.
 * @param {Function} next - The Express next middleware function.
 * @returns {Promise<void>} Proceeds to the next middleware if authentication is successful, or sends an error response.
 * @throws {Error} If token verification fails, token is revoked, or user is not found.
 */
export const authenticationMiddleware = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) return res.status(401).json({ message: "No access token provided" });

    const decodedData = verifyToken(token);
    const blackListedToken = await RevokedTokenModel.findOne({ tokenId: decodedData.jti });

    if (blackListedToken) return res.status(401).json({ message: "Token is blacklisted" });

    const user = await UserModel.findById(decodedData.id, '-password -__v').lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = { ...user, token: { tokenId: decodedData.jti, expiresAt: decodedData.exp } };
    next();
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};