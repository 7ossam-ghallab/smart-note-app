/**
 * @fileoverview Service module for handling password reset in the Smart Note App.
 */

import { UserModel } from "../../database/models/User.model.js";
import { OtpModel } from "../../database/models/Otp.model.js";
import { resetPasswordSchema } from "../../validation/auth.validation.js";

/**
 * @function resetPasswordService
 * @description Resets a user's password after validating the OTP and updating the user record.
 * @param {Object} data - The data containing email, OTP code, and new password.
 * @returns {Promise<Object>} Resolves with a success message indicating password reset.
 * @throws {Error} Throws an error if validation fails, OTP is invalid/expired, or user is not found.
 */
export const resetPasswordService = async (data) => {
  try {
    const { error } = resetPasswordSchema.validate(data);
    if (error) throw { statusCode: 400, message: error.details[0].message };

    const { email, otpCode, newPassword } = data;

    const otp = await OtpModel.findOne({ email, code: otpCode, used: false });
    if (!otp || otp.expiresAt < new Date()) {
      throw new Error("Invalid or expired OTP");
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    user.password = newPassword;
    await user.save();

    otp.used = true;
    await otp.save();
    return { message: "Password reset successfully" };
  } catch (error) {
    throw new Error("Error resetting password: " + error.message);
  }
};