import React from "react";

function Unauthorized() {
  return <div>Unauthorized</div>;
}

export default Unauthorized;

           
// <div className="flex justify-between items-center relative w-full select-none">
//   {/* Connecting line */}
//   <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-text-secondary -z-10" />

//   {/* Step 1 */}
//   <div className="flex flex-col items-center w-1/3">
//     <div
//       className={`rounded-full flex items-center justify-center
//         ${task.status === "not started"
//           ? "h-10 w-10 bg-dark-accent border-4 border-accent"
//           : "h-5 w-5 bg-text-secondary"}`}
//     >
//       {task.status === "not started" && (
//         <Check className="text-white" strokeWidth={3} />
//       )}
//     </div>
//     <span className="mt-2 text-sm">Not Started</span>
//   </div>

//   {/* Step 2 */}
//   <div className="flex flex-col items-center w-1/3">
//     <div
//       className={`rounded-full flex items-center justify-center
//         ${task.status === "in progress"
//           ? "h-10 w-10 bg-dark-accent border-4 border-accent"
//           : "h-5 w-5 bg-text-secondary"}`}
//     >
//       {task.status === "in progress" && (
//         <Check className="text-white" strokeWidth={3} />
//       )}
//     </div>
//     <span className="mt-2 text-sm">In Progress</span>
//   </div>

//   {/* Step 3 */}
//   <div className="flex flex-col items-center w-1/3">
//     <div
//       className={`rounded-full flex items-center justify-center
//         ${task.status === "completed"
//           ? "h-10 w-10 bg-dark-accent border-4 border-accent"
//           : "h-5 w-5 bg-text-secondary"}`}
//     >
//       {task.status === "completed" && (
//         <Check className="text-white" strokeWidth={3} />
//       )}
//     </div>
//     <span className="mt-2 text-sm">Completed</span>
//   </div>
// </div>

// my version
//               <div className="flex justify-between items-center relative mx-23 m-11 min-w-80  select-none">
//                 <div
//                   className={`absolute h-0.5 left-0 right-1/2 justify-center  ${
//                     task.status == "not started"
//                       ? "bg-text-secondary"
//                       : task.status == "in progress"
//                       ? "bg-accent dark:bg-gradient-mid-color"
//                       : "bg-accent dark:bg-gradient-mid-color"
//                   }`}
//                 ></div>
//                 <div
//                   className={`absolute h-0.5 left-1/2 right-0 justify-center  ${
//                     task.status == "not started"
//                       ? "bg-text-secondary"
//                       : task.status == "in progress"
//                       ? "bg-text-secondary"
//                       : "bg-accent dark:bg-gradient-mid-color"
//                   }`}
//                 ></div>

