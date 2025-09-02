import React from "react";

function TaskCard({ title, description, priority, status, id, user, dueDate }) {
  return (
    <>
      <div>
        <h2>{title}</h2>
        {/* <p>{priority}</p>
        <p>{description}</p>
        <p>{status}</p>
        <p>{id}</p>
        <p>{user}</p>
        <p>{dueDate}</p> */}
      </div>
    </>
  );
}

export default TaskCard;
