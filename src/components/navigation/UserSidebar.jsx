import React, { useEffect } from "react";
import { useState } from "react";
import { getApi } from "../../utils/api";
import { useNavigate, Outlet } from "react-router-dom";
import { LogOut, Power, Search } from "lucide-react";


function UserSidebar({ sideBarOpen, setSideBarOpen , user}) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [buttonText, setButtonText] = useState("Search");


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title && !description && !status && !priority) {
      console.log("no parameters were given");
      return;
    }

    setButtonText("Searching...");
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/tasks/search?title=${title}&description=${description}&status=${status}&priority=${priority}`;
      const response = await getApi().get(url);
      console.log(url);
      console.log(title, description, status, priority);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
    setButtonText("Search");
  };

  return (
    <>
      {/* name and username */}
      <div
        className={`bg-[#F8F8F8] w-110 min-h-screen shadow fixed ${sideBarOpen ? "-translate-x-0" : "-translate-x-110"} lg:-translate-x-0 lg:static flex flex-col transition-transform duration-300 ease-in-out`}
      >
        <div className="flex p-5  justify-between border-tarun border-b-1">
          <div className="flex flex-row justify-center items-center ">
              <div className="flex justify-center items-center text-white bg-[#00A39C] text-5xl  h-20 w-20 rounded-[50%] font-extrabold mr-8">{user.name[0].toUpperCase()}</div>
            <div>
             <h1 className="text-3xl font-semibold">{user.name}</h1>
            <p className="text-md pt-2 pl-1">{user.sub}</p>
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
                  <h1 className="text-3xl font-semibold py-5">Filter</h1>
                  <button onClick={handleSubmit} className="flex flex-row justify-center items-center bg-[#00A39C] rounded-2xl text-white p-3 h-full hover:scale-105 transition-transform duration-300 ease-in-out ">
                    <Search className="w-5 h-5 mr-2" /> {buttonText}
                  </button>
                </div>

                <div className="flex justify-between items-center ">
                  <label className="font-semibold">Title</label>
                  <input
                    type="text"
                    name="title"
                    className="flex-1 bg-white ml-5 p-2 border border-[#00A39C] rounded-2xl max-w-[60%] caret-transparent focus:border-2 focus:border-[#00A39C] focus:outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="flex justify-between items-center">
                  <label className="font-semibold">Description</label>
                  <input
                    type="text"
                    name="title"
                    className="flex-1 bg-white ml-5 p-2 border border-[#00A39C] rounded-2xl max-w-[60%] caret-transparent focus:border-2 focus:border-[#00A39C] focus:outline-none"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      console.log(description);
                    }}
                  />
                </div>
                {/* status */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Status</p>
                  <div className=" grid grid-rows-2 grid-cols-2 gap-y-5 w-[60%]">
                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        id="completed"
                        name="status"
                        value="completed"
                        className="hidden peer"
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="completed"
                        className="text-sm px-4 py-2 rounded-xl border border-[#00A39C] cursor-pointer peer-checked:bg-[#28A745] peer-checked:text-white peer-checked:border-none transition"
                      >
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
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="notStarted"
                        className="text-sm px-4 py-2 rounded-xl border border-[#00A39C] cursor-pointer peer-checked:bg-[#6C757D] peer-checked:text-white peer-checked:border-none transition"
                      >
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
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="inProgress"
                        className="text-sm px-4 py-2 rounded-xl border border-[#00A39C] cursor-pointer peer-checked:bg-[#007BFF] peer-checked:text-white peer-checked:border-none transition"
                      >
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
                        onChange={(e) => {
                          setStatus(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="all"
                        className="text-sm px-4 py-2 rounded-xl border border-[#00A39C] cursor-pointer peer-checked:bg-[#00A39C] peer-checked:text-white peer-checked:border-none transition"
                      >
                        All
                      </label>
                    </div>
                  </div>
                </div>
                {/* priorities */}
                <div className="flex justify-between items-center">
                  <p className="font-semibold">Priority</p>
                  <div className=" grid grid-rows-2 grid-cols-2 gap-y-5 w-[60%]">
                    <div className="flex justify-center items-center">
                      <input
                        type="radio"
                        id="high"
                        name="priority"
                        value="high"
                        className="hidden peer"
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="high"
                        className="text-sm px-4 py-2 rounded-xl border border-[#00A39C] cursor-pointer peer-checked:bg-[#DC3545] peer-checked:text-white peer-checked:border-none transition"
                      >
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
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="medium"
                        className="text-sm px-4 py-2 rounded-xl border border-[#00A39C] cursor-pointer peer-checked:bg-[#FFC107] peer-checked:text-white peer-checked:border-none transition"
                      >
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
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="low"
                        className="text-sm px-4 py-2 rounded-xl border border-[#00A39C] cursor-pointer peer-checked:bg-[#198754] peer-checked:text-white peer-checked:border-none transition"
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
                        onChange={(e) => {
                          setPriority(e.target.value);
                        }}
                      />
                      <label
                        htmlFor="priorityAll"
                        className="text-sm px-4 py-2 rounded-xl border border-[#00A39C] cursor-pointer peer-checked:bg-[#00A39C] peer-checked:text-white peer-checked:border-none transition"
                      >
                        All
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center">
            <button className="flex flex-row justify-center items-center rounded-lg border border-red-500 px-6 py-2 m-6 text-red-500 transition duration-300 ease-in-out hover:scale-105 hover:bg-red-500 hover:text-white "
            onClick={()=>navigate("/logout")}>
              <Power className="w-5 h-5 mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSidebar;
