import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import UserSidebar from "../../components/navigation/UserSidebar";
import { jwtDecode } from "jwt-decode";
import {Sun,Moon, SunIcon, MoonIcon} from "lucide-react";


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
      <div className="flex bg-[#FAFAFA] dark:text-white text-black">
        <div>
          <UserSidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} user={user} />
        </div>
        <main className="flex-1">
          <header className="p-4 flex justify-between">
            <button
              className="text-3xl lg:hidden"
              onClick={() => (sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true))}
            >
              ☰
            </button>
            <h1 className="text-3xl font-semibold text-gradient">Task Wiser</h1>
            <div className="text-amber-300 dark:text-white">
              <button onClick={theme == "light"? ()=>setTheme("dark") : ()=>setTheme("light") }  > {theme == "light" ? <SunIcon /> : <MoonIcon />} </button>
            </div>
          </header>
          <footer>{/* <Outlet /> */}</footer>
        </main>
      </div>
    </>
  );
}

export default UserDashboard;
