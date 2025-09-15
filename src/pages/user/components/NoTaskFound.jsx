import { ClipboardList,Plus,PlusCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

function NoTaskFound() {
  const navigate = useNavigate();
  return (
    <div className=" md:flex justify-center items-center mr-3  ">
      <div className="w-full bg-text-primary dark:border-gradient-mid-color dark:bg-neutral-50/10 ring-1 ring-accent dark:ring-gradient-mid-color dark:shadow-none  m-3 xl:m-10 shadow-xl p-4 rounded-2xl flex flex-col justify-center items-center">
        <ClipboardList className="w-20 h-20 mt-10 mb-5" /> 
        <h5 className="text-2xl">Task Not Found</h5>
                <button
          onClick={() => {console.log("clicked!!!");navigate("add")}}
          className="select-none cursor-pointer flex gap-3 mt-20 mb-10 p-3 justify-center items-center rounded-2xl text-bg-surface dark:text-white  hover:scale-105 transition-transform duration-600 ease-in-out  border-bg-surface dark:border-white border-1  "
        >
          <Plus className="w-6 h-6" />
          <span className=" text-lg ">Add New Task</span>
        </button>
      </div>
    </div>
  );
}

export default NoTaskFound;
