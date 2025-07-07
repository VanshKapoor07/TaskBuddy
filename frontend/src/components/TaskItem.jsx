import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./TaskItem.css";

function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className={`task-card ${task.status}`}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>{task.status}</p>
      
      <div className="task-actions">
        <button className="edit-btn" onClick={() => onEdit(task)}>
          <FaEdit /> Edit
        </button>
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          <FaTrash /> Delete
        </button>
      </div>
      </div>
  
  );
}

export default TaskItem;
