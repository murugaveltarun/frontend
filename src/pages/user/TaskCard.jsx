import React from "react";
import { formatDistanceToNow, isPast } from "date-fns";
import { Clock, ClockAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

let overdue = false;
function getDueInText(dueDate) {
  const deadline = new Date(dueDate);
  if (isPast(deadline)) {
    overdue = true;
    return "Overdue";
  }
  overdue = false;
  return "Due " + formatDistanceToNow(deadline, { addSuffix: true });
}

function TaskCard({ title, description, priority, status, id, dueDate }) {
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`border-l-4 ${
          priority == "high"
            ? "border-priority-high/50 dark:border-priority-high dark:gradient-card bg-priority-high/5 dark:shadow-priority-high/40 "
            : priority === "medium"
            ? "border-priority-medium/50 dark:border-priority-medium bg-priority-medium/5 dark:gradient-card  dark:shadow-priority-medium/40"
            : "border-priority-low/50 dark:border-priority-low bg-priority-low/5 dark:gradient-card  dark:shadow-priority-low/40"
        } h-50 p-4 rounded-2xl
          flex flex-col justify-between shadow-md hover:shadow-lg  cursor-pointer hover:scale-103 transition-all duration-400
          backdrop-filter backdrop-blur-lg 
        `}


        // className={`border-l-4 ${
        //   priority == "high"
        //     ? "border-priority-high/50 dark:border-priority-high bg-priority-high/5 dark:bg-priority-high1/20 dark:shadow-priority-high/40 "
        //     : priority === "medium"
        //     ? "border-priority-medium/50 dark:border-priority-medium bg-priority-medium/5 dark:bg-priority-medium1/20 dark:shadow-priority-medium/40"
        //     : "border-priority-low/50 dark:border-priority-low bg-priority-low/5 dark:bg-priority-low1/20 dark:shadow-priority-low/40"
        // } h-50 p-4 rounded-2xl
        //   flex flex-col justify-between shadow-md hover:shadow-lg   hover:scale-103 transition-all duration-400
        //   backdrop-filter backdrop-blur-lg 
        // `}


      >
        <div className="flex flex-col gap-5" onClick={()=>navigate(`task/${id}`)}>
          <h2 className="line-clamp-1 font-semibold text-lg tracking-tight ">{title}</h2>
          <p className="line-clamp-2 mt-1 font-light">{description}</p>
        </div>
        <div className="flex flex-row justify-between ">
          <span
            className={`flex justify-center items-center px-2.5 py-0.5 font-medium text-xs text-white rounded-full hover:opacity-90 transition-all duration-200 select-none ${
              status == "completed" ? "bg-status-completed" : status === "not started" ? "bg-status-not-started" : "bg-status-in-progress"
            }`}
          >
            {status}
          </span>
          <p className="flex flex-row justify-center items-center select-none text-sm">
            {" "}
            {overdue ? <ClockAlert className="h-3" /> : <Clock className="h-3" />} {getDueInText(dueDate)}
          </p>
        </div>
      </div>
    </>
  );
}

export default TaskCard;

{
   /* 
  
  🎨 Complementary (contrast / pop)

Coral / Warm Orange → #ff7043

Muted Peach → #fcb69f

(Teal + warm orange/coral is a classic energetic combo.)

🎨 Analogous (harmonious, calm)

Deep Blue → #007bff

Sea Green → #00c896

Mint → #a7f0d1

(These sit next to teal on the color wheel, so they blend smoothly.)

🎨 Neutral Pairings (professional / minimal)

Charcoal Gray → #2e2e2e

Warm Sand Beige → #f5e6ca

Off-White → #f9fafb

(Teal + gray/beige makes things look very modern and clean.)
  
  */


}
 