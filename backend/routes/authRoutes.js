const express = require("express");

// Import middlewares correctly
const { signupValidation, loginValidation } = require("../middlewares/authValidation");

// Import controllers
const { signup, login } = require("../controllers/authController");

const router = express.Router();

// Signup route → runs signupValidation middleware
router.post("/signup", signupValidation, signup);

// Login route → runs loginValidation middleware
router.post("/login", loginValidation, login);

module.exports = router;  // 
