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
  let { setUsers, page, updatePage, updateResponsePage } = useContext(UsersContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [authProvider, setAuthProvider] = useState("");
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [active, setActive] = useState("");
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
    setIsSearching(true)
    e?.preventDefault();
    if (!username && !email && !authProvider && !name && !active) {
      handleClear();
      return;
    }

    setButtonText("Searching...");
    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/users/search?username=${username}&email=${email}&authProvider=${authProvider}&name=${name}&active=${active}&page=${page.pageNo}&limit=${
        page.limit
      }&sortBy=${page.sortBy}&direction=${page.direction}`;
      console.log(url);
      const validToken = await checkTokenOrRefresh(token, navigate);
      if (!validToken) return;
      setToken(validToken);

      const response = await getApi(validToken).get(url);
      if (response.data.status == 200) {
        setUsers(response.data.data.users);
        updateResponsePage({totalPage:response.data.data.totalPages, currentPage:response.data.data.currentPage,totalItems:response.data.data.totalItems})
        console.log(page);
      }
    } catch (e) {
      console.log(e.status);
      if (e.request) {
        toast.error("Error while fetching users. Please try again later.");
      }
      console.log(e);
    }
    setButtonText("Search");
    console.log("handle search");
  };

  // for clearing filters and get all tasks
  const handleClear = async (e) => {
    setIsSearching(false)
    e?.preventDefault();
    setUsername("");
    setEmail("");
    setAuthProvider("");
    setName("");
    setActive("");
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
        updateResponsePage({totalPage:response.data.data.totalPages, currentPage:response.data.data.currentPage,totalItems:response.data.data.totalItems})
        console.log(page);
      }
    } catch (e) {
      console.log(e.status);
      if (e.request) {
        toast.error("Error while fetching task. Please try again later.");
      }
      console.error(e);
    }
  };

  return (
    <>
      <div className="flex text-xl flex-col border-b-1 border-sidebar-border dark:border-border-color">
        <form>
          <div className="p-5">
            <div className="flex flex-col  sm:flex-row justify-between sm:items-center ">
              <label className="font-semibold">Find by ID : </label>
              <input
                type="number"
                name="id"
                className="flex w-25 bg-white dark:bg-bg-surface sm:ml-5 p-2 border border-sidebar-border rounded-2xl max-w-[60%] caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <button
                onClick={(e) => {
                  findUserById(e);
                }}
                type="submit"
                className="flex flex-row justify-center items-center bg-background border-1 border-sidebar-border dark:bg-gradient-mid-color dark:border-border-color rounded-2xl text-sm text-dark-gray dark:text-white p-2 h-full hover:scale-110 transition-transform duration-300 ease-in-out "
              >
                {" "}
                <Search className="w-5 h-5 mr-2" /> {buttonText2}
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
              <h5 className="text-xl font-semibold py-5">Filter users : </h5>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updatePage({pageNo : 1});
                    setIsSearching(false)
                  }}
                  type="button"
                  className="flex w-fit  flex-row justify-center items-end bg-background border-1 border-sidebar-border dark:bg-gradient-mid-color dark:border-border-color rounded-2xl text-sm text-dark-gray dark:text-white p-2 h-full hover:scale-110 transition-transform duration-300 ease-in-out "
                >
                  <RotateCcw className="w-5 h-5 mr-2" /> Clear
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    updatePage({pageNo : 1});
                    setIsSearching(true)
                  }}
                  type="submit"
                  className="flex flex-row justify-center items-center bg-background border-1 border-sidebar-border dark:bg-gradient-mid-color dark:border-border-color rounded-2xl text-sm text-dark-gray dark:text-white p-2 h-full hover:scale-110 transition-transform duration-300 ease-in-out "
                >
                  {" "}
                  <Search className="w-5 h-5 mr-2" /> {buttonText}
                </button>
              </div>
            </div>

            <div className="flex flex-col  sm:flex-row justify-between sm:items-center ">
              <label className="font-semibold">Username</label>
              <input
                type="text"
                name="username"
                className="flex-1 bg-white dark:bg-bg-surface sm:ml-5 p-2 border border-sidebar-border rounded-2xl max-w-[60%] caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col  sm:flex-row justify-between sm:items-center ">
              <label className="font-semibold">E-Mail</label>
              <input
                type="text"
                name="email"
                className="flex-1 bg-white dark:bg-bg-surface sm:ml-5 p-2 border border-sidebar-border rounded-2xl max-w-[60%] caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col  sm:flex-row justify-between sm:items-center ">
              <label className="font-semibold">Name</label>
              <input
                type="text"
                name="name"
                className="flex-1 bg-white dark:bg-bg-surface sm:ml-5 p-2 border border-sidebar-border rounded-2xl max-w-[60%] caret-sidebar-border  dark:caret-gradient-mid-color dark:  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* status */}
            <div className="flex flex-col  sm:flex-row justify-between sm:items-center ">
              <p className="font-semibold">Auth Provider</p>
              <div className=" grid  sm:grid-rows-2 grid-cols-2 gap-y-2 sm:gap-y-5 sm:w-[60%] justify-start sm:justify-center select-none">
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    id="google"
                    name="status"
                    value="google"
                    className="hidden peer"
                    checked={authProvider == "google"}
                    onChange={(e) => {
                      setAuthProvider(e.target.value);
                    }}
                  />
                  <label htmlFor="google" className="status-completed w-full">
                    Google
                  </label>
                </div>

                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    id="github"
                    name="authProvider"
                    value="github"
                    className="hidden peer"
                    checked={authProvider == "github"}
                    onChange={(e) => {
                      setAuthProvider(e.target.value);
                    }}
                  />
                  <label htmlFor="github" className="status-completed">
                    GitHub
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    id="local"
                    name="authProvider"
                    value="local"
                    className="hidden peer"
                    checked={authProvider == "local"}
                    onChange={(e) => {
                      setAuthProvider(e.target.value);
                    }}
                  />
                  <label htmlFor="local" className="status-completed">
                    Local
                  </label>
                </div>
                <div className="flex justify-center items-center">
                  <input
                    type="radio"
                    id="all"
                    name="authProvider"
                    value=""
                    className="hidden peer"
                    checked={authProvider == ""}
                    onChange={(e) => {
                      setAuthProvider(e.target.value);
                    }}
                  />
                  <label htmlFor="all" className="status-completed">
                    All
                  </label>
                </div>
              </div>
            </div>

            {/* overdue */}
            <div className="flex-1 flex-row justify-between sm:items-center cursor-pointer selection:none">
              <div className="rounded-2xl grid grid-cols-3 text-sm md:text-md border-1 border-sidebar-border dark:border-border-color justify-center items-center ">
                <div
                  onClick={() => setActive("true")}
                  className={`${
                    active == "true" ? "bg-accent dark:bg-gradient-mid-color shadow-md p-2 m-1.5 rounded-xl text-white" : ""
                  } flex flex-col items-center`}
                >
                  {" "}
                  <span>Active</span> <span>Only </span>
                </div>
                <div
                  onClick={() => setActive("false")}
                  className={`${
                    active == "false" ? "bg-accent dark:bg-gradient-mid-color shadow-md p-2 m-1.5 rounded-xl text-white" : ""
                  } flex flex-col items-center`}
                >
                  {" "}
                  <span>Disabled</span> <span>Only </span>
                </div>
                <div
                  onClick={() => setActive("")}
                  className={`${
                    active == "" ? "bg-accent/70 dark:bg-gradient-mid-color/70 shadow-md p-2 m-1.5 rounded-xl text-white" : ""
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
