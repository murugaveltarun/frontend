import React from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Sun, Moon, SunIcon, MoonIcon, Plus, SunMedium, Sunrise, PlusCircle, ListTodo } from "lucide-react";


function AdminHeader({ sideBarOpen, setSideBarOpen, theme, setTheme }) {
    const navigate = useNavigate();
    const location = useLocation();
    let isAdd = false ;
    
  if (location.pathname == "/admin-dashboard/add") {
    isAdd = true;
  }
  return (
    <header className="p-8 flex justify-between h-30 items-center ">
      <button className={`text-3xl lg:hidden select-none cursor-pointer `} onClick={() => (sideBarOpen ? setSideBarOpen(false) : setSideBarOpen(true))} >
        ☰
      </button>

      <h5 className="cursor-pointer flex flex-row justify-center items-center gap-4 text-xl  m-2 md:m-6 sm:text-4xl md:text-5xl font-bold text-accent dark:text-gradient select-none" onClick={()=>navigate("")}> <ListTodo className="dark:text-gradient-mid-color sm:w-11 sm:h-11  md:w-14 md:h-14" /> Task Wiser</h5>
      <div className="flex gap-3 md:gap-10 justify-center items-center">
        <button
          onClick={() => {console.log("clicked!!!");navigate("add")}}
          className="select-none cursor-pointer flex gap-3 p-1 md:p-4 justify-center items-center rounded-[50%] xl:rounded-4xl hover:scale-110 transition-transform duration-600 ease-in-out text-white bg-accent dark:bg-gradient-mid-color font-bold disabled:hidden"
          disabled={isAdd}
        >
          <PlusCircle className="w-10 h-10" />
          <span className="hidden xl:block text-2xl">Add New Task</span>
        </button>

        <button
          className="select-none cursor-pointer flex justify-center items-center bg-amber-100 text-orange-400 dark:text-white  dark:bg-bg-surface p-1 md:p-auto md:h-18 md:w-18 rounded-[50%] hover:scale-115 transition-transform duration-600 ease-in-out hover:animate-[spin_3s_linear_infinite] dark:hover:animate-pulse  "
          onClick={theme == "light" ? () => setTheme("dark") : () => setTheme("light")}
        >
          {" "}
          {theme == "light" ? <SunIcon className="w-10 h-10 " /> : <MoonIcon className="w-10 h-10 hover:drop-shadow-[0_0_20px_white]" />}{" "}
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;
