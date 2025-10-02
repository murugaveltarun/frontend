import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AdminSidebar from "../../components/navigation/AdminSidebar";
import { jwtDecode } from "jwt-decode";
import AdminHeader from "./pages/AdminHeader";
import AdminNavbar from "../../components/navigation/AdminNavbar";
function AdminDashboard() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const admin = jwtDecode(localStorage.getItem("token"));
  console.log(admin);

  return (
    <>
      <div className=" flex bg-background dark:bg-bg-primary dark:text-text-primary text-dark-gray h-screen transition-transform duration-400 selection:bg-accent selection:text-white dark:selection:bg-gradient-mid-color">
        <div>
          <AdminSidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} admin={admin} />
        </div>
        <main className="flex flex-col overflow-auto custom-scroll w-full">
          <AdminHeader setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} theme={theme} setTheme={setTheme} />
          <AdminNavbar />
          <div className="overflow-autoflex m-1 md:p-8 md:pr-5 pr-1 justify-center items-center">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminDashboard;
