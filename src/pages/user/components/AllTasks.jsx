import  {  useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import TaskCard from "./TaskCard";
import NoTaskFound from "./NoTaskFound";
import { sort } from "../../../utils/sort";

const sortParams = ["dueDateAsc", "dueDateDesc", "createdAtAsc", "createdAtDesc", "lastModifiedAtAsc", "lastModifiedAtDesc", "titleAsc", "titleDesc"];

function AllTasks() {
  const [sortOrder, setSortOrder] = useState("lastModifiedAtDesc");

  let { tasks } = useContext(AuthContext);
  const sortedTasks = sort(tasks, sortOrder);
  console.log(sortedTasks)

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center text-sm md:text-md">
        {sortedTasks.length != 0 && (
          <div >
            <span className="pl-4 pb-4 ">Showing {tasks.length} tasks.</span>
          </div>
        )}
        {sortedTasks.length != 0 && (
          <div className="flex flex-row justify-center gap-2 items-center">
            <label htmlFor="sort">Sort By</label>
            <select
              className="appearance-none flex-1 bg-white dark:bg-bg-surface sm:ml-5 p-2  border border-sidebar-border rounded-2xl max-w-[60%] caret-sidebar-border dark:caret-gradient-mid-color  focus:border-sidebar-border dark:focus:border-gradient-mid-color dark:border-border-color focus:outline-none"
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              <option value={sortParams[0]}> Due Date ↓ </option>
              <option value={sortParams[1]}> Due Date ↑ </option>
              <option value={sortParams[2]}> Created ↓ </option>
              <option value={sortParams[3]}> Created ↑ </option>
              <option value={sortParams[4]}> Last Modified ↓ </option>
              <option value={sortParams[5]}> Last Modified ↑ </option>
              <option value={sortParams[6]}> Title ↓ </option>
              <option value={sortParams[7]}> Title ↑ </option>
            </select>
          </div>
        )}
      </div>
      {sortedTasks.length === 0 ? (
        <NoTaskFound />
      ) : (
        <ul className="grid md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-5 p-4 ">
          {sortedTasks.map((task) => (
            <TaskCard
              key={task.taskId}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
              id={task.taskId}
              dueDate={task.dueDate}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default AllTasks;
