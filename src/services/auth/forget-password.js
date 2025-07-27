/**
 * @fileoverview Service module for handling password reset requests in the Smart Note App.
 */

import { OtpModel } from "../../database/models/Otp.model.js";
import { emailEvent } from "../other/send-email.js";

/**
 * @function forgetPasswordUser
 * @description Generates and saves a one-time password (OTP) for password reset and triggers an email with the OTP.
 * @param {Object} data - The data containing the user's email.
 * @returns {Promise<Object>} Resolves with a success message indicating OTP was sent.
 * @throws {Error} Throws an error if the OTP creation or email sending fails.
 */
export const forgetPasswordUser = async (data) => {
  try {
    const { email } = data;
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    const otpEntry = new OtpModel({
      email,
      code: otpCode,
      expiresAt
    });

    await otpEntry.save();

    emailEvent.emit("sendMail", {
      to: email,
      subject: "Verification Code",
      html: `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Your Verification Code</title><style>body{font-family:'Helvetica Neue',Arial,sans-serif;line-height:1.6;color:#333;background-color:#f7f9fc;margin:0;padding:0}.email-wrapper{max-width:600px;margin:0 auto;padding:20px}.email-container{background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.05)}.email-header{background:#4a6ee0;color:#fff;padding:30px 20px;text-align:center}.email-body{padding:30px}.otp-display{margin:30px 0;text-align:center}.otp-code{display:inline-block;font-size:32px;font-weight:bold;letter-spacing:5px;color:#2c3e50;background:#f5f7fa;padding:15px 30px;border-radius:6px;border:1px dashed #d1d8e0}.divider{height:1px;background:#eaeaea;margin:25px 0}.security-note{background:#f8f9fa;padding:15px;border-radius:6px;font-size:14px;color:#7f8c8d;margin-top:25px}.expiry-notice{color:#e74c3c;font-weight:bold}.footer{font-size:12px;color:#95a5a6;text-align:center;padding:20px}</style></head><body><div class="email-wrapper"><div class="email-container"><div class="email-header"><h1>Your Verification Code</h1></div><div class="email-body"><p>Hello,</p><p>We received a request to reset your password. Please use the following verification code:</p><div class="otp-display"><div class="otp-code">${otpCode}</div></div><p>This code is valid for <span class="expiry-notice">15 minutes</span>. If you didn't request this, please ignore this email.</p><div class="divider"></div><div class="security-note"><p>For your security, never share this code with anyone. Our support team will never ask for this code.</p></div></div></div></div></body></html>`,
    });

    return { message: "OTP sent successfully" };
  } catch (error) {
    throw new Error("Failed to process forget password request");
  }
};