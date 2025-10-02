import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";

function AllTasksAdmin() {
  let { tasks, setTasks, token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(tasks);
  }, [tasks, setTasks]);

  const gotoTask = (taskid,userid) => {
    navigate("/admin-dashboard/users/"+userid+"/tasks/"+taskid);
  };
  return (
    <div>
        {tasks &&
          tasks.map((task, i) => (
            <div key={i} onClick={() => gotoTask(task.taskId,task.user.id)}>
              <p> {task.title} </p>
            </div>
          ))}
    </div>
  );
}

export default AllTasksAdmin;
