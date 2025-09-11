import React from "react";

function ConfirmModel({ message, message2, handleYes, setConfirm, text }) {
  return (
    <div className="z-100 bg-gray-800/50 absolute w-full h-screen left-0 top-0">
      <div className="bg-white dark:bg-bg-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 shadow-2xl rounded-2xl border-accent dark:border-gradient-mid-color absolute">
        <div className=" flex flex-col m-8 gap-8 sm:w-md">
          <div>
            <h6 className="flex sm:text-xl justify-center text-center">{message}</h6>
            <h6 className="flex sm:text-xl justify-center text-center">{message2}</h6>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-10">
            <button onClick={handleYes} className="btn-secondary-dashboard border-priority-high text-priority-high">
              {text}
            </button>
            <button onClick={() => setConfirm(false)} className="btn-primary-dashboard">
              {" "}
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModel;
