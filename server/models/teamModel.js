const db = require("../config/db");

//Create a new team

const createNewTeam = (name, description, createdBy) => {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO teams (name, description, created_by) VALUES (?, ?, ?)", 
            [name, description, createdBy],
            (err, result) => {
                if (err) return reject(err);
                resolve(result.insertId);
            }
        );
    });
};

// Add a member to team

const addNewMember = (teamId, userId) => {
    return new Promise((resolve, reject) => {
        // First, get the role of the user from the users table
        db.query("SELECT role FROM users WHERE id = ?", [userId], (err, results) => {
            if (err) return reject(err);

            if (results.length === 0) {
                return reject(new Error("User not found"));
            }

            const role = results[0].role;

            // Now, insert into team_members with the retrieved role
            db.query("INSERT INTO team_members (team_id, user_id, role) VALUES (?, ?, ?)", [teamId, userId, role], (err, result) => {
                if (err) return reject(err);
                resolve("Member added successfully");
            });
        });
    });
};


const removeOldMember = (teamId, userId) => {
    return new Promise((resolve, reject) =>{

        db.query("DELETE FROM team_members WHERE user_id = ? AND team_id = ?", [userId, teamId], (err, result) =>{
            if (err) return reject(err);
            if (result.affectedRows > 0) {
            resolve("Member removed successfully");
            }
            else{
                resolve("Member does not exist in team");
            }
        });
    });
};


module.exports = {createNewTeam, addNewMember, removeOldMember};