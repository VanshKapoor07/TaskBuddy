import React, { useState, useEffect } from "react";
import "./TaskModal.css";

const TaskModal = ({ onClose, onTaskCreated, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setDueDate(taskToEdit.dueDate?.split("T")[0] || "");
      setStatus(taskToEdit.status || "pending");
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const method = taskToEdit ? "PUT" : "POST";
    const url = taskToEdit
      ? `http://localhost:5000/api/tasks/${taskToEdit.id}`
      : `http://localhost:5000/api/tasks`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, dueDate, status }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to save task.");
        return;
      }

      onTaskCreated();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-scale">
        <h2>{taskToEdit ? "Edit Task" : "Create New Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div className="btn-group">
            <button type="submit" className="primary-btn">
              {taskToEdit ? "Update Task" : "Create Task"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
