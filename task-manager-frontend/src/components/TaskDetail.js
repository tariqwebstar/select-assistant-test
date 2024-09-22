import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, deleteTask } = useContext(TaskContext);
  const [task, setTask] = useState(null);

  useEffect(() => {
    const currentTask = tasks.find((t) => t._id === id);
    setTask(currentTask);
  }, [id, tasks]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
      navigate("/tasks");
    }
  };

  return task ? (
    <div className="task-detail container">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
      <Link to={`/tasks/${id}/edit`}>
        <button>Edit Task</button>
      </Link>
      <button className="delete" onClick={handleDelete}>
        Delete Task
      </button>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default TaskDetail;
