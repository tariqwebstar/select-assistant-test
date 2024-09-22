import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser().catch(() => {
        localStorage.removeItem("token");
      });
    }
  }, []);

  // Handle user authentication
  const login = async (email, password) => {
    try {
      const { data } = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw error.response?.data?.message;
      } else {
        console.error("Login failed", error);
      }
    }
  };

  const signup = async (username, email, password) => {
    try {
      const { data } = await API.post("/auth/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        throw error.response?.data?.message;
      } else {
        console.error("Signup failed", error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await API.get("/auth/me");
      setUser(data);
    } catch (error) {
      console.error("Failed to load user", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
