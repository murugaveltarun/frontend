import { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApi } from "../../utils/api";
import { AuthContext } from "../auth/AuthContext";
import { Calendar } from "lucide-react";

function ViewTask() {
  const { token } = useContext(AuthContext);
  const [task, setTask] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getTask = async () => {
      if (!token) {
        alert("Session Expired");
        navigate("/login");
      }
      try {
        const response = await getApi().get("/task/" + id);
        setTask(response.data);
        console.log(task);
      } catch (e) {
        console.log(e);
      }
    };
    getTask();
  }, [token]);

  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="w-full bg-text-primary dark:bg-bg-primary dark:border-gradient-mid-color dark:bg-neutral-50/10 ring-1 ring-accent dark:ring-gradient-mid-color dark:shadow-none   m-10 shadow-xl p-8 rounded-2xl .w-[100%]  .lg:w-[80%]  .xl:w-[70%] flex flex-col gap-10">
          <div>Status : {task.status}</div>
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_200px]  2xl:grid-cols-[1fr_300px]  gap-10">
            <div className="order-2 xl:order-1">
              <h5>Title : {task.title}</h5>
              <p>Description : {task.description}</p>
            </div>
            <div className="order-1 xl:order-2">
              <button>Edit button</button>
              <p>Priority : {task.priority}</p>
              <p>Due date : {task.dueDate}</p>
              <p>Created date : {task.createdAt}</p>
              <p>Modified date : {task.lastModifiedAt}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewTask;
