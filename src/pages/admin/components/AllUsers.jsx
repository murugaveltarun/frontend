import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { formatDistance, subDays, format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { UsersContext } from "../../../components/context/UsersContext";

function AllUsers() {
  let { token } = useContext(AuthContext);
  let { setUsers, page, setPage, users, updatePage, responsePage } = useContext(UsersContext);
  const sortParams = ["username", "id", "name", "email", "authProvider", "createdAt", "lastLoginAt"];
  const sortName = ["Username", "User ID", "Name", "E-Mail", "Auth Provider", "Joined At", "Last Login At"];
  const navigate = useNavigate();

  useEffect(() => {
    console.log(users);
  }, [users, setUsers]);

  const gotoUser = (id) => {
    navigate("/admin-dashboard/users/" + id);
  };

  return (
    <>
      {users.length > 0 && (
        <div className="table-container">
          <div className="flex flex-row justify-between text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <label className="font-semibold">Limit Per Page : </label>
              <input
                type="number"
                name="limit"
                className="sort-bubble ml-0 w-full"
                value={page.limit}
                onChange={(e) =>{
                  let num = Number(e.target.value);
                  if(num < 10) num=10;
                  if(num > 50) num=50;
                  updatePage({ limit: e.target.value })
                } }
                max={50}
                min={10}
              />
              
            </div>
            <div>
              <div className="flex flex-row justify-center sm:gap-2 items-center">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2" >
                  <label htmlFor="sort">Sort By : </label>
                  <select className="sort-bubble ml-0 w-full" onChange={(e) => updatePage({ sortBy: e.target.value })} value={page.sortBy} id="sort">
                    {sortParams.map((item, i) => (
                      <option key={i} value={item}>
                        {sortName[i]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2" >
                  <label htmlFor="sort-direction">Sort Direction : </label>
                  <select className="sort-bubble ml-0 w-full" onChange={(e) => updatePage({ direction: e.target.value })} value={page.direction} id="sort-direction">
                    <option value={"desc"}>Descending ↑</option>
                    <option value={"asc"}>Ascending ↓</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <table className="table-class text-xs sm:text-sm lg:text-base">
            <thead className="rounded-t-2xl ">
              <tr className="rounded-t-2xl ">
                <th className="w-12 rounded-tl-xl table-heading">User ID</th>
                <th className="w-45 table-heading">Username</th>
                <th className="w-70 table-heading">E - Mail</th>
                <th className="w-20 table-heading">Auth Provider</th>
                <th className="w-40 table-heading">Name</th>
                <th className="w-40 table-heading">Joined At</th>
                <th className="w-50 table-heading">Last Login At</th>
                <th className="w-20 rounded-tr-xl table-heading">Active</th>
              </tr>
            </thead>
            <tbody className="bg-text-primary dark:bg-bg-surface border-border-color rounded-b-2xl">
              {users.length > 0 &&
                users.map((user, i) => (
                  <tr key={i} className="text-center cursor-pointer hover:bg-border-color/20" onClick={() => gotoUser(user.id)}>
                    <td className="table-body">{user.id}</td>
                    <td className="table-body ">{user.username.length > 15 ? user.username.substring(0, 15) + "..." : user.username}</td>
                    <td className="table-body ">{user.email.length > 30 ? user.email.substring(0, 30) + "..." : user.email}</td>
                    <td className="table-body ">{user.authProvider}</td>
                    <td className="table-body ">{user.name && user.name.length > 10 ? user.name.substring(0, 10) + "..." : user.name}</td>
                    <td className="table-body ">{format(new Date(user.createdAt), "dd / MM / yyyy")}</td>
                    <td className="table-body ">{formatDistance(subDays(new Date(user.lastLoginAt), 0), new Date(), { addSuffix: true })}</td>
                    <td className="table-body ">{user.active ? "Yes" : "No"}</td>
                  </tr>
                ))}
              <tr className="px-2 py-2 rounded-b-2xl ">
                <td colSpan={8} className="table-page">
                  <div className="flex flex-row justify-between items-center">
                    <p className="w-50 text-left">Users Found: {responsePage.totalItems}</p>
                    <div className="flex flex-row gap-2 items-center justify-center ">
                      <span className="w-20 justify-end flex flex-row gap-2">
                        {responsePage.currentPage >= 4 && (
                          <button className="link" onClick={() => updatePage({ pageNo: 1 })}>
                            ...
                          </button>
                        )}
                        {responsePage.currentPage >= 3 && (
                          <button className="link" onClick={() => updatePage({ pageNo: responsePage.currentPage - 2 })}>
                            {responsePage.currentPage - 2}
                          </button>
                        )}
                        {responsePage.currentPage >= 2 && (
                          <button className="link" onClick={() => updatePage({ pageNo: responsePage.currentPage - 1 })}>
                            {responsePage.currentPage - 1}
                          </button>
                        )}
                      </span>

                      {/* current page always in middle */}
                      <button
                        className="font-bold text-lg text-accent dark:text-gradient-mid-color"
                        onClick={() => updatePage({ pageNo: responsePage.currentPage })}
                      >
                        {responsePage.currentPage}
                      </button>

                      <span className="w-20 justify-start flex flex-row gap-2">
                        {responsePage.totalPage - responsePage.currentPage >= 1 && (
                          <button className="link" onClick={() => updatePage({ pageNo: responsePage.currentPage + 1 })}>
                            {responsePage.currentPage + 1}
                          </button>
                        )}
                        {responsePage.totalPage - responsePage.currentPage >= 2 && (
                          <button className="link" onClick={() => updatePage({ pageNo: responsePage.currentPage + 2 })}>
                            {responsePage.currentPage + 2}
                          </button>
                        )}
                        {responsePage.totalPage - responsePage.currentPage >= 3 && (
                          <button className="link" onClick={() => updatePage({ pageNo: responsePage.totalPage })}>
                            ...
                          </button>
                        )}
                      </span>
                    </div>

                    <p className="w-50 text-right">
                      Page : {responsePage.currentPage}/{responsePage.totalPage}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {users.length == 0 && <div>Not found.</div>}
    </>
  );
}

export default AllUsers;
