import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Signup from "./components/Signup";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";
import TaskForm from "./components/TaskForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TaskUpdateForm from "./components/TaskUpdateForm";
import Navbar from "./components/Navbar";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route exact path="/tasks" element={<TaskList />} />
            <Route exact path="/tasks/new" element={<TaskForm />} />
            <Route exact path="/tasks/:id" element={<TaskDetail />} />
            <Route exact path="/tasks/:id/edit" element={<TaskUpdateForm />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
