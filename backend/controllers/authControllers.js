const OTP = require("../models/OTP");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { sendOtpEmail } = require("../services/emailService");

const otpGenerator = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// User Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate OTP & store
    const otp = otpGenerator();
    await OTP.create({ email, otp });

    // Send OTP via email (using emailService)
    await sendOtpEmail({ name, email, otp });

    return res.status(200).json({
      message: "OTP sent to email. Please verify to complete registration.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// OTP Verification
exports.verifyOtp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, otp } = req.body;

    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (!password || !confirmPassword || password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
    });

    await OTP.deleteOne({ _id: validOtp._id });

    return res.status(201).json({
      message: "User registered successfully ✅",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({ message: "Server error during OTP verification" });
  }
};
