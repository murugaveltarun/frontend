import React, { useState, createContext } from "react";

export const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [userFilter, setUserFilter] = useState({
    username: "",
    email: "",
    uname: "",
    authProvider: "",
    active: "",
  });
  const [page, setPage] = useState({
    pageNo: 1,
    limit: 14,
    sortBy: "lastLoginAt",
    direction: "desc",
  });
  const [responsePage, setResponsePage] = useState({
    totalPages: 0,
    currentPage: 0,
    totalItems: 0,
  });
  function updateUserFilter(newUpdate) {
    setUserFilter((prev) => ({ ...prev, ...newUpdate }));
  }

  function updatePage(newUpdate) {
    setPage((prev) => ({ ...prev, ...newUpdate }));
  }
  function updateResponsePage(newUpdate) {
    setResponsePage((prev) => ({ ...prev, ...newUpdate }));
  }

  return (
    <UsersContext.Provider
      value={{ page, setPage, users, setUsers, updatePage, responsePage, setResponsePage, updateResponsePage, userFilter, setUserFilter, updateUserFilter }}
    >
      {children}
    </UsersContext.Provider>
  );
}
