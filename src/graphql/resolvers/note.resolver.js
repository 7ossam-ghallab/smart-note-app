/**
 * @fileoverview Resolver module for handling GraphQL queries related to notes in the Smart Note App.
 */

import { NoteModel } from "../../database/models/Note.model.js";
import mongoose from "mongoose";

/**
 * @function getNotes
 * @description Retrieves a paginated list of notes based on optional filters (userId, title, date range) and pagination parameters.
 * @param {Object} args - The query arguments.
 * @param {string} [args.userId] - The ID of the user to filter notes by (optional).
 * @param {string} [args.title] - A string to filter notes by title (case-insensitive, partial match).
 * @param {string} [args.from] - Start date for filtering notes by creation date (optional).
 * @param {string} [args.to] - End date for filtering notes by creation date (optional).
 * @param {number} [args.page=1] - The page number for pagination (default: 1).
 * @param {number} [args.limit=10] - The number of notes per page (default: 10).
 * @returns {Promise<Object>} Resolves with an object containing the notes array, total count, current page, and total pages.
 * @throws {Error} If the database query fails.
 */
export const getNotes = async ({ userId, title, from, to, page = 1, limit = 10 }) => {
  const filter = {};

  if (userId && mongoose.Types.ObjectId.isValid(userId)) {
    filter.ownerId = userId;
  }

  if (title) {
    filter.title = { $regex: title, $options: "i" };
  }

  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }

  const totalCount = await NoteModel.countDocuments(filter);
  const totalPages = Math.ceil(totalCount / limit);
  const skip = (page - 1) * limit;

  const notes = await NoteModel.find(filter)
    .populate("ownerId", "_id name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    notes,
    totalCount,
    totalPages,
    currentPage: page,
  };
};