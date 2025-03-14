const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const db = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config()         //Load .env file
const app = express();
const PORT = process.env.PORT || 5000;

//Middeware
app.use(express.json());    //Parse JSON requests
app.use(cors());            //Enable CORS for frontend requests
app.use(helmet());          //Add basic security

//Test route
app.get("/",(req,res)=>{
    res.send("TaskBuddy Backend is running! 🚀");
});

//Use taskRoutes.js
app.use("/api",taskRoutes);

//Start server
app.listen(PORT, () =>{
    console.log(`✅ Server running on http://localhost:${PORT}`);
});