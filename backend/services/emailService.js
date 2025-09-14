const ejs = require("ejs");
const path = require("path");
const { transporter } = require("../config/email");

async function sendOtpEmail({ name, email, otp }) {
  const templatePath = path.join(__dirname, "../views/otpSendingTemplate.ejs");

  try {
    // Render HTML from EJS template
    const htmlContent = await ejs.renderFile(templatePath, {
      name,
      otp,
      year: new Date().getFullYear(),
    });

    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: htmlContent,
    };

    // Use await for the send method to handle success/failure
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw new Error("Failed to send OTP email");
  }
}

module.exports = { sendOtpEmail };
