const db = require("../config/db");

//Get all tasks
const getAllTasks = (callback) => {
    db.query("SELECT * FROM tasks", (err, results) => {
        if (err) return callback(err, null);
        callback(null, results);
    });
};

//Get task by ID
const getTaskById = (id, callback) => {
    db.query("SELECT * FROM tasks WHERE id = ?", [id], (err, results) => {
        if (err) return callback(err, null);
        callback(null, results[0]); //results is by default a list with all outputs as lists, so use it
    });
};

//Create a new task
const createTask = (task, callback) => {
    db.query("INSERT INTO tasks(title, description, status) VALUES (?, ?, ?)",
    [task.title, task.description, task.status],
    (err, result) => {
        if (err) return callback(err,null);
        callback(null, {id: result.insertId, ...task });
    });
};

//Update a task
const updateTask = (id, task, callback) => {
    db.query("UPDATE tasks SET title = ?, description = ?, status =? WHERE id=?",
        [task.title, task.description, task.status, id],
        (err, result) =>{
            if (err) return callback(err, null);
            callback(null, result);
    });
};

//Delete a task
const deleteTask = (id, callback) => {
    db.query("DELETE FROM tasks WHERE id =?", [id], (err,result)=>{
        if (err) return callback(err, null);
        callback(null, result);
    });
};

module.exports = {getAllTasks, getTaskById, createTask, updateTask, deleteTask};