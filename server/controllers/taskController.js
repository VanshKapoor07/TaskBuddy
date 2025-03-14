const Task = require("../models/taskModel");

//Get all tasks
const getTasks = (req, res) =>{
    Task.getAllTasks((err, tasks) =>{
        if (err) return res.status(500).json({error:err.message});
        res.json(tasks);
    });
};

//Get task by ID
const getTaskById = (req, res) => {
    Task.getTaskById(req.params.id, (err,task) =>{
        if (err) return res.status(500).json({error:err.message});
        if (!task) return res.status(404).json({message: "Task not found"});
        res.json(task);
    });
};

//Create a new task
const createTask = (req, res) =>{
    const {title, description, status} = req.body;
    if (!title) return res.status(400).json({message:"Title is required"});

    Task.createTask({title, description, status}, (err,newTask) =>{
        if (err) return res.status(500).json({error: err.message});
        res.status(201).json(newTask);
    });
};

//Update a task
const updateTask = (req, res)=>{
    const {title, description, status} = req.body;
    if (!title) return res.status(400).json({message: "Title is required"});
    
    Task.updateTask(req.params.id, {title, description, status}, (err, result)=>{
        if (err) return res.status(500).json({error: err.message});
        res.json({message: "Task updated successfully"});
    });
};

//Delete a task
const deleteTask = (req, res) =>{
    Task.deleteTask(req.params.id, (err, result) =>{
        if (err) return res.status(500).json({error: err.message});
        res.json({message: "Task deleted successfully"});
    });
};

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask};