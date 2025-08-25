// Import the User model
const User = require("../models/user");
const bcrypt = require("bcryptjs");   // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating authentication tokens

// ==========================
// User Signup Controller
// ==========================
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists with the same email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // 4. Save to database
    await newUser.save();

    // 5. Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// ==========================
// User Login Controller
// ==========================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    // FIX: Changed variable name from 'User' to 'user' to avoid conflict with model
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Compare entered password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 3. Generate JWT token (valid for 1 hour)
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
      console.log("JWT Secret:", process.env.JWT_SECRET)

    // 4. Send success response
    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email }, // FIX: match property names
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Export controllers
module.exports = { signup, login };
