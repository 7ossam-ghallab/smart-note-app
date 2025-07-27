/**
 * @fileoverview Service module for sending emails using Nodemailer and handling email events in the Smart Note App.
 */

import nodemailer from "nodemailer";
import { EventEmitter } from "node:events";

/**
 * @function sendEmailService
 * @description Sends an email using Nodemailer with the provided configuration and email content.
 * @param {Object} options - The email options.
 * @param {string} options.to - The recipient's email address.
 * @param {string} options.subject - The subject of the email.
 * @param {string} options.html - The HTML content of the email.
 * @param {Object[]} [options.attachments=[]] - Array of attachments to include in the email.
 * @returns {Promise<Object|Error>} Resolves with email info on success or returns the error on failure.
 * @throws {Error} If email sending fails.
 */
export const sendEmailService = async ({ to, subject, html, attachments = [] }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // tls: {
      //   rejectUnauthorized: false,
      // },
    });

    const info = await transporter.sendMail({
      from: "👻",
      to,
      subject,
      html,
      attachments,
    });

    return info;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

/**
 * @constant {EventEmitter} emailEvent - Event emitter for handling email sending events.
 * @description Listens for 'sendMail' events and triggers email sending with the provided data.
 */
export const emailEvent = new EventEmitter();

/**
 * @function
 * @description Handles the 'sendMail' event by calling sendEmailService with the provided email data.
 * @event sendMail
 * @param {Object} data - The email data containing to, subject, html, and optional attachments.
 * @returns {void}
 */
emailEvent.on("sendMail", (...args) => {
  const { to, subject, html, attachments } = args[0];
  sendEmailService({ to, subject, html, attachments });
  console.log("Email sent successfully!");
});