import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistance, subDays, format } from "date-fns";
import { UsersContext } from "../../../components/context/UsersContext";

function AllTasksAdmin() {
  let { tasks, setTasks, token, page, updatePage, responsePage } = useContext(AuthContext);
  let { userid } = useParams();
  const navigate = useNavigate();
  const sortParams = ["title", "description", "status", "priority", "createdAt", "lastModifiedAt"];
  const sortName = ["Title", "Description", "Status", "Priority", "Created At", "Last Edited At"];

  useEffect(() => {
    console.log(tasks);
  }, [tasks, setTasks]);

  const gotoTask = (taskid, userid) => {
    navigate("/admin-dashboard/users/" + userid + "/tasks/" + taskid);
  };
  return (
    <div>
      <div>
        <h6 className="pb-4">{location.pathname.startsWith("/admin-dashboard/users/") ? "Showing tasks from User ID : " + userid : "Showing tasks from all users"}</h6>
      </div>
      {tasks.length > 0 && (
        <div className="table-container">
          <div className="flex flex-row justify-between text-xs sm:text-sm">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <label className="font-semibold">Limit Per Page : </label>
              <input
                type="number"
                name="limit"
                className="sort-bubble ml-0 w-full"
                value={page.limit}
                onChange={(e) => {
                  let num = Number(e.target.value);
                  if (num < 10) num = 10;
                  if (num > 50) num = 50;
                  updatePage({ limit: e.target.value });
                }}
                max={50}
                min={10}
              />
            </div>
            <div>
              <div className="flex flex-row justify-center sm:gap-2 items-center">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                  <label htmlFor="sort">Sort By : </label>
                  <select className="sort-bubble ml-0 w-full" onChange={(e) => updatePage({ sortBy: e.target.value })} value={page.sortBy} id="sort">
                    {sortParams.map((item, i) => (
                      <option key={i} value={item}>
                        {sortName[i]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
                  <label htmlFor="sort-direction">Sort Direction : </label>
                  <select
                    className="sort-bubble ml-0 w-full"
                    onChange={(e) => updatePage({ direction: e.target.value })}
                    value={page.direction}
                    id="sort-direction"
                  >
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
                <th className="w-12 rounded-tl-xl table-heading">Task ID</th>
                <th className="w-12 table-heading">User ID</th>
                <th className="w-50 table-heading">Title</th>
                <th className="w-70 table-heading">Description</th>
                <th className="w-20 table-heading">Priority</th>
                <th className="w-30 table-heading">Status</th>
                <th className="w-30 table-heading">Created At</th>
                <th className="w-40 rounded-tr-xl table-heading">Last Modified At</th>
              </tr>
            </thead>
            <tbody className="bg-text-primary dark:bg-bg-surface border-border-color rounded-b-2xl">
              {tasks.length > 0 &&
                tasks.map((task, i) => (
                  <tr key={i} className="text-center cursor-pointer hover:bg-border-color/20" onClick={() => gotoTask(task.taskId, task.user.id)}>
                    <td className="table-body">{task?.taskId}</td>
                    <td className="table-body">{task?.user?.id}</td>
                    <td className="table-body ">{task?.title.length > 22 ? task.title.substring(0, 22) + "..." : task.title}</td>
                    <td className="table-body ">{task?.description.length > 30 ? task.description.substring(0, 30) + "..." : task.description}</td>
                    <td className="table-body ">{task?.priority}</td>
                    <td className="table-body ">{task?.status}</td>
                    <td className="table-body ">{format(new Date(task?.createdAt), "dd / MM / yyyy")}</td>
                    <td className="table-body ">{formatDistance(subDays(new Date(task?.lastModifiedAt), 0), new Date(), { addSuffix: true })}</td>
                  </tr>
                ))}
              <tr className="px-2 py-2 rounded-b-2xl ">
                <td colSpan={8} className="table-page">
                  <div className="flex flex-row justify-between items-center">
                    <p className="w-50 text-left">Tasks Found: {responsePage.totalItems}</p>
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
      {tasks.length == 0 && <div>Not found.</div>}
    </div>
  );
}

export default AllTasksAdmin;
