import { RotateCcw, Search } from "lucide-react";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../pages/auth/AuthContext";
import { checkTokenOrRefresh } from "../../utils/checkTokenOrRefresh";
import { getApi } from "../../utils/api";
import toast from "react-hot-toast";
import { UsersContext } from "../context/UsersContext";

function AdminUsersSidebar() {
  const navigate = useNavigate();
  let { token, setToken } = useContext(AuthContext);
  let { setUsers, page, updatePage, updateResponsePage, updateUserFilter, userFilter } = useContext(UsersContext);
  const [id, setId] = useState();
  const [buttonText, setButtonText] = useState("Search");
  const [buttonText2, setButtonText2] = useState("Search");
  const [idError, setIdError] = useState("");
  const [isSearching, setIsSearching] = useState(false);


  useEffect(() => {
    handleClear();
  }, [location.pathname]);

  useEffect(() => {
    if (isSearching) {
      handleSearch();
    } else {
      handleClear();
    }
  }, [page]);

  const findUserById = async (e) => {
    e?.preventDefault();
    if (!id) {
      setIdError("Enter the user ID.");
      return;
    }

    setButtonText2("Searching...");
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/` + id;
      console.log(url);
      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);

      const response = await getApi(validToken).get(url);
      if (response.data.status == 200) {
        navigate("/admin-dashboard/users/" + id);
        setIdError("");
      }
    } catch (e) {
      console.log(e.status);
      if (e.status == 404) {
        setIdError("User not found.");
        console.log("user not found");
        setButtonText2("Search");
      } else if (e.request) {
        toast.error("Error while fetching users. Please try again later.");
      }
      console.log(e);
    }
    setButtonText2("Search");
    console.log("handle search");
  };

  const handleSearch = async (e) => {
    setIsSearching(true);
    e?.preventDefault();
    if (!userFilter.username && !userFilter.email && !userFilter.authProvider && !userFilter.uname && !userFilter.active) {
      handleClear();
      return;
    }

    setButtonText("Searching...");
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users/search?username=${userFilter.username}&email=${userFilter.email}&authProvider=${
        userFilter.authProvider
      }&name=${userFilter.uname}&active=${userFilter.active}&page=${page.pageNo}&limit=${page.limit}&sortBy=${page.sortBy}&direction=${page.direction}`;
      console.log(url);
      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);

      const response = await getApi(validToken).get(url);
      if (response.data.status == 200) {
        setUsers(response.data.data.users);
        updateResponsePage({
          totalPage: response.data.data.totalPages,
          currentPage: response.data.data.currentPage,
          totalItems: response.data.data.totalItems,
        });
        console.log(page);
      }
    } catch (e) {
      console.log(e);
    }
    setButtonText("Search");
    console.log("handle search");
  };

  // for clearing filters and get all tasks
  const handleClear = async (e) => {
    setIsSearching(false);
    e?.preventDefault();
    updateUserFilter({
      username: "",
      email: "",
      authProvider: "",
      uname: "",
      active: "",
    });
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/users?page=${page.pageNo}&limit=${page.limit}&sortBy=${page.sortBy}&direction=${page.direction}`;

      //check before whether the access token is valid or not
      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);

      //clear request
      const response = await getApi(validToken).get(url);
      console.log("clearhandle");
      console.log(response);
      if (response.data.status == 200) {
        setUsers(response.data.data.users);
        updateResponsePage({
          totalPage: response.data.data.totalPages,
          currentPage: response.data.data.currentPage,
          totalItems: response.data.data.totalItems,
        });
        console.log(page);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex text-xl flex-col border-b-1 border-sidebar-border dark:border-border-color">
        <form>
          <div className="p-5">
            <div className="flex flex-row justify-between items-center gap-3 ">
              <label className="text-lg">Find by ID : </label>
              <input
                type="number"
                name="id"
                className="dash-inp max-w-20"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <button
                onClick={(e) => {
                  findUserById(e);
                }}
                type="submit"
                className="btn-dash "
              >
                {" "}
                <Search className="w-5 h-5 mr-2" /> <p className="hidden sm:block">{buttonText2}</p>
              </button>
            </div>
            {idError && <p className="text-red-500 text-sm">{idError}</p>}
          </div>
        </form>
      </div>
      <div>
        <form>
          <div className="flex text-xl flex-col gap-6 p-5">
            <div className="flex justify-between items-center ">
              <h5 className="tex-lg">Filter users : </h5>
              <div className="flex flex-row gap-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updatePage({ pageNo: 1 });
                    setIsSearching(false);
                  }}
                  type="button"
                  className="btn-dash"
                >
                  <RotateCcw className="btn-dash-icon" /> Clear
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updatePage({ pageNo: 1 });
                    setIsSearching(true);
                  }}
                  type="submit"
                  className="btn-dash"
                >
                  {" "}
                  <Search className="btn-dash-icon" /> {buttonText}
                </button>
              </div>
            </div>

            <div className="dash-comp-div">
              <label className="text-lg">Username</label>
              <input
                type="text"
                name="username"
                className="dash-inp"
                value={userFilter.username}
                onChange={(e) => updateUserFilter({ username: e.target.value })}
              />
            </div>

            <div className="dash-comp-div">
              <label className="text-lg">E-Mail</label>
              <input
                type="text"
                name="email"
                className="dash-inp"
                value={userFilter.email}
                onChange={(e) => updateUserFilter({ email: e.target.value })}
              />
            </div>

            <div className="dash-comp-div">
              <label className="text-lg">Name</label>
              <input
                type="text"
                name="name"
                className="dash-inp"
                value={userFilter.uname}
                onChange={(e) => updateUserFilter({ uname: e.target.value })}
              />
            </div>
            {/* auth Provider */}
            <div className="dash-comp-div">
              <p className="text-lg">Auth Provider</p>
              <div className="dash-grid">
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    id="google"
                    name="status"
                    value="google"
                    className="hidden peer"
                    checked={userFilter.authProvider == "google"}
                    onChange={(e) => {
                      updateUserFilter({ authProvider: e.target.value });
                    }}
                  />
                  <label htmlFor="google" className="auth-provider ">
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <img src="/google.png" alt="a" className="h-5" /> Google
                    </div>
                  </label>
                </div>

                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    id="github"
                    name="authProvider"
                    value="github"
                    className="hidden peer"
                    checked={userFilter.authProvider == "github"}
                    onChange={(e) => {
                      updateUserFilter({ authProvider: e.target.value });
                    }}
                  />
                  <label htmlFor="github" className="auth-provider">
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <img src="/github.png" alt="a" className="btn-dash-icon" /> GitHub
                    </div>
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    id="local"
                    name="authProvider"
                    value="local"
                    className="hidden peer"
                    checked={userFilter.authProvider == "local"}
                    onChange={(e) => {
                      updateUserFilter({ authProvider: e.target.value });
                    }}
                  />
                  <label htmlFor="local" className="auth-provider">
                    <div className="flex flex-row gap-2 justify-center items-center">
                      <img src="/icon.png" alt="a" className="h-5" /> Local
                    </div>
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    id="all"
                    name="authProvider"
                    value=""
                    className="hidden peer"
                    checked={userFilter.authProvider == ""}
                    onChange={(e) => {
                      updateUserFilter({ authProvider: e.target.value });
                    }}
                  />
                  <label htmlFor="all" className="auth-provider">
                    All
                  </label>
                </div>
              </div>
            </div>

            {/* active */}
            <div className="flex-1 flex-row justify-between sm:items-center cursor-pointer selection:none">
              <div className="rounded-2xl grid grid-cols-3 text-xs md:text-sm border-1 border-sidebar-border dark:border-border-color justify-center items-center ">
                <div
                  onClick={() => updateUserFilter({ active: "true" })}
                  className={`${
                    userFilter.active == "true" ? "bg-accent dark:bg-gradient-mid-color shadow-md p-2 m-1.5 rounded-xl text-white" : ""
                  } flex flex-col items-center`}
                >
                  {" "}
                  <span>Active</span> <span>Only </span>
                </div>
                <div
                  onClick={() => updateUserFilter({ active: "false" })}
                  className={`${
                    userFilter.active == "false" ? "bg-accent dark:bg-gradient-mid-color shadow-md p-2 m-1.5 rounded-xl text-white" : ""
                  } flex flex-col items-center`}
                >
                  {" "}
                  <span>Disabled</span> <span>Only </span>
                </div>
                <div
                  onClick={() => updateUserFilter({ active: "" })}
                  className={`${
                    userFilter.active == "" ? "bg-accent/70 dark:bg-gradient-mid-color/70 shadow-md p-2 m-1.5 rounded-xl text-white" : ""
                  } flex flex-col items-center`}
                >
                  {" "}
                  <span>Show </span> <span>All</span>{" "}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AdminUsersSidebar;
