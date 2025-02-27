import React, { useState } from "react";
import { Eye, EyeOff, Clipboard, Check, Edit, Trash } from "lucide-react";

const Manager: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordTable, setShowPasswordTable] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <>
      <div className="fixed top-0 left-0 z-[-2] w-full min-h-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>

      <div className="mx-auto pt-8 w-full text-center text-gray-300 font-medium">
        <h1 className="text-2xl sm:text-3xl md:text-4xl">Password Manager</h1>
        <p className="text-sm sm:text-base lg:text-lg my-2 font-normal">
          Your own Password Manager
        </p>

        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 p-6 sm:p-8 mx-auto">
          <input
            type="text"
            placeholder="Enter website URL"
            className="w-full outline-none rounded-2xl border-1 border-gray-500 px-5 py-3 mb-6 bg-transparent text-white placeholder-gray-400"
          />

          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <input
              type="text"
              placeholder="Enter username"
              className="w-full sm:w-3/5 outline-none rounded-2xl border-1 border-gray-500 px-5 py-3 bg-transparent text-white placeholder-gray-400 mb-4 sm:mb-0"
            />

            <div className="relative w-full sm:w-2/5">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full outline-none rounded-2xl border-1 border-gray-500 px-5 py-3 pr-12 bg-transparent text-white placeholder-gray-400"
              />
              <button
                type="button"
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-200 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <button className="w-full sm:w-auto rounded-full outline-none px-7 py-3 border-1 border-gray-400 mt-6 sm:mt-10 cursor-pointer hover:font-bold duration-300">
            Add Password
          </button>
        </div>
      </div>

      <div className="overflow-x-auto mx-5">
        <table className="w-5/6 min-w-[500px] mx-auto my-5 text-gray-300 text-center border border-gray-600 rounded-lg shadow-lg">
          <thead className="bg-gray-900 text-gray-200 uppercase">
            <tr>
              <th className="py-3 px-5 border-1 border-gray-600 box-border">
                Site
              </th>
              <th className="py-3 px-5 border-1 border-gray-600 box-border">
                Username
              </th>
              <th className="py-3 px-5 border-1 border-gray-600 box-border">
                Password
              </th>
              <th className="py-3 px-5 border-1 border-gray-600 box-border">
                Edit
              </th>
              <th className="py-3 px-5 border-1 border-gray-600 box-border">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-5 min-w-xs border border-gray-600">
                <a
                  href="https://www.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.google.com
                </a>
                <button
                  onClick={() => copyToClipboard("www.google.com", "site")}
                  className="text-gray-400 hover:text-white cursor-pointer float-right"
                >
                  {copiedField === "site" ? (
                    <Check size={18} />
                  ) : (
                    <Clipboard size={18} />
                  )}
                </button>
              </td>
              <td className="py-3 px-5 border border-gray-600 min-w-xs">
                <span>hira_haider</span>
                <button
                  onClick={() => copyToClipboard("hira_haider", "username")}
                  className="text-gray-400 hover:text-white cursor-pointer float-right"
                >
                  {copiedField === "username" ? (
                    <Check size={18} />
                  ) : (
                    <Clipboard size={18} />
                  )}
                </button>
              </td>
              <td className="py-3 px-5 border border-gray-600">
                <div className="relative flex justify-center items-center space-x-2 min-w-xs">
                  <input
                    type={showPasswordTable ? "text" : "password"}
                    className="outline-none border-none bg-transparent text-white text-center w-32 sm:w-40"
                    value="hirahaider@19"
                    readOnly
                  />
                  <button
                    type="button"
                    className="absolute right-10 text-gray-400 hover:text-gray-200 cursor-pointer"
                    onClick={() => setShowPasswordTable(!showPasswordTable)}
                  >
                    {showPasswordTable ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => copyToClipboard("hirahaider@19", "password")}
                    className="absolute right-2 text-gray-400 hover:text-white cursor-pointer"
                  >
                    {copiedField === "password" ? (
                      <Check size={18} />
                    ) : (
                      <Clipboard size={18} />
                    )}
                  </button>
                </div>
              </td>
              <td className="py-3 pr-5 border border-gray-600">
                <button className="ml-5 text-gray-400 hover:text-white cursor-pointer">
                  <Edit size={18} />
                </button>
              </td>
              <td className="py-3 pr-5 border border-gray-600">
                <button className="ml-5 text-gray-400 hover:text-white cursor-pointer">
                <Trash size={18} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Manager;