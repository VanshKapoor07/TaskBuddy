const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUserTable = () => {
    const sql = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Users table is ready");
    });
};

const authenticateUser = (details, callback) =>{
    console.log("Sign up verification triggered!");
     // Check if email already exists
     db.query("SELECT * FROM users WHERE email = ?", [details.email], async (err, res) => {
        if (err) return callback(err, null);
        if (res.length == 0) {
            
            console.log("Verification done!");
        }

    });
};

const signupUser = (details, callback) =>{
    console.log("Signing up");
     // Insert user into database
     db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
        [details.name, details.email, details.hashedPassword], 
        (err, res) => {
            if (err) return callback(err, null);
            console.log("Sign up successful!");
        }
    );

}

const loginUser = (details, callback) =>{
    db.query("SELECT * FROM users WHERE email = ?",[details.email], async(err, result) =>{
        if (err) return callback(err, null);
        return callback(null, result);
        

        
    });
};




module.exports = {createUserTable, authenticateUser, signupUser, loginUser};
