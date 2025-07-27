/**
 * @fileoverview Defines routes for note management endpoints in the Smart Note App API, including GraphQL and REST routes.
 */

import { Router } from 'express';
import { authenticationMiddleware } from '../middleware/authentication.middlewares.js';
import { addNote, deleteNote, summarizeNote } from '../controller/note.controller.js';
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "../graphql/schema.js";
import { errorHandler } from '../middleware/errorHandler.middlewares.js';

/**
 * @constant {Object} NoteRouter - Express Router instance for note-related routes.
 */
const NoteRouter = Router();

/**
 * @function
 * @description Applies authentication middleware to all note routes, ensuring only authenticated users can access them.
 * @middleware authenticationMiddleware
 */
NoteRouter.use(authenticationMiddleware);

/**
 * @function
 * @description Handles GraphQL queries for retrieving notes with filtering and pagination, supporting GraphiQL interface for development.
 * @route GET /notes
 * @access Private
 * @middleware authenticationMiddleware
 */
NoteRouter.get(
  '/',
  createHandler({
    schema,
    graphiql: true
  })
);

/**
 * @function
 * @description Creates a new note for the authenticated user with provided title, content, and ownerId.
 * @route POST /notes
 * @access Private
 * @middleware authenticationMiddleware
 */
NoteRouter.post('/', errorHandler(addNote));

/**
 * @function
 * @description Deletes a note by its ID, ensuring the note belongs to the authenticated user.
 * @route DELETE /notes/:id
 * @access Private
 * @middleware authenticationMiddleware
 */
NoteRouter.delete('/:id', errorHandler(deleteNote));

/**
 * @function
 * @description Summarizes the content of a note using an AI model (e.g., OpenAI or Gemini) by its ID.
 * @route POST /notes/:id/summarize
 * @access Private
 * @middleware authenticationMiddleware
 */
NoteRouter.post('/:id/summarize', errorHandler(summarizeNote));

export default NoteRouter;