import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import API from "../services/api";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      clearTasks(); // Clear tasks when there's no user
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await API.post("/tasks", taskData);
      setTasks([...tasks, response.data]);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw error.response?.data?.errors.find(Boolean)["msg"];
      } else {
        console.error("Create task failed", error);
        throw error;
      }
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const response = await API.put(`/tasks/${id}`, taskData);
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw error.response?.data?.errors.find(Boolean)["msg"];
      } else {
        console.error("Update task failed", error);
        throw error;
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  };

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <TaskContext.Provider
      value={{ tasks, createTask, updateTask, deleteTask, clearTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
