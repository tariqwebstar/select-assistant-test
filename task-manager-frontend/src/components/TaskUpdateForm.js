import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

const TaskUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask } = useContext(TaskContext);
  const [task, setTask] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const currentTask = tasks.find((t) => t._id === id);
    setTask(currentTask);
  }, [id, tasks]);

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
        const dueDateFormat = new Date(task.dueDate)
          .toISOString()
          .substring(0, 10);
        const taskUpdate = { ...task, dueDate: dueDateFormat };
        await updateTask(id, taskUpdate);
        navigate(`/tasks/${id}`);
      } catch (error) {
        setErrors({ ...errors, form: error });
      }
    }
  };

  return task ? (
    <div className="container">
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={task.title}
            name="title"
            onChange={handleChange}
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={task.description}
            name="description"
            onChange={handleChange}
          />
          {errors.description && (
            <span className="error">{errors.description}</span>
          )}
        </div>
        <div>
          <input
            type="date"
            value={new Date(task.dueDate).toISOString().substring(0, 10)}
            name="dueDate"
            onChange={handleChange}
          />
          {errors.dueDate && <span className="error">{errors.dueDate}</span>}
        </div>
        <select value={task.status} name="status" onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <div>{errors.form && <div className="error">{errors.form}</div>}</div>
        <button type="submit">Update Task</button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default TaskUpdateForm;
