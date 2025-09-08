import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../../utils/api";
import { AuthContext } from "../auth/AuthContext";
import { AlertTriangle, CalendarClockIcon, Check, CheckCheck, CheckCircle, Clock, Delete, Pencil, Trash2 } from "lucide-react";
import { format, formatDistance, subDays, isPast } from "date-fns";

function ViewTask({ isEditing, handleIsEditing }) {
  const { token } = useContext(AuthContext);
  const [task, setTask] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async (e) => {
    e.preventDefault();
    if (token == null) {
      alert("Session Expired");
      navigate("/login");
    }
    try {
      const response = await getApi(token).delete("/task/" + id);
      console.log(response);
      console.log("deleted successfully");
      navigate("/user-dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getTask = async () => {
      if (token == null) {
        alert("Session Expired");
        navigate("/login");
      }
      try {
        const response = await getApi(token).get("/task/" + id);
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
      {!isEditing && (
        <div className="flex justify-center items-center ">
          <div className="w-full bg-text-primary dark:border-gradient-mid-color dark:bg-neutral-50/10 ring-1 ring-accent dark:ring-gradient-mid-color dark:shadow-none  m-3 xl:m-10 shadow-xl p-4 rounded-2xl flex flex-col">
            <div className="flex justify-end gap-5">
              <button className="btn-secondary-dashboard w-min" onClick={handleIsEditing}>
                {" "}
                <div className="flex gap-2 justify-center items-center">
                  {" "}
                  <Pencil className="w-4 h-4" /> <span className="text-lg"> Edit </span>{" "}
                </div>{" "}
              </button>
              <button className="w-12 h-12 flex gap-2 justify-center items-center btn-secondary-dashboard " onClick={handleDelete}>
                <div className="">
                  <Trash2 className="w-6 h-6" /> <span className="text-lg"></span>
                </div>
              </button>
            </div>

            <div className="">
              {/* status bar */}
              <div className="flex flex-col gap-10 relative my-14 mx-10 md:mx-20">
                <div className="flex flex-row">
                  {/* leftbar of status bar */}
                  <div
                    className={`h-1 absolute w-1/2  top-1/2 left-0 -translate-y-2 ${
                      task.status == "not started"
                        ? "bg-text-secondary"
                        : task.status == "in progress"
                        ? "bg-accent dark:bg-gradient-mid-color"
                        : "bg-accent dark:bg-gradient-mid-color"
                    }`}
                  ></div>
                  {/* rightbar of status bar */}
                  <div
                    className={` h-1 absolute w-1/2 top-1/2  right-0  -translate-y-2 ${
                      task.status == "not started"
                        ? "bg-text-secondary"
                        : task.status == "in progress"
                        ? "bg-text-secondary"
                        : "bg-accent dark:bg-gradient-mid-color"
                    }`}
                  ></div>
                </div>
                <div className="flex flex-row justify-between relative text-xs md:text-md">
                  {/* not started */}
                  <div className="flex flex-col justify-center items-center absolute left-0 -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`z-10 rounded-full relative  ${
                        task.status == "not started"
                          ? " h-10 w-10 bg-dark-accent dark:bg-dark-purple border-accent dark:border-gradient-mid-color border-4 "
                          : task.status == "in progress"
                          ? "h-5 w-5 bg-accent  dark:bg-gradient-mid-color"
                          : "h-5 w-5 bg-accent dark:bg-gradient-mid-color"
                      }`}
                    >
                      {task.status === "not started" && (
                        <Check
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent dark:text-gradient-mid-color"
                          strokeWidth={4}
                        />
                      )}
                    </div>
                    <div
                      className={` justify-center mt-5  ${
                        task.status == "not started" ? "bg-status-not-started   text-white" : ""
                      } p-2 py-0.5 rounded-full border-3 border-status-not-started/50  `}
                    >
                      Not Started
                    </div>
                  </div>
                  {/* in progress  */}
                  <div className="flex flex-col justify-center items-center absolute left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`z-10 rounded-full relative ${
                        task.status == "not started"
                          ? " h-5 w-5 bg-text-secondary "
                          : task.status == "in progress"
                          ? " h-10 w-10 bg-dark-accent dark:bg-dark-purple border-accent dark:border-gradient-mid-color border-4 "
                          : "bg-accent h-5 w-5  dark:bg-gradient-mid-color"
                      }`}
                    >
                      {task.status === "in progress" && (
                        <Check
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent dark:text-gradient-mid-color"
                          strokeWidth={4}
                        />
                      )}
                    </div>
                    <div
                      className={` items-center  justify-center mt-5 ${
                        task.status == "in progress" ? "bg-status-in-progress   text-white" : " "
                      } p-2 py-0.5 rounded-full border-3 border-status-in-progress/50`}
                    >
                      In Progress
                    </div>
                  </div>
                  {/* completed  */}
                  <div className="flex flex-col justify-center items-center absolute right-0 translate-x-1/2 -translate-y-1/2">
                    <div
                      className={`z-10 rounded-full  relative ${
                        task.status == "not started"
                          ? " h-5 w-5 bg-text-secondary "
                          : task.status == "in progress"
                          ? "h-5 w-5 bg-text-secondary  "
                          : "h-10 w-10 bg-dark-accent dark:bg-dark-purple border-accent dark:border-gradient-mid-color border-4 "
                      }`}
                    >
                      {task.status === "completed" && (
                        <Check
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent dark:text-gradient-mid-color "
                          strokeWidth={4}
                        />
                      )}
                    </div>
                    <div
                      className={` justify-center mt-5 ${
                        task.status == "completed" ? "bg-status-completed   text-white" : ""
                      } p-2 py-0.5 rounded-full border-3 border-status-completed/50 `}
                    >
                      Completed
                    </div>
                  </div>
                </div>
              </div>

              {/* left and right container */}
              <div className="grid grid-cols-1 2xl:grid-cols-[1fr_300px]  gap-10">
                <div className="flex flex-col gap-10 order-2 2xl:order-1 p-5 pl-8">
                  <h5 className="text-4xl font-semibold">{task.title}</h5>
                  <div>
                    {task.dueDate && (
                      <div className="text-xl flex flex-col md:flex-row md:items-center   lg:flex-col lg:items-start xl:flex-row xl:items-center   gap-x-2 gap-y-4">
                        <span className="flex items-center gap-2 min-w-fit">
                          <CalendarClockIcon className="w-5" /> Due date:
                        </span>
                        <span className="min-w-fit flex flex-col md:flex-row md:items-center lg:flex-col lg:items-start xl:flex-row xl:items-center  justify-center gap-y-2">
                          <span className="font-bold">{format(new Date(task.dueDate), "MMM dd, yyyy EEEE  • hh:mm a")}</span>{" "}
                          <span
                            className={`italic p-3 ml-1 py-1 rounded-full select-none w-fit  ${
                              isPast(new Date(task.dueDate)) ? "bg-red-200 dark:bg-red-400" : "bg-accent/30 dark:bg-gradient-mid-color/50"
                            }`}
                          >
                            {formatDistance(subDays(new Date(task.dueDate), 0), new Date(), { addSuffix: true })}
                          </span>
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
                        <p className="italic font-bold ">{format(new Date(task.createdAt), "MMM dd, yyyy • hh:mm a")}</p>
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
      )}
    </>
  );
}

export default ViewTask;
