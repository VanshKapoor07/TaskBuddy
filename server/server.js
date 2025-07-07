const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authController = require("./controllers/authController"); // Import authController
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const apiLimiter = require("./middleware/rateLimitMiddleware");

dotenv.config(); // Load .env file
const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests only from frontend at localhost:3000
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(cors(corsOptions)); // Enable CORS for frontend requests
app.use(helmet()); // Add basic security headers

// Always ensure table is created
authController.createTable();

// Test route
app.get("/", (req, res) => {
  res.send("TaskBuddy Backend is running! 🚀");
});

// Use rate limiter on all API routes
app.use("/api/", apiLimiter);

// Use Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/team", teamRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
