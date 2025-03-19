const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const verifyToken = require("../middleware/authMiddleware"); // Import JWT middleware

// Protected Task Routes
router.get("", verifyToken, taskController.getTasks);
router.get("/:id", verifyToken, taskController.getTaskById);
router.post("", verifyToken, taskController.createTask);
router.put("/:id", verifyToken, taskController.updateTask);
router.delete("/:id", verifyToken, taskController.deleteTask);


module.exports = router;