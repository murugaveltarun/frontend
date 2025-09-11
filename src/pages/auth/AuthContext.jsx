import React, { useState, useEffect, createContext } from "react";
import { createApi, deleteApi } from "../../utils/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
    setToken(newToken);
    createApi(newToken);
    const decoded = jwtDecode(newToken);
    setRole(decoded.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    deleteApi();
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, tasks, setTasks }}>
      {children}
    </AuthContext.Provider>
  );
}
