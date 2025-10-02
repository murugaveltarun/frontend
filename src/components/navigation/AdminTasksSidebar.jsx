import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { getApi } from "../../utils/api";
import { checkTokenOrRefresh } from "../../utils/checkTokenOrRefresh";
import { useNavigate, Outlet, useLocation, useParams } from "react-router-dom";
import { Power, RotateCcw, Search } from "lucide-react";
import { AuthContext } from "../../pages/auth/AuthContext";
import ConfirmModel from "../model/ConfirmModel";
import toast from "react-hot-toast";

function AdminTasksSidebar() {
  let { setTasks,tasks, token, setToken } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { userid } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [excludeCompleted, setExcludeCompleted] = useState("");
  const [includeOverdue, setIncludeOverdue] = useState("");
  const [buttonText, setButtonText] = useState("Search");
  const [page, setPage] = useState({
    pageNo:1,
    limit:20,
    sortBy:"lastModifiedAt",
    direction:"asc"
  });
  /* 
  
  use Effect hooks
  
  
*/

  useEffect(() => {
    if (token) {
      handleClear();
    }
  }, [token]);

  // Refresh tasks when navigated from other endpoints
  useEffect(() => {

      handleClear();
    
  }, [location.pathname]);

  // to work even when user presses clear button even though all fields are empty
  useEffect(() => {
    if (!status && !priority && !excludeCompleted && !includeOverdue) {
      handleSearch();
    } else {
      handleSearch();
    }
  }, [status, priority, excludeCompleted, includeOverdue]);

  {
    /* 

  
  handles
  

  
  */
  }

  // for searching tasks
  const handleSearch = async (e) => {
    e?.preventDefault();
    if (!title && !description && !status && !priority && !includeOverdue && !excludeCompleted) {
      handleClear();
      return;
    }

    setButtonText("Searching...");
    try {
      let url = "";
      if (location.pathname.startsWith("/admin-dashboard/tasks")) {
        url = `${
          import.meta.env.VITE_BACKEND_URL
        }/users/tasks/search?title=${title}&description=${description}&status=${status}&priority=${priority}&overdue=${includeOverdue}&excludeCompleted=${excludeCompleted}&page=${page.pageNo}&limit=${page.limit}&sortBy=${page.sortBy}&direction=${page.direction}`;
      } else if (location.pathname.startsWith("/admin-dashboard/users")) {
        url = `${
          import.meta.env.VITE_BACKEND_URL
        }/users/${userid}/tasks/search?title=${title}&description=${description}&status=${status}&priority=${priority}&overdue=${includeOverdue}&excludeCompleted=${excludeCompleted}&page=${page.pageNo}&limit=${page.limit}&sortBy=${page.sortBy}&direction=${page.direction}`;
      }

      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);
      console.log(url)
      const response = await getApi(validToken).get(url);
      console.log(response.data)
      if (response.data.status == 200) {
        setTasks(response.data.data.tasks);
        console.log(response.data.data)
      }
    } catch (e) {
      console.log(e.status);
      if (e.request) {
        toast.error("Error while fetching task. Please try again later.");
      }
      console.log(e);
    }
    setButtonText("Search");
    console.log("tasks below")
    console.log(tasks)
  };

  // for clearing filters and get all tasks
  const handleClear = async (e) => {
    e?.preventDefault();
    setTitle("");
    setDescription("");
    setPriority("");
    setStatus("");
    setExcludeCompleted("");
    setIncludeOverdue("");
    try {
      let url = "";
      if (location.pathname.startsWith("/admin-dashboard/tasks")) {
        url = `${import.meta.env.VITE_BACKEND_URL}/all-tasks?page=${page.pageNo}&limit=${page.limit}&sortBy=${page.sortBy}&direction=${page.direction}`;
      } else if (location.pathname.startsWith("/admin-dashboard/users")) {
        url = `${import.meta.env.VITE_BACKEND_URL}/users/${userid}/tasks?page=${page.pageNo}&limit=${page.limit}&sortBy=${page.sortBy}&direction=${page.direction}`;
      }

      //check before whether the access token is valid or not
      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);

      //clear request
      const response = await getApi(validToken).get(url);
      console.log("clearhandle");
      console.log(response);
      if (response.data.status == 200) {
        setTasks(response.data.data.tasks);
      }
    } catch (e) {
      console.log(e.status);
      if (e.request) {
        toast.error("Error while fetching task. Please try again later.");
      }
      console.error(e);
    }
  };
  return (
    <div className="flex flex-col justify-between flex-grow">
      <div>
        <form>
          <div className="flex text-xl flex-col gap-6 p-8">
            <div className="flex justify-between items-center ">
              <h5 className="text-3xl font-semibold py-5">Filter</h5>
              <div className="flex flex-col gap-5 justify-between items-end">
                <button
                  onClick={(e) => {
                    handleClear(e);
                  }}
                  type="button"
                  className="flex w-fit  flex-row justify-center items-end bg-background border-1 border-sidebar-border dark:bg-gradient-mid-color dark:border-border-color rounded-2xl text-sm text-dark-gray dark:text-white p-2 h-full hover:scale-110 transition-transform duration-300 ease-in-out "
                >
                  <RotateCcw className="w-5 h-5 mr-2" /> Clear
                </button>
                <button
                  onClick={(e) => {
                    handleSearch(e);
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
                className="flex-1 bg-white dark:bg-bg-surface sm:ml-5 p-2 border border-sidebar-border rounded-2xl max-w-[60%] caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col  sm:flex-row justify-between sm:items-center ">
              <label className="font-semibold">Description</label>
              <input
                type="text"
                name="title"
                className="flex-1 bg-white dark:bg-bg-surface sm:ml-5 p-2 border border-sidebar-border rounded-2xl max-w-[60%] caret-sidebar-border dark:caret-gradient-mid-color  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
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
              <div className=" grid  sm:grid-rows-2 grid-cols-2 gap-y-2 sm:gap-y-5 sm:w-[60%] justify-start sm:justify-center select-none">
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
              <div className=" grid sm:grid-rows-2 grid-cols-2 gap-y-2 sm:gap-y-5 sm:w-[60%] justify-start sm:justify-center select-none">
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
                  <label htmlFor="low" className="priority-low">
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
                  <label htmlFor="priorityAll" className="priority-all">
                    All
                  </label>
                </div>
              </div>
            </div>

            {/* overdue */}
            <div className="flex-1 flex-row justify-between sm:items-center cursor-pointer selection:none">
              <div className="rounded-2xl grid grid-cols-3 text-sm md:text-md border-1 border-sidebar-border dark:border-border-color justify-center items-center ">
                <div
                  onClick={() => setIncludeOverdue("true")}
                  className={`${
                    includeOverdue == "true" ? "bg-accent dark:bg-gradient-mid-color shadow-md p-2 m-1.5 rounded-xl text-white" : ""
                  } flex flex-col items-center`}
                >
                  {" "}
                  <span>Overdue</span> <span>Only </span>
                </div>
                <div
                  onClick={() => setIncludeOverdue("false")}
                  className={`${
                    includeOverdue == "false" ? "bg-accent dark:bg-gradient-mid-color shadow-md p-2 m-1.5 rounded-xl text-white" : ""
                  } flex flex-col items-center`}
                >
                  {" "}
                  <span>Upcoming</span> <span>Only </span>
                </div>
                <div
                  onClick={() => setIncludeOverdue("")}
                  className={`${
                    includeOverdue == "" ? "bg-accent/70 dark:bg-gradient-mid-color/70 shadow-md p-2 m-1.5 rounded-xl text-white" : ""
                  } flex flex-col items-center`}
                >
                  {" "}
                  <span>Show </span> <span>All</span>{" "}
                </div>
              </div>
            </div>

            {/* hide completed */}
            <div className="flex-1 flex-row justify-between sm:items-center selection:none cursor-pointer">
              <div className="rounded-xl flex text-sm md:text-sm   justify-center items-center ">
                <div
                  onClick={() => (excludeCompleted == "" ? setExcludeCompleted("true") : setExcludeCompleted(""))}
                  className={`${
                    excludeCompleted == "true" ? "" : "bg-accent dark:bg-gradient-mid-color text-white"
                  } border-sidebar-border dark:border-border-color border-1 py-2 px-3 rounded-2xl flex flex-col items-center`}
                >
                  {" "}
                  <span>{excludeCompleted == "true" ? <span> Hiding Completed Tasks </span> : <span> Showing Completed Tasks </span>}</span>{" "}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminTasksSidebar;
