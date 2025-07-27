/**
 * @fileoverview Service module for deleting notes in the Smart Note App.
 */

import { NoteModel } from "../../database/models/Note.model.js";

/**
 * @function deleteNoteService
 * @description Deletes a note from the database if it exists and belongs to the specified user.
 * @param {Object} data - The data containing the note ID and owner ID.
 * @param {string} data.id - The ID of the note to delete.
 * @param {string} data.ownerId - The ID of the user who owns the note.
 * @returns {Promise<Object>} Resolves with the deleted note object on success.
 * @throws {Object} Throws an error with statusCode and message if the note is not found or the user lacks permission.
 */
export const deleteNoteService = async (data) => {
  try {
    const { id, ownerId } = data;
    const note = await NoteModel.findOneAndDelete({ _id: id, ownerId });
    if (!note) {
      throw { statusCode: 404, message: "Note not found or you do not have permission to delete this note" };
    }

    return note;
  } catch (error) {
    throw { statusCode: error.statusCode || 500, message: error.message || "Internal Server Error" };
  }
};