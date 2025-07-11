const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config(); //load the environment variables


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) =>{
    if (err){
        console.error("Database connection failed:", err.message);
        return;
    }
    console.log("✅ Connected to MySQL Database");
});

module.exports = db;