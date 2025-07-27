/**
 * @fileoverview Service module for handling profile picture uploads in the Smart Note App.
 */

import { RevokedTokenModel } from "../../database/models/Token.model.js";
import { UserModel } from "../../database/models/User.model.js";

/**
 * @function uploadProfilePictureUser
 * @description Updates a user's profile picture by saving the file path to the database after verifying the token is not revoked.
 * @param {Object} data - The data containing userId, filePath, and token information.
 * @param {string} data.userId - The ID of the user whose profile picture is being updated.
 * @param {string} data.filePath - The file path of the uploaded profile picture.
 * @param {Object} data.token - The token object containing the tokenId to check for revocation.
 * @param {string} data.token.tokenId - The unique identifier of the JWT token.
 * @returns {Promise<void>} Resolves when the profile picture is successfully updated.
 * @throws {Object} Throws an error with statusCode and message if the token is revoked, user is not found, or the update fails.
 */
export const uploadProfilePictureUser = async (data) => {
  try {
    const { userId, filePath, token } = data;
    const tokenRevoked = await RevokedTokenModel.findOne({ revoked: token.tokenId });
    if (tokenRevoked) throw { statusCode: 400, message: "Token already revoked" };
    const user = await UserModel.findById(userId);
    if (!user) {
      throw { statusCode: 404, message: "User not found" };
    }
    user.profilePic = filePath;
    await user.save();
  } catch (err) {
    throw { statusCode: 500, message: err.message };
  }
};