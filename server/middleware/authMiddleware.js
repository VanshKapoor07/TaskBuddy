const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(); //load the environment variables

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Store decoded user data in request
        next(); // Continue to protected route
    } catch (err) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

module.exports = verifyToken;
