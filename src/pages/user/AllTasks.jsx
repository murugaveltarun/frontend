import React, { useEffect, useState, useContext } from "react";
import { getApi } from "../../utils/api";
import {AuthContext} from "../auth/AuthContext";
import TaskCard from "./TaskCard";


function ViewTask() {
  const [tasks, setTasks] = useState([]);
  const {token} = useContext(AuthContext)
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
  }, [token]);

  console.log(tasks);
  return     <div className="">
      
      {tasks.length === 0 
      ? 
      (
        <p>No tasks available.</p>
      ) 
      : 
      (
        <ul>
          {tasks.map((task) => (
            <TaskCard key={task.taskId} title={task.title} description={task.description} priority={task.priority} status={task.status} id={task.taskId} user={task.user} />
          ))}
        </ul>
      )}
    </div>;
}

export default ViewTask;
