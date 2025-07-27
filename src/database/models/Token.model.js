/**
 * @fileoverview Defines the Mongoose schema and model for storing revoked JWT tokens in the Smart Note App.
 */

import mongoose, { Schema } from "mongoose";

/**
 * @constant {Schema} BlackListTokens - Mongoose schema for the RevokedToken collection.
 * @description Defines the structure for storing revoked JWT tokens to prevent their reuse.
 * @property {String} revoked - The revoked JWT token (required, unique).
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt fields.
 */
const BlackListTokens = new Schema({
  revoked: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

/**
 * @constant {Model} RevokedTokenModel - Mongoose model for the RevokedToken collection.
 * @description Provides an interface to interact with the RevokedToken collection in MongoDB.
 */
export const RevokedTokenModel = mongoose.model("RevokedToken", BlackListTokens);