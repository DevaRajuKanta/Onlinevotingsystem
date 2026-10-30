 const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();


// ===============================
// REGISTER USER
// ===============================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Registration request received:");
    console.log(req.body);

    // Check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check password length
    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user
    await newUser.save();

    console.log("User registered successfully");

    res.status(201).json({
      message: "Registration successful",
    });

  } catch (error) {
    console.log("Registration error:", error);

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});


module.exports = router;