const express = require("express");
const router = express.Router();

router.get("/tasks", (req,res) => {
    res.json({message: "Fetching all tasks..."});
});

module.exports = router;