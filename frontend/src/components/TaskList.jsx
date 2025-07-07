import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import "./TaskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:5000/api/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setTasks(data);
  };

  const handleDelete = async (taskId) => {
    const token = localStorage.getItem('token');
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (res.ok) {
        alert("Task deleted!");
        fetchTasks();
      } else {
        alert(data.message || "Delete failed.");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="task-list-container">
      <div className="task-list-header">
      <h2>My Tasks</h2>
      </div>
      <button
        className="add-task-btn"
        onClick={() => {
          setEditingTask(null); // make sure it's not in edit mode
          setShowModal(true);
        }}
      >
        + New Task
      </button>

      {(showModal || editingTask) && (
        <TaskModal
          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}
          onTaskCreated={fetchTasks}
          taskToEdit={editingTask}
        />
      )}
    <div className="task-grid">
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        
        tasks.map((task) => (
          <div key={task.id} className="task-card">
          <TaskItem
            key={task.id}
            task={task}
            onEdit={(task) => {
              setEditingTask(task);
              setShowModal(true); // open modal for editing
            }}
            onDelete={handleDelete}
          />
          </div>
        ))
      )
      }
      </div>
    </div>
  );
}

export default TaskList;
