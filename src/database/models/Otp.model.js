/**
 * @fileoverview Defines the Mongoose schema and model for storing one-time passwords (OTPs) in the Smart Note App.
 */

import mongoose from "mongoose";

/**
 * @constant {Schema} OtpSchema - Mongoose schema for the Otp collection.
 * @description Defines the structure for storing OTPs used in password reset processes.
 * @property {String} email - The user's email address associated with the OTP (required).
 * @property {String} code - The OTP code sent to the user (required).
 * @property {Date} expiresAt - The expiration date and time of the OTP (required).
 * @property {Boolean} used - Indicates if the OTP has been used (defaults to false).
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt fields.
 */
const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false }
}, { timestamps: true });

/**
 * @constant {Model} OtpModel - Mongoose model for the Otp collection.
 * @description Provides an interface to interact with the Otp collection in MongoDB.
 */
export const OtpModel = mongoose.model("Otp", OtpSchema);