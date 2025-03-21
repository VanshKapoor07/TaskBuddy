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
        role ENUM('member', 'admin', 'manager') DEFAULT 'member',
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
     db.query("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
        [details.name, details.email, details.hashedPassword, details.role], 
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

const getAllUsers = (callback) =>{
    db.query("SELECT * FROM users", (err, result) =>{
        if (err) return callback(err, null);
        return callback(null, result);
    })
}

const findbyemail = (details, callback) => {
    
    db.query("SELECT role,id FROM users WHERE email = ?", [details.email], (err, result) => {
        if (err) return callback(err, null);
        
        // If user is found, return role; otherwise, return null
        if (result.length > 0) {
            return callback(null, result[0].role, result[0].id);
        } else {
            return callback(null, null); // No user found
        }
    });
};

const checkTeam = (details, callback) => {
    db.query("SELECT team_id FROM team_members WHERE user_id = ?", [details.managerId], (err, result) =>{
        if (err) return callback(err, null);

        // If team is found, return team, otherwise null
        if (result.length >0){
            return callback(null, result[0].team_id);
        } else{
            return callback(null, null); //No team found
        }
    });
    
};

const viewTeamMembers = (details, callback) =>{
    
    db.query("SELECT user_id FROM team_members WHERE team_id = ?", [details.teamId], (err, result) =>{
        //If members are found, return members, otherwise null

        if (result.length >0){
            const members = result.map(row => row.user_id); // Extract user_ids from result
            return callback(null, members);
        } else{
            return callback(null, null);    //no user found in team
        }
    });
}


const delete_user = (details, callback) => {
    db.query("SELECT email FROM users WHERE email = ?", [details.email], (err, results) => {
        if (err) return callback(err, null);

        if (results.length === 0) {
            return callback(null, false); // No user found
        }

        db.query("DELETE FROM users WHERE email = ?", [details.email], (err, result) => {
            if (err) return callback(err, null);

            
            return callback(null, result.affectedRows > 0); // True if deleted, false otherwise
        });
    });
};



module.exports = {createUserTable, authenticateUser, signupUser, loginUser, getAllUsers, findbyemail, delete_user, checkTeam, viewTeamMembers};
