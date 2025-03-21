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

const signup = async(req,res) =>{
   
    const {name, email, password, role} = req.body;

    Auth.authenticateUser({name, email, password},(err,success)=>{
        
        if (err) return res.status(500).json({error:err.message});

        res.status(201).json(success);

    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    
    const validRoles = ["user", "admin", "manager"];
    if (role && !validRoles.includes(role)){
        return res.status(400).json({message: "Invalid role"});
    }

    // Actual sign up
    Auth.signupUser({name, email, hashedPassword, role}, (err,success)=>{
        if (err) return res.status(500).json({error:err.message});
        res.status(201).json(success)
    })

    //Ensure role is valid

    
    


    
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


module.exports = {createTable, signup, login, getUsers, deleteUser};