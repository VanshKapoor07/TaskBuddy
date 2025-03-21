const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const middleware = require("../middleware/authMiddleware");

// // Example of a protected route (Add actual routes when implemented)
// router.get("/dashboard", verifyToken, (req, res) => {
//     res.json({ message: "Welcome to the Team Dashboard!", user: req.user });
// });

router.post("/create", middleware.verifyToken, teamController.createTeam);
router.post("/add-member", middleware.verifyToken, middleware.checkRole(["admin", "manager"]), teamController.addMember);
router.post("/remove-member", middleware.verifyToken, middleware.checkRole(["admin", "manager"]), teamController.removeMember);

module.exports = router;