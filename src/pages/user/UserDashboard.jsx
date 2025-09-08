import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserSidebar from "../../components/navigation/UserSidebar";
import { jwtDecode } from "jwt-decode";
import UserHeader from "./UserHeader";

function UserDashboard() {
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

  const user = jwtDecode(localStorage.getItem("token"));
  console.log(user);

  return (
    <>
      <div className=" flex bg-background dark:bg-bg-primary dark:text-text-primary text-dark-gray h-screen transition-transform duration-400 selection:bg-accent selection:text-white dark:selection:bg-gradient-mid-color">
        <div>
          <UserSidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} user={user} />
        </div>
        <main className="flex flex-col flex-1">
          <UserHeader setSideBarOpen={setSideBarOpen} sideBarOpen={sideBarOpen} theme={theme} setTheme={setTheme} />
          <div className="m-8 custom-scroll pr-5">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default UserDashboard;
