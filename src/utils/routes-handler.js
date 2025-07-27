/**
 * @fileoverview Route handler module for registering API routes and global middleware in the Express application.
 */

import { globalErrorHandler } from "../middleware/errorHandler.middlewares.js";
import AuthRouter from "../routes/auth.route.js";
import NoteRouter from "../routes/note.route.js";

/**
 * @function controllerHandler
 * @description Configures the Express app with routes and global error handling middleware.
 * @param {Object} app - The Express application instance.
 * @returns {void}
 */
export const controllerHandler = (app) => {
  /**
   * @function
   * @description Handles GET requests to the root endpoint, returning a welcome message.
   * @route GET /
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @returns {Object} JSON response with a welcome message.
   */
  app.get("/", (req, res) => {
    res.json({ message: "Welcome Hossam ✋" });
  });

  /**
   * @function
   * @description Registers the authentication routes under the /auth prefix.
   * @route /auth/*
   */
  app.use("/auth", AuthRouter);

  /**
   * @function
   * @description Registers the note management routes under the /notes prefix.
   * @route /notes/*
   */
  app.use("/notes", NoteRouter);

  /**
   * @function
   * @description Catches all unmatched routes and returns a 404 error response.
   * @route ALL /*
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @returns {Object} JSON response with a 404 status and error message.
   */
  app.all(/.*/, (req, res) => {
    res.status(404).json({ message: "This router is not exist" });
  });

  /**
   * @function
   * @description Global error-handling middleware that catches and processes errors, returning a JSON response.
   * @param {Object} err - The error object.
   * @param {Object} req - The Express request object.
   * @param {Object} res - The Express response object.
   * @param {Function} next - The Express next middleware function.
   * @returns {Object} JSON response with error details and appropriate status code.
   */
  app.use(globalErrorHandler);
};