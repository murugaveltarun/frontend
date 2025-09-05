import React, { useContext } from "react";
import { useState } from "react";
import { getApi } from "../../utils/api";
import { useNavigate, Outlet } from "react-router-dom";
import { LogOut, Power, RotateCcw, Search } from "lucide-react";
import { AuthContext } from "../../pages/auth/AuthContext";

function UserSidebar({ sideBarOpen, setSideBarOpen, user }) {
  let {setTasks } = useContext(AuthContext);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [buttonText, setButtonText] = useState("Search");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!title && !description && !status && !priority) {
      handleClear(e);
      return;
    }

    setButtonText("Searching...");
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/tasks/search?title=${title}&description=${description}&status=${status}&priority=${priority}`;
      const response = await getApi().get(url);
      console.log(url);
      console.log(title, description, status, priority);
      console.log(response.data);
      setTasks(response.data);
    } catch (e) {
      console.log(e);
    }
    setButtonText("Search");
  };

  const handleClear = async (e) => {
    e.preventDefault();
    setTitle("");
    setDescription("");
    setPriority("");
    setStatus("");

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/tasks`;
      const response = await getApi().get(url);
      console.log("clearhandle");
      console.log(response.data);
      setTasks(response.data);
    } catch (e) {
      if(e.status === 401)
        alert("Session Expired. Please Login again");
        navigate("/login")
    }
  };

  return (
    <>
      {/* name and username */}
      <div
        className={`z-1000 bg-text-primary border-r-1 border-sidebar-border dark:bg-bg-primary dark:border-border-color dark:backdrop-blur-md w-80 sm:w-110 max-h-screen sm:min-h-screen shadow-md shadow-accent dark:shadow-gradient-mid-color fixed ${
          sideBarOpen ? "-translate-x-0" : "-translate-x-80 sm:-translate-x-110"
        } lg:-translate-x-0 lg:static flex flex-col transition-transform duration-300 ease-in-out overflow-y-auto sm:overflow-clip custom-scroll`}
      >
        <div className="flex p-5 h-30 justify-between border-sidebar-border dark:border-border-color border-b-1">
          <div className="flex flex-row justify-center items-center ">
            <div className="select-none hover:scale-105 transition-transform transform-500 ease-in-out flex justify-center items-center text-white bg-accent dark:bg-gradient-mid-color text-5xl  h-20 w-20 rounded-[50%] font-extrabold mr-8">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <h5 className="text-3xl font-semibold">{user.name}</h5>
              <p className="text-md pt-2 pl-1 dark:text-text-secondary">{user.sub}</p>
            </div>
          </div>
          <button onClick={() => setSideBarOpen(false)} className="text-3xl lg:hidden">
            &times;
          </button>
        </div>
        {/* filter heading */}
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <form>
              <div className="flex text-xl flex-col gap-8 p-8">
                <div className="flex justify-between items-center ">
                  <h5 className="text-3xl font-semibold py-5">Filter</h5>
                  <div className="flex flex-col gap-5">
                    <button
                      onClick={(e) => {
                        handleClear(e), navigate("");
                      }}
                      type="button"
                      className="flex flex-row justify-center items-center bg-background border-1 border-sidebar-border dark:bg-gradient-mid-color dark:border-border-color rounded-2xl text-sm text-dark-gray dark:text-white p-2 h-full hover:scale-110 transition-transform duration-300 ease-in-out "
                    >
                      <RotateCcw className="w-5 h-5 mr-2" /> Clear
                    </button>
                    <button
                      onClick={(e) => {
                        handleSearch(e), navigate("");
                      }}
                      type="submit"
                      className="flex flex-row justify-center items-center bg-background border-1 border-sidebar-border dark:bg-gradient-mid-color dark:border-border-color rounded-2xl text-sm text-dark-gray dark:text-white p-2 h-full hover:scale-110 transition-transform duration-300 ease-in-out "
                    >
                      <Search className="w-5 h-5 mr-2" /> {buttonText}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col  sm:flex-row justify-between sm:items-center ">
                  <label className="font-semibold">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="flex-1 bg-white dark:bg-bg-surface sm:ml-5 p-2 border border-sidebar-border dark:border-border-color rounded-2xl max-w-[60%] caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex flex-col  sm:flex-row justify-between sm:items-center ">
                  <label className="font-semibold">Description</label>
                  <input
                    type="text"
                    name="title"
                    className="flex-1 bg-white dark:bg-bg-surface sm:ml-5 p-2 border border-sidebar-border dark:border-border-color rounded-2xl max-w-[60%] caret-sidebar-border dark:caret-gradient-mid-color  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      console.log(description);
                    }}
                  />
                </div>
                {/* status */}
                <div className="flex flex-col  sm:flex-row justify-between sm:items-center ">
                  <p className="font-semibold">Status</p>
                  <div className=" grid sm:grid-rows-2 sm:grid-cols-2 gap-y-2 sm:gap-y-5 sm:w-[60%] justify-start sm:justify-center select-none">
                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        id="completed"
                        name="status"
                        value="completed"
                        className="hidden peer"
                        checked={status == "completed"}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                      <label htmlFor="completed" className="status-completed">
                        Completed
                      </label>
                    </div>

                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        id="notStarted"
                        name="status"
                        value="not started"
                        className="hidden peer"
                        checked={status == "not started"}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                      <label htmlFor="notStarted" className="status-not-started">
                        Not started
                      </label>
                    </div>

                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        id="inProgress"
                        name="status"
                        value="in progress"
                        className="hidden peer"
                        checked={status == "in progress"}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                      <label htmlFor="inProgress" className="status-in-progress">
                        In Progress
                      </label>
                    </div>

                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        id="all"
                        name="status"
                        value=""
                        className="hidden peer"
                        checked={status == ""}
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                      <label htmlFor="all" className="status-all">
                        All
                      </label>
                    </div>
                  </div>
                </div>
                {/* priorities */}
                <div className="flex flex-col  sm:flex-row justify-between sm:items-center ">
                  <p className="font-semibold">Priority</p>
                  <div className=" grid sm:grid-rows-2 sm:grid-cols-2 gap-y-2 sm:gap-y-5 sm:w-[60%] justify-start sm:justify-center select-none">
                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        id="high"
                        name="priority"
                        value="high"
                        className="hidden peer"
                        checked={priority == "high"}
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      />
                      <label htmlFor="high" className="priority-high">
                        High
                      </label>
                    </div>

                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        id="medium"
                        name="priority"
                        value="medium"
                        className="hidden peer"
                        checked={priority == "medium"}
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      />
                      <label htmlFor="medium" className="priority-medium">
                        Medium
                      </label>
                    </div>

                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        id="low"
                        name="priority"
                        value="low"
                        className="hidden peer"
                        checked={priority == "low"}
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="low"
                        className="priority-low"
                      >
                        Low
                      </label>
                    </div>

                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        id="priorityAll"
                        name="priority"
                        value=""
                        className="hidden peer"
                        checked={priority == ""}
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="priorityAll"
                        className="priority-all"
                      >
                        All
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center border-sidebar-border border-t-1 dark:border-border-color">
            <button
              className="flex flex-row justify-center items-center rounded-lg border border-red-500 px-6 py-2 m-6 transition duration-300 ease-in-out hover:scale-105 bg-red-500 text-white "
              onClick={() => navigate("/logout")}
            >
              <Power className="w-5 h-5 mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSidebar;
