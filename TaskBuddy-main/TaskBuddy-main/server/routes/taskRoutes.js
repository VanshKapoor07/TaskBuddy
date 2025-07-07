const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const middleware = require("../middleware/authMiddleware"); // Import JWT middleware
const { validateTask } = require("../middleware/validationMiddleware");



// Protected Task Routes
router.get("", middleware.verifyToken, taskController.getTasks);
router.get("/:id", middleware.verifyToken, taskController.getTaskById);
router.post("", middleware.verifyToken, validateTask, taskController.createTask);
router.put("/:id", middleware.verifyToken, middleware.checkRole(["admin", "manager"]), taskController.updateTask);
router.delete("/:id", middleware.verifyToken,middleware.checkRole(["admin"]), taskController.deleteTask);
router.post("/assign", middleware.verifyToken,middleware.checkRole(["admin", "manager"]), middleware.limitedManager, taskController.assignTask);



module.exports = router;