//                 <div>
//                   <div
//                     className={`z-10 rounded-full -translate-x-1/2 relative justify-center items-center ${
//                       task.status == "not started"
//                         ? " h-10 w-10 bg-dark-accent dark:bg-dark-purple border-accent dark:border-gradient-mid-color border-4 "
//                         : task.status == "in progress"
//                         ? "h-5 w-5 bg-accent  dark:bg-gradient-mid-color"
//                         : "h-5 w-5 bg-accent dark:bg-gradient-mid-color"
//                     }`}
//                   >
//                     {task.status === "not started" && (
//                       <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent " strokeWidth={4} />
//                     )}
//                   </div>
//                   <div
//                     className={`absolute left-0 justify-center mt-5 -translate-x-1/2 ${
//                       task.status == "not started" ? "bg-status-not-started   text-white" : ""
//                     } p-2 py-0.5 rounded-full border-3 border-status-not-started/50  `}
//                   >
//                     Not Started
//                   </div>
//                 </div>
//                 <div>
//                   <div
//                     className={`z-10 rounded-full  ${
//                       task.status == "not started"
//                         ? " h-5 w-5 bg-text-secondary "
//                         : task.status == "in progress"
//                         ? " h-10 w-10 bg-dark-accent dark:bg-dark-purple border-accent dark:border-gradient-mid-color border-4 "
//                         : "bg-accent h-5 w-5  dark:bg-gradient-mid-color"
//                     }`}
//                   >
//                     {task.status === "in progress" && (
//                       <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent " strokeWidth={4} />
//                     )}
//                   </div>
//                   <div
//                     className={`absolute items-center left-1/2 -translate-x-1/2  justify-center mt-5 ${
//                       task.status == "in progress" ? "bg-status-in-progress   text-white" : " "
//                     } p-2 py-0.5 rounded-full border-3 border-status-in-progress/50`}
//                   >
//                     In Progress
//                   </div>
//                 </div>
//                 <div>
//                   <div
//                     className={`z-10 rounded-full translate-x-1/2 ${
//                       task.status == "not started"
//                         ? " h-5 w-5 bg-text-secondary "
//                         : task.status == "in progress"
//                         ? "h-5 w-5 bg-text-secondary  "
//                         : "h-10 w-10 bg-dark-accent dark:bg-dark-purple border-accent dark:border-gradient-mid-color border-4 "
//                     }`}
//                   >
//                     {task.status === "completed" && (
//                       <Check className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-accent dark:text-gradient-mid-color " strokeWidth={4} />
//                     )}
//                   </div>
//                   <div
//                     className={`absolute right-0 justify-center translate-x-1/2 mt-5 ${
//                       task.status == "completed" ? "bg-status-completed   text-white" : ""
//                     } p-2 py-0.5 rounded-full border-3 border-status-completed/50 `}
//                   >
//                     Completed
//                   </div>
//                 </div>
//               </div>

                // <div className="flex justify-between items-center relative mx-23 m-11 min-w-80 ">
                //   <div
                //     className={`absolute h-0.5 left-0 right-1/2 justify-center  ${
                //       status == "not started"
                //         ? "bg-text-secondary"
                //         : status == "in progress"
                //         ? "bg-accent dark:bg-gradient-mid-color"
                //         : "bg-accent dark:bg-gradient-mid-color"
                //     }`}
                //   ></div>
                //   <div
                //     className={`absolute h-0.5 left-1/2 right-0 justify-center  ${
                //       status == "not started" ? "bg-text-secondary" : status == "in progress" ? "bg-text-secondary" : "bg-accent dark:bg-gradient-mid-color"
                //     }`}
                //   ></div>

                //   <div
                //     className={` cursor-pointer select-none absolute left-0 justify-center mt-23 -translate-x-1/2 ${
                //       status == "not started" ? "bg-status-not-started scale-105 text-white" : "border-3 border-status-not-started/50 scale-90"
                //     } p-2 py-0.5 rounded-full `}
                //     onClick={() => setStatus("not started")}
                //   >
                //     Not Started
                //   </div>
                //   <div
                //     className={`cursor-pointer select-none absolute items-center left-1/2 -translate-x-1/2  justify-center mt-23 ${
                //       status == "in progress" ? "bg-status-in-progress scale-105 text-white" : "border-3 border-status-in-progress/50 scale-90"
                //     } p-2 py-0.5 rounded-full `}
                //     onClick={() => setStatus("in progress")}
                //   >
                //     In Progress
                //   </div>
                //   <div
                //     className={` cursor-pointer select-none absolute right-0 justify-center translate-x-1/2 mt-23 ${
                //       status == "completed" ? "bg-status-completed scale-105 text-white" : "border-3 border-status-completed/50 scale-90"
                //     } p-2 py-0.5 rounded-full `}
                //     onClick={() => setStatus("completed")}
                //   >
                //     Completed
                //   </div>

                //   <div
                //     className={`cursor-pointer z-10 rounded-full -translate-x-1/2 relative  ${
                //       status == "not started"
                //         ? " h-7 w-7 dark:bg-gradient-mid-color bg-accent dark:drop-shadow-[0_0_12px_theme(colors.gradient-mid-color)] drop-shadow-[0_0_19px_theme(colors.accent)] "
                //         : status == "in progress"
                //         ? "h-5 w-5 bg-accent  dark:bg-gradient-mid-color"
                //         : "h-5 w-5 bg-accent dark:bg-gradient-mid-color"
                //     }`}
                //     onClick={() => setStatus("not started")}
                //   >
                //     {status === "not started" && <div className="absolute inset-0 m-auto h-5 w-5 rounded-full dark:bg-dark-purple bg-dark-accent "></div>}
                //   </div>
                //   <div
                //     className={`cursor-pointer z-10 rounded-full  ${
                //       status == "not started"
                //         ? " h-5 w-5 bg-text-secondary "
                //         : status == "in progress"
                //         ? "h-7 w-7 bg-accent dark:bg-gradient-mid-color dark:drop-shadow-[0_0_12px_theme(colors.gradient-mid-color)] drop-shadow-[0_0_12px_theme(colors.accent)]"
                //         : "bg-accent h-5 w-5  dark:bg-gradient-mid-color"
                //     }`}
                //     onClick={() => setStatus("in progress")}
                //   >
                //     {status === "in progress" && <div className="absolute inset-0 m-auto h-5 w-5 rounded-full dark:bg-dark-purple bg-dark-accent "></div>}
                //   </div>
                //   <div
                //     className={`cursor-pointer z-10 rounded-full translate-x-1/2 ${
                //       status == "not started"
                //         ? " h-5 w-5 bg-text-secondary "
                //         : status == "in progress"
                //         ? "h-5 w-5 bg-text-secondary  "
                //         : "bg-accent h-7 w-7 dark:bg-gradient-mid-color dark:drop-shadow-[0_0_12px_theme(colors.gradient-mid-color)] drop-shadow-[0_0_12px_theme(colors.accent)]  "
                //     }`}
                //     onClick={() => setStatus("completed")}
                //   >
                //     {status === "completed" && <div className="absolute inset-0 m-auto h-5 w-5 rounded-full dark:bg-dark-purple bg-dark-accent "></div>}
                //   </div>
                // </div>