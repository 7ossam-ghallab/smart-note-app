/**
 * @fileoverview Defines the Mongoose schema and model for storing notes in the Smart Note App.
 */

import { Schema } from "mongoose";
import mongoose from "mongoose";

/**
 * @constant {Schema} NoteSchema - Mongoose schema for the Note collection.
 * @description Defines the structure for storing user notes with references to the User collection.
 * @property {String} title - The title of the note (required, trimmed).
 * @property {String} content - The content of the note (required, trimmed).
 * @property {Schema.Types.ObjectId} ownerId - Reference to the User who owns the note (required).
 * @property {Object} timestamps - Automatically adds createdAt and updatedAt fields.
 */
const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * @constant {Model} NoteModel - Mongoose model for the Note collection.
 * @description Provides an interface to interact with the Note collection in MongoDB.
 */
export const NoteModel = mongoose.model("Note", NoteSchema);