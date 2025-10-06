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
    <div className="">
      {user ? (
        <div className="space-y-2">
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Auth Provider:</strong> {user.authProvider}</p>
          <p><strong>Provider ID:</strong> {user.providerId}</p>
          <p><strong>Created At:</strong> {user.createdAt ?? "Not available"}</p>
          <p><strong>Last Login:</strong> {user.lastLoginAt ?? "Not available"}</p>
          <p><strong>Active:</strong> {user.active ? "Yes" : "No"}</p>

          <button
            onClick={() => navigate("/admin-dashboard/users/" + userid + "/tasks")}
            className="btn-primary-dashboard duration-300"
          >
            User's Tasks
          </button>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
    </div>
  );
}

export default User;
