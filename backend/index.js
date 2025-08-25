// Load environment variables at the very top
require('dotenv').config();

const express = require("express");
const connectDB = require("./models/db"); // DB connection
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes.js");

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/auth", authRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
