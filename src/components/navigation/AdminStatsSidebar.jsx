import { AlertTriangle, BarChart3, FilePlus, KeyRound, LayoutDashboard, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminStatsSidebar() {
  const navigate = useNavigate();
  const isActive = (path) => location.pathname == path;
  return (
    <div className="flex text-sm sm:text-base md:text-lg flex-col p-3 gap-3 sm:p-5 sm:gap-5">
      <button className={`admin-home-sidebar ${isActive("/admin-dashboard/stats")? "stats-active" : ""}`} onClick={() => navigate("/admin-dashboard/stats")}>
        <LayoutDashboard className="sidebar-icon" />
        Summary
      </button>
      <button className={`admin-home-sidebar ${isActive("/admin-dashboard/stats/accounts-created")? "stats-active" : ""}`}  onClick={() => navigate("/admin-dashboard/stats/accounts-created")}>
        <UserPlus className="sidebar-icon" />
        Accounts Created
      </button>
      <button className={`admin-home-sidebar ${isActive("/admin-dashboard/stats/tasks-created")? "stats-active" : ""}`}  onClick={() => navigate("/admin-dashboard/stats/tasks-created")}>
        <FilePlus className="sidebar-icon" />
        Tasks Created
      </button>
      <button className={`admin-home-sidebar ${isActive("/admin-dashboard/stats/users-auth-provider")? "stats-active" : ""}`}  onClick={() => navigate("/admin-dashboard/stats/users-auth-provider")}>
        <KeyRound className="sidebar-icon" />
        Users Auth Provider
      </button>
      <button className={`admin-home-sidebar ${isActive("/admin-dashboard/stats/tasks-status")? "stats-active" : ""}`}  onClick={() => navigate("/admin-dashboard/stats/tasks-status")}>
        <BarChart3 className="sidebar-icon" />
        Tasks Status
      </button>
      <button className={`admin-home-sidebar ${isActive("/admin-dashboard/stats/tasks-priority")? "stats-active" : ""}`}  onClick={() => navigate("/admin-dashboard/stats/tasks-priority")}>
        <AlertTriangle className="sidebar-icon" />
        Tasks Priority
      </button>
    </div>
  );
}

export default AdminStatsSidebar;
