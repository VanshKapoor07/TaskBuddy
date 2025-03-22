const db = require("../config/db");

//Get all tasks
const getAllTasks = (req, callback) => {
    let {page, limit, search, status, sortBy, sortOrder} = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    let offset = (page-1) * limit;

    let query = "SELECT * FROM tasks WHERE 1=1";
    let queryParams = [];

    //Feature -1: Search by title or description
    if (search){
        query+= " AND (title LIKE ? OR description LIKE ?)";
        queryParams.push(`%${search}%`, `%${search}%`);
    }

    //Feature -2: Filter by status
    if (status){
        query+= " AND STATUS = ?";
        queryParams.push(status);
    }

    //Feature -3: Sorting
    if (sortBy && ["due_date", "priority", "created_at"].includes(sortBy)) {
        query += ` ORDER BY ${sortBy} ${sortOrder === "desc" ? "DESC" : "ASC"}`;
    } else {
        query += " ORDER BY created_at DESC"; // Default sorting
    }

    //Feature -4: Pagination
    query += " LIMIT ? OFFSET ?";
    queryParams.push(limit,offset);

    //Execute the query

    db.query(query, queryParams, (err, results) => {
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


const assignTask = (task, callback) => {
    db.query("UPDATE tasks SET assignedTo = ? WHERE id = ?", [task.asigneeIds[0], task.taskId], (err, result1) => {
        if (err) return callback(err, null);

        let completed = 0;
        let results = [];

        for (let i = 0; i < task.asigneeIds.length; i++) {

            db.query("SELECT * FROM task_assignees WHERE task_id = ? AND user_id = ?", 
                [Number(task.taskId), Number(task.asigneeIds[i])], 
                (err, resultcheck) =>{
                    if (err) return callback(err, null);
                    if (resultcheck.length == 0){
                        db.query("INSERT INTO task_assignees (task_id, user_id) VALUES (?, ?)", 
                        [Number(task.taskId), Number(task.asigneeIds[i])], 
                        (err, result2) => {
                            if (err) return callback(err, null);

                            results.push(result2);
                            completed++;

                            if (completed === task.asigneeIds.length) {
                                callback(null, { result1, results });
                            }
                        });
                    }
                }
            )

            
        }
    });
};


module.exports = {getAllTasks, getTaskById, createTask, updateTask, deleteTask, assignTask};