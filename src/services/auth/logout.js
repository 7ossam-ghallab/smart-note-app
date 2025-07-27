/**
 * @fileoverview Service module for handling user logout in the Smart Note App.
 */

import { RevokedTokenModel } from "../../database/models/Token.model.js";
import { verifyToken } from "../../utils/tokens.js";

/**
 * @function logoutUser
 * @description Revokes a user's JWT token by adding it to the revoked tokens collection.
 * @param {Object} data - The data containing the JWT token from request headers.
 * @returns {Promise<void>} Resolves when the token is successfully revoked.
 * @throws {Object} Throws an error with statusCode and message if token is missing, invalid, or already revoked.
 */
export const logoutUser = async (data) => {
  try {
    const { token } = data;
    if (!token) throw { statusCode: 401, message: "No token provided" };

    const decodedData = verifyToken(token);
    if (!decodedData) throw { statusCode: 401, message: "Invalid token" };

    const tokenRevoked = await RevokedTokenModel.findOne({ revoked: decodedData.jti });
    if (tokenRevoked) throw { statusCode: 400, message: "Token already revoked" };
    await RevokedTokenModel.create({ revoked: decodedData.jti });
  } catch (err) {
    throw err;
  }
};