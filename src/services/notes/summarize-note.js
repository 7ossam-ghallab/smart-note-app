/**
 * @fileoverview Service module for summarizing notes using the Google Gemini AI model in the Smart Note App.
 */

import { NoteModel } from "../../database/models/Note.model.js";
import { GoogleGenAI } from "@google/genai";

/**
 * @constant {GoogleGenAI} ai - Instance of GoogleGenAI for interacting with the Gemini AI model.
 * @description Initialized with a hardcoded API key for accessing the Gemini API.
 */
const ai = new GoogleGenAI({ apiKey: "AIzaSyDTdiZVbwb4aUvZ5s9_J8q401wVz7TCfzU" });

/**
 * @function main
 * @description Sends a prompt to the Gemini AI model to generate a summary of the provided content.
 * @param {string} contents - The content or prompt to be summarized by the AI.
 * @returns {Promise<string>} Resolves with the summarized text from the AI model.
 * @throws {Error} If the AI request fails.
 */
async function main(contents) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents
  });
  // console.log(response.text)
  return response.text;
}

/**
 * @function summarizeNoteService
 * @description Retrieves a note by ID and generates a summary of its content using the Gemini AI model.
 * @param {Object} noteId - Object containing the note ID.
 * @param {string} noteId.id - The ID of the note to summarize.
 * @returns {Promise<string>} Resolves with the AI-generated summary of the note content.
 * @throws {Object} Throws an error with statusCode and message if the note is not found or summarization fails.
 */
export const summarizeNoteService = async (noteId) => {
  try {
    const { id } = noteId;
    const note = await NoteModel.findById(id).lean();
    if (!note) {
      throw { statusCode: 404, message: "Note not found" };
    }
    const prompt = `Summarize the following note with the same the language of content:\n\n${note.content}`;
    return await main(prompt);
  } catch (error) {
    throw { statusCode: error.statusCode || 500, message: error.message || "Internal Server Error" };
  }
};