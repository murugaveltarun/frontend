import { BarChart2, ClipboardList, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminHomeSidebar() {
  const navigate = useNavigate();
  return (
    <div className="flex text-sm sm:text-base md:text-lg flex-col p-3 gap-3 sm:p-5 sm:gap-5">
      <button className="admin-home-sidebar" onClick={() => navigate("/admin-dashboard/users")}>
        <User className="sidebar-icon" />
        Manage all registered users
      </button>
      <button className="admin-home-sidebar" onClick={() => navigate("/admin-dashboard/tasks")}>
        <ClipboardList className="sidebar-icon" />
        View and manage tasks
      </button>
      <button className="admin-home-sidebar" onClick={() => navigate("/admin-dashboard/stats")}>
        <BarChart2 className="sidebar-icon" />
        Check users analytics
      </button>
    </div>
  );
}

export default AdminHomeSidebar;
