import React, { useEffect, useContext } from "react";
import { getApi } from "../../utils/api";
import {AuthContext} from "../auth/AuthContext";
import TaskCard from "./TaskCard";


function AllTasks() {
  let {token,tasks,setTasks} = useContext(AuthContext)
  useEffect(() => {
      if(!token){
        return;
      }
      const getTasks = async () => {
      const response = await getApi().get("/tasks");
      const data = response.data;
      setTasks(data);
    };

    getTasks();
  }, [token,setTasks]);

  console.log(tasks);
  return <div className="">
      {tasks.length != 0 && (<span className="pl-4 pb-4">Showing {tasks.length} tasks.</span>)}
      {tasks.length === 0 
      ? 
      (
        <p>No tasks available.</p>
      ) 
      : 
      (
        <ul className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 p-4 " >
          {tasks.map((task) => (
            <TaskCard key={task.taskId} title={task.title} description={task.description} priority={task.priority} status={task.status} id={task.taskId} dueDate={task.dueDate} />
          ))}
        </ul>
      )}
    </div>;
}

export default AllTasks;
