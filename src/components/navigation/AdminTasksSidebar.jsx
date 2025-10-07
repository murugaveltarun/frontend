import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { getApi } from "../../utils/api";
import { checkTokenOrRefresh } from "../../utils/checkTokenOrRefresh";
import { useNavigate, Outlet, useLocation, useParams } from "react-router-dom";
import { Power, RotateCcw, Search } from "lucide-react";
import { AuthContext } from "../../pages/auth/AuthContext";


function AdminTasksSidebar() {
  const [isSearching, setIsSearching] = useState(false);

  let { setTasks, tasks, token, setToken, page, updatePage, updateResponsePage } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { userid } = useParams();
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

  /* 
  
  use Effect hooks
  
  
*/
  useEffect(() => {
    if (isSearching) {
      handleSearch();
    } else {
      handleClear();
    }
  }, [page]);

  // Refresh tasks when navigated from other endpoints
  useEffect(() => {
    handleClear();
  }, [location.pathname]);

  {
    /* 

  
  handles
  

  
  */
  }

  // for searching tasks
  const handleSearch = async (e) => {
    setIsSearching(true);
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
      let url = "";
      if (location.pathname.startsWith("/admin-dashboard/tasks")) {
        url = `${import.meta.env.VITE_BACKEND_URL}/users/tasks/search?title=${taskFilter.title}&description=${taskFilter.description}&status=${
          taskFilter.status
        }&priority=${taskFilter.priority}&overdue=${taskFilter.includeOverdue}&excludeCompleted=${taskFilter.excludeCompleted}&page=${page.pageNo}&limit=${
          page.limit
        }&sortBy=${page.sortBy}&direction=${page.direction}`;
      } else if (location.pathname.startsWith("/admin-dashboard/users")) {
        url = `${import.meta.env.VITE_BACKEND_URL}/users/${userid}/tasks/search?title=${taskFilter.title}&description=${taskFilter.description}&status=${
          taskFilter.status
        }&priority=${taskFilter.priority}&overdue=${taskFilter.includeOverdue}&excludeCompleted=${taskFilter.excludeCompleted}&page=${page.pageNo}&limit=${
          page.limit
        }&sortBy=${page.sortBy}&direction=${page.direction}`;
      }

      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);
      console.log(url);
      const response = await getApi(validToken).get(url);
      console.log(response.data);
      if (response.data.status == 200) {
        setTasks(response.data.data.tasks);
        updateResponsePage({
          totalPage: response.data.data.totalPages,
          currentPage: response.data.data.currentPage,
          totalItems: response.data.data.totalItems,
        });
        console.log(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
    setButtonText("Search");
    console.log("tasks below");
    console.log(tasks);
  };

  // for clearing filters and get all tasks
  const handleClear = async (e) => {
    setIsSearching(false);
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
      let url = "";
      if (location.pathname.startsWith("/admin-dashboard/tasks")) {
        url = `${import.meta.env.VITE_BACKEND_URL}/all-tasks?page=${page.pageNo}&limit=${page.limit}&sortBy=${page.sortBy}&direction=${page.direction}`;
      } else if (location.pathname.startsWith("/admin-dashboard/users")) {
        url = `${import.meta.env.VITE_BACKEND_URL}/users/${userid}/tasks?page=${page.pageNo}&limit=${page.limit}&sortBy=${page.sortBy}&direction=${
          page.direction
        }`;
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
        updateResponsePage({
          totalPage: response.data.data.totalPages,
          currentPage: response.data.data.currentPage,
          totalItems: response.data.data.totalItems,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      {/* filter heading */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <form>
            <div className="flex sm:text-lg flex-col gap-5 p-5">
              <div className="flex justify-between items-center ">
                <h5 className="text-xl  font-semibold sm:py-5">Filter</h5>
                <div className="flex flex-row gap-5 justify-between items-end">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      updatePage({ pageNo: 1 });
                      setIsSearching(false);
                    }}
                    type="button"
                    className="btn-dash"
                  >
                    <RotateCcw className="btn-dash-icon" /> Clear
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      updatePage({ pageNo: 1 });
                      setIsSearching(true);
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
                <input type="text" name="title" className="dash-inp" value={taskFilter.title} onChange={(e) => updateTaskFilter({ title: e.target.value })} />
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
      </div>
    </>
  );
}

export default AdminTasksSidebar;
