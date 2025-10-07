import React from "react";
import { BarChart2, ClipboardList, Users, Settings, Users2, ListIcon, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();
  return (
    <div className="admin-home-container">
      <div className="flex flex-col items-center gap-4">
        <h2 className="sm:text-xl lg:text-2xl xl:text-3xl text-center py-2 px-5 bg-dark-accent/40 dark:bg-dark-purple/50 rounded-full">Welcome to the TaskWiser Admin Dashboard</h2>
        <div className="w-30 bg-accent dark:bg-gradient-mid-color h-1 rounded full "></div>
      </div>
      <div className="flex flex-col 2xl:flex-row gap-5 sm:gap-8">
        <div className="admin-home-div" onClick={()=>navigate("/admin-dashboard/users")}>
          <h3 className="admin-home-h">
            <Users2 className="admin-home-icon" /> User Management
          </h3>
          <ul className="admin-home-p">
            <li>View and manage all registered users</li>
            <li>Monitor each user's TaskWiser activity</li>
            <li>Activate or deactivate user accounts</li>
            <li>View detailed user usage information</li>
            <li>Search users based on specific categories</li>
          </ul>
        </div>

        <div className="admin-home-div" onClick={()=>navigate("/admin-dashboard/tasks")}>
          <h3 className="admin-home-h">
            <ListIcon className="admin-home-icon" /> Task Management
          </h3>
          <ul className="admin-home-p">
            <li>View and manage all tasks created by users</li>
            <li>Filter tasks by specific users</li>
            <li>Search tasks by different categories</li>
            <li>Edit or delete any task as needed</li>
          </ul>
        </div>

        <div className="admin-home-div" onClick={()=>navigate("/admin-dashboard/stats")}>
          <h3 className="admin-home-h">
            <BarChart2 className="admin-home-icon" /> Statistics and Insights
          </h3>
          <ul className="admin-home-p">
            <li>View overall statistics of TaskWiser usage</li>
            <li>See how many users are active today</li>
            <li>Track how many accounts were created today</li>
            <li>View total tasks created today</li>
            <li>Check the average number of tasks per user</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
