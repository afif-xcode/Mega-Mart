const nodemailer = require("nodemailer");
require("dotenv").config();

// Create a transporter using your email service details
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use port 465 for a secure connection
  secure: true, // Use SSL/TLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Verify the connection
transporter.verify(function (error, success) {
  if (error) {
    console.error("Transporter verification failed:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

module.exports = { transporter };
