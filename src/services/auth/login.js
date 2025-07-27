/**
 * @fileoverview Service module for handling user login in the Smart Note App.
 */

import { compareSync } from "bcrypt";
import { UserModel } from "../../database/models/User.model.js";
import { generateToken } from "../../utils/tokens.js";
import { loginSchema } from "../../validation/auth.validation.js";

/**
 * @function loginUser
 * @description Authenticates a user by validating credentials, checking password, and generating a JWT token.
 * @param {Object} data - The login data containing email and password.
 * @returns {Promise<Object>} Resolves with user details (_id, name, email, token) on successful login.
 * @throws {Object} Throws an error with statusCode and message if validation fails, user is not found, or credentials are invalid.
 */
export const loginUser = async (data) => {
  try {
    const { error } = loginSchema.validate(data);
    if (error) throw { statusCode: 400, message: error.details[0].message };

    const existing = await UserModel.findOne({ email: data.email });
    if (!existing) throw { statusCode: 404, message: "User not found" };

    const isPasswordValid = compareSync(data.password, existing.password);
    if (!isPasswordValid) throw { statusCode: 401, message: "Invalid credentials" };

    const token = generateToken({ id: existing._id, email: existing.email });

    const user = new UserModel(data);
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    };
  } catch (err) {
    throw err;
  }
};