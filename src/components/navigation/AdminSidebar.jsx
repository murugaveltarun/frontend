import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation, matchPath } from "react-router-dom";
import { Power, RotateCcw, Search, User } from "lucide-react";
import { AuthContext } from "../../pages/auth/AuthContext";
import ConfirmModel from "../model/ConfirmModel";
import AdminTasksSidebar from "./AdminTasksSidebar";
import AdminUsersSidebar from "./AdminUsersSidebar";
import AdminStatsSidebar from "./AdminStatsSidebar";
import AdminHomeSidebar from "./AdminHomeSidebar";

function AdminSidebar({ sideBarOpen, setSideBarOpen, user }) {
  const [confirm, setConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState("");

  useEffect(() => {
    if (
      location.pathname == "/admin-dashboard/tasks" ||
      matchPath("/admin-dashboard/users/:userid/tasks", location.pathname) ||
      matchPath("/admin-dashboard/users/:userid/tasks/:taskid", location.pathname)
    ) {
      setSidebar("tasks");
    } else if (location.pathname.startsWith("/admin-dashboard/stats")) {
      setSidebar("stats");
    } else if (location.pathname == "/admin-dashboard/users" || matchPath("/admin-dashboard/users/:userid", location.pathname)) {
      setSidebar("users");
    } else {
      setSidebar("none");
    }
  }, [location.pathname]);

  useEffect(() => {
    console.log(sidebar);
  }, [sidebar]);

  return (
    <>
      {confirm && (
        <ConfirmModel
          message={"Are you sure you want to Logout?"}
          handleYes={() => {
            navigate("/logout");
          }}
          setConfirm={setConfirm}
          text={"Logout"}
        />
      )}
      {/* name and username */}
      <div
        className={`z-1000 h-screen bg-text-primary border-r-1 border-sidebar-border dark:bg-bg-primary dark:border-border-color dark:backdrop-blur-md w-80 sm:w-110 max-h-screen sm:min-h-screen shadow-md shadow-accent dark:shadow-gradient-mid-color fixed ${
          sideBarOpen ? "-translate-x-0" : "-translate-x-80 sm:-translate-x-110"
        } lg:-translate-x-0 lg:static flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto  custom-scroll`}
      >
        <div className="flex p-5 h-20 sm:h-30 justify-between border-sidebar-border dark:border-border-color border-b-1">
          <div className="flex flex-row justify-center items-center ">
            <div className="select-none hover:scale-105 transition-transform ease-in-out flex justify-center items-center text-white bg-accent dark:bg-gradient-mid-color/40 text-xl sm:text-5xl h-10 w-10 sm:h-20 sm:w-20 rounded-[50%] font-extrabold mr-3 sm:mr-8">
              <User className="sm:w-12 sm:h-12" />
            </div>
            <div>
              <h5 className="text-xl sm:text-3xl font-semibold text-accent dark:text-gradient">Administrator</h5>
            </div>
          </div>
          <button onClick={() => setSideBarOpen(false)} className="text-3xl lg:hidden">
            &times;
          </button>
        </div>
        <div className="flex flex-col justify-between flex-grow">
          <div className="">
            {sidebar == "tasks" && <AdminTasksSidebar />}
            {sidebar == "users" && <AdminUsersSidebar />}
            {sidebar == "stats" && <AdminStatsSidebar />}
            {sidebar == "none" && <AdminHomeSidebar />}
          </div>
          <div>
            <div className="flex justify-center items-center border-sidebar-border border-t-1 dark:border-border-color">
              <button className="red-button" onClick={() => setConfirm(true)}>
                <Power className="w-5 h-5 mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminSidebar;
