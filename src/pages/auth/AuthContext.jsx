import React, { useState, useEffect, createContext } from "react";
import { createApi, deleteApi } from "../../utils/api";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      createApi(storedToken);
      const decoded = jwtDecode(storedToken);
      setRole(decoded.role);
    }
  }, []);


  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("theme","dark");
    setToken(newToken);
    createApi(newToken);
    const decoded = jwtDecode(newToken);
    setRole(decoded.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    deleteApi();
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, tasks, setTasks, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}
