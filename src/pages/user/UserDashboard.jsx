import React from "react";
import { Link, Outlet } from "react-router-dom";
import UserHome from "./UserHome";
import UserNavbar from "../../components/navigation/UserNavbar";

function UserDashboard() {
  return (
    <>
      <h1>User Dashboard</h1>
      <UserNavbar />
      <Outlet />
    </>
  );
}

export default UserDashboard;
