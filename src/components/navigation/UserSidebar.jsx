import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { getApi } from "../../utils/api";
import { checkTokenOrRefresh } from "../../utils/checkTokenOrRefresh";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Power, RotateCcw, Search } from "lucide-react";
import { AuthContext } from "../../pages/auth/AuthContext";
import ConfirmModel from "../model/ConfirmModel";
import toast from "react-hot-toast";

function UserSidebar({ sideBarOpen, setSideBarOpen, user }) {
  let { setTasks, token, setToken } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  //name,values,text,class names
  const statusArr = [
    ["completed", "not started", "in progress", "all"],
    ["completed", "not started", "in progress", ""],
    ["Completed", "Not Started", "In Progress", "All"],
    ["status-completed", "status-not-started", "status-in-progress", "status-all"],
  ];
  const priorityArr = [
    ["high", "medium", "low", "all"],
    ["high", "medium", "low", ""],
    ["High", "Medium", "Low", "All"],
    ["priority-high", "priority-medium", "priority-low", "priority-all"],
  ];
  const [taskFilter, setTaskFilter] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    excludeCompleted: "",
    includeOverdue: "",
  });
  const updateTaskFilter = (newUpdate) => {
    setTaskFilter((prev) => ({ ...prev, ...newUpdate }));
  };
  const [buttonText, setButtonText] = useState("Search");
  const [confirm, setConfirm] = useState(false);

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
    if (location.pathname == "/user-dashboard") {
      handleClear();
    }
  }, [location.pathname]);

  // to work even when user presses clear button even though all fields are empty
  useEffect(() => {
    if (!taskFilter.status && !taskFilter.priority && !taskFilter.excludeCompleted && !taskFilter.includeOverdue) {
      handleSearch();
    } else {
      handleSearch();
    }
  }, [taskFilter.status, taskFilter.priority, taskFilter.excludeCompleted, taskFilter.includeOverdue]);

  {
    /* 

  
  handles
  

  
  */
  }

  // for searching tasks
  const handleSearch = async (e) => {
    e?.preventDefault();
    if (
      !taskFilter.title &&
      !taskFilter.description &&
      !taskFilter.status &&
      !taskFilter.priority &&
      !taskFilter.includeOverdue &&
      !taskFilter.excludeCompleted
    ) {
      handleClear();
      return;
    }

    setButtonText("Searching...");
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/tasks/search?title=${taskFilter.title}&description=${taskFilter.description}&status=${
        taskFilter.status
      }&priority=${taskFilter.priority}&overdue=${taskFilter.includeOverdue}&excludeCompleted=${taskFilter.excludeCompleted}`;

      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);

      const response = await getApi(validToken).get(url);
      if (response.data.status == 200) {
        setTasks(response.data.data);
      }
    } catch (e) {
      console.log(e.status);
      if (e.request) {
        toast.error("Error while fetching task. Please try again later.");
      }
      console.log(e);
    }
    setButtonText("Search");
  };

  // for clearing filters and get all tasks
  const handleClear = async (e) => {
    e?.preventDefault();
    updateTaskFilter({
      title: "",
      description: "",
      priority: "",
      status: "",
      includeOverdue: "",
      excludeCompleted: "",
    });
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/tasks`;

      //check before whether the access token is valid or not
      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);

      //clear request
      const response = await getApi(validToken).get(url);
      console.log("clearhandle");
      console.log(response);
      if (response.data.status == 200) {
        setTasks(response.data.data);
      }
    } catch (e) {
      console.log(e.status);
      if (e.request) {
        toast.error("Error while fetching task. Please try again later.");
      }
    }
  };

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
        className={`z-1000 bg-text-primary border-r-1 border-sidebar-border dark:bg-bg-primary dark:border-border-color dark:backdrop-blur-md w-80 sm:w-110 max-h-screen min-h-screen shadow-md shadow-accent dark:shadow-gradient-mid-color fixed ${
          sideBarOpen ? "-translate-x-0" : "-translate-x-80 sm:-translate-x-110"
        } lg:-translate-x-0 lg:static flex flex-col transition-transform ease-in-out overflow-y-auto  custom-scroll`}
      >
        <div className="flex p-3 sm:p-5 h-20 sm:h-30 justify-between border-sidebar-border dark:border-border-color border-b-1">
          <div className="flex flex-row justify-center items-center ">
            <div className="select-none hover:scale-105 transition-transform ease-in-out flex justify-center items-center text-white bg-accent dark:bg-gradient-mid-color/40 text-xl sm:text-5xl h-10 w-10 sm:h-20 sm:w-20 rounded-[50%] font-extrabold mr-3 sm:mr-8">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <h5 className="text-lg sm:text-2xl font-semibold">{user.name}</h5>
              <p className="text-xs sm:text-[16px] pt-1 sm:pt-2 pl-1 dark:text-text-secondary">{user?.email}</p>
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
              <div className="flex sm:text-lg flex-col gap-5 p-5">
                <div className="flex justify-between items-center ">
                  <h5 className="text-xl sm:text-3xl font-semibold sm:py-5">Filter</h5>
                  <div className="flex flex-row gap-5 justify-between items-end">
                    <button
                      onClick={(e) => {
                        handleClear(e), navigate("");
                      }}
                      type="button"
                      className="btn-dash"
                    >
                      <RotateCcw className="btn-dash-icon" /> Clear
                    </button>
                    <button
                      onClick={(e) => {
                        handleSearch(e), navigate("");
                      }}
                      type="submit"
                      className="btn-dash"
                    >
                      <Search className="btn-dash-icon" /> {buttonText}
                    </button>
                  </div>
                </div>

                <div className="dash-comp-div ">
                  <label className="text-lg">Title</label>
                  <input 
                    type="text"
                    name="title"
                    className="dash-inp" 
                    value={taskFilter.title} 
                    onChange={(e) => updateTaskFilter({ title: e.target.value })} 
                  />
                </div>
                <div className="dash-comp-div">
                  <label className="text-lg">Description</label>
                  <input
                    type="text"
                    name="description"
                    className="dash-inp"
                    value={taskFilter.description}
                    onChange={(e) => updateTaskFilter({ description: e.target.value })}
                  />
                </div>
                {/* status */}
                <div className="dash-comp-div">
                  <p className="text-lg">Status</p>
                  <div className="dash-grid ">
                    {statusArr[0].map((item, i) => (
                      <div key={i} className="flex justify-center items-center">
                        <input
                          type="radio"
                          id={statusArr[3][i]}
                          name="status"
                          value={statusArr[1][i]}
                          className="hidden peer"
                          checked={taskFilter.status == statusArr[1][i]}
                          onChange={() => {
                            updateTaskFilter({ status: statusArr[1][i] });
                          }}
                        />
                        <label htmlFor={statusArr[3][i]} className={statusArr[3][i]}>
                          {statusArr[2][i]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/* priorities */}
                <div className="dash-comp-div">
                  <p className="text-lg">Priority</p>
                  <div className="dash-grid">
                    {priorityArr[0].map((item, i) => (
                      <div key={i} className="flex justify-center items-center">
                        <input
                          type="radio"
                          id={priorityArr[3][i]}
                          name="priority"
                          value={priorityArr[1][i]}
                          className="hidden peer"
                          checked={taskFilter.priority == priorityArr[1][i]}
                          onChange={() => {
                            updateTaskFilter({ priority: priorityArr[1][i] });
                          }}
                        />
                        <label htmlFor={priorityArr[3][i]} className={priorityArr[3][i]}>
                          {priorityArr[2][i]}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                {/*  */}

                {/* overdue */}
                <div className="flex-1 flex-row justify-between sm:items-center cursor-pointer selection:none">
                  <div className="rounded-xl grid grid-cols-3 text-xs sm:text-sm border-1 border-sidebar-border dark:border-border-color justify-center items-center ">
                    <div
                      onClick={() => updateTaskFilter({ includeOverdue: "true" })}
                      className={`${
                        taskFilter.includeOverdue == "true" ? "bg-accent/70 dark:bg-gradient-mid-color shadow-md p-2 m-1.5 rounded-xl text-white" : ""
                      } flex flex-col items-center`}
                    >
                      {" "}
                      <span>Overdue</span> <span>Only </span>
                    </div>
                    <div
                      onClick={() => updateTaskFilter({ includeOverdue: "false" })}
                      className={`${
                        taskFilter.includeOverdue == "false"
                          ? "bg-accent/70 dark:bg-gradient-mid-color shadow-md p-2 m-1.5 rounded-xl text-white text-xs sm:text-sm"
                          : ""
                      } flex flex-col items-center`}
                    >
                      {" "}
                      <span>Upcoming</span> <span>Only </span>
                    </div>
                    <div
                      onClick={() => updateTaskFilter({ includeOverdue: "" })}
                      className={`${
                        taskFilter.includeOverdue == "" ? "bg-accent/70 dark:bg-gradient-mid-color/40 shadow-md p-2 m-1.5 rounded-xl text-white" : ""
                      } flex flex-col items-center`}
                    >
                      {" "}
                      <span>Show </span> <span>All</span>{" "}
                    </div>
                  </div>
                </div>

                {/* hide completed */}
                <div className="flex-1 flex-row justify-between sm:items-center selection:none cursor-pointer">
                  <div className="rounded-xl flex text-xs sm:text-sm   justify-center items-center ">
                    <div
                      onClick={() =>
                        taskFilter.excludeCompleted == "" ? updateTaskFilter({ excludeCompleted: "true" }) : updateTaskFilter({ excludeCompleted: "" })
                      }
                      className={`py-2 px-3  ${
                        taskFilter.excludeCompleted == "true"
                          ? "border-sidebar-border dark:border-border-color  border-1 "
                          : "bg-accent/70 dark:bg-gradient-mid-color/40  text-white"
                      } rounded-xl flex flex-col items-center`}
                    >
                      {" "}
                      <span>{taskFilter.excludeCompleted == "true" ? <span> Hiding Completed Tasks </span> : <span> Showing Completed Tasks </span>}</span>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center border-sidebar-border border-t-1 dark:border-border-color">
            <button className="red-button" onClick={() => setConfirm(true)}>
              <Power className="w-5 h-5 mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSidebar;
