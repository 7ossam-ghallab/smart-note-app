/**
 * @fileoverview Database connection module for establishing a connection to MongoDB using Mongoose.
 */

import mongoose from "mongoose";

/**
 * @function db_connection
 * @description Establishes an asynchronous connection to the MongoDB database using the DB_URI environment variable.
 * @returns {Promise<void>} Resolves when the connection is successful, or logs an error on failure.
 */
const db_connection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error.message);
  }
};

export default db_connection;