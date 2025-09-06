import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../../utils/api";
import { AuthContext } from "../auth/AuthContext";
import { AlertTriangle, Calendar, CalendarClockIcon, Clock, Pencil } from "lucide-react";
import { format, formatDistance, subDays } from "date-fns";

function ViewTask() {
  const { token } = useContext(AuthContext);
  const [task, setTask] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getTask = async () => {
      if (token == null) {
        alert("Session Expired");
        navigate("/login");
      }
      try {
        const response = await getApi().get("/task/" + id);
        setTask(response.data);
        console.log(task);
        console.log(task.dueDate);
      } catch (e) {
        console.log(e);
      }
    };
    getTask();
  }, [token]);

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="w-full bg-text-primary dark:border-gradient-mid-color dark:bg-neutral-50/10 ring-1 ring-accent dark:ring-gradient-mid-color dark:shadow-none  m-3 xl:m-10 shadow-xl p-4 rounded-2xl flex flex-col">
          <div className="flex justify-end ">
            <button className="btn-secondary w-min">
              {" "}
              <div className="flex gap-2 justify-center items-center">
                {" "}
                <Pencil className="w-4 h-4" /> <span className="text-lg"> Edit </span>{" "}
              </div>{" "}
            </button>
          </div>

          <div className="flex flex-col gap-10">
            {/* status bar */}
            <div className="flex justify-between items-center relative mx-23 m-11 min-w-80 ">
              <div
                className={`absolute h-0.5 left-0 right-1/2 justify-center  ${
                  task.status == "not started"
                    ? "bg-text-secondary"
                    : task.status == "in progress"
                    ? "bg-accent dark:bg-gradient-mid-color"
                    : "bg-accent dark:bg-gradient-mid-color"
                }`}
              ></div>
              <div
                className={`absolute h-0.5 left-1/2 right-0 justify-center  ${
                  task.status == "not started"
                    ? "bg-text-secondary"
                    : task.status == "in progress"
                    ? "bg-text-secondary"
                    : "bg-accent dark:bg-gradient-mid-color"
                }`}
              ></div>

              <div
                className={`absolute left-0 justify-center mt-23 -translate-x-1/2 ${
                  task.status == "not started" ? "bg-status-not-started scale-105 text-white" : "border-3 border-status-not-started/50 scale-90"
                } p-2 py-0.5 rounded-full `}
              >
                Not Started
              </div>
              <div
                className={`absolute items-center left-1/2 -translate-x-1/2  justify-center mt-23 ${
                  task.status == "in progress" ? "bg-status-in-progress scale-105 text-white" : "border-3 border-status-in-progress/50 scale-90"
                } p-2 py-0.5 rounded-full `}
              >
                In Progress
              </div>
              <div
                className={`absolute right-0 justify-center translate-x-1/2 mt-23 ${
                  task.status == "completed" ? "bg-status-completed scale-105 text-white" : "border-3 border-status-completed/50 scale-90"
                } p-2 py-0.5 rounded-full `}
              >
                Completed
              </div>

              <div
                className={`z-10 rounded-full -translate-x-1/2 relative ${
                  task.status == "not started"
                    ? " h-7 w-7 dark:bg-gradient-mid-color bg-accent dark:drop-shadow-[0_0_12px_theme(colors.gradient-mid-color)] drop-shadow-[0_0_19px_theme(colors.accent)] "
                    : task.status == "in progress"
                    ? "h-5 w-5 bg-accent  dark:bg-gradient-mid-color"
                    : "h-5 w-5 bg-accent dark:bg-gradient-mid-color"
                }`}
              >
                {task.status === "not started" && <div className="absolute inset-0 m-auto h-5 w-5 rounded-full dark:bg-dark-purple bg-dark-accent "></div>}
              </div>
              <div
                className={`z-10 rounded-full  ${
                  task.status == "not started"
                    ? " h-5 w-5 bg-text-secondary "
                    : task.status == "in progress"
                    ? "h-7 w-7 bg-accent dark:bg-gradient-mid-color dark:drop-shadow-[0_0_12px_theme(colors.gradient-mid-color)] drop-shadow-[0_0_12px_theme(colors.accent)]"
                    : "bg-accent h-5 w-5  dark:bg-gradient-mid-color"
                }`}
              >
                {task.status === "in progress" && <div className="absolute inset-0 m-auto h-5 w-5 rounded-full dark:bg-dark-purple bg-dark-accent "></div>}
              </div>
              <div
                className={`z-10 rounded-full translate-x-1/2 ${
                  task.status == "not started"
                    ? " h-5 w-5 bg-text-secondary "
                    : task.status == "in progress"
                    ? "h-5 w-5 bg-text-secondary  "
                    : "bg-accent h-7 w-7 dark:bg-gradient-mid-color dark:drop-shadow-[0_0_12px_theme(colors.gradient-mid-color)] drop-shadow-[0_0_12px_theme(colors.accent)]  "
                }`}
              >
                {task.status === "completed" && <div className="absolute inset-0 m-auto h-5 w-5 rounded-full dark:bg-dark-purple bg-dark-accent "></div>}
              </div>
            </div>

            {/* left and right container */}
            <div className="grid grid-cols-1 2xl:grid-cols-[1fr_300px]  gap-10">
              <div className="flex flex-col gap-10 order-2 2xl:order-1 p-5 pl-8">
                <h5 className="text-4xl font-semibold">{task.title}</h5>
                <div>
                  {task.dueDate && (
                    <div className="text-xl flex gap-x-2 gap-y-3">
                      <span className="flex items-center gap-2 min-w-fit">
                        <CalendarClockIcon className="w-5" /> Due date:
                      </span>
                      <span className="min-w-fit">
                        <span className="font-bold">{format(new Date(task.dueDate), "MMM dd, yyyy • hh:mm a")}</span>{" "}
                        <span className="italic" >({formatDistance(subDays(new Date(task.dueDate), 3), new Date(), { addSuffix: true })})</span>
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-lg font-stretch-expanded">{task.description}</p>
              </div>
              <div className="flex  flex-col md:flex-row flex-1 xl:flex-row 2xl:flex-col gap-10 order-1 2xl:order-2 p-5">
                <div className="w-full flex flex-col gap-4 border-1 border-text-secondary p-5 rounded-2xl">
                  <p className="flex items-center gap-2">
                    {" "}
                    <AlertTriangle className="w-4 h-4" /> Priority :{" "}
                  </p>
                  {task.priority == "low" && (
                    <p className="flex flex-col items-center priority-low-tag check select-none text-2xl font-bold">
                      <span>Low</span>
                    </p>
                  )}
                  {task.priority == "medium" && (
                    <p className="flex flex-col items-center priority-medium-tag check select-none text-2xl font-bold">
                      <span> Medium</span>
                    </p>
                  )}
                  {task.priority == "high" && (
                    <p className="flex flex-col items-center priority-high-tag check select-none text-2xl font-bold">
                      <span> High</span>
                    </p>
                  )}
                </div>
                <div className=" w-full flex flex-col gap-4 border-1 border-text-secondary p-5 rounded-2xl">
                  {task.createdAt && (
                    <div>
                      <p className="flex gap-2 items-center">
                        <Clock className="w-4 h-4" />
                        <span className="">Created At :</span>
                      </p>
                      <p className="italic font-bold">{format(new Date(task.createdAt), "MMM dd, yyyy • hh:mm a")}</p>
                    </div>
                  )}
                  {task.lastModifiedAt && (
                    <div>
                      <p className="flex gap-2 items-center">
                        <Clock className="w-4 h-4" />
                        Last Modified At :
                      </p>
                      <p className="italic font-bold">{format(new Date(task.lastModifiedAt), "MMM dd, yyyy • hh:mm a")}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewTask;
