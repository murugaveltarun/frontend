import React, { useContext, useState } from "react";
import { getApi } from "../../../utils/api";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { checkTokenOrRefresh } from "../../../utils/checkTokenOrRefresh";

function AddTask() {
  const [addTask, setAddTask] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: "",
  });
  const updateAddTask = (newUpdate) => {
    setAddTask((prev) => ({ ...prev, ...newUpdate }));
    console.log(addTask);
  };
  const navigate = useNavigate();
  const { token, setToken } = useContext(AuthContext);

  const handleCancel = () => {
    updateAddTask({
      title: "",
      description: "",
      priority: "",
      status: "",
      dueDate: "",
    });
    navigate("/user-dashboard");
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Session Expired");
      navigate("/login");
    }
    if (!addTask.title || !addTask.description || !addTask.dueDate || !addTask.priority || !addTask.status) {
      toast.error("Enter all fields.");
      return;
    }
    try {
      const dueDateFormatted = new Date(addTask.dueDate).toISOString().substring(0, 19);
      updateAddTask({dueDate: dueDateFormatted});
      console.log(addTask);

      //check before whether the access token is valid or not
      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);

      //add task handle
      const response = await getApi(validToken).post("/create", addTask);
      if (response.data.status === 201) {
        toast.success("Task Added Successfully");
        navigate("/user-dashboard");
      }
      console.log(response.data);
    } catch (e) {
      console.log(e.status);
      if (e.request) {
        toast.error("Error while adding task. Please try again later.");
      }
      console.log(e);
    }
  };
  return (
    <div className="md:flex justify-center items-center mr-3">
      <div className="w-full  bg-text-primary  dark:border-gradient-mid-color dark:bg-neutral-50/10 ring-1 ring-accent dark:ring-gradient-mid-color dark:shadow-none m-2 md:m-5 shadow-xl p-3 sm:p-8 rounded-2xl flex flex-col gap-3 sm:gap-10">
        <h5 className="text-2xl sm:text-3xl font-semibold flex justify-center text-accent dark:text-gradient-mid-color border-b-1 pb-2 sm:pb-7">Add New Task</h5>
        <form className="grid gap-2 sm:gap-4 md:gap-8 text-lg sm:text-xl lg:text-lg " onSubmit={handleAddTask}>
          <div className="add-task-comp">
            <label htmlFor="title ">Title : </label>
            <input
              className="dash-inp min-w-full ml-0"
              type="text"
              name="title"
              onChange={(e) => updateAddTask({title: e.target.value})}
              value={addTask.title}
            />
          </div>
          <div className="add-task-comp">
            <label htmlFor="description">Description : </label>
            <textarea
              className="dash-inp min-w-full ml-0"
              name="description"
              onChange={(e) => updateAddTask({description: e.target.value})}
              value={addTask.description}
            ></textarea>
          </div>
          <div className="add-task-comp">
            <label htmlFor="dueDate">Due Date : </label>
            <div className="relative">
              <input
                name="dueDate"
                type="datetime-local"
                min={new Date().toISOString().substring(0, 16)}
                max={new Date("2100-12-31").toISOString().substring(0, 16)}
                id="dueDate"
                className="dash-inp min-w-full ml-0"
                onChange={(e) => updateAddTask({dueDate: e.target.value})}
                value={addTask.dueDate}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-white pointer-events-none" size={20} />
            </div>
          </div>
          <div className="add-task-comp">
            <span>Priority : </span>
            <div className="flex flex-row gap-4 gap-y-6">
              <div>
                <input checked={addTask.priority === "high"} type="radio" name="priority" value="high" className="hidden peer" id="priority-high-add" onChange={() => setAddTask((prev)=>({...prev,priority:"high"}))} />
                <label htmlFor="priority-high-add" className="priority-high lg:text-[10px] p-2 xl:text-[15px]">
                  High
                </label>
              </div>
              <div>
                <input checked={addTask.priority === "medium"} type="radio" name="priority" value="medium" className="hidden peer" id="priority-medium-add" onChange={(e) => updateAddTask({priority: e.target.value})} />
                <label htmlFor="priority-medium-add" className="priority-medium lg:text-[10px] p-2 xl:text-[15px]">
                  Medium
                </label>
              </div>
              <div>
                <input checked={addTask.priority === "low"} type="radio" name="priority" value="low" className="hidden peer" id="priority-low-add" onChange={(e) => updateAddTask({priority: e.target.value})} />
                <label htmlFor="priority-low-add" className="priority-low lg:text-[10px] p-2 xl:text-[15px]">
                  Low
                </label>
              </div>
            </div>
          </div>
          <div className="add-task-comp ">
            <span>Status : </span>
            <div className=" flex flex-row gap-4 lg:gap-2 gap-y-6">
              <div>
                <input
                  type="radio"
                  name="status"
                  value="not started"
                  className="hidden peer"
                  id="status-not-started-add"
                  onChange={(e) => updateAddTask({status: e.target.value})}
                  checked={addTask.status === "not started"}
                />
                <label htmlFor="status-not-started-add" className="status-not-started lg:text-[10px] p-2 xl:text-[15px]">
                  Not Started
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="status"
                  value="in progress"
                  className="hidden peer"
                  id="status-in-progress-add"
                  onChange={(e) => updateAddTask({status: e.target.value})}
                  checked={addTask.status === "in progress"}
                />
                <label htmlFor="status-in-progress-add" className="status-in-progress lg:text-[10px] p-2 xl:text-[15px] ">
                  In Progress
                </label>
              </div>
              <div>
                <input checked={addTask.status === "completed"} type="radio" name="status" value="completed" className="hidden peer" id="status-completed-add" onChange={(e) => updateAddTask({status: e.target.value})} />
                <label htmlFor="status-completed-add" className="status-completed lg:text-[10px] p-2 xl:text-[15px] ">
                  Completed
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center  gap-7 items-center mt-5 ">
            <button type="button" onClick={handleCancel} className="btn-secondary-dashboard text-sm sm:text-lg">
              Cancel
            </button>
            <button type="submit" className="btn-primary-dashboard text-sm sm:text-lg">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
