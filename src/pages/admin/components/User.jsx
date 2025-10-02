import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkTokenOrRefresh } from "../../../utils/checkTokenOrRefresh";
import { AuthContext } from "../../auth/AuthContext";
import { getApi } from "../../../utils/api";
import toast from "react-hot-toast";

function User() {
  const { userid } = useParams();
  const navigate = useNavigate();
  let { token, setToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const findUserById = async (id) => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/` + id;
        console.log(url);
        const validToken = await checkTokenOrRefresh(token, navigate);
        if (!validToken) return;
        setToken(validToken);

        const response = await getApi(validToken).get(url);

        console.log(response);
        if (response.status == 200) {
          setUser(response.data.data);
          console.log(response.data.data.id);
        }
      } catch (e) {
        console.log(e.status);
        if (e.status == 404) {
          setUser(null);
        }
        if (e.request) {
          toast.error("Error while fetching users. Please try again later.");
        }
        console.log(e);
      }
      console.log("handle search");
    };

    findUserById(userid);
  }, [userid, token]);

  return (
    <div>
      {user != null && (
        <div>
          <p>{user.id}</p>
          <p>{user.name}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{user.authProvider}</p>
          <p>{user.providerId}</p>
          <p>{user.createdAt}</p>
          <p>{user.lastLoginAt}</p>
          <p>{user.active}</p>

          <button onClick={()=>navigate("/admin-dashboard/users/"+userid+"/tasks")}>User's Tasks</button>
        </div>
      )}
    </div>
  );
}

export default User;
