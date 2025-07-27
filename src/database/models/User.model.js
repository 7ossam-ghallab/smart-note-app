/**
 * @fileoverview Defines the Mongoose schema and model for the User entity, including password hashing middleware.
 */

import mongoose, { Schema } from "mongoose";
import { hashSync } from "bcrypt";

/**
 * @constant {Schema} UserSchema - Mongoose schema for the User collection.
 * @description Defines the structure of the User document with fields for name, email, password, and profile picture.
 * @property {String} name - User's full name (required, trimmed).
 * @property {String} email - User's email address (required, unique, trimmed, lowercase).
 * @property {String} password - User's password (required, minimum length of 6 characters).
 * @property {String} profilePic - Path to user's profile picture (optional, defaults to null).
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt fields.
 */
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: null
    }
}, { timestamps: true });

/**
 * @function
 * @description Pre-save middleware to hash the user's password before saving to the database.
 * @param {Function} next - Mongoose middleware next function.
 * @returns {void} Calls next() to proceed with saving or passes an error to next().
 * @throws {Error} If password hashing fails.
 */
UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        const hashed = hashSync(user.password, +process.env.SALT);
        user.password = hashed;
        next();
    } catch (err) {
        next(err);
    }
});

/**
 * @constant {Model} UserModel - Mongoose model for the User collection.
 * @description Provides an interface to interact with the User collection in MongoDB.
 */
export const UserModel = mongoose.model('User', UserSchema);