import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkTokenOrRefresh } from "../../../utils/checkTokenOrRefresh";
import { AuthContext } from "../../auth/AuthContext";
import { getApi } from "../../../utils/api";
import toast from "react-hot-toast";
import ViewTask from "./ViewTask";
import EditTask from "./EditTask";

function UserTask() {
  const { userid, taskid } = useParams();
  let { token, setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleIsEditing = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  useEffect(() => {
    const findTask = async (userid, taskid) => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/` + userid + "/tasks/" + taskid;
        console.log(url);
        const validToken = await checkTokenOrRefresh(token, navigate);
        if (!validToken) return;
        setToken(validToken);

        const response = await getApi(validToken).get(url);

        console.log(response);
        if (response.status == 200) {
          setTask(response.data.data);
          console.log(response.data.data.id);
        }
      } catch (e) {
        console.log(e.status);
        if (e.status == 404) {
          setTask(null);
        }
        if (e.request) {
          toast.error("Error while fetching users. Please try again later.");
        }
        console.log(e);
      }
      console.log("handle search");
    };

    findTask(userid, taskid);
  }, [userid, taskid, token]);
  return (
    <div>
      {!isEditing && <ViewTask isEditing={isEditing} handleIsEditing={handleIsEditing} task={task} />}
      {isEditing && <EditTask isEditing={isEditing} handleIsEditing={handleIsEditing} setIsEditing={setIsEditing} task={task} />}
    </div>
  );
}

export default UserTask;
