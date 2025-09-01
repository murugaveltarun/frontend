import React from "react";

function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* left side */}
        <div className="flex w-full md:w-1/2 min-h-screen justify-center items-center p-8">
          <div className="flex flex-col justify-center max-w-xl">
            <h1 className="text-6xl lg:text-7xl font-bold text-gradient pb-6">
              Task Wiser
            </h1>
            <h2 className="text-3xl lg:text-3xl mb-5">
              The Smarter Way to Manage Tasks
            </h2>
            <p className="text-xl pt-6 text-gray-300">
              TaskWiser provides a simple and secure space to organize your
              projects. Create tasks, track their status, and focus on your
              goals with peace of mind.
            </p>
          </div>
        </div>

        {/* right side */}

        <div className="flex w-full md:w-1/2 min-h-screen justify-center items-center p-8">
          <div className="w-full max-w-sm bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-2xl p-8 text-center">
            <h1 className="text-4xl font-bold text-gradient mb-4">
              Get Started
            </h1>
            <p className="text-neutral-300 mb-8">
              Create an account and manage your tasks.
            </p>
            <div className="flex flex-col gap-4">
              <a href="/register" className="btn-primary text-xl py-3">
                Register
              </a>
              <a href="/login" className="btn-secondary text-xl py-3">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
