import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });
  const [errors, setErrors] = useState({});
  const { createTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let newErrors = {};
    if (!task.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!task.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!task.dueDate) {
      newErrors.dueDate = "Due date is required";
    } else if (new Date(task.dueDate) < new Date()) {
      newErrors.dueDate = "Due date cannot be in the past";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        createTask(task);
        navigate("/tasks");
      } catch (error) {
        setErrors({ form: error });
      }
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <div>
          <input type="date" name="dueDate" onChange={handleChange} />
          {errors.dueDate && <span className="error">{errors.dueDate}</span>}
        </div>
        <div>
          <select name="status" onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>{errors.form && <div className="error">{errors.form}</div>}</div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
