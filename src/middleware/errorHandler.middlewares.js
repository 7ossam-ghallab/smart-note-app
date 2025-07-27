/**
 * @fileoverview Middleware for handling errors in API routes and globally across the Smart Note App.
 */

/**
 * @function errorHandler
 * @description Wraps an API handler to catch asynchronous errors and pass them to the Express error-handling middleware.
 * @param {Function} api - The API handler function to wrap.
 * @returns {Function} Middleware that catches errors and forwards them to the next middleware.
 */
export const errorHandler = (api) => {
  return (req, res, next) => {
    api(req, res, next).catch((err) => {
      if (err) {
        console.error(`ERROR IN :${req.url}`, err);
        return next(new Error(err.message, { cause: 500 }));
      }
    });
  };
};

/**
 * @function globalErrorHandler
 * @description Global error-handling middleware that processes errors and sends a standardized JSON response.
 * @param {Object} err - The error object.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * @returns {Object} JSON response with error details and appropriate status code.
 */
export const globalErrorHandler = (err, req, res, next) => {
  console.log(`global error handler: ${err.message}`);
  return res.status(err.status || 500).json({ message: err.message });
};