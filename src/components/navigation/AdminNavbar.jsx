import React from "react";
import { NavLink } from "react-router-dom";

function AdminNavbar() {
  return (
    <div className="new-nav">
      <nav className="">
        <ul className="flex flex-row gap-10 text-base sm:text-lg">
          <li>
            {" "}
            <NavLink to="/admin-dashboard/users" className={({ isActive }) => `px-3 py-1 ${isActive ? "active-link text-left" : ""}`}>
              Users
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/admin-dashboard/tasks" className={({ isActive }) => `px-3 py-1 ${isActive ? "active-link text-left" : ""}`}>
              Tasks
            </NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/admin-dashboard/stats" className={({ isActive }) =>`px-3 py-1 ${isActive ? "active-link text-left" : ""}`}>
              Stats
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminNavbar;
