import React from "react";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../../../utils/api";
import { AuthContext } from "../../auth/AuthContext";
import { AlertTriangle, Calendar, Clock, Save, X, Check, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Loading from "../../../components/model/Loading";
import { checkTokenOrRefresh } from "../../../utils/checkTokenOrRefresh";

function EditTask({ isEditing, handleIsEditing, setIsEditing }) {
  const { id } = useParams();
  const { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [oldTask, setOldTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [success, setSuccess] = useState(false);

  /*

  handles

*/

  // handle for task edit
  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    try {
      const editedTask = { title, description, dueDate, priority, status };

      //check before whether the access token is valid or not
      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);

      //edit a task
      const response = await getApi(validToken).put("/edit/" + id, editedTask);
      if (response.data.status == 200) {
        setSuccess(true);
        toast.success("Task edited sucessfully.");
        console.log(editedTask);
        console.log(response.data);
        setIsEditing(false);
      }
    } catch (e) {
      console.log(e.status);
      if (e.status == 404 || e.status == 401) {
        toast.error("Error while saving task.");
        navigate("/user-dashboard");
      }
      if (e.request) {
        toast.error("Error while saving task. Please try again later.");
      }
      console.log(e);
    } 
  };

  //handle to fetch the old task and place them as values in the form.
  useEffect(() => {
    const getOldTask = async () => {
      try {
        //check before whether the access token is valid or not
        const validToken = await checkTokenOrRefresh(token, navigate);
        if (!validToken) return;
        setToken(validToken);

        // get the old task and place the values in input field
        const response = await getApi(validToken).get("/task/" + id);
        setSuccess(true);
        setOldTask(response.data.data);
        const task = response.data.data;
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setPriority(task.priority);
        setDueDate(task.dueDate);
      } catch (e) {
        console.log(e.status);
        if (e.status == 404 || e.status == 401) {
          toast.error("Task Not Found");
          navigate("/user-dashboard");
        }
        if (e.request) {
          toast.error("Error while fetching task. Please try again later.");
        }
        console.log(e);
      } 
    };
    getOldTask();
  }, [token]);

  return (
    <>
      {" "}
      {success && (
        <div>
          {isEditing && (
            <div className="flex justify-center items-center ">
              <div className="w-full bg-text-primary dark:border-gradient-mid-color dark:bg-neutral-50/10 ring-1 ring-accent dark:ring-gradient-mid-color dark:shadow-none  m-3 xl:m-10 shadow-xl p-4 rounded-2xl flex flex-col">
                <form onSubmit={handleSubmitEdit}>
                  <div className="flex gap-5 justify-between ">
                    <div className="flex justify-start gap-5">
                      <button className="btn-secondary-dashboard w-min h-full" onClick={() => navigate("/user-dashboard")}>
                        {" "}
                        <div className="flex gap-2 justify-center items-center">
                          {" "}
                          <ArrowLeft className="w-4 h-4" /> <span className="text-lg"> Back </span>{" "}
                        </div>{" "}
                      </button>
                    </div>
                    <div className="flex justify-end gap-5">
                      <button type="button" className="btn-secondary-dashboard w-min" onClick={handleIsEditing}>
                        {" "}
                        <div className="flex gap-2 justify-center items-center">
                          {" "}
                          <X className="w-4 h-4" /> <span className="text-lg"> Cancel </span>{" "}
                        </div>{" "}
                      </button>
                      <button type="submit" className="btn-primary-dashboard w-min" onClick={handleSubmitEdit}>
                        {" "}
                        <div className="flex gap-2 justify-center items-center">
                          {" "}
                          <Save className="w-4 h-4" /> <span className="text-lg"> Save </span>{" "}
                        </div>{" "}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-10">
                    {/* status bar */}
                    <div className="flex flex-col gap-10 relative my-14 mx-10 md:mx-20">
                      <div className="flex flex-row">
                        {/* leftbar of status bar */}
                        <div
                          className={`h-1 absolute w-1/2  top-1/2 left-0 -translate-y-[5px] ${
                            status == "not started"
                              ? "bg-text-secondary"
                              : status == "in progress"
                              ? "bg-accent dark:bg-gradient-mid-color"
                              : "bg-accent dark:bg-gradient-mid-color"
                          }`}
                        ></div>
                        {/* rightbar of status bar */}
                        <div
                          className={` h-1 absolute w-1/2 top-1/2  right-0  -translate-y-[5px] ${
                            status == "not started"
                              ? "bg-text-secondary"
                              : status == "in progress"
                              ? "bg-text-secondary"
                              : "bg-accent dark:bg-gradient-mid-color"
                          }`}
                        ></div>
                      </div>
                      <div className="flex flex-row justify-between relative text-xs md:text-md">
                        {/* not started */}
                        <div
                          className="flex flex-col justify-center items-center absolute left-0 -translate-x-1/2 -translate-y-1/2 "
                          onClick={() => setStatus("not started")}
                        >
                          <div
                            className={`z-10 rounded-full relative cursor-pointer select-none ${
                              status == "not started"
                                ? " h-10 w-10 bg-dark-accent dark:bg-dark-purple border-accent dark:border-gradient-mid-color border-4 "
                                : status == "in progress"
                                ? "h-5 w-5 bg-accent  dark:bg-gradient-mid-color"
                                : "h-5 w-5 bg-accent dark:bg-gradient-mid-color"
                            }`}
                          >
                            {status === "not started" && (
                              <Check
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent dark:text-gradient-mid-color"
                                strokeWidth={4}
                              />
                            )}
                          </div>
                          <div
                            className={` justify-center mt-5 cursor-pointer select-none ${
                              status == "not started" ? "bg-status-not-started   text-white" : ""
                            } p-2 py-0.5 rounded-full border-3 border-status-not-started/50  `}
                          >
                            Not Started
                          </div>
                        </div>
                        {/* in progress  */}
                        <div
                          className="flex flex-col justify-center items-center absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                          onClick={() => setStatus("in progress")}
                        >
                          <div
                            className={`z-10 rounded-full relative cursor-pointer select-none ${
                              status == "not started"
                                ? " h-5 w-5 bg-text-secondary "
                                : status == "in progress"
                                ? " h-10 w-10 bg-dark-accent dark:bg-dark-purple border-accent dark:border-gradient-mid-color border-4 "
                                : "bg-accent h-5 w-5  dark:bg-gradient-mid-color"
                            }`}
                          >
                            {status === "in progress" && (
                              <Check
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent dark:text-gradient-mid-color"
                                strokeWidth={4}
                              />
                            )}
                          </div>
                          <div
                            className={` items-center  justify-center mt-5 cursor-pointer select-none ${
                              status == "in progress" ? "bg-status-in-progress   text-white" : " "
                            } p-2 py-0.5 rounded-full border-3 border-status-in-progress/50`}
                          >
                            In Progress
                          </div>
                        </div>
                        {/* completed  */}
                        <div
                          className="flex flex-col justify-center items-center absolute right-0 translate-x-1/2 -translate-y-1/2"
                          onClick={() => setStatus("completed")}
                        >
                          <div
                            className={`z-10 rounded-full  relative cursor-pointer select-none ${
                              status == "not started"
                                ? " h-5 w-5 bg-text-secondary "
                                : status == "in progress"
                                ? "h-5 w-5 bg-text-secondary  "
                                : "h-10 w-10 bg-dark-accent dark:bg-dark-purple border-accent dark:border-gradient-mid-color border-4 "
                            }`}
                          >
                            {status === "completed" && (
                              <Check
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent dark:text-gradient-mid-color "
                                strokeWidth={4}
                              />
                            )}
                          </div>
                          <div
                            className={` justify-center mt-5 cursor-pointer select-none ${
                              status == "completed" ? "bg-status-completed   text-white" : ""
                            } p-2 py-0.5 rounded-full border-3 border-status-completed/50 `}
                          >
                            Completed
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* left and right container */}
                    <div className="grid grid-cols-1 2xl:grid-cols-[1fr_270px]  gap-10">
                      <div className="flex flex-col gap-10 order-2 2xl:order-1 p-5 pl-8">
                        <input
                          type="text"
                          onChange={(e) => setTitle(e.target.value)}
                          value={title}
                          className=" text-3xl font-semibold  bg-white dark:bg-bg-surface  p-2 border border-sidebar-border dark:border-border-color rounded-2xl  caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                        />
                        <div>
                          {dueDate && (
                            <>
                              <div className="relative">
                                <input
                                  name="dueDate"
                                  type="datetime-local"
                                  min={new Date().toISOString().substring(0, 16)}
                                  max={new Date("2100-12-31").toISOString().substring(0, 16)}
                                  value={dueDate}
                                  id="dueDate"
                                  className="w-full bg-white dark:bg-bg-surface  p-2 border border-sidebar-border dark:border-border-color rounded-2xl  caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                                  onChange={(e) => setDueDate(e.target.value)}
                                />
                                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-white pointer-events-none" size={20} />
                              </div>
                            </>
                          )}
                        </div>
                        <textarea
                          type="text"
                          onChange={(e) => setDescription(e.target.value)}
                          value={description}
                          className=" min-h-60 text-lg overflow-y-auto  custom-scroll bg-white dark:bg-bg-surface  p-2 border border-sidebar-border dark:border-border-color rounded-2xl  caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                        />
                      </div>
                      <div className="flex  flex-col md:flex-row flex-1 xl:flex-row 2xl:flex-col gap-10 order-1 2xl:order-2 p-5">
                        <div className="w-full flex flex-col gap-4 border-1 border-text-secondary p-5 rounded-2xl">
                          <p className="flex items-center gap-2">
                            {" "}
                            <AlertTriangle className="w-4 h-4" /> Priority :{" "}
                          </p>
                          <div className="py-5 ">
                            <div className="flex flex-col gap-6 select-none">
                              <div>
                                <input
                                  type="radio"
                                  name="priority"
                                  value="high"
                                  className="hidden peer"
                                  id="priority-high"
                                  onChange={(e) => setPriority(e.target.value)}
                                  checked={priority == "high"}
                                />
                                <label htmlFor="priority-high" className="priority-high text-xl">
                                  High
                                </label>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  name="priority"
                                  value="medium"
                                  className="hidden peer"
                                  id="priority-medium"
                                  onChange={(e) => setPriority(e.target.value)}
                                  checked={priority == "medium"}
                                />
                                <label htmlFor="priority-medium" className="priority-medium text-xl">
                                  Medium
                                </label>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  name="priority"
                                  value="low"
                                  className="hidden peer"
                                  id="priority-low"
                                  onChange={(e) => setPriority(e.target.value)}
                                  checked={priority == "low"}
                                />
                                <label htmlFor="priority-low" className="priority-low text-xl">
                                  Low
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" w-full flex flex-col gap-4 border-1 border-text-secondary p-5 rounded-2xl">
                          {oldTask?.createdAt && (
                            <div>
                              <p className="flex gap-2 items-center">
                                <Clock className="w-4 h-4" />
                                <span className="">Created At :</span>
                              </p>
                              <p className="italic font-bold">{format(new Date(oldTask.createdAt), "MMM dd, yyyy • hh:mm a")}</p>
                            </div>
                          )}
                          {oldTask?.lastModifiedAt && (
                            <div>
                              <p className="flex gap-2 items-center">
                                <Clock className="w-4 h-4" />
                                Last Modified At :
                              </p>
                              <p className="italic font-bold">{format(new Date(oldTask.lastModifiedAt), "MMM dd, yyyy • hh:mm a")}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      {!success && (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
}

export default EditTask;
