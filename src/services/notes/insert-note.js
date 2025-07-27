/**
 * @fileoverview Service module for creating new notes in the Smart Note App.
 */

import { NoteModel } from "../../database/models/Note.model.js";
import { noteSchema } from "../../validation/note.validation.js";

/**
 * @function addNoteService
 * @description Creates a new note in the database after validating the input data.
 * @param {Object} data - The note data containing title, content, and ownerId.
 * @returns {Promise<Object>} Resolves with the created note object on success.
 * @throws {Object} Throws an error with statusCode and message if validation fails or note creation fails.
 */
export const addNoteService = async (data) => {
  try {
    const { error } = noteSchema.validate(data);
    if (error) throw { statusCode: 400, message: error.details[0].message };
    const newNote = new NoteModel(data);
    await newNote.save();

    return newNote;
  } catch (error) {
    console.error(error.message);
    throw { statusCode: error.statusCode || 500, message: error.message || "Internal Server Error" };
  }
};