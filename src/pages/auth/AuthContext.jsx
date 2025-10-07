import React, { useState, useEffect, createContext } from "react";
import { createApi, deleteApi } from "../../utils/api";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [tasks, setTasks] = useState([]);

  const [responsePage, setResponsePage] = useState({
    totalPages: 0,
    currentPage: 0,
    totalItems: 0,
  });

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
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
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

  const [page, setPage] = useState({
    pageNo: 1,
    limit: 13,
    sortBy: "lastModifiedAt",
    direction: "asc",
  });

  function updatePage(newUpdate) {
    setPage((prev) => ({ ...prev, ...newUpdate }));
  }
  function updateResponsePage(newUpdate) {
    setResponsePage((prev) => ({ ...prev, ...newUpdate }));
  }

  return (
    <AuthContext.Provider value={{ token, role, login, logout, tasks, setTasks, setToken, page, setPage, responsePage, updatePage, updateResponsePage }}>{children}</AuthContext.Provider>
  );
}
