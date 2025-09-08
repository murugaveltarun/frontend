import React, { useContext, useState } from "react";
import { getApi } from "../../utils/api";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

function AddTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
    setStatus("");
    navigate("/user-dashboard");
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Session Expired");
      navigate("/login");
    }
    if (!title || !description || !dueDate || !priority || !status) {
      alert("enter all!");
      return;
    }
    try {
      const dueDateFormatted = new Date(dueDate).toISOString().substring(0, 19);
      const task = { title, description, dueDate: dueDateFormatted, priority, status };
      console.log(task);
      const response = await getApi(token).post("/create", task);
      console.log(response.data);
      navigate("/user-dashboard");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex justify-center items-center">
      <div className="w-full  bg-text-primary dark:bg-bg-primary dark:border-gradient-mid-color dark:bg-neutral-50/10 ring-1 ring-accent dark:ring-gradient-mid-color dark:shadow-none   m-10 shadow-xl p-8 rounded-2xl .w-[100%]  .lg:w-[80%]  .xl:w-[70%] flex flex-col gap-10">
      
        <h5 className="text-4xl font-semibold flex justify-center text-accent dark:text-gradient-mid-color border-b-1  pb-7">Add New Task</h5>
        <form className="grid gap-8 text-xl " onSubmit={handleAddTask}>
          <div className="grid grid-cols-[150px_1fr] items-center gap-5">
            <label htmlFor="title ">Title : </label>
            <input
              className="flex-1 bg-white dark:bg-bg-surface  p-2 border border-sidebar-border dark:border-border-color rounded-2xl  caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
              type="text"
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="grid grid-cols-[150px_1fr] items-center gap-5">
            <label htmlFor="description">Description : </label>
            <textarea
              className="flex-1 bg-white dark:bg-bg-surface  p-2 border border-sidebar-border dark:border-border-color rounded-2xl  caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
          </div>
          <div className="grid grid-cols-[150px_1fr] items-center gap-5">
            <label htmlFor="dueDate">Due Date : </label>
            <div className="relative">
              <input
                name="dueDate"
                type="datetime-local"
                min={new Date().toISOString().substring(0, 16)}
                max={new Date("2100-12-31").toISOString().substring(0, 16)}
                id="dueDate"
                className="w-full bg-white dark:bg-bg-surface  p-2 border border-sidebar-border dark:border-border-color rounded-2xl  caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                onChange={(e) => setDueDate(e.target.value)}
                value={dueDate}
              />
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 dark:text-white pointer-events-none" size={20} />
            </div>
          </div>
          <div className="grid grid-cols-[150px_1fr] items-center gap-5">
            <span>Priority : </span>
            <div className="flex  flex-col md:flex-row lg:flex-col xl:flex-row gap-4 gap-y-6">
              <div>
                <input type="radio" name="priority" value="high" className="hidden peer" id="priority-high" onChange={(e) => setPriority(e.target.value)} />
                <label htmlFor="priority-high" className="priority-high">
                  High
                </label>
              </div>
              <div>
                <input type="radio" name="priority" value="medium" className="hidden peer" id="priority-medium" onChange={(e) => setPriority(e.target.value)} />
                <label htmlFor="priority-medium" className="priority-medium">
                  Medium
                </label>
              </div>
              <div>
                <input type="radio" name="priority" value="low" className="hidden peer" id="priority-low" onChange={(e) => setPriority(e.target.value)} />
                <label htmlFor="priority-low" className="priority-low">
                  Low
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[150px_1fr] items-center gap-5 ">
            <span>Status : </span>
            <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-4 gap-y-6">
              <div>
                <input
                  type="radio"
                  name="status"
                  value="not started"
                  className="hidden peer"
                  id="status-not-started"
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor="status-not-started" className="status-not-started">
                  Not Started
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="status"
                  value="in progress"
                  className="hidden peer"
                  id="status-in-progress"
                  onChange={(e) => setStatus(e.target.value)}
                />
                <label htmlFor="status-in-progress" className="status-in-progress">
                  In Progress
                </label>
              </div>
              <div>
                <input type="radio" name="status" value="completed" className="hidden peer" id="status-completed" onChange={(e) => setStatus(e.target.value)} />
                <label htmlFor="status-completed" className="status-completed">
                  Completed
                </label>
              </div>
            </div>
          </div>
          <div className="flex justify-center  gap-7 items-center mt-5 ">
            <button
              type="button"
              onClick={handleCancel}
              className="btn-secondary-dashboard"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary-dashboard"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
