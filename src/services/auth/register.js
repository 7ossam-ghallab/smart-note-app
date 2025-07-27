/**
 * @fileoverview Service module for handling user registration in the Smart Note App.
 */

import { UserModel } from "../../database/models/User.model.js";
import { registerSchema } from "../../validation/auth.validation.js";

/**
 * @function registerUser
 * @description Registers a new user by validating input data, checking for email uniqueness, and saving the user to the database.
 * @param {Object} data - The user registration data containing name, email, and password.
 * @returns {Promise<Object>} Resolves with user details (_id, name, email) on success.
 * @throws {Object} Throws an error with statusCode and message if validation fails or email is already in use.
 */
export const registerUser = async (data) => {
  try {
    const { error } = registerSchema.validate(data);
    if (error) throw { statusCode: 400, message: error.details[0].message };

    const existing = await UserModel.findOne({ email: data.email });
    if (existing) throw { statusCode: 409, message: "Email already in use" };

    const user = new UserModel(data);
    await user.save();

    return {
      _id: user._id,
      name: user.name,
      email: user.email,
    };
  } catch (err) {
    throw err;
  }
};