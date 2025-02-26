import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Manager: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="mx-auto p-6 md:p-10 w-full text-center text-gray-300 font-medium">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">Password Manager</h1>
        <p className="text-sm sm:text-base lg:text-lg my-2 font-normal">
          Your own Password Manager
        </p>

        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-6 sm:p-8 mx-auto">
          <input
            type="text"
            placeholder="Enter website URL"
            className="w-full outline-none rounded-2xl border-2 border-gray-500 px-5 py-3 mb-6 bg-transparent text-white placeholder-gray-400"
          />

          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <input
              type="text"
              placeholder="Enter username"
              className="w-full sm:w-3/5 outline-none rounded-2xl border-2 border-gray-500 px-5 py-3 bg-transparent text-white placeholder-gray-400 mb-4 sm:mb-0"
            />

            <div className="relative w-full sm:w-2/5">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full outline-none rounded-2xl border-2 border-gray-500 px-5 py-3 pr-12 bg-transparent text-white placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-200"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <button className="w-full sm:w-auto rounded-full outline-none px-7 py-3 border-2 border-gray-400 mt-6 sm:mt-10 cursor-pointer hover:font-bold duration-300">
            Add Password
          </button>
        </div>
      </div>
    </>
  );
};

export default Manager;
