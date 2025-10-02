import React from "react";

function AdminNavbar() {
  return <div className="flex justify-center items-center py-4 bg-white/10 text-xl w-full " >
    <nav className="">
      <ul className="flex flex-row gap-10" >
        <li> <a href="/admin-dashboard/users">Users</a> </li>
        <li> <a href="/admin-dashboard/tasks">Tasks</a> </li>
        <li> <a href="/admin-dashboard/stats">Statistics</a> </li>
      </ul>
    </nav>
  </div>;
}

export default AdminNavbar;
