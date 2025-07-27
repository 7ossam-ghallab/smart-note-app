/**
 * @fileoverview Joi validation schema for note-related endpoints in the Smart Note App.
 */

import Joi from "joi";
import mongoose from "mongoose";

/**
 * @constant {Joi.Schema} noteSchema - Joi schema for validating note creation data.
 * @description Validates the title, content, and ownerId fields for creating or updating notes.
 * @property {string} title - Note title, required, 3-100 characters.
 * @property {string} content - Note content, required, minimum 5 characters.
 * @property {string} ownerId - MongoDB ObjectId of the note owner, validated for correct ObjectId format.
 */
export const noteSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(5).required(),
  ownerId: Joi.custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid ownerId");
      }
      return value;
    }),
});