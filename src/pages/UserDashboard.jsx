import React from "react";
import { Link, Outlet } from "react-router-dom";
import UserHome from "./userPages/UserHome";
import UserNavbar from "../components/userComponents/UserNavbar";


function UserDashboard() {
  return <>
    <h1>User Dashboard</h1>
    <UserNavbar />
    <Outlet />
  </>;
}

export default UserDashboard;
