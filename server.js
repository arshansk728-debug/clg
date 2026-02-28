const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express(); // ✅ Define app BEFORE using it

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());

// Optional: Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Example route
app.get("/", (req, res) => {
  res.send("College Query Chatbot API is running 🚀");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
