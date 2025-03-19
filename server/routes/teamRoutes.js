const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware"); // Import JWT middleware

// Example of a protected route (Add actual routes when implemented)
router.get("/dashboard", verifyToken, (req, res) => {
    res.json({ message: "Welcome to the Team Dashboard!", user: req.user });
});

module.exports = router;