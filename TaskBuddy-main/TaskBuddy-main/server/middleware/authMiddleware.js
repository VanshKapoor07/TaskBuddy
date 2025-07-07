const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Auth = require("../models/userModel");
dotenv.config(); //load the environment variables

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.user = decoded; // Store decoded user data in request
        next(); // Continue to protected route
    } catch (err) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

const checkRole = (roles) => {
    return (req, res, next) => {
        try {
            Auth.findbyemail({"email": req.user.email}, (err, role) => {
                if (err) return res.status(500).json({error: err.message});
                
                console.log("Expected role:", roles);
                console.log("User role:", role);
                
                if (!role || !roles.includes(role)) {
                    return res.status(403).json({message: "Access denied: Insufficient Permissions"});
                }
                console.log("Role matched");
                next();
            });
        } catch(error) {
            return res.status(500).json({ error: error.message });            
        }
    };
};


const limitedManager = (req, res, next) =>{
    
    try {
        const {taskId, asigneeIds} = req.body;
        Auth.findbyemail({"email": req.user.email}, (err, role, id) => {
            if (err) return res.status(500).json({error: err.message});
            
            console.log("Checking manager access--> Expected role: Manager");
            console.log("User role:", role);
            
            if (!role || role!= "manager") {
                console.log("Not a manager, no problems!");
                next(); // Continue to protected route
            }
            else{
            console.log("Indeed a manager sir, abhi assign mat kro!");
            //Dont go to next here! if not assignable
            // We have his id! check all team members!
            console.log("Manager id is-->");
            console.log(id);
            Auth.checkTeam({"managerId":id}, (err, team) =>{
                if (err) return res.status(500).json({error_in_check_team: err.message});
                console.log("Checking team of manager! ");
                console.log("Team id is:", team);

            
            Auth.viewTeamMembers({"teamId":team}, (err, members) =>{
                if (err) return res.status(500).json({error_in_viewmembers: err.message});
                console.log("Viewing all members of manager's team!");
                console.log("Members are--> ", members);

                //console.log("Asignee id is-->", Number(asigneeId));
                for (let i = 0; i <asigneeIds.length; i++) {

                //Only if the asigneeId is in members, then the manager may assign the task
                if (members.includes(Number(asigneeIds[i]))) {
                    console.log("Assignee is a team member. Task can be assigned.");
                    next();
                } else {
                    console.log("Assignee is NOT a team member. Task cannot be assigned.");
                    //Just don't write next() here!!
                }
            }
            })
                
            } );
            }
        
        });
    } catch(error) {
        return res.status(500).json({ error: error.message });            
    }
   
};
module.exports = {verifyToken, checkRole, limitedManager};
