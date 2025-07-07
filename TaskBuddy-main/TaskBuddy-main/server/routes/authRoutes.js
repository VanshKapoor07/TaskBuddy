const express = require("express");

const authController = require("../controllers/authController")
const dotenv = require("dotenv");
const middleware = require("../middleware/authMiddleware"); // Import JWT middleware


dotenv.config();

const router = express.Router();


//Normal routes
router.post("/signup",authController.signup);
router.post("/login", authController.login);

//Protected routes
router.delete("/delete", middleware.verifyToken, middleware.checkRole(["admin"]), authController.deleteUser);     

router.post("",middleware.verifyToken, middleware.checkRole(["admin"]), authController.getUsers);

//router.delete(":/id", authController.deleteUser);

router.post("/mytasks", middleware.verifyToken, authController.getMyTasks)

module.exports = router;