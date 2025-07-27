/**
 * @fileoverview Main entry point for the Smart Note App API. Configures and starts the Express server,
 * sets up middleware for security, rate limiting, and CORS, and initializes the database connection.
 */

import express from "express";
import { config } from "dotenv";
config({ quiet: true });

import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import db_connection from "./src/database/database_connection.js";
import { controllerHandler } from "./src/utils/routes-handler.js";

/**
 * @constant {Object} corsOptions - Configuration for CORS middleware.
 * @property {Function} origin - Determines allowed origins for CORS requests.
 * @property {string[]} methods - Allowed HTTP methods for CORS.
 * @property {boolean} credentials - Enables credentials in CORS requests.
 */
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowedOrigins = ["http://localhost:3000"];
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
};

/**
 * @constant {Object} limiter - Configuration for rate limiting middleware.
 * @property {number} windowMs - Time window for rate limiting (15 minutes in milliseconds).
 * @property {number} max - Maximum number of requests allowed in the time window (100).
 * @property {string} message - Error message for exceeding rate limit.
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

/**
 * @constant {Object} app - Express application instance.
 */
const app = express();

/**
 * @function db_connection
 * @description Establishes connection to the MongoDB database.
 * @returns {void}
 */
db_connection();

/**
 * @function
 * @description Configures Express middleware for CORS, security headers, rate limiting, and JSON parsing.
 * @middleware cors - Enables CORS with specified options.
 * @middleware helmet - Adds security headers to HTTP responses.
 * @middleware limiter - Applies rate limiting to prevent abuse.
 * @middleware express.json - Parses incoming JSON request bodies.
 */
app.use(
  cors(corsOptions),
  helmet(),
  limiter,
  express.json()
);

/**
 * @function controllerHandler
 * @description Registers API routes and controllers with the Express app.
 * @param {Object} app - The Express application instance.
 * @returns {void}
 */
controllerHandler(app);

/**
 * @constant {number} PORT - Server port number from environment variables or default (3000).
 */
const PORT = +process.env.PORT || 3000;

/**
 * @function
 * @description Starts the Express server on the specified port.
 * @param {number} port - The port number to listen on.
 * @param {Function} callback - Logs server startup message.
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});