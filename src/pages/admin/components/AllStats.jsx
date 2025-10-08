import React, { useContext } from "react";
import { StatsContext } from "../../../components/context/StatsProvider";

function AllStats() {
  let { stats, setStats } = useContext(StatsContext);
  const statsLabels = [
    "Total TaskWiser Users",
    "Total Tasks",
    "No. of Users Active Today",
    "No. of Users Created Account today",
    "No. of Tasks Created Today",
    "No. of Tasks Modified Today",
    "Avg Tasks per User",
  ];
  const statsDetails = [
    stats?.users?.total,
    stats?.tasks?.total,
    stats?.users?.lastLoginToday,
    stats?.users?.createdToday,
    stats?.tasks?.createdToday,
    stats?.tasks?.modifiedToday,
    stats?.users?.avgTasksPerUser,
  ];
  return (
    <>
      <h2 className="sm:text-xl lg:text-2xl xl:text-3xl text-center ">Summary</h2>
      <div className="flex text-xs sm:text-sm md:text-base w-full justify-center mt-5">
        {stats && Object.keys(stats).length > 0 && (
          <div className="flex flex-col xl:flex-row xl:gap-10 gap-5">
            <div className="flex justify-center items-center xl:w-96">
              <div className="flex justify-center items-center flex-col gap-2 w-full">
                <table className="w-xs sm:w-md  text-left border-separate border-spacing-[0px] table-fixed text-xs sm:text-sm lg:text-base border-2 border-light-accent dark:border-dark-purple overflow-hidden rounded-2xl">
                  <tbody className="bg-text-primary dark:bg-bg-surface border-border-color">
                    {statsDetails.map((item, i) => (
                      <tr key={i} className="text-left hover:bg-border-color/20">
                        <td className="w-60 sm:w-73 bg-light-accent dark:bg-dark-purple py-2 px-4 font-semibold">{statsLabels[i]}</td>
                        <td className="py-2 px-4 bg-transparent break-words whitespace-normal">
                          {item == null || (item == "" && item != false) ? <span className="text-neutral-500">-</span> : <span>{statsDetails[i]}</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AllStats;
