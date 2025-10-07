import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkTokenOrRefresh } from "../../../utils/checkTokenOrRefresh";
import { AuthContext } from "../../auth/AuthContext";
import { getApi } from "../../../utils/api";
import toast from "react-hot-toast";
import Loading from "../../../components/model/Loading";
import { format } from "date-fns";
import Priority from "./charts/user/Priority";
import Created from "./charts/user/Created";
import Status from "./charts/user/Status";

function User() {
  const { userid } = useParams();
  const navigate = useNavigate();
  let { setTasks, tasks, token, setToken, page, updateResponsePage } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [edited, setEdited] = useState(false);
  const userDetailsLabels = ["ID", "Name", "Username", "Email", "Auth Provider", "Provider ID", "Created At", "Last Login", "Active", "Total Tasks"];
  const userDetails = [
    user?.id,
    user?.name,
    user?.username,
    user?.email,
    user?.authProvider,
    user?.providerId,
    user && format(new Date(user.createdAt), "dd / MM / yyyy"),
    user && format(new Date(user.lastLoginAt), "dd / MM / yyyy"),
    user?.active,
    tasks?.length,
  ];

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

    const getTasks = async (userid) => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/${userid}/tasks/all`;
        //check before whether the access token is valid or not
        const validToken = await checkTokenOrRefresh(token, navigate);
        if (!validToken) return;
        setToken(validToken);

        //clear request
        const response = await getApi(validToken).get(url);
        console.log("clearhandle");
        console.log(response);
        if (response.data.status == 200) {
          setTasks(response.data.data);
          updateResponsePage({
            totalPage: response.data.data.totalPages,
            currentPage: response.data.data.currentPage,
            totalItems: response.data.data.totalItems,
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    getTasks(userid);
    findUserById(userid);
    setEdited(false);
  }, [userid, token, edited]);

  const handleActive = async (e) => {
    e.preventDefault();

    try {
      let editedUser = {
        name: user.name,
        username: user.username,
        email: user.email,
        active: !user.active,
      };
      console.log(editedUser);
      //check before whether the access token is valid or not
      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);

      //edit the current user
      const response = await getApi(validToken).put("/edit/user/" + user.id, editedUser);
      if (response.data.status == 200) {
        toast.success("User edited sucessfully.");
        setEdited(true);
        console.log(editedUser);
        console.log(response.data);
      }
    } catch (e) {
      console.log(e.status);
      if (e.status == 404 || e.status == 401) {
        toast.error("Error while saving user.");
        navigate(-1);
      }
      if (e.request) {
        toast.error("Error while saving user. Please try again later.");
      }
      console.log(e);
    }
  };

  return (
    <div className="flex text-xs sm:text-sm md:text-base w-full justify-center">
      {user ? (
        <div className="flex flex-col xl:flex-row xl:gap-10 gap-5">
          <div className="flex justify-center items-center xl:w-96">
            <div className="flex justify-center items-center flex-col gap-2 w-full">
              <table className="w-xs sm:w-sm  text-left border-separate border-spacing-[0px] table-fixed text-xs sm:text-sm lg:text-base border-2 border-light-accent dark:border-dark-purple overflow-hidden rounded-2xl">
                <tbody className="bg-text-primary dark:bg-bg-surface border-border-color">
                  {userDetails.map((item, i) => (
                    <tr key={i} className="text-left hover:bg-border-color/20">
                      <td className="w-35 bg-light-accent dark:bg-dark-purple py-2 px-4 font-semibold">{userDetailsLabels[i]}</td>
                      <td className="py-2 px-4 bg-transparent break-words whitespace-normal">
                        {item == null || item == "" && item != false? (
                          <span className="text-neutral-500">-</span>
                        ) : userDetailsLabels[i] === "Active" ? (
                          <button
                            onClick={handleActive}
                            className={`px-2 py-1 rounded-md text-sm font-medium cursor-pointer ${
                              item ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                          >
                            {item ? "Active" : "Disabled"}
                          </button>
                        ) : (
                          item
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={() => navigate("/admin-dashboard/users/" + userid + "/tasks")}
                className="mt-3 flex w-fit btn-primary-dashboard duration-300 cursor-pointer"
              >
                User's Tasks
              </button>
            </div>
          </div>
          {tasks.length > 0 && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col 2xl:flex-row gap-5">
              <div className="graph-div">
                <h6 className="text-lg font-bold">Status Stats</h6>
                <Status tasks={tasks} />
              </div>
              <div className="graph-div">
                <h6 className="text-lg font-bold">Priority Stats</h6>
                <Priority tasks={tasks} />
              </div>
              </div>
              <div className="graph-div ">
                <h6 className="text-lg font-bold">Tasks Status count </h6>
                <Created tasks={tasks} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default User;
