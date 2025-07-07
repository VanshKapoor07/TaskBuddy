const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Auth = require("../models/userModel")

//Create user table

const createTable = (req,res) =>{
    Auth.createUserTable((err,success)=>{
        if (err) return res.status(500).json({error:err.message});
        res.status(201).json(success);

    });
};
const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const validRoles = ["member", "admin", "manager"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if user already exists
    Auth.checkUserExists({ email }, async (err, exists) => {
      if (err) return res.status(500).json({ error: err.message });
      if (exists) return res.status(400).json({ message: "User already exists" });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Sign up user
      const userRole = role || "member";
      Auth.signupUser({ name, email, hashedPassword, userRole }, (err, success) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(201).json({ message: "Signup successful" });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = (req,res) => {
    const {email, password} = req.body;

    Auth.loginUser({email, password}, async(err,user)=>{
        if (err) return res.status(500).json({error:err.message});
         // Check if user exists
        if (user.length==0) return res.status(404).json({ error: "User not found" });
        const isMatch = await bcrypt.compare(password, user[0].password);
            if (!isMatch) {
                return res.status(401).json({ error: "Password mismatch" });
            }

        // Generate JWT token
        const token = jwt.sign(
            { id: user[0].id, email: user[0].email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        return res.status(200).json({ token });
    });

};

// Get All Users (Only Admins)
const getUsers = async (req, res) => {
    Auth.getAllUsers((err, users) =>{
        if (err) return res.status(500).json({error:err.message});
        res.json(users);
    })
   
};

// Delete a User (Only Admins)
const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;

        Auth.delete_user({ email }, (err, is_deleted) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (is_deleted) {
                return res.status(200).json({ message: "User deleted successfully" });
            } else {
                return res.status(404).json({ message: "User does not exist" });
            }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getMyTasks = (req, res)=>{

    Auth.findbyemail({email: req.user.email}, (err, role, id) =>{
        if (err) return res.status(500).json({error: err.message});
        console.log("Fetching tasks for ");
        console.log("User role:", role);
        console.log("User id", id);

        Auth.getMyTasks({id:id}, (err, tasks) =>{
            if (err) return res.status(500).json({error:err.message});
            res.json(tasks);
        })

    } );
    
}
module.exports = {createTable, signup, login, getUsers, deleteUser, getMyTasks};