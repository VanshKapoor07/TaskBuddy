const teamModel = require("../models/teamModel");

const createTeam = async (req, res) => {
    try {
        const { name, description } = req.body;
        const createdBy = req.user.id; // Get user from JWT token

        const teamId = await teamModel.createNewTeam(name, description, createdBy); // ✅ Now returns a Promise

        await teamModel.addNewMember(teamId, createdBy, "admin");

        res.status(201).json({ message: "Team created successfully", teamId });

    } catch (error) {
        console.error("Error creating team:", error);
        res.status(500).json({ error: "Error creating team" });
    }
};


const addMember = async (req, res) =>{
    try{
        const {teamId, userId} = req.body;

        await teamModel.addNewMember(teamId, userId);
        res.status(200).json({ message: "Member added to team successfully"});
    } catch(error){
        res.status(500).json({ error: error.message});
    }
};

const removeMember = async (req, res) =>{
    try{
        const {teamId, userId} = req.body;

        const result = await teamModel.removeOldMember(teamId, userId);

        res.status(200).json({ message: result});
    } catch(error){
        res.status(500).json({ error: error.message});
    }
};

module.exports = {createTeam, addMember, removeMember};