import React from "react";
import AdminNavbar from "../../components/navigation/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <AdminNavbar />
      <Outlet />
    </>
  );
}

export default AdminDashboard;